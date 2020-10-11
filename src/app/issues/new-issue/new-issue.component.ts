import { Label } from './../../shared/interface/label.interface';
import { DateService } from './../../services/date.service';
import { Issue } from './../../shared/interface/issue.interface';
import { TextEditorService } from './../../services/text-editor.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent {

  addedLabels: Label[] = [];

  constructor(
    private textEditor: TextEditorService,
    private dateService: DateService
  ) { }

  catchLabels(event: Label[]): void {
    this.addedLabels = event;
  }

  submitNewIssue(event: { title: string, comment: string }): void {
    const issue: Issue = {
      title: event.title,
      body: event.comment,
      created_at: this.dateService.getFullDate(),
      labels: this.addedLabels
    };
    this.textEditor.submitNewIssue(issue);
  }

}
