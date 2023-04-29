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

declare class OTimer {
    constructor( label?: string );

    start( label?: string ): void;

    step( label?: string ): void;

    getPerformance(): OTimerTick[];

    getTimes( args?: OTimerGetTimesArgs ): OTimerStep[];
}

export default OTimer;