import { ApiService } from './../../services/api.service';
import { Label } from './../interface/label.interface';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-label-badge',
  templateUrl: './label-badge.component.html',
  styleUrls: ['./label-badge.component.css']
})
export class LabelBadgeComponent implements OnInit, OnDestroy {

  label: Label;
  @Input() labelName: string;

  @Output() selectedLabel: EventEmitter<boolean> = new EventEmitter();;

  labelSub: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnDestroy(): void {
    this.labelSub.unsubscribe();
  }

  ngOnInit(): void {
    if (!this.label && this.labelName) {
      this.labelSub = this.apiService.getLabels()
        .subscribe((labels: Label[]) => {
          this.label = labels.find((label: Label) => label.name === this.labelName);
        });
    }

  }

  onSelect() {
    this.selectedLabel.emit(true);
  }

  onDeSelect() {
    this.selectedLabel.emit(false);
  }

}
