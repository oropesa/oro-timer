export interface OTimerTick {
  label: string;
  tick: number;
}

export interface OTimerStep {
  label: string;
  seconds: string;
  time: number;
  progress: number;
}

export interface OTimerGetTimesArgs {
  label?: string;
  doStep?: boolean;
  addTotal?: boolean;
}
