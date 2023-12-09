import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.less'
})
export class StartComponent implements OnInit {

  clockText: string = "";
  locale = document.documentElement.lang;
  ngOnInit() {
    this.clock();
    setInterval(() => this.clock(), 1000);
  }

  clock() {
    const now = new Date();
    this.clockText = now.toLocaleString(this.locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "shortOffset",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

}
