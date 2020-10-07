import { AppRoutingModule } from './../app-routing.module';
import { NavigatorModule } from './../navigator/navigator.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './issues/issues.component';
import { ListComponent } from './list/list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NavigationComponent } from './navigation/navigation.component';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { IssueInfoComponent } from './issue-info/issue-info.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IssuesComponent,
    ListComponent,
    TopBarComponent,
    NavigationComponent,
    NewIssueComponent,
    SideBarComponent,
    IssueInfoComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    NavigatorModule,
    FormsModule
  ]
})
export class IssuesModule { }
