import { performance } from 'node:perf_hooks';

import type { OTimerGetTimesArgs, OTimerStep, OTimerTick } from './OTimer.types';

export class OTimer {
  #ticks: OTimerTick[];

  total: OTimerStep;

  public constructor(label = '') {
    this.#ticks = [];
    this.total = { label: 'total', seconds: '0.00', time: 0, progress: 0 };
    this.start(label);
  }

  public start(label = '') {
    this.#ticks = [{ label: label === null ? '' : label.toString(), tick: performance.now() }];
    this.total = { label: 'total', seconds: '0.00', time: 0, progress: 0 };
  }

  public step(label = '') {
    this.#ticks.push({ label: label === null ? '' : label.toString(), tick: performance.now() });
    const time = (this.#ticks[this.#ticks.length - 1].tick - this.#ticks[0].tick) / 1000;
    this.total = { label: 'total', seconds: Math.max(0.01, time).toFixed(2), time, progress: time };
  }

  public getPerformance() {
    return this.#ticks;
  }

  public getTimes(args: OTimerGetTimesArgs = {}): OTimerStep[] {
    const props = typeof args !== 'object' || args === null ? {} : args;
    const label = props.label === undefined ? 'end' : props.label.toString();
    const doStep = props.doStep === undefined ? true : !!props.doStep;
    const addTotal = props.addTotal === undefined ? true : !!props.addTotal;

    if (doStep) {
      this.step(label);
    }

    if (this.#ticks.length < 2) {
      return [];
    }

    const times: OTimerStep[] = [];
    for (let index = 0, length = this.#ticks.length - 1; index < length; index++) {
      times.push({
        label: this.#ticks[index].label,
        seconds: Math.max(0.01, (this.#ticks[index + 1].tick - this.#ticks[index].tick) / 1000).toFixed(2),
        time: (this.#ticks[index + 1].tick - this.#ticks[index].tick) / 1000,
        progress: (this.#ticks[index + 1].tick - this.#ticks[0].tick) / 1000,
      });
    }

    if (addTotal) {
      times.push({
        label: 'total',
        seconds: Math.max(0.01, times[times.length - 1].progress).toFixed(2),
        time: times[times.length - 1].progress,
        progress: times[times.length - 1].progress,
      });
    }

    return times;
  }
}

export default OTimer;
