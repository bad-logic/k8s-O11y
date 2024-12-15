/**
 *
 * creates a setter function
 *
 * @returns 
 *
 * Example:
```
class Test{

    private secret: string;

    `@Setter()`
    `@Getter()`
    private secret: string;

    // will add the following function to the class
    // public setSecret(val:string):void{
    //     return this.secret = val;
    // }

}
const o = new Test();
o.setSecret('newSecret');
console.log(o.getSecret())
```
 *
 * 
 * @deprecated could not make it work with typescript
 */
export function Setter() {
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
      value: function (val: any) {
        this[key] = val;
      },
      configurable: true,
      enumerable: false,
    });
  };
}
