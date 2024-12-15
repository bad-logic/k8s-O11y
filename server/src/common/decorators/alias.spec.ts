import { Alias } from './alias.decorator';

describe('Testing @Alias() Decorator', () => {
  class Test {
    private readonly secret;

    @Alias('secret')
    public exposed: number;

    constructor(val: number) {
      this.secret = val;
    }
  }

  it('should return original value on accessing the alias key', () => {
    const o = new Test(9);
    expect(o.exposed).toEqual(9);
  });

  it('should return updated value on accessing the alias key after the update', () => {
    const o = new Test(9);
    o.exposed = 100;
    expect(o.exposed).toEqual(100);
  });
});
