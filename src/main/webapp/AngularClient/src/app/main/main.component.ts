import {Component, Injectable, OnInit} from '@angular/core';
import {HitService} from "../_services/hit.service";
import {HitResponse} from "../model/HitResponse";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SvgGraphComponent} from "../svg-graph/svg-graph.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    SvgGraphComponent,
    NgForOf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less'
})
@Injectable({
  providedIn: 'root'
})
export class MainComponent implements OnInit {
  validators = [Validators.required, Validators.min(-5), Validators.max(3), Validators.pattern(/^-?\d*(\.\d+)?$/)];
  form = new FormGroup({
    x: new FormControl(null, Validators.compose(this.validators)),
    y: new FormControl(null, Validators.compose(this.validators)),
    r: new FormControl(null, Validators.compose(this.validators)),
  });

  hasSubmittingError = false;
  errorMessage = '';
  hitList: BehaviorSubject<HitResponse[]> = new BehaviorSubject<HitResponse[]>([]);

  constructor(private hitService: HitService) {
  }

  ngOnInit(): void {
    this.hitService.getHits().subscribe({
      next: response => {
        console.log('Hits received successfully:', response);
        this.hitList.next(response.reverse());
      },
      error: err => {
        console.error('Error getting hits:', err);
      }
    });
  }

  onSubmit(): void {
    const xValue = this.form.get('x')?.value ?? 0;
    const yValue = this.form.get('y')?.value ?? 0;
    const rValue = this.form.get('r')?.value ?? 0;
    this.submitWithVariables(xValue, yValue, rValue);
  }

  submitWithVariables(xValue: number, yValue: number, rValue: number) {
    console.log('Submitting hit:', xValue, yValue, rValue);
    this.hitService.postHit(xValue, yValue, rValue).subscribe({
      next: response => {
        console.log('Hit posted successfully:', response);

        const currentList = this.hitList.value.slice();
        currentList.unshift(response);
        this.hitList.next(currentList);

        this.hasSubmittingError = false;
      },
      error: err => {
        console.error('Error posting hit:', err);
        this.errorMessage = err.error.message;
        this.hasSubmittingError = true;
      }
    });

  }

  clearTable(): void {
    this.hitService.deleteHits().subscribe({
      next: () => {
        console.log('Hits cleared successfully');
        this.hitList.next([]);
      },
      error: err => {
        console.error('Error clearing hits:', err);
      }
    });
  }

}
