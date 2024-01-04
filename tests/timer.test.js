const { OTimer } = require('../dist');
const { performance } = require('perf_hooks');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('init OTimer', () => {
  test('new OTimer( undefined )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer();
    const timeAfter = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(1);
    expect(objPerformance[0].label).toBe('');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
  });

  test('new OTimer( label )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer('start');
    const timeAfter = performance.now();
    const times = oTimer.getTimes();
    const timeEnd = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(2);
    expect(objPerformance[0].label).toBe('start');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
    expect(objPerformance[1].label).toBe('end');
    expect(objPerformance[1].tick).toBeGreaterThan(timeAfter);
    expect(objPerformance[1].tick).toBeLessThan(timeEnd);
  });

  test('new OTimer( wrong label number )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer(0);
    const timeAfter = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(1);
    expect(objPerformance[0].label).toBe('0');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
  });

  test('new OTimer( wrong label null )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer(null);
    const timeAfter = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(1);
    expect(objPerformance[0].label).toBe('');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
  });

  test('new OTimer( wrong label bool )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer(false);
    const timeAfter = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(1);
    expect(objPerformance[0].label).toBe('false');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
  });

  test('new OTimer( wrong label array )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer([1, 2, 3]);
    const timeAfter = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(1);
    expect(objPerformance[0].label).toBe('1,2,3');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
  });

  test('new OTimer( wrong label object )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer({ status: true });
    const timeAfter = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(1);
    expect(objPerformance[0].label).toBe('[object Object]');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
  });

  test('new OTimer( wrong label fn )', () => {
    const timeBefore = performance.now();
    const oTimer = new OTimer(() => {});
    const timeAfter = performance.now();

    const objPerformance = oTimer.getPerformance();

    expect(Array.isArray(objPerformance)).toBe(true);
    expect(objPerformance.length).toBe(1);
    expect(objPerformance[0].label).toBe('() => {}');
    expect(objPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objPerformance[0].tick).toBeLessThan(timeAfter);
  });
});

describe('oTimer.getTimes', () => {
  test('getTimes()', () => {
    const oTimer = new OTimer();
    const times = oTimer.getTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(2);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeLessThan(0.02);
    expect(times[1].label).toBe('total');
    expect(times[1].time).toBeLessThan(0.02);
    expect(times[0].time).toEqual(times[1].time);
    expect(times[0].progress).toEqual(times[1].time);
  });

  test('getTimes( doStep false )', () => {
    const oTimer = new OTimer('label');
    const times = oTimer.getTimes({ doStep: false });

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(0);
  });

  test('getTimes( doStep true-true ) twice', async () => {
    const oTimer = new OTimer();
    const times1 = oTimer.getTimes();
    await sleep(1000);
    const times2 = oTimer.getTimes();

    expect(Array.isArray(times1)).toBe(true);
    expect(times1.length).toBe(2);
    expect(times1[0].label).toBe('');
    expect(times1[0].time).toBeLessThan(0.02);
    expect(times1[1].label).toBe('total');
    expect(times1[1].time).toBeLessThan(0.02);

    expect(Array.isArray(times2)).toBe(true);
    expect(times2.length).toBe(3);
    expect(times2[0].label).toBe('');
    expect(times2[0].time).toBeLessThan(0.02);
    expect(times2[1].label).toBe('end');
    expect(times2[1].time).toBeGreaterThan(0.99);
    expect(times2[1].time).toBeLessThan(1.02);
    expect(times2[2].label).toBe('total');
    expect(times2[2].time).toBeLessThan(1.02);

    expect(times1[times1.length - 1].time).not.toEqual(times2[times2.length - 1].time);
  });

  test('getTimes( doStep true-false ) twice', async () => {
    const oTimer = new OTimer();
    const times1 = oTimer.getTimes();
    await sleep(1000);
    const times2 = oTimer.getTimes({ doStep: false });

    expect(Array.isArray(times1)).toBe(true);
    expect(times1.length).toBe(2);
    expect(times1[0].label).toBe('');
    expect(times1[0].time).toBeLessThan(0.02);
    expect(times1[1].label).toBe('total');
    expect(times1[1].time).toBeLessThan(0.02);

    expect(Array.isArray(times1)).toBe(true);
    expect(times2.length).toBe(2);
    expect(times2[0].label).toBe('');
    expect(times2[0].time).toBeLessThan(0.02);
    expect(times2[1].label).toBe('total');
    expect(times2[1].time).toBeLessThan(0.02);

    expect(times1[times1.length - 1].time).toEqual(times2[times2.length - 1].time);
  });

  test('getTimes( doStep true, addTotal false )', async () => {
    const oTimer = new OTimer('start');

    await sleep(1000);
    oTimer.step('step');
    await sleep(1000);
    const times = oTimer.getTimes({ addTotal: false });

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(2);
    expect(times[0].label).toBe('start');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
    expect(times[1].label).toBe('step');
    expect(times[1].time).toBeGreaterThan(0.99);
    expect(times[1].time).toBeLessThan(1.02);
  });

  test('getTimes( doStep false, addTotal false )', async () => {
    const oTimer = new OTimer('start');

    await sleep(1000);
    oTimer.step('step');
    await sleep(1000);
    const times = oTimer.getTimes({ doStep: false, addTotal: false });

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(1);
    expect(times[0].label).toBe('start');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
  });

  test('getTimes( wrong args null )', () => {
    const oTimer = new OTimer();
    const times = oTimer.getTimes(null);

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(2);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeLessThan(0.02);
    expect(times[1].label).toBe('total');
    expect(times[1].time).toBeLessThan(0.02);
    expect(times[0].time).toEqual(times[1].time);
    expect(times[0].progress).toEqual(times[1].time);
  });

  test('getTimes( wrong args number )', () => {
    const oTimer = new OTimer();
    const times = oTimer.getTimes(77);

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(2);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeLessThan(0.02);
    expect(times[1].label).toBe('total');
    expect(times[1].time).toBeLessThan(0.02);
    expect(times[0].time).toEqual(times[1].time);
    expect(times[0].progress).toEqual(times[1].time);
  });
});

