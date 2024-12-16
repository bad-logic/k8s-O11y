/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alias } from './alias.decorator';

describe('Testing @Alias() Decorator', () => {
  describe('Testing with simple value', () => {
    class Test {
      public readonly secret;

      @Alias('secret')
      public exposed: number;

      @Alias('secret.notfound')
      public notfound: number;

      constructor(val: number) {
        this.secret = val;
      }
    }

    it('should throw DuplicateError if the path and key are same', () => {
      try {
        class Test {
          @Alias('value')
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
      const o = new Test(9);
      expect(o.exposed).toEqual(o.secret);
    });

    it('should successfully update the path value through alias key', () => {
      const o = new Test(9);
      o.exposed = 89;
      expect(o.secret).toEqual(89);
    });

    it('should successfully get the updated path value from the alias key', () => {
      const o = new Test(9);
      o.exposed = 89;
      expect(o.exposed).toEqual(o.secret);
    });
  });

  describe('Testing with nested objects', () => {
    class Test {
      public readonly data = {};

      @Alias('data.first.second.third.fourth.fifth.sixth.seventh.secret')
      public exposed: number;

      @Alias('data.notfound')
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

    it('should return the value of path while accessing the alias key', () => {
      const o = new Test(9);
      expect(o.exposed).toEqual(
        (o.data as any).first.second.third.fourth.fifth.sixth.seventh.secret,
      );
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
      expect(o.exposed).toEqual(
        (o.data as any).first.second.third.fourth.fifth.sixth.seventh.secret,
      );
    });
  });
});
