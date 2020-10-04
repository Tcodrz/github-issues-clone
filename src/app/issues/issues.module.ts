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



@NgModule({
  declarations: [IssuesComponent, ListComponent, TopBarComponent, NavigationComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    NavigatorModule
  ]
})
export class IssuesModule { }
