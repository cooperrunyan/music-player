import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import set from './setList';

@Injectable({
  providedIn: 'root',
})
export class MediaControllerService {
  constructor() {}

  public setList = set;
  public current = 0;
  public updater = new Subject<typeof this.setList[number]>();

  getCurrentSong() {
    return this.setList[this.current];
  }

  next() {
    if (this.setList[this.current + 1]) this.current += 1;
    else this.current = 0;

    this.updater.next(this.setList[this.current]);
  }

  last() {
    if (this.setList[this.current - 1]) this.current -= 1;
    else this.current = this.setList.length - 1;

    this.updater.next(this.setList[this.current]);
  }
}