import { LoaderComponent } from './loader/loader.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LabelBadgeComponent } from './label-badge/label-badge.component';
import { UrlShortenerPipe } from './pipes/url-shortener.pipe';
import { LabelDropdownComponent } from './label-dropdown/label-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelFilterPipe } from './pipes/label-filter.pipe';
import { FormsModule } from '@angular/forms';
import { SortPipe } from './pipes/sort.pipe';
import { IssueStatePipe } from './pipes/issue-state.pipe';
import { IssuesFilterPipe } from './pipes/issues-filter.pipe';
import { TextEditorComponent } from './text-editor/text-editor.component';


@NgModule({
  declarations: [
    DropdownComponent,
    LabelBadgeComponent,
    UrlShortenerPipe,
    LabelDropdownComponent,
    LabelFilterPipe,
    SortPipe,
    IssueStatePipe,
    ErrorHandlerComponent,
    LoaderComponent,
    IssuesFilterPipe,
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    DropdownComponent,
    LabelBadgeComponent,
    LabelDropdownComponent,
    UrlShortenerPipe,
    LabelFilterPipe,
    SortPipe,
    IssueStatePipe,
    ErrorHandlerComponent,
    LoaderComponent,
    IssuesFilterPipe,
    TextEditorComponent
  ]
})
export class SharedModule { }
