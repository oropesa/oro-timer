import { performance } from 'node:perf_hooks';

export interface OTimerTick {
  label: string;
  tick: number;
}

export interface OTimerStep {
  label: string;
  time: number;
  progress: number;
}

export interface OTimerGetTimesArgs {
  doStep?: boolean;
  addTotal?: boolean;
}

export class OTimer {
  #ticks: OTimerTick[];

  public constructor(label = '') {
    this.#ticks = [];
    this.start(label);
  }

  public start(label = '') {
    this.#ticks = [{ label: label === null ? '' : label.toString(), tick: performance.now() }];
  }

  public step(label = '') {
    this.#ticks.push({ label: label === null ? '' : label.toString(), tick: performance.now() });
  }

  public getPerformance() {
    return this.#ticks;
  }

  public getTimes(args: OTimerGetTimesArgs = {}): OTimerStep[] {
    // eslint-disable-next-line no-param-reassign
    (typeof args !== 'object' || args === null) && (args = {});
    const doStep = args.doStep === undefined ? true : !!args.doStep;
    const addTotal = args.addTotal === undefined ? true : !!args.addTotal;

    doStep && this.step('end');
    if (this.#ticks.length < 2) {
      return [];
    }

    const times = [];
    for (let index = 0, length = this.#ticks.length - 1; index < length; index++) {
      times.push({
        label: this.#ticks[index].label,
        time: (this.#ticks[index + 1].tick - this.#ticks[index].tick) / 1000,
        progress: (this.#ticks[index + 1].tick - this.#ticks[0].tick) / 1000,
      });
    }

    addTotal &&
      times.push({
        label: 'total',
        time: times.at(-1)!.progress,
        progress: times.at(-1)!.progress,
      });

    return times;
  }
}

export default OTimer;
