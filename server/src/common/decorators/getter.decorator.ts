/**
 *
 * Decorator for creating getters
 *
 * @param path path of the property if it is nested inside a big object
 *
 * @returns
 */
export function Getter(path?: string) {
  return (target: any, key: string) => {
    Object.defineProperty(target, key, {
      get: function () {
        if (path) {
          return path.split('.').reduce((p, n) => {
            return p[n];
          }, this);
        } else {
          return this[key];
        }
      },
    });
  };
}
