import { IconService } from './../../services/icon.service';
import { Issue } from './../interface/issue.interface';
import { TextEditorService } from '../../services/text-editor.service';
import { User } from './../interface/user.interface';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  @Input() type: string;
  @Input() issue: Issue;
  @Input() commentEvent: string;

  @Output() comment: EventEmitter<{}> = new EventEmitter();
  @Output() closeIssue: EventEmitter<null> = new EventEmitter();
  @Output() reopenIssue: EventEmitter<null> = new EventEmitter();
  @Output() issueBody: EventEmitter<string> = new EventEmitter();
  @Output() cancel: EventEmitter<null> = new EventEmitter();
  @Output() commentUpdate: EventEmitter<string> = new EventEmitter();

  @ViewChild('frmComment') frmComment: NgForm;

  commentInput = '';
  title = '';

  user: User;

  submitBtnDisabled = true;
  submitCommentDisabled = true;
  issueBodySubmit = false;
  updateCommentBtnDisabled = true;

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
    this.frmComment.reset();
  }

  sendIssueBody(): void {
    this.issueBody.emit(this.issue.body);
  }

  sendCloseIssue(): void {
    this.closeIssue.emit(null);
  }
  sendReopenIssue(): void {
    this.reopenIssue.emit(null);
  }

  handleIssueBodySubmitButton(value: string): void {
    if (value === '') {
      this.issueBodySubmit = true;
    } else {
      this.issueBodySubmit = false;
    }
  }

  handleUpdateCommentButton(): void {
    if (this.commentEvent === '') {
      this.updateCommentBtnDisabled = true;
    } else {
      this.updateCommentBtnDisabled = false;
    }
  }

  sendUpdateComment(): void {
    this.commentUpdate.emit(this.commentEvent);
  }

}
