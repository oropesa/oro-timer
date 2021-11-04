const { performance } = require( 'perf_hooks' );

class OroTimer {
    #timerSteps;

    constructor( label = '' ) { this.start( label ); }

    start( label = '' ) { this.#timerSteps = [ { label, tick: performance.now() } ]; }

    step( label = '' ) { this.#timerSteps.push( { label, tick: performance.now() } ); }

    getPerformance() { return this.#timerSteps; }

    getTimes( args =  {} ) {
        let doStep = args.doStep !== undefined ? args.doStep : true;
        let addTotal = args.addTotal !== undefined ? args.addTotal : true;

        doStep && this.step();
        if( this.#timerSteps.length < 2 ) {
            return [];
        }

        let times = [];
        for( let i = 0, leni = this.#timerSteps.length - 1; i < leni; i++ ) {
            times.push( {
                label: this.#timerSteps[ i ].label,
                time: (this.#timerSteps[ i + 1 ].tick - this.#timerSteps[ i ].tick) / 1000,
                progress: (this.#timerSteps[ i + 1 ].tick - this.#timerSteps[ 0 ].tick) / 1000
            } );
        }

        addTotal && times.push( {
            label: 'total',
            time: (this.#timerSteps[ this.#timerSteps.length - 1 ].tick - this.#timerSteps[ 0 ].tick) / 1000
        } );

        return times;
    }
}

module.exports = OroTimer;