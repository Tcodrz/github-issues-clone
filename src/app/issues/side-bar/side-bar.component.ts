import { Label } from './../../shared/interface/label.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Output() labels: EventEmitter<Label[]> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleLabelEvent(labels: Label[]): void {
    this.labels.emit(labels);
  }

}
