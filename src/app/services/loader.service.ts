import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  getLoader(): BehaviorSubject<boolean> {
    return this.loader;
  }
  isLoading(isLoading: boolean): void {
    if (isLoading) {
      this.loader.next(true);
    } else {
      this.loader.next(false);
    }
  }
}
