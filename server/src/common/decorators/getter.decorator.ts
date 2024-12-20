/**
 *
 * creates a getter function
 *
 * @returns value of the key
 *
 * Example:
```
class Test{

    private secret: string;

    `@Getter()`
    private secret: string;

    // will add the following function to the class
    // public getSecret():string{
    //     return this.secret;
    // }

}
const o = new Test();
console.log(o.getSecret())
```
 *
 * 
 * @deprecated could not make it work with typescript
 */
export function Getter() {
  return (target: any, key: string) => {
    const func = key
      .split('')
      .map((v, i) => {
        if (i == 0) {
          return v.toUpperCase();
        }
        return v;
      })
      .join('');
    Object.defineProperty(target, func, {
      value: function () {
        return this[key];
      },
      configurable: true,
      enumerable: false,
    });
  };
}
