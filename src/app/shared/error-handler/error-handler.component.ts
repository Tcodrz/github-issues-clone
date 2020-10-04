import { ErrorHandlerService, AppError } from './../../services/error-handler.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {

  appError: AppError;

  modalRef: BsModalRef;
  @ViewChild('template') template: ElementRef;

  errorHandlerSub: Subscription;

  constructor(
    private errorHandler: ErrorHandlerService,
    private modalService: BsModalService
  ) { }

  ngOnDestroy(): void {
    this.errorHandlerSub.unsubscribe();
  }

  ngOnInit(): void {
    this.errorHandlerSub = this.errorHandler.getAppError().subscribe((error) => {
      this.appError = error;
      if (this.appError.error) {
        this.openModal();
      }
    });
  }
  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }
  hideModal(): void {
    this.errorHandler.reset();
    this.modalService.hide();
  }

}
