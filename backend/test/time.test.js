const { getTime } = require('../../utils/time');

describe('Time Utils', () => {
  describe('getTime', () => {
    it('should return a valid Symbiond game progression time.', () => {
      const currentTime = getTime();
      const [hours, minutes, seconds] = currentTime.split(':');

      // assert currentTime has correct format HH:MM:SS
      expect(currentTime).toMatch(/\d{2}:\d{2}:\d{2}/);
      // hours must fall between 0 and 27
      expect(Number(hours)).toBeGreaterThanOrEqual(0);
      expect(Number(hours)).toBeLessThan(27);
      // minutes must fall between 0 and 60
      expect(Number(minutes)).toBeGreaterThanOrEqual(0);
      expect(Number(minutes)).toBeLessThan(60);
      // seconds must fall between 0 and 60
      expect(Number(seconds)).toBeGreaterThanOrEqual(0);
      expect(Number(seconds)).toBeLessThan(60);
    });
  });
});