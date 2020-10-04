import { ListStateService } from './list-state.service';
import { LabelState } from './../shared/interface/label-state.inteface';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Label } from '../shared/interface/label.interface';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private unlabeled: Label = {
    name: 'unlabeled',
    id: 1,
    color: null,
    isSelected: false
  };

  private labels: Label[] = [];
  private labels$: BehaviorSubject<Label[]> = new BehaviorSubject([]);

  private activeLabels: LabelState;

  constructor(
    private apiService: ApiService,
    private listState: ListStateService
  ) { }

  getLabelsFromApi(): Promise<void> {
    return new Promise((resolve) => {
      this.apiService.getLabels().subscribe((labels) => {
        this.labels = labels;
        this.labels$.next(labels);
        this.labels.forEach(issue => issue['isSelected'] = false);
        this.getActiveLabels();
        resolve();
      });

    });
  }

  getActiveLabels(): void {
    this.listState.getSelectedLabels().subscribe((activeLabels: LabelState) => {
      this.activeLabels = activeLabels;
      this.selectActiveLabels();
    });
  }


  selectActiveLabels(): void {
    this.unSelectAllLabels();
    for (const label in this.activeLabels) {
      if (this.activeLabels[label]) {
        const index = this.labels.findIndex(x => x.name === label);
        if (index >= 0) {
          this.labels[index].isSelected = true;
        }
      }
    }
  }
  addUnlabeled(): void {
    this.labels.unshift(this.unlabeled);
  }

  getAllLabels(): BehaviorSubject<Label[]> {
    return this.labels$;
  }

  unSelectAllLabels(): void {
    this.labels.forEach(x => x.isSelected = false);
    this.labels$.next(this.labels);
  }
  resetActiveLabels(): void { 
    for (const label in this.activeLabels) {
      this.activeLabels[label] = false;
    }
  }

}
