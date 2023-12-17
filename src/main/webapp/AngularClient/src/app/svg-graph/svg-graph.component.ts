import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MainComponent} from "../main/main.component";
import {HitResponse} from "../model/HitResponse";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-svg-graph',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './graph.html',
  styleUrl: './svg-graph.component.less'
})
export class SvgGraphComponent implements OnInit, AfterViewInit{
  svgForm = new FormGroup({
    x: new FormControl(0, Validators.compose(
      [Validators.required, Validators.min(-5), Validators.max(3)])),
    y: new FormControl(0, Validators.compose(
      [Validators.required, Validators.min(-5), Validators.max(3)])),
  });
  svgHeight = '35%';
  svgWidth = '35%';
  width = 0;
  height = 0;

  textXValue = "X= ";
  textYValue = "Y= ";
  textRValue = "";

  rText = "R";
  rHalfText = "R/2";
  minusRHalfText = "-R/2";
  minusRText = "-R";
  currentR = 0;

  pointsToDraw: HitResponse[] = [];

  constructor(private mainComponent: MainComponent) {}

  @ViewChild('svgGraph') svgGraph!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.setSvgDimensions();
  }

  setSvgDimensions(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.width < 717) {
      this.svgHeight = '75%';
      this.svgWidth = '75%';
    } else if (this.width < 1195) {
      this.svgHeight = '50%';
      this.svgWidth = '50%';
    } else {
      this.svgHeight = '25%';
      this.svgWidth = '25%';
    }
  }


  ngOnInit(): void {
    this.mainComponent.form.get('r')?.valueChanges.subscribe((rValue) => {
      if (!(rValue === null || rValue === undefined || rValue <= 0 || this.mainComponent.form.get('r')?.invalid)) {
        this.textRValue = "";
        this.currentR = rValue;
        this.updateRsvg(this.currentR);
        this.pointsToDraw = JSON.parse(JSON.stringify(this.mainComponent.hitList.value));
        this.pointsToDraw.forEach((hit) => {
          this.hitToPoint(hit);
        });
      }
    });

    this.mainComponent.hitList.subscribe((hitList) => {
      this.pointsToDraw = JSON.parse(JSON.stringify(hitList));
      if (this.currentR === 0) {
        this.currentR = this.pointsToDraw[0].r;
      }
      this.updateRsvg(this.currentR);
      this.pointsToDraw.forEach((hit) => {
        this.hitToPoint(hit);
      });
    });
  }

  ngAfterViewInit(): void {
    this.setSvgDimensions();
  }

  onSubmit(): void {
    const xValue = this.svgForm.get('x')?.value ?? 0;
    const yValue = this.svgForm.get('y')?.value ?? 0;
    const rValue = this.mainComponent.form.get('r')?.value;
    // @ts-ignore
    if (!(rValue === null || rValue === undefined || rValue <= 0 || this.mainComponent.form.get('r')?.invalid)) {
      this.mainComponent.submitWithVariables(xValue, yValue, rValue);
    }

  }

  onMouseMove(event: MouseEvent) : void {
    let x : number, y : number;
    let r = this.mainComponent.form.get('r')?.value;
    if (!(r === null || r === undefined || r <= 0 || this.mainComponent.form.get('r')?.invalid)) {
      this.width = this.svgGraph.nativeElement.getBoundingClientRect().width;
      this.height = this.svgGraph.nativeElement.getBoundingClientRect().height;
      x = (event.offsetX - (this.width / 2)) / ((this.width * (3 / 10)) / r);
      y = (event.offsetY - (this.height / 2)) / ((this.height * (-3 / 10)) / r);
      this.svgForm.get('x')?.setValue(Number(x.toFixed(3)));
      this.svgForm.get('y')?.setValue(Number(y.toFixed(3)));
      this.textXValue = "X = " + x.toFixed(3);
      this.textYValue = "Y = " + y.toFixed(3);
      this.textRValue = "";
    } else {
      this.textRValue = $localize`R not defined` ;
    }
  }

  updateRsvg(rValue : number) : void {
      this.rText = rValue.toString();
      this.rHalfText = (rValue/2).toString();
      this.minusRHalfText = (-rValue / 2).toString();
      this.minusRText = (-rValue).toString();
  }

  hitToPoint(hit : HitResponse): void {
    let multiplier = 6 / this.currentR;
    hit.x = hit.x * multiplier;
    hit.y = hit.y * -multiplier;
  }


}
