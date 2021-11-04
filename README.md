# OroTimer

OroTimer is a class to check the performance times of the code. The code times can be separated by steps, and each step show the time and progress individually.

```shell
npm install oro-timer
```

Example:
```js
const OTimer = require( 'oro-timer' );

let oTimer = new OTimer( 'label-1' );
// ... long task
oTimer.step( 'label-2' );
// ... short task
oTimer.step( 'label-3' );
// ... medium task
const times = oTimer.getTimes();

console.log( times );
// [
//   { label: 'label-1', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'label-2', time: 0.761326999999582, progress: 4.715176299998536 },
//   { label: 'label-3', time: 1.614897999999763, progress: 6.330074299998299 },
//   { label: 'total'  , time: 6.330074299998299  }
// ]
```

## Methods

### new OTimer( label: string = '' )

When OTimer is initialized, it's started to run.

The param `label` it's only informative and helps you to recognize the part of the code that is running.

```js
const OTimer = require( 'oro-timer' );

let oTimer = new OTimer( 'do stuff' );
// ... do some stuff
const times = oTimer.getTimes();

console.log( times );
// [
//   { label: 'do stuff', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'total', time: 3.953849299998954 }
// ]
```

### oTimer.start( label: string = '' )

Because OTimer starts running in the construct, you can restart the timer with the method `.start()`.

The param `label` it's only informative and helps you to recognize the part of the code that is running.

```js
let oTimer = new OTimer( 'do stuff' );
// ...
const times1 = oTimer.getTimes();

oTimer.start( 'do another stuff' );
// ...
const times2 = oTimer.getTimes();

console.log( times1 );
// [
//   { label: 'do stuff', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'total', time: 3.953849299998954 }
// ]
console.log( times2 );
// [
//   { label: 'do another stuff', time: 1.7613269999995829, progress: 1.7613269999995829 },
//   { label: 'total', time: 1.7613269999995829 }
// ]
```

### oTimer.step( label: string = '' )

You can separate the code-times in separated steps by the method `.step()`.

The param `label` it's only informative and helps you to recognize the part of the code that is running.

```js
const OTimer = require( 'oro-timer' );

let oTimer = new OTimer( 'first action' );
// ...
oTimer.step( 'second action' );
// ...
const times = oTimer.getTimes();

console.log( times );
// [
//   { label: 'first action', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'second action', time: 1.7613269999995829, progress: 5.715176299998537 },
//   { label: 'total', time: 5.715176299998537 }
// ]
```

### oTimer.getPerformance()

Each time you start/step the oTimer, the performance.now() is saved. 

In case you want to know the timestamp of each step, you can use `.getPerformance()`

```js
let oTimer = new OTimer( 'first action' );
// ...
oTimer.step( 'second action' );
// ...
oTimer.step();

const oPerformance = oTimer.getPerformance();

console.log( oPerformance ); 
// [
//   { label: 'first action', tick: 344.7998000010848 },
//   { label: 'second action', tick: 4298.6491000000388 },
//   { label: '', tick: 6059.9760999996217 }
// ]
```

### oTimer.getTimes( { doStep: boolean = true, addTotal: boolean = true } )

The method `.getTimes()` is used to finish the timer and get step-times.
So, by default, it does the last step.

1. **doStep** ( default: true ): 
   
    If you want to get the same `times` again, you must `false` the first param.


2. **addTotal** ( default: true ): 
   
    By default, it adds as last item the `total` of oTimer. 
   
    If you want to avoid this behaviour, just `false` the second param.


```js
let oTimer = new OTimer( 'first action' );
// ...
oTimer.step( 'second action' );
// ...
const times = oTimer.getTimes( { addTotal: false } );
const timesAgain = oTimer.getTimes( { doStep: false } );

console.log( times );
// [
//   { label: 'first action', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'second action', time: 1.7613269999995829, progress: 5.715176299998537 },
// ]
console.log( timesAgain );
// [
//   { label: 'first action', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'second action', time: 1.7613269999995829, progress: 5.715176299998537 },
//   { label: 'total', time: 5.715176299998537 }
// ]
```
