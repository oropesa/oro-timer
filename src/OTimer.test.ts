import { performance } from 'node:perf_hooks';

import { OTimer } from './';
import type { OTimerStep, OTimerTick } from './';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('ts init OTimer', () => {
  test('new OTimer( undefined )', () => {
    const timeBefore: number = performance.now();
    const oTimer: OTimer = new OTimer();
    const timeAfter: number = performance.now();

    const objectPerformance: OTimerTick[] = oTimer.getPerformance();

    expect(Array.isArray(objectPerformance)).toBe(true);
    expect(objectPerformance.length).toBe(1);
    expect(objectPerformance[0].label).toBe('');
    expect(objectPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objectPerformance[0].tick).toBeLessThan(timeAfter);
  });

  test('new OTimer( label )', () => {
    const timeBefore: number = performance.now();
    const oTimer: OTimer = new OTimer('start');
    const timeAfter: number = performance.now();
    oTimer.getTimes();
    const timeEnd = performance.now();

    const objectPerformance: OTimerTick[] = oTimer.getPerformance();

    expect(Array.isArray(objectPerformance)).toBe(true);
    expect(objectPerformance.length).toBe(2);
    expect(objectPerformance[0].label).toBe('start');
    expect(objectPerformance[0].tick).toBeGreaterThan(timeBefore);
    expect(objectPerformance[0].tick).toBeLessThan(timeAfter);
    expect(objectPerformance[1].label).toBe('end');
    expect(objectPerformance[1].tick).toBeGreaterThan(timeAfter);
    expect(objectPerformance[1].tick).toBeLessThan(timeEnd);
  });
});

describe('ts oTimer.getTimes', () => {
  test('getTimes()', () => {
    const oTimer: OTimer = new OTimer();
    const times: OTimerStep[] = oTimer.getTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(2);
    expect(times[0].label).toBe('');
    expect(times[0].time).toBeLessThan(0.02);
    expect(times[1].label).toBe('total');
    expect(times[1].time).toBeLessThan(0.02);
    expect(times[0].time).toEqual(times[1].time);
    expect(times[0].progress).toEqual(times[1].time);
  });

  test('getTimes( label)', () => {
    const oTimer: OTimer = new OTimer();
    const times: OTimerStep[] = oTimer.getTimes({ label: 'finalStep' });

    const objectPerformance: OTimerTick[] = oTimer.getPerformance();

    expect(Array.isArray(objectPerformance)).toBe(true);
    expect(objectPerformance[1].label).toBe('finalStep');

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
    const oTimer: OTimer = new OTimer('label');
    const times: OTimerStep[] = oTimer.getTimes({ doStep: false });

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(0);
  });

  test('getTimes( doStep true-true ) twice', async () => {
    const oTimer: OTimer = new OTimer();
    const times1: OTimerStep[] = oTimer.getTimes();
    await sleep(1000);
    const times2: OTimerStep[] = oTimer.getTimes();

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

    expect(times1.at(-1)!.time).not.toEqual(times2.at(-1)!.time);
  });

  test('getTimes( doStep true-false ) twice', async () => {
    const oTimer: OTimer = new OTimer();
    const times1: OTimerStep[] = oTimer.getTimes();
    await sleep(1000);
    const times2: OTimerStep[] = oTimer.getTimes({ doStep: false });

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

    expect(times1.at(-1)!.time).toEqual(times2.at(-1)!.time);
  });

  test('getTimes( doStep true, addTotal false )', async () => {
    const oTimer: OTimer = new OTimer('start');

    await sleep(1000);
    oTimer.step('step');
    await sleep(1000);
    const times: OTimerStep[] = oTimer.getTimes({ addTotal: false });

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
    const oTimer: OTimer = new OTimer('start');

    await sleep(1000);
    oTimer.step('step');
    await sleep(1000);
    const times: OTimerStep[] = oTimer.getTimes({ doStep: false, addTotal: false });

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBe(1);
    expect(times[0].label).toBe('start');
    expect(times[0].time).toBeGreaterThan(0.99);
    expect(times[0].time).toBeLessThan(1.02);
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

describe('ts oTimer.step', () => {
  test('step( undefined )', async () => {
    const oTimer: OTimer = new OTimer();

    await sleep(1000);
    oTimer.step();
    await sleep(1000);
    const times: OTimerStep[] = oTimer.getTimes();

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
    const oTimer: OTimer = new OTimer();

    await sleep(1000);
    oTimer.step('chacho');
    await sleep(1000);
    const times: OTimerStep[] = oTimer.getTimes();

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
    const oTimer: OTimer = new OTimer();

    await sleep(1000);
    oTimer.step('chacho');
    await sleep(2000);
    oTimer.step('loco');
    await sleep(1000);
    const times: OTimerStep[] = oTimer.getTimes();

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
