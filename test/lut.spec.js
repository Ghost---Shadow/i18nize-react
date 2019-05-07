const {
  getUniqueKeyFromFreeText,
  LutManager,
} = require('../src/lut');

describe('lut', () => {
  describe('getUniqueKeyFromFreeText', () => {
    it('should return underscored caps', () => {
      LutManager.clearLut();

      const text = 'This is a free text';
      const expected = 'THIS_IS_A_FREE_TEXT';
      const actual = getUniqueKeyFromFreeText(text);

      expect(expected).toBe(actual);
      expect(LutManager.getLut()).toEqual({
        THIS_IS_A_FREE_TEXT: 'This is a free text',
      });
    });
    it('should not duplicate overwrite keys in case of ambiguity', () => {
      LutManager.clearLut();

      const text1 = 'This is a free text';
      const text2 = 'This is a FREE text';
      const expected1 = 'THIS_IS_A_FREE_TEXT';
      const expected2 = 'THIS_IS_A_FREE_TEXT1';
      const actual1 = getUniqueKeyFromFreeText(text1);
      const actual2 = getUniqueKeyFromFreeText(text2);

      expect(expected1).toBe(actual1);
      expect(expected2).toBe(actual2);
      expect(LutManager.getLut()).toEqual({
        THIS_IS_A_FREE_TEXT: 'This is a free text',
        THIS_IS_A_FREE_TEXT1: 'This is a FREE text',
      });
    });
    it('should not duplicate keys if value is same', () => {
      LutManager.clearLut();

      const text1 = 'This is a free text';
      const text2 = 'This is a free text';
      const expected1 = 'THIS_IS_A_FREE_TEXT';
      const expected2 = 'THIS_IS_A_FREE_TEXT';
      const actual1 = getUniqueKeyFromFreeText(text1);
      const actual2 = getUniqueKeyFromFreeText(text2);

      expect(expected1).toBe(actual1);
      expect(expected2).toBe(actual2);
      expect(LutManager.getLut()).toEqual({
        THIS_IS_A_FREE_TEXT: 'This is a free text',
      });
    });
    it('should adhere to the max length', () => {
      LutManager.clearLut();
      LutManager.setMaxLength(5);

      const text = 'This is a free text';
      const expected = 'THIS'; // Note: No trailing _
      const actual = getUniqueKeyFromFreeText(text);

      expect(expected).toBe(actual);
      expect(LutManager.getLut()).toEqual({
        THIS: 'This is a free text',
      });
      LutManager.clearMaxLength();
    });
    it('should clean non letter characters', () => {
      LutManager.clearLut();

      expect(getUniqueKeyFromFreeText('hello, to you')).toBe('HELLO_TO_YOU');
      expect(getUniqueKeyFromFreeText('so     much     spaaaace')).toBe('SO_MUCH_SPAAAACE');
      expect(getUniqueKeyFromFreeText('hello...')).toBe('HELLO');
    });
  });
});
