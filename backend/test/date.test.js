const { getDate } = require('../../utils/time');

describe('Time Utils', () => {
  describe('getTime', () => {
    it('should return a valid Symbiond game progression time.', () => {
      const currentDate = getDate();

      expect(currentDate.year).toBeGreaterThanOrEqual(675);
    });
  });
});