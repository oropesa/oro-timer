const OTimer = require( '../index' );
const { performance } = require( 'perf_hooks' );

function sleep( ms ) {
    return new Promise( resolve => setTimeout( resolve, ms ) );
}

function fnType( obj ) {
    return ({}).toString.call( obj ).match( /\s([a-zA-Z]+)/ )[ 1 ].toLowerCase();
}

describe('init OTimer', () => {
    test( 'new OTimer( undefined )' , () => {
        let timeBefore = performance.now();
        let oTimer = new OTimer();
        let timeAfter = performance.now();

        let objPerformance = oTimer.getPerformance();

        expect( fnType( objPerformance ) ).toBe( 'array' );
        expect( objPerformance.length ).toBe( 1 );
        expect( objPerformance[ 0 ].label ).toBe( '' );
        expect( objPerformance[ 0 ].tick  ).toBeGreaterThan( timeBefore );
        expect( objPerformance[ 0 ].tick  ).toBeLessThan( timeAfter );
    } );

    test( 'new OTimer( label )' , () => {
        let timeBefore = performance.now();
        let oTimer = new OTimer( 'start' );
        let timeAfter = performance.now();

        let objPerformance = oTimer.getPerformance();

        expect( fnType( objPerformance ) ).toBe( 'array' );
        expect( objPerformance.length ).toBe( 1 );
        expect( objPerformance[ 0 ].label ).toBe( 'start' );
        expect( objPerformance[ 0 ].tick  ).toBeGreaterThan( timeBefore );
        expect( objPerformance[ 0 ].tick  ).toBeLessThan( timeAfter );
    } );
});

describe('oTimer.getTimes', () => {
    test( 'getTimes()' , () => {
        let oTimer = new OTimer();
        let times = oTimer.getTimes();

        expect( fnType( times ) ).toBe( 'array' );
        expect( times.length ).toBe( 2 );
        expect( times[ 0 ].label ).toBe( '' );
        expect( times[ 0 ].time  ).toBeLessThan( 0.001 );
        expect( times[ 1 ].label ).toBe( 'total' );
        expect( times[ 1 ].time  ).toBeLessThan( 0.001 );
        expect( times[ 0 ].time  ).toEqual( times[ 1 ].time );
    } );

    test( 'getTimes( doStep false )' , () => {
        let oTimer = new OTimer( 'label' );
        let times = oTimer.getTimes( { doStep: false } );

        expect( fnType( times ) ).toBe( 'array' );
        expect( times.length ).toBe( 0 );
    } );

    test( 'getTimes( doStep true-true ) twice' , async () => {
        let oTimer = new OTimer();
        let times1 = oTimer.getTimes();
        await sleep( 1000 );
        let times2 = oTimer.getTimes();

        expect( fnType( times1 ) ).toBe( 'array' );
        expect( times1.length ).toBe( 2 );
        expect( times1[ 0 ].label ).toBe( '' );
        expect( times1[ 0 ].time  ).toBeLessThan( 0.001 );
        expect( times1[ 1 ].label ).toBe( 'total' );
        expect( times1[ 1 ].time  ).toBeLessThan( 0.001 );
        //expect( times1[ 0 ].time  ).toEqual( times2[ 1 ].time );

        expect( fnType( times2 ) ).toBe( 'array' );
        expect( times2.length ).toBe( 3 );
        expect( times2[ 0 ].label ).toBe( '' );
        expect( times2[ 0 ].time  ).toBeLessThan( 0.001 );
        expect( times2[ 1 ].label ).toBe( '' );
        expect( times2[ 1 ].time  ).toBeGreaterThan( 1.000 );
        expect( times2[ 1 ].time  ).toBeLessThan( 1.02 );
        expect( times2[ 2 ].label ).toBe( 'total' );
        expect( times2[ 2 ].time  ).toBeLessThan( 1.02 );
    } );

    test( 'getTimes( doStep true-false ) twice' , async () => {
        let oTimer = new OTimer();
        let times1 = oTimer.getTimes();
        await sleep( 1000 );
        let times2 = oTimer.getTimes( { doStep: false } );

        expect( fnType( times1 ) ).toBe( 'array' );
        expect( times1.length ).toBe( 2 );
        expect( times1[ 0 ].label ).toBe( '' );
        expect( times1[ 0 ].time  ).toBeLessThan( 0.001 );
        expect( times1[ 1 ].label ).toBe( 'total' );
        expect( times1[ 1 ].time  ).toBeLessThan( 0.001 );

        expect( fnType( times1 ) ).toBe( 'array' );
        expect( times2.length ).toBe( 2 );
        expect( times2[ 0 ].label ).toBe( '' );
        expect( times2[ 0 ].time  ).toBeLessThan( 0.001 );
        expect( times2[ 1 ].label ).toBe( 'total' );
        expect( times2[ 1 ].time  ).toBeLessThan( 0.001 );
    } );

    test( 'getTimes( doStep true, addTotal false )' , async () => {
        let oTimer = new OTimer();

        await sleep( 1000 );
        oTimer.step();
        await sleep( 1000 );
        let times = oTimer.getTimes( { addTotal: false } );

        expect( fnType( times ) ).toBe( 'array' );
        expect( times.length ).toBe( 2 );
        expect( times[ 0 ].label ).toBe( '' );
        expect( times[ 0 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 0 ].time  ).toBeLessThan( 1.02 );
        expect( times[ 1 ].label ).toBe( '' );
        expect( times[ 1 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 1 ].time  ).toBeLessThan( 1.02 );
    } );

    test( 'getTimes( doStep false, addTotal false )' , async () => {
        let oTimer = new OTimer();

        await sleep( 1000 );
        oTimer.step();
        await sleep( 1000 );
        let times = oTimer.getTimes( { doStep: false, addTotal: false } );

        expect( fnType( times ) ).toBe( 'array' );
        expect( times.length ).toBe( 1 );
        expect( times[ 0 ].label ).toBe( '' );
        expect( times[ 0 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 0 ].time  ).toBeLessThan( 1.02 );
    } );
});

