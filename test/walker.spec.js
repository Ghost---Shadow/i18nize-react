const {
  walk,
  checkIfDirectoryShouldBeIgnored,
  checkIfFileShouldBeIgnored,
} = require('../src/walker');

describe('walker', () => {
  describe('walk', () => {
    it('should return list of all files in directory', () => {
      const allFiles = walk('./test/walking_test');
      expect(allFiles).toMatchSnapshot();
    });
  });
  describe('checkIfDirectoryShouldBeIgnored', () => {
    it('should ignore node_modules', () => {
      expect(checkIfDirectoryShouldBeIgnored('node_modules/blah')).toBeTruthy();
    });
  });
  describe('checkIfFileShouldBeIgnored', () => {
    it('should accept js and jsx files', () => {
      expect(checkIfFileShouldBeIgnored('/asdasd/blah.js')).toBeFalsy();
      expect(checkIfFileShouldBeIgnored('/asdasd/blah.jsx')).toBeFalsy();
      expect(checkIfFileShouldBeIgnored('C:\\Users\\username\\Desktop\\i18ize\\captive-app\\src\\App.js')).toBeFalsy();
    });
    it('should reject all other files', () => {
      expect(checkIfFileShouldBeIgnored('not_a_virus.exe')).toBeTruthy();
    });
  });
});
