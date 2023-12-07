export class HitResponse {
  id : number;
  x : number;
  y : number;
  r : number;
  currDate : Date;
  execTime : number;
  hit : boolean;
  constructor() {
    this.id = 0;
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.currDate = new Date();
    this.execTime = 0;
    this.hit = false;
  }
}
