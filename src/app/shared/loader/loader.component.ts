import { LoaderService } from './../../services/loader.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading: boolean;

  loaderSub: Subscription;

  constructor(private loader: LoaderService) {
  }

  ngOnDestroy(): void {
    this.loaderSub.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loaderSub = this.loader.getLoader().subscribe(state => this.isLoading = state);
  }

}
