import { performance } from 'node:perf_hooks';

import { OTimer } from './';
import type { OTimerStep, OTimerTick } from './OTimer.types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('ts OTimer', () => {
  describe('init OTimer', () => {
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

      expect(oTimer.total.seconds).toBe('0.00');
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

      // NOTE: The correct value is 0.00, but the min allowed value is 0.01
      expect(oTimer.total.seconds).toBe('0.01');
    });
  });

  describe('oTimer.getTimes', () => {
    test('getTimes()', () => {
      const oTimer: OTimer = new OTimer();
      const times: OTimerStep[] = oTimer.getTimes();

      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBe(2);
      expect(times[0].label).toBe('');
      expect(times[0].time).toBeLessThan(0.02);
      expect(times[0].seconds).toBe('0.01');
      expect(times[1].label).toBe('total');
      expect(times[1].time).toBeLessThan(0.02);
      expect(times[1].seconds).toBe('0.01');

      expect(times[0].time).toEqual(times[1].time);
      expect(times[0].progress).toEqual(times[1].time);

      expect(oTimer.total.seconds).toBe('0.01');
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
      expect(times[0].seconds).toBe('0.01');
      expect(times[1].label).toBe('total');
      expect(times[1].time).toBeLessThan(0.02);
      expect(times[1].seconds).toBe('0.01');

      expect(times[0].time).toEqual(times[1].time);
      expect(times[0].progress).toEqual(times[1].time);

      expect(oTimer.total.seconds).toBe('0.01');
    });

    test('getTimes( doStep false )', () => {
      const oTimer: OTimer = new OTimer('label');
      const times: OTimerStep[] = oTimer.getTimes({ doStep: false });

      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBe(0);

      expect(oTimer.total.seconds).toBe('0.00');
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
      expect(times1[0].seconds).toBe('0.01');
      expect(times1[1].label).toBe('total');
      expect(times1[1].time).toBeLessThan(0.02);
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times2[1].seconds);

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
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(oTimer.total.seconds);
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
      expect(times1[0].seconds).toBe('0.01');
      expect(times1[1].label).toBe('total');
      expect(times1[1].time).toBeLessThan(0.02);
      expect(times1[1].seconds).toBe('0.01');

      expect(Array.isArray(times1)).toBe(true);
      expect(times2.length).toBe(2);
      expect(times2[0].label).toBe('');
      expect(times2[0].time).toBeLessThan(0.02);
      expect(times2[0].seconds).toBe('0.01');
      expect(times2[1].label).toBe('total');
      expect(times2[1].time).toBeLessThan(0.02);
      expect(times2[0].seconds).toBe('0.01');

      expect(times1.at(-1)!.time).toEqual(times2.at(-1)!.time);
      expect(oTimer.total.seconds).toBe('0.01');
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
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[0].seconds);
      expect(times[1].label).toBe('step');
      expect(times[1].time).toBeGreaterThan(0.99);
      expect(times[1].time).toBeLessThan(1.02);
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[1].seconds);

      expect(['2.00', '2.01', '2.02', '2.02', '2.03']).toContain(oTimer.total.seconds);
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
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[0].seconds);

      expect(['0.99', '1.00', '1.01', '1.02']).toContain(oTimer.total.seconds);
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
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[0].seconds);
      expect(times[1].label).toBe('');
      expect(times[1].time).toBeGreaterThan(0.99);
      expect(times[1].time).toBeLessThan(1.02);
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[1].seconds);
      expect(times[2].label).toBe('total');
      expect(times[2].time).toBeGreaterThan(1.99);
      expect(times[2].time).toBeLessThan(2.05);
      expect(['2.00', '2.01', '2.02', '2.03', '2.04', '2.05']).toContain(times[2].seconds);

      expect(times[0].progress).toBeLessThan(times[1].progress);
      expect(times[1].progress).toEqual(times[2].time);
      expect(['2.00', '2.01', '2.02', '2.03', '2.04', '2.05']).toContain(oTimer.total.seconds);
    });
  });

  describe('oTimer.step', () => {
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
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[0].seconds);
      expect(times[1].label).toBe('');
      expect(times[1].time).toBeGreaterThan(0.99);
      expect(times[1].time).toBeLessThan(1.02);
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[1].seconds);
      expect(times[2].label).toBe('total');
      expect(times[2].time).toBeGreaterThan(1.99);
      expect(times[2].time).toBeLessThan(2.05);
      expect(['2.00', '2.01', '2.02', '2.03', '2.04', '2.05']).toContain(times[2].seconds);

      expect(times[0].progress).toBeLessThan(times[1].progress);
      expect(times[1].progress).toEqual(times[2].time);
      expect(['2.00', '2.01', '2.02', '2.03', '2.04', '2.05']).toContain(oTimer.total.seconds);
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
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[0].seconds);
      expect(times[1].label).toBe('chacho');
      expect(times[1].time).toBeGreaterThan(0.99);
      expect(times[1].time).toBeLessThan(1.02);
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[1].seconds);
      expect(times[2].label).toBe('total');
      expect(times[2].time).toBeGreaterThan(1.99);
      expect(times[2].time).toBeLessThan(2.05);
      expect(['2.00', '2.01', '2.02', '2.03', '2.04', '2.05']).toContain(times[2].seconds);

      expect(['2.00', '2.01', '2.02', '2.03', '2.04', '2.05']).toContain(oTimer.total.seconds);
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
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[0].seconds);
      expect(times[0].progress).toBeGreaterThan(0.99);
      expect(times[0].progress).toBeLessThan(1.02);
      expect(times[1].label).toBe('chacho');
      expect(times[1].time).toBeGreaterThan(1.96);
      expect(times[1].time).toBeLessThan(2.02);
      expect(['1.99', '2.00', '2.01', '2.02']).toContain(times[1].seconds);
      expect(times[1].progress).toBeGreaterThan(2.96);
      expect(times[1].progress).toBeLessThan(3.05);
      expect(times[2].label).toBe('loco');
      expect(times[2].time).toBeGreaterThan(0.96);
      expect(times[2].time).toBeLessThan(1.02);
      expect(['0.99', '1.00', '1.01', '1.02']).toContain(times[2].seconds);
      expect(times[2].progress).toBeGreaterThan(3.96);
      expect(times[2].progress).toBeLessThan(4.05);
      expect(times[3].label).toBe('total');
      expect(times[3].time).toBeGreaterThan(3.96);
      expect(times[3].time).toBeLessThan(4.05);
      expect(['3.98', '3.99', '4.00', '4.01', '4.02', '4.03', '4.04', '4.05']).toContain(times[3].seconds);
      expect(times[3].progress).toBeGreaterThan(3.96);
      expect(times[3].progress).toBeLessThan(4.05);
      expect(times[2].progress).toEqual(times[3].time);

      expect(['3.98', '3.99', '4.00', '4.01', '4.02', '4.03', '4.04', '4.05']).toContain(oTimer.total.seconds);
    });
  });
});
