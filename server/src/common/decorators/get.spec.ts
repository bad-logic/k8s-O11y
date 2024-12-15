import { Get } from './get.decorator';
import { Set } from './set.decorator';

describe('Testing @Get() Decorator', () => {
  describe('Testing @Get() decorator independently', () => {
    class Test {
      private readonly secret;

      @Get('secret')
      public exposed: number;

      constructor(val: number) {
        this.secret = val;
      }
    }
    it('it should return the value of original key while accessing the alias key', () => {
      expect(new Test(9).exposed).toEqual(9);
    });

    it('it should through error on trying to set the alias key', () => {
      const o = new Test(9);
      try {
        o.exposed = 89;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toEqual('TypeError');
      }
    });
  });

  describe('Testing @Get() while also using @Set() decorator to the same value', () => {
    class Test {
      private readonly secret;

      @Get('secret')
      @Set('secret')
      public exposed: number;

      constructor(val: number) {
        this.secret = val;
      }
    }

    it('it should return the value of original key while accessing the alias key', () => {
      expect(new Test(9).exposed).toEqual(9);
    });

    it('it should succeed on trying to set the mapped value through alias key', () => {
      const o = new Test(9);
      expect(o.exposed).toEqual(9);
      o.exposed = 89;
      expect(o.exposed).toEqual(89);
    });
  });
});
