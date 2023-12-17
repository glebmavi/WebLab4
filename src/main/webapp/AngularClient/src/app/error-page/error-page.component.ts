import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.less'
})
export class ErrorPageComponent {

}
