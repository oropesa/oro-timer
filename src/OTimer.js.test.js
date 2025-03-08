const { performance } = require('perf_hooks');

const { OTimer } = require('./');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('js OTimer', () => {
  describe('init OTimer', () => {
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

  describe('oTimer.step', () => {
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
  });
});
