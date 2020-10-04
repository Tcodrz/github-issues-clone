import { Observable } from 'rxjs';
import { IconService } from './../../services/icon.service';
import { LabelService } from './../../services/label.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label } from '../interface/label.interface';

@Component({
  selector: 'app-label-dropdown',
  templateUrl: './label-dropdown.component.html',
  styleUrls: ['./label-dropdown.component.css']
})
export class LabelDropdownComponent implements OnInit {

  @Input() type: string;

  @Output() labelEvent: EventEmitter<Label> = new EventEmitter();

  title = 'Labels';
  subtitle: string;

  labels: Observable<Label[]>;

  holdDropdown = false;

  filterInput: string;

  constructor(
    private labelService: LabelService,
    public iconService: IconService,
  ) { }

  ngOnInit(): void {
    this.labelService.getLabelsFromApi().then(() => {
      this.labels = this.labelService.getAllLabels().asObservable();

      if (this.type === 'select') {
        this.subtitle = 'Apply labels';
      }
      if (this.type === 'filter') {
        this.labelService.addUnlabeled();
        this.subtitle = 'Filter by label';
      }
    });
  }

  sendEvent(label: Label): void {
    this.labelEvent.emit(label);
  }

  resetAllLabels(): void {
    this.labelService.unSelectAllLabels();
  }


}