describe('oTimer.step', () => {

    test( 'step( undefined )' , async () => {
        let oTimer = new OTimer();

        await sleep( 1000 );
        oTimer.step();
        await sleep( 1000 );
        let times = oTimer.getTimes();

        expect( fnType( times ) ).toBe( 'array' );
        expect( times.length ).toBe( 3 );
        expect( times[ 0 ].label ).toBe( '' );
        expect( times[ 0 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 0 ].time  ).toBeLessThan( 1.02 );
        expect( times[ 1 ].label ).toBe( '' );
        expect( times[ 1 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 1 ].time  ).toBeLessThan( 1.02 );
        expect( times[ 2 ].label ).toBe( 'total' );
        expect( times[ 2 ].time  ).toBeGreaterThan( 1.99 );
        expect( times[ 2 ].time  ).toBeLessThan( 2.05 );
    } );

    test( 'step( label )' , async () => {
        let oTimer = new OTimer();

        await sleep( 1000 );
        oTimer.step( 'chacho' );
        await sleep( 1000 );
        let times = oTimer.getTimes();

        expect( fnType( times ) ).toBe( 'array' );
        expect( times.length ).toBe( 3 );
        expect( times[ 0 ].label ).toBe( '' );
        expect( times[ 0 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 0 ].time  ).toBeLessThan( 1.02 );
        expect( times[ 1 ].label ).toBe( 'chacho' );
        expect( times[ 1 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 1 ].time  ).toBeLessThan( 1.02 );
        expect( times[ 2 ].label ).toBe( 'total' );
        expect( times[ 2 ].time  ).toBeGreaterThan( 1.99 );
        expect( times[ 2 ].time  ).toBeLessThan( 2.05 );
    } );

    test( 'step( label ) 1-2-1' , async () => {
        let oTimer = new OTimer();

        await sleep( 1000 );
        oTimer.step( 'chacho' );
        await sleep( 2000 );
        oTimer.step( 'loco' );
        await sleep( 1000 );
        let times = oTimer.getTimes();

        expect( fnType( times ) ).toBe( 'array' );
        expect( times.length ).toBe( 4 );
        expect( times[ 0 ].label ).toBe( '' );
        expect( times[ 0 ].time  ).toBeGreaterThan( 0.99 );
        expect( times[ 0 ].time  ).toBeLessThan( 1.02 );
        expect( times[ 0 ].progress  ).toBeGreaterThan( 0.99 );
        expect( times[ 0 ].progress  ).toBeLessThan( 1.02 );
        expect( times[ 1 ].label ).toBe( 'chacho' );
        expect( times[ 1 ].time  ).toBeGreaterThan( 1.96 );
        expect( times[ 1 ].time  ).toBeLessThan( 2.02 )
        expect( times[ 1 ].progress  ).toBeGreaterThan( 2.96 );
        expect( times[ 1 ].progress  ).toBeLessThan( 3.05 );
        expect( times[ 2 ].label ).toBe( 'loco' );
        expect( times[ 2 ].time  ).toBeGreaterThan( 0.96 );
        expect( times[ 2 ].time  ).toBeLessThan( 1.02 );
        expect( times[ 2 ].progress  ).toBeGreaterThan( 3.96 );
        expect( times[ 2 ].progress  ).toBeLessThan( 4.05 );
        expect( times[ 3 ].label ).toBe( 'total' );
        expect( times[ 3 ].time  ).toBeGreaterThan( 3.96 );
        expect( times[ 3 ].time  ).toBeLessThan( 4.05 );
        expect( times[ 3 ].progress  ).toBe( undefined );
        expect( times[ 3 ].progress  ).toBe( undefined );
    } );

});