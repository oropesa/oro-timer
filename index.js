const { performance } = require( 'perf_hooks' );

class OTimer {
    #ticks;

    constructor( label = '' ) { this.start( label ); }

    start( label = '' ) {
        label = label === null ? '' : label.toString();
        this.#ticks = [ { label, tick: performance.now() } ];
    }

    step( label = '' ) {
        label = label === null ? '' : label.toString();
        this.#ticks.push( { label, tick: performance.now() } );
    }

    getPerformance() { return this.#ticks; }

    getTimes( args = {} ) {
        (typeof args !== 'object' || args === null) && (args = {});
        let doStep = args.doStep !== undefined ? !! args.doStep : true;
        let addTotal = args.addTotal !== undefined ? !! args.addTotal : true;

        doStep && this.step( 'end' );
        if( this.#ticks.length < 2 ) {
            return [];
        }

        let times = [];
        for( let i = 0, leni = this.#ticks.length - 1; i < leni; i++ ) {
            times.push( {
                label: this.#ticks[ i ].label,
                time: (this.#ticks[ i + 1 ].tick - this.#ticks[ i ].tick) / 1000,
                progress: (this.#ticks[ i + 1 ].tick - this.#ticks[ 0 ].tick) / 1000
            } );
        }

        addTotal && times.push( {
            label: 'total',
            time: times[ times.length - 1 ].progress,
            progress: times[ times.length - 1 ].progress,
        } );

        return times;
    }
}

module.exports = OTimer;