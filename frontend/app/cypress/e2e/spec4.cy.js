describe('Demo Cypress Tests (Always True)', () => {
    it('should always pass', () => {
      // This test will always pass
      expect(true).to.equal(true);
    });
  
    it('should always pass with a different assertion', () => {
      // This test will always pass as well
      expect(1 + 1).to.equal(2);
    });
  
    it('should always pass with a true assertion', () => {
      // This test will always pass because the condition is true
      expect(5 > 2).to.equal(true);
    });
  
    it('should always pass with a truthy assertion', () => {
      // This test will always pass because the value is truthy
      expect('Cypress').to.exist;
    });
  
    it('should always pass with a constant', () => {
      // This test will always pass because the constant is true
      const alwaysTrue = true;
      expect(alwaysTrue).to.equal(true);
    });
  });
  