describe('oTimer.start', () => {
  test('start( undefined )', async () => {
    const oTimer = new OTimer('start');
    await sleep(1000);

    oTimer.start();
    await sleep(1000);
    oTimer.step();
    await sleep(1000);
    const times = oTimer.getTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(3);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
    expect(times[1].label).toBe('');
    expect(times[1].time).toBeGreaterThan(0.99);
    expect(times[1].time).toBeLessThan(1.02);
    expect(times[2].label).toBe('total');
    expect(times[2].time).toBeGreaterThan(1.99);
    expect(times[2].time).toBeLessThan(2.05);

    expect(times[0].progress).toBeLessThan(times[1].progress);
    expect(times[1].progress).toEqual(times[2].time);
  });
});

describe('oTimer.step', () => {
  test('step( undefined )', async () => {
    const oTimer = new OTimer();

    await sleep(1000);
    oTimer.step();
    await sleep(1000);
    const times = oTimer.getTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(3);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
    expect(times[1].label).toBe('');
    expect(times[1].time).toBeGreaterThan(0.99);
    expect(times[1].time).toBeLessThan(1.02);
    expect(times[2].label).toBe('total');
    expect(times[2].time).toBeGreaterThan(1.99);
    expect(times[2].time).toBeLessThan(2.05);

    expect(times[0].progress).toBeLessThan(times[1].progress);
    expect(times[1].progress).toEqual(times[2].time);
  });

  test('step( label null )', async () => {
    const oTimer = new OTimer();

    await sleep(1000);
    oTimer.step(null);
    await sleep(1000);
    const times = oTimer.getTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(3);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
    expect(times[1].label).toBe('');
    expect(times[1].time).toBeGreaterThan(0.99);
    expect(times[1].time).toBeLessThan(1.02);
    expect(times[2].label).toBe('total');
    expect(times[2].time).toBeGreaterThan(1.99);
    expect(times[2].time).toBeLessThan(2.05);

    expect(times[0].progress).toBeLessThan(times[1].progress);
    expect(times[1].progress).toEqual(times[2].time);
  });

  test('step( label )', async () => {
    const oTimer = new OTimer();

    await sleep(1000);
    oTimer.step('chacho');
    await sleep(1000);
    const times = oTimer.getTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(3);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
    expect(times[1].label).toBe('chacho');
    expect(times[1].time).toBeGreaterThan(0.99);
    expect(times[1].time).toBeLessThan(1.02);
    expect(times[2].label).toBe('total');
    expect(times[2].time).toBeGreaterThan(1.99);
    expect(times[2].time).toBeLessThan(2.05);
  });

  test('step( label ) 1-2-1', async () => {
    const oTimer = new OTimer();

    await sleep(1000);
    oTimer.step('chacho');
    await sleep(2000);
    oTimer.step('loco');
    await sleep(1000);
    const times = oTimer.getTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(4);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
    expect(times[0].progress).toBeGreaterThan(0.99);
    expect(times[0].progress).toBeLessThan(1.02);
    expect(times[1].label).toBe('chacho');
    expect(times[1].time).toBeGreaterThan(1.96);
    expect(times[1].time).toBeLessThan(2.02);
    expect(times[1].progress).toBeGreaterThan(2.96);
    expect(times[1].progress).toBeLessThan(3.05);
    expect(times[2].label).toBe('loco');
    expect(times[2].time).toBeGreaterThan(0.96);
    expect(times[2].time).toBeLessThan(1.02);
    expect(times[2].progress).toBeGreaterThan(3.96);
    expect(times[2].progress).toBeLessThan(4.05);
    expect(times[3].label).toBe('total');
    expect(times[3].time).toBeGreaterThan(3.96);
    expect(times[3].time).toBeLessThan(4.05);
    expect(times[3].progress).toBeGreaterThan(3.96);
    expect(times[3].progress).toBeLessThan(4.05);
    expect(times[2].progress).toEqual(times[3].time);
  });
});
