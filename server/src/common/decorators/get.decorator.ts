/**
 *
 * Maps the key to the path.
 * object[key] = object[path].
 *
 * @param path property name
 *
 * @returns value by traversing the path of the object
 *
 * Example:
```
class Test{

    private secret: string;

    `@Get('secret')`
    public exposed: string;

    // will add the following function to the class
    // public get exposed(){
    //     return this.secret;
    // }

}
const o = new Test();
console.log(o.exposed);
```
 *
 * 
 *
 */
export function Get(path: string) {
  return (target: any, key: string) => {
    if (path === key) {
      // will call itself and result in recursive calls
      const err = new Error(`Duplicate Identifier \'${path}\'`);
      err.name = 'DuplicateError';
      throw err;
    }

    Object.defineProperty(target, key, {
      get: function () {
        return path.split('.').reduce((p, n) => {
          if (typeof p !== 'object') {
            const err = new Error(
              `path ${path} doesn't exists in ${this.constructor.name}`,
            );
            err.name = 'PathNotFoundError';
            throw err;
          }
          return p[n];
        }, this);
      },
      configurable: true,
      enumerable: false,
    });
  };
}
