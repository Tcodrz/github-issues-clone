import { ListStateService } from './../../services/list-state.service';
import { LabelService } from './../../services/label.service';
import { IconService } from './../../services/icon.service';
import { DropDownItem } from './../../shared/dropdown/dropdown.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  labelsLength: number;

  constructor(
    public iconService: IconService,
    private labelService: LabelService,
    private listState: ListStateService
  ) { }

  ngOnInit(): void {
    this.labelService.getAllLabels().subscribe((labels) => {
      this.labelsLength = labels.length;
    })
  }

  handleFilter(state: DropDownItem): void {
    this.listState.setState(state.name);
  }

  onFilterIssues(value: string): void {
    this.listState.setIssueFilter(value);
  }

}
