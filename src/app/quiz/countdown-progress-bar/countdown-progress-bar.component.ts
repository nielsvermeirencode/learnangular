import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-countdown-progress-bar',
  templateUrl: './countdown-progress-bar.component.html',
  styleUrls: ['./countdown-progress-bar.component.less']
})
export class CountdownProgressBarComponent implements OnInit, OnDestroy {

  @Input()
  time: number;
  maxTime: number;
  @Output()
  nextQuestion = new EventEmitter();
  subscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    this.maxTime = this.time;
    this.subscription = interval(1000).subscribe(() => {
      this.updateTime();
      this.resetTimer();
    });
  }

  updateTime() {
    this.time --;
    if (this.time >= 0) { return; }
    this.nextQuestion.emit();
  }

  resetTimer() {
    this.time = this.maxTime;
  }

  stopTimer() {
    this.time = 0;
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
