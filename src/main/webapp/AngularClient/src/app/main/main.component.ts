import {Component, OnInit} from '@angular/core';
import {HitService} from "../_services/hit.service";
import {HitResponse} from "../model/HitResponse";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SvgGraphComponent} from "../svg-graph/svg-graph.component";

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
export class MainComponent implements OnInit {
  form = new FormGroup({
    x: new FormControl(null, Validators.compose(
      [Validators.required, Validators.min(-5), Validators.max(3)])),
    y: new FormControl(null, Validators.compose(
      [Validators.required, Validators.min(-5), Validators.max(3)])),
    r: new FormControl(null, Validators.compose(
      [Validators.required, Validators.min(-5), Validators.max(3)]))
  });

  hasSubmittingError = false;
  errorMessage = '';
  hitList: HitResponse[] = [];

  constructor(private hitService: HitService) {
  }

  ngOnInit(): void {
    this.hitService.getHits().subscribe({
      next: response => {
        console.log('Hits received successfully:', response);
        this.hitList = response;
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
    console.log('Submitting hit:', xValue, yValue, rValue);
    this.hitService.postHit(xValue, yValue, rValue).subscribe({
      next: response => {
        console.log('Hit posted successfully:', response);
        this.hitList.push(response);
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
        this.hitList = [];
      },
      error: err => {
        console.error('Error clearing hits:', err);
      }
    });
  }

}
