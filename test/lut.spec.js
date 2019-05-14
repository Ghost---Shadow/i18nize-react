const { toMatchFile } = require('jest-file-snapshot');

const {
  getUniqueKeyFromFreeText,
  lutToLanguageCodeHelper,
  randomChineseLutConverter,
  LutManager,
} = require('../src/lut');

expect.extend({ toMatchFile });

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
    it('should not crash if only special characters', () => {
      LutManager.clearLut();

      expect(getUniqueKeyFromFreeText(',')).toBe('_');
      expect(getUniqueKeyFromFreeText('!')).toBe('_1');
      expect(getUniqueKeyFromFreeText('?')).toBe('_2');
    });
    it('should handle numbers gracefully', () => {
      LutManager.clearLut();

      expect(getUniqueKeyFromFreeText('123123131')).toBe('_');
      expect(getUniqueKeyFromFreeText('123123132')).toBe('_1');
      expect(getUniqueKeyFromFreeText('123123133')).toBe('_2');

      expect(getUniqueKeyFromFreeText('12 12 12 21')).toBe('_3');
      expect(getUniqueKeyFromFreeText('12 12 12 21')).toBe('_3');
      expect(getUniqueKeyFromFreeText('12 12 12 21')).toBe('_3');

      expect(getUniqueKeyFromFreeText('#33ffgg')).toBe('FFGG');
      expect(getUniqueKeyFromFreeText('#33ffgg')).toBe('FFGG');
    });
  });
  describe('keys.js', () => {
    it('should generate keys obj from a lut', () => {
      const lut = {
        FIRST_TEXT: 'a',
        SECOND_TEXT: 'b',
      };
      const keys = {
        FIRST_TEXT: 'FIRST_TEXT',
        SECOND_TEXT: 'SECOND_TEXT',
      };
      LutManager.setLut(lut);
      expect(LutManager.getKeys()).toEqual(keys);
    });
  });
  describe('lutToLanguageCodeHelper', () => {
    it('should match file snapshot', () => {
      const lut = {
        A_B_C: 'cde',
        EF_G: 'hij',
        HELLO_WORD: 'Hello words and worlds',
      };
      expect(lutToLanguageCodeHelper(lut)).toMatchFile('./test/__file_snapshots__/english.js');
    });
  });
  describe('randomChineseLutConverter', () => {
    it('should replace all strings in the text with chinese of same length', () => {
      const lut = {
        A_B_C: 'cde',
        EF_G: 'hij',
        HELLO_WORD: 'Hello words and worlds',
      };
      const chineseLut = randomChineseLutConverter(lut);
      Object.keys(lut).forEach((key) => {
        expect(lut[key]).toHaveLength(chineseLut[key].length);
        expect(lut[key]).not.toEqual(chineseLut[key]);
      });
    });
  });
});
