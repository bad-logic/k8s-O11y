/* eslint-disable @typescript-eslint/no-unused-vars */
import { Get } from './get.decorator';
import { Set } from './set.decorator';

describe('Testing combination of @Get() @Set() Decorator to the same value', () => {
  describe('Testing with simple value', () => {
    class Test {
      public readonly secret;

      @Get('secret')
      @Set('secret')
      public exposed: number;

      @Get('secret.notfound')
      @Set('secret.notfound')
      public notfound: number;

      constructor(val: number) {
        this.secret = val;
      }
    }

    it('should throw DuplicateError if the path and key are same', () => {
      try {
        class Test {
          @Get('value')
          @Set('value')
          public value: number;
        }
        new Test();
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toEqual('DuplicateError');
      }
    });

    it('should throw PathNotFoundError while accessing invalid path', () => {
      const o = new Test(9);
      try {
        const _ = o.notfound;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('PathNotFoundError');
      }
    });

    it('should throw PathNotFoundError on updating invalid path', () => {
      const o = new Test(9);
      try {
        o.notfound = 56;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('PathNotFoundError');
      }
    });

    it('should return the value of path while accessing the alias key', () => {
      expect(new Test(9).exposed).toEqual(9);
    });

    it('should successfully update the path value through alias key', () => {
      const o = new Test(9);
      o.exposed = 89;
      expect(o.secret).toEqual(89);
    });

    it('should successfully get the updated path value from the alias key', () => {
      const o = new Test(9);
      o.exposed = 89;
      expect(o.exposed).toEqual(89);
    });
  });

  describe('Testing with nested objects', () => {
    class Test {
      public readonly data = {};

      @Get('data.first.second.third.fourth.fifth.sixth.seventh.secret')
      @Set('data.first.second.third.fourth.fifth.sixth.seventh.secret')
      public exposed: number;

      @Get('data.notfound')
      @Set('data.notfound')
      public notfound: number;

      constructor(val: number) {
        this.data = {
          first: {
            second: {
              third: {
                fourth: {
                  fifth: {
                    sixth: {
                      seventh: {
                        secret: val,
                      },
                    },
                  },
                },
              },
            },
            message: 'doomed',
            status: 'nested',
          },
        };
      }
    }

    it('should throw PathNotFoundError while accessing invalid path', () => {
      const o = new Test(9);
      try {
        const _ = o.notfound;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('PathNotFoundError');
      }
    });

    it('should throw PathNotFoundError on updating invalid path', () => {
      const o = new Test(9);
      try {
        o.notfound = 56;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('PathNotFoundError');
      }
    });

    it('should return the value of the path while accessing the alias key', () => {
      expect(new Test(9).exposed).toEqual(9);
    });

    it('should successfully update the path value through alias key', () => {
      const o = new Test(9);
      o.exposed = 89;
      expect(
        (o.data as any).first.second.third.fourth.fifth.sixth.seventh.secret,
      ).toEqual(89);
    });

    it('should successfully get the updated path value from the alias key', () => {
      const o = new Test(9);
      o.exposed = 89;
      expect(o.exposed).toEqual(89);
    });
  });
});
