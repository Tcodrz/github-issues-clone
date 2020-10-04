import { ListStateService } from './../../services/list-state.service';
import { IssueListService } from './../../services/issue-list.service';
import { IconService } from './../../services/icon.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Label } from 'src/app/shared/interface/label.interface';
import { DropDownItem } from 'src/app/shared/dropdown/dropdown.component';
import { Subscription, Observable } from 'rxjs';



@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {

  openIssuesCount: Observable<number>;
  closedIssuesCount: Observable<number>;
  @Input() selectCheckBox: boolean;
  @Input() selectedCount: number;
  @Input() isSelectedIssues: boolean;
  @Output() checkbox: EventEmitter<null> = new EventEmitter();
  @Output() labelEvent: EventEmitter<string> = new EventEmitter();

  listState: string;

  listStateSub: Subscription;

  constructor(
    private issueListService: IssueListService,
    public iconService: IconService,
    private listStateService: ListStateService,
  ) { }

  ngOnDestroy(): void {
    this.listStateSub.unsubscribe();
  }

  ngOnInit(): void {
    this.listStateSub = this.listStateService.getState()
      .subscribe(state => this.listState = state);
    this.openIssuesCount = this.issueListService.getOpenIssuesCount().asObservable();
    this.closedIssuesCount = this.issueListService.getClosedIssuesCount().asObservable();
  }

  handleDropDownClick(item: DropDownItem): void {
    if (item.type === 'sort') {
      this.listStateService.setSort(item.name === 'Newest' ? 'new' : 'old');
    }
    if (item.type === 'state') {
      this.listStateService.setState(item.name);
    }
    if (item.type === 'Mark as') {
      if (item.name === 'open') {
        this.issueListService.markIssuesOpen().then(() => {
          this.listStateService.setState(item.name);
        });
      }
      if (item.name === 'closed') {
        this.issueListService.markIssuesClosed().then(() => {
          this.listStateService.setState(item.name);
        });
      }
    }
  }

  sendCheckboxEvent(): void {
    this.checkbox.emit(null);
  }

  handleLabelEvent(label: Label) {
    if (this.selectedCount < 1) {
      this.issueListService.handleLabelSelection(label).then(() => {
        this.labelEvent.emit('filter');
      });
    } else if (this.selectedCount > 0) {
      this.issueListService.handleAddRemoveLabel(label).then(() => {
        this.labelEvent.emit('select');
      });
    }
  }

}
