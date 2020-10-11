import { Label } from './../../shared/interface/label.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() type: string;

  @Output() labels: EventEmitter<Label[]> = new EventEmitter();
  @Output() label: EventEmitter<Label> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleLabelsEvent(labels: Label[]): void {
    this.labels.emit(labels);
  }
  handleLabelEvent(label: Label): void {
    this.label.emit(label);
  }

}
