import { Get } from './get.decorator';
import { Set } from './set.decorator';

describe('Testing @Set() Decorator', () => {
  describe('Testing @Set() decorator independently', () => {
    class Test {
      public readonly secret;

      @Set('secret')
      public exposed: number;

      constructor(val: number) {
        this.secret = val;
      }
    }

    it('should set the original key', () => {
      const o = new Test(9);
      expect(o.secret).toEqual(9);
    });

    it('should change the value of the original key on update', () => {
      const o = new Test(9);
      o.exposed = 99;
      expect(o.secret).toEqual(99);
    });

    it('should return undefined on accessing the alias key', () => {
      const o = new Test(9);
      expect(o.exposed).not.toBeDefined();
    });

    it('should return undefined on accessing the alias key after the update', () => {
      const o = new Test(9);
      o.exposed = 100;
      expect(o.exposed).not.toBeDefined();
    });
  });

  describe('Testing @Set() while also using @Get() decorator to the same value', () => {
    class Test {
      public readonly secret;

      @Get('secret')
      @Set('secret')
      public exposed: number;

      constructor(val: number) {
        this.secret = val;
      }
    }

    it('should set the original key', () => {
      const o = new Test(9);
      expect(o.secret).toEqual(9);
    });

    it('should change the value of the original key on update', () => {
      const o = new Test(9);
      o.exposed = 99;
      expect(o.secret).toEqual(99);
    });

    it('should return the original key value on accessing the alias key', () => {
      const o = new Test(9);
      expect(o.exposed).toEqual(9);
    });

    it('should return the original key value on accessing the alias key after the update', () => {
      const o = new Test(9);
      o.exposed = 100;
      expect(o.exposed).toEqual(100);
    });
  });
});
