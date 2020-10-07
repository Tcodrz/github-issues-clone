import { IconService } from './../../services/icon.service';
import { Issue } from './../interface/issue.interface';
import { TextEditorService } from '../../services/text-editor.service';
import { User } from './../interface/user.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  @Input() type: string;
  @Input() issue: Issue;
  
  @Output() comment: EventEmitter<{}> = new EventEmitter();
  @Output() closeIssue: EventEmitter<null> = new EventEmitter();
  @Output() reopenIssue: EventEmitter<null> = new EventEmitter();

  commentInput = '';
  title = '';

  user: User;

  submitBtnDisabled = true;
  submitCommentDisabled = true;

  constructor(
    private textEditor: TextEditorService,
    public iconService: IconService
  ) { }

  ngOnInit(): void {
    this.textEditor.getUser().then((user) => {
      this.user = user;
    });
  }

  disableButtonOnIssue(): void {
    if (this.title !== '') {
      this.submitBtnDisabled = false;
    } else {
      this.submitBtnDisabled = true;
    }
  }
  disableButtonOnComment(): void {
    if (this.commentInput !== '') {
      this.submitCommentDisabled = false;
    } else {
      this.submitCommentDisabled = true;
    }
  }

  sendEvent(): void {
    this.comment.emit({
      title: this.title ? this.title : null,
      comment: this.commentInput
    });
  }

  sendCloseIssue(): void {
    this.closeIssue.emit(null);
  }
  sendReopenIssue(): void {
    this.reopenIssue.emit(null);
  }

}
