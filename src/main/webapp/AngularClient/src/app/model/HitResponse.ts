import {HitRequest} from "./HitRequest";

export class HitResponse {
  id : number;
  currDate : Date;
  execTime : number;
  request : HitRequest;
  hit : boolean;
  constructor() {
    this.id = 0;
    this.currDate = new Date();
    this.execTime = 0;
    this.request = new HitRequest();
    this.hit = false;
  }
}
