describe('More Demo Cypress Tests (Always True)', () => {
    it('should always be truthy', () => {
      // This test will always pass because the value is truthy
      expect('Cypress is awesome!').to.be.ok;
    });
  
    it('should always contain a specific text', () => {
      // This test will always pass because the specified text is present
      const text = 'Hello, World!';
      expect(text).to.include('World');
    });
  
    it('should always have a positive length', () => {
      // This test will always pass because the array has a positive length
      const array = [1, 2, 3];
      expect(array).to.have.length.greaterThan(0);
    });
  
    it('should always match a regular expression', () => {
      // This test will always pass because the string matches the regex
      const email = 'example@example.com';
      expect(email).to.match(/^.+@.+\..+$/);
    });
  
    it('should always fulfill a custom condition', () => {
      // This test will always pass because the custom condition is met
      const number = 42;
      expect(number).to.satisfy((n) => n > 0 && n < 100);
    });
  });
  