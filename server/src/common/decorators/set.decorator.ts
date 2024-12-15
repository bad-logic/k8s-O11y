/**
 *
 * Maps the key to the path.
 * object[key] = object[path].
 *
 * @param path property name
 *
 * @returns
 *
 * Example:
```
class Test{

    private secret: string;

    `@Set('secret')`
    public exposed: string;

    // will add the following function to the class
    // public set exposed(val){
    //     this.secret = val;
    // }

}
const o = new Test();
o.exposed = 'newSecretValue';
```
 *
 * 
 *
 */
export function Set(path: string) {
  return (target: any, key: string) => {
    if (path === key) {
      // will call itself and result in recursive calls
      throw new Error(`Duplicate Identifier \'${path}\'`);
    }

    Object.defineProperty(target, key, {
      set: function (val) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let ref = this;
        const splitter = path.split('.');
        let count = 1;
        for (const ind of splitter) {
          if (count === splitter.length) {
            ref[ind] = val;
            break;
          }

          if (ref[ind] === undefined) {
            throw new Error(
              `path ${path} doesn't exists in ${this.constructor.name}`,
            );
          }

          ref = ref[ind];
          count++;
        }
      },
      configurable: true,
      enumerable: false,
    });
  };
}
