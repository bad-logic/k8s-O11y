/* eslint-disable @typescript-eslint/no-unused-vars */
import { Get } from './get.decorator';

describe('Testing @Get() Decorator', () => {
  describe('Testing with simple value', () => {
    class Test {
      public readonly secret: number;

      @Get('secret')
      public exposed: number;

      @Get('secret.notfound')
      public notfound: number;

      constructor(val: number) {
        this.secret = val;
      }
    }

    it('should throw DuplicateError if the path and key are same', () => {
      try {
        class Test {
          @Get('value')
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

    it('should throw TypeError on updating the alias key with no Set() decorator', () => {
      const o = new Test(9);
      try {
        o.exposed = 89;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toEqual('TypeError');
      }
    });

    it('should throw TypeError on updating the invalid path alias key with no Set() decorator', () => {
      const o = new Test(9);
      try {
        o.notfound = 89;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toEqual('TypeError');
      }
    });

    it('should not change the value of neither alias nor path on updating the alias key with no Set() decorator', () => {
      const o = new Test(9);
      try {
        o.exposed = 89;
      } catch (_) {
        expect(o.secret).toEqual(9);
        expect(o.exposed).toEqual(9);
      }
    });

    it('should return the value of path while accessing the alias key', () => {
      const o = new Test(9);
      expect(o.exposed).toEqual(o.secret);
    });
  });

  describe('Testing with nested objects', () => {
    class Test {
      public readonly data = {};

      @Get('data.first.second.third.fourth.fifth.sixth.seventh.secret')
      public exposed: number;

      @Get('data.notfound')
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

    it('should throw TypeError on updating the alias key with no Set() decorator', () => {
      const o = new Test(9);
      try {
        o.exposed = 89;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toEqual('TypeError');
      }
    });

    it('should throw TypeError on updating the invalid path alias key with no Set() decorator', () => {
      const o = new Test(9);
      try {
        o.notfound = 89;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toEqual('TypeError');
      }
    });

    it('should not change the value of neither alias nor path on updating the alias key with no Set() decorator', () => {
      const o = new Test(9);
      try {
        o.exposed = 89;
      } catch (_) {
        expect(
          (o.data as any).first.second.third.fourth.fifth.sixth.seventh.secret,
        ).toEqual(9);
        expect(o.exposed).toEqual(9);
      }
    });

    it('should return the value of path while accessing the alias key', () => {
      const o = new Test(9);
      expect(o.exposed).toEqual(
        (o.data as any).first.second.third.fourth.fifth.sixth.seventh.secret,
      );
    });
  });
});
