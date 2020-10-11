import { IconService } from './../../services/icon.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface DropDownItem {
  type: string;
  name: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  showType = true;
  showSubtitle = true;

  @Input() position: string;

  @Input() type: string;
  subtitle: string;

  @Output() itemSelect: EventEmitter<DropDownItem> = new EventEmitter();

  items: any[] = [];

  selectedItems: DropDownItem[] = [];

  sortItems: DropDownItem[] = [
    {
      type: 'sort',
      name: 'Newest',
      isSelected: true
    },
    {
      type: 'sort',
      name: 'Oldest',
      isSelected: false
    }
  ];

  filterItems: DropDownItem[] = [
    {
      type: 'state',
      name: 'open',
      isSelected: false
    },
    {
      type: 'state',
      name: 'closed',
      isSelected: false
    },
    {
      type: 'state',
      name: 'all',
      isSelected: false
    }
  ];

  markAsItems: DropDownItem[] = [
    {
      type: 'Mark as',
      name: 'open',
      isSelected: false
    },
    {
      type: 'Mark as',
      name: 'closed',
      isSelected: false
    }
  ];
  commentMenuItems: DropDownItem[] = [
    {
      type: 'comment',
      name: 'Edit',
      isSelected: false
    },
    {
      type: 'comment',
      name: 'Delete',
      isSelected: false
    }
  ];

  issueBodyItems: DropDownItem[] = [
    {
      type: 'issue-body',
      name: 'Edit',
      isSelected: false
    }
  ]

  holdDropdown = false;

  constructor(public iconService: IconService) {
  }

  ngOnInit(): void {
    this.subtitle = 'Not implemented';
    if (this.type === 'Sort') {
      this.subtitle = 'Sort by';
      this.items = this.sortItems;
    }
    if (this.type === 'Filters') {
      this.subtitle = 'Filter issues';
      this.items = this.filterItems;
    }
    if (this.type === 'Mark as') {
      this.subtitle = 'Actions';
      this.items = this.markAsItems;
    }
    if (this.type === 'comment-menu') {
      this.subtitle = '';
      this.items = this.commentMenuItems;
      this.showType = false;
      this.showSubtitle = false;
    }
    if (this.type === 'issue-body') {
      this.subtitle = '';
      this.items = this.issueBodyItems;
      this.showType = false;
      this.showSubtitle = false;
    }
  }

  sendEvent(item: DropDownItem): void {
    this.items.forEach(i => i.isSelected = false);
    if (item.type === 'state' || item.type === 'comment' || item.type === 'issue-body') {
      this.itemSelect.emit(item);
      return;
    } else {
      item.isSelected = true;
    }
    this.itemSelect.emit(item);
  }

}
