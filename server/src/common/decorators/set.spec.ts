import { Set } from './set.decorator';

describe('Testing @Set() Decorator', () => {
  describe('Testing with simple value', () => {
    class Test {
      public readonly secret;

      @Set('secret')
      public exposed: number;

      @Set('secret.notfound')
      public notfound: number;

      constructor(val: number) {
        this.secret = val;
      }
    }

    it('should throw DuplicateError if the path and key are same', () => {
      try {
        class Test {
          @Set('value')
          public value: number;
        }
        new Test();
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toEqual('DuplicateError');
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

    it('should return undefined on accessing the alias key with no Get() decorator', () => {
      const o = new Test(9);
      expect(o.exposed).not.toBeDefined();
    });

    it('should return undefined after updating alias key with no Get() decorator', () => {
      const o = new Test(9);
      o.exposed = 100;
      expect(o.exposed).not.toBeDefined();
    });

    it('should set the value of the path', () => {
      const o = new Test(9);
      expect(o.secret).toEqual(9);
    });

    it('should update the value of the path', () => {
      const o = new Test(9);
      o.exposed = 99;
      expect(o.secret).toEqual(99);
    });
  });

  describe('Testing with nested objects', () => {
    class Test {
      public readonly data = {};

      @Set('data.first.second.third.fourth.fifth.sixth.seventh.secret')
      public exposed: number;

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

    it('should throw PathNotFoundError on updating invalid path', () => {
      const o = new Test(9);
      try {
        o.notfound = 56;
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('PathNotFoundError');
      }
    });

    it('should return undefined on accessing the alias key with no Get() decorator', () => {
      const o = new Test(9);
      expect(o.exposed).not.toBeDefined();
    });

    it('should return undefined after updating alias key with no Get() decorator', () => {
      const o = new Test(9);
      o.exposed = 100;
      expect(o.exposed).not.toBeDefined();
    });

    it('should set the value of the path', () => {
      const o = new Test(9);
      expect(
        (o.data as any).first.second.third.fourth.fifth.sixth.seventh.secret,
      ).toEqual(9);
    });

    it('should update the value of the path', () => {
      const o = new Test(9);
      o.exposed = 99;
      expect(
        (o.data as any).first.second.third.fourth.fifth.sixth.seventh.secret,
      ).toEqual(99);
    });
  });
});
