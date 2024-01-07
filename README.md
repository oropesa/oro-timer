# OroTimer / OTimer

* [Overview](#overview)
* [Installation](#installation)
* [Example](#example)
* [Methods](#methods)

## Overview

OroTimer is a class designed for monitoring code performance. 

It allows you to measure code execution times, which can be segmented into individual steps, each displaying its own timing and progress information.

## Installation

```shell
npm install oro-timer
```

## Example:

```js
// cjs
const { OTimer } = require( 'oro-timer' );

// mjs, ts
import { OTimer } from 'oro-timer';

import type { OTimerTick, OTimerStep, OTimerGetTimesArgs } from 'oro-timer';
```

```ts
const oTimer = new OTimer( 'label-1' );
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
//   { label: 'total'  , time: 6.330074299998299, progress: 6.330074299998299  }
// ]
```

## Methods

<hr>

* [new OTimer()](#new-otimer)
* [oTimer.start()](#otimerstart)
* [oTimer.step()](#otimerstep)
* [oTimer.getTimes()](#otimergettimes)
* [oTimer.getPerformance()](#otimergetperformance)

<hr>

### new OTimer()

```ts
const oTimer = new OTimer( label?: string );
```

When OTimer is initialized `new OTimer()`, time started to run automatically.

_Note:_ Param `label` it's only informative, and it helps to recognize the part of the code that is running.

```js
let oTimer = new OTimer( 'do stuff' );
// ... do some stuff
const times = oTimer.getTimes();

console.log( times );
// [
//   { label: 'do stuff', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'total', time: 3.953849299998954, progress: 3.953849299998954 }
// ]
```

<hr>

### oTimer.start()

```ts
oTimer.start( label?: string ): void;
```

Because OTimer starts running when it's created, timer can be restarted with the method `.start()`.

_Note:_ Param `label` it's only informative, and it helps to recognize the part of the code that is running.

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
//   { label: 'total', time: 3.953849299998954, progress: 3.953849299998954 }
// ]
console.log( times2 );
// [
//   { label: 'do another stuff', time: 1.7613269999995829, progress: 1.7613269999995829 },
//   { label: 'total', time: 1.7613269999995829, progress: 1.7613269999995829 }
// ]
```

<hr>

### oTimer.step()

```ts
oTimer.step( label?: string ): void;
```

You can divide the _code-times_ in separated steps by the method `.step()`.

_Note:_ Param `label` it's only informative, and it helps to recognize the part of the code that is running.

```js
const { OTimer } = require( 'oro-timer' );

let oTimer = new OTimer( 'first action' );
// ...
oTimer.step( 'second action' );
// ...
const times = oTimer.getTimes();

console.log( times );
// [
//   { label: 'first action', time: 3.953849299998954, progress: 3.953849299998954 },
//   { label: 'second action', time: 1.7613269999995829, progress: 5.715176299998537 },
//   { label: 'total', time: 5.715176299998537, progress: 5.715176299998537 }
// ]
```

<hr>

### oTimer.getTimes()

```ts
oTimer.getTimes( args?: OTimerGetTimesArgs ): OTimerStep[];

interface OTimerGetTimesArgs {
   doStep?: boolean;
   addTotal?: boolean;
}

interface OTimerStep {
   label: string;    // custom label
   time: number;     // step seconds
   progress: number; // timer seconds
}
```

Method `.getTimes()` is used to finish the timer and get step-times.
So, by default, it does the last step automatically.

1. **doStep** ( default: true ): 
   
    If you want to get the same `times` again, you must `false` the first param.


2. **addTotal** ( default: true ): 
   
    By default, it adds as last item the `total` of oTimer.<br>
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
//   { label: 'total', time: 5.715176299998537, progress: 5.715176299998537 }
// ]
```

<hr>

### oTimer.getPerformance()

```ts
oTimer.getPerformance(): OTimerTick[];

interface OTimerTick {
   label: string; // custom label
   tick: number;  // timestamp miliseconds
}
```

How OTimer works, each step is saved as _tick_ with `performance.now()`.

With `.getPerformance()` you can get the _millisecond timestamp_ of each _performance-step_, called `tick`.

```js
let oTimer = new OTimer( 'first action' );
// ...
oTimer.step( 'second action' );
// ...
oTimer.step();

const times = oTimer.getPerformance();

console.log( times ); 
// [
//   { label: 'first action', tick: 344.7998000010848 },
//   { label: 'second action', tick: 4298.6491000000388 },
//   { label: 'end', tick: 6059.9760999996217 }
// ]
```
