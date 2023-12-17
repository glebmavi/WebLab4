import {Component, HostListener, OnInit} from '@angular/core';

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
  width = 0;
  clockFont = 'font-size:80px;';

  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.setClockDimensions();
  }
  ngOnInit() {
    this.clock();
    setInterval(() => this.clock(), 1000);
  }

  setClockDimensions(): void {
    this.width = window.innerWidth;
    if (this.width < 717) {
      this.clockFont = 'font-size:40px;';
    } else if (this.width < 1195) {
      this.clockFont = 'font-size:60px;';
    } else {
      this.clockFont = 'font-size:80px;';
    }
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
