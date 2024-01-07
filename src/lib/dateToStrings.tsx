export type WithoutDate<T extends { [key: string]: any }> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Date[]
    ? string[]
    : T[K] extends { [key: string]: any }
    ? WithoutDate<T[K]>
    : T[K] extends { [key: number]: any }
    ? WithoutDate<T[K]>
    : T[K];
};

export function datesToStrings<T extends { [prop: string]: any }>(
  obj: T
): WithoutDate<T> {
  if (obj instanceof Array) {
    for (let item of obj) {
      // if date convert to string
      if (item instanceof Date) {
        const index = obj.indexOf(item);
        obj[index] = item.toUTCString();
      }

      // if object call self with object
      if (item instanceof Object) {
        return datesToStrings(item);
      }
    }
  }

  const objAsAny = obj as any;

  // for each property
  for (const propertyName in obj) {
    const value = obj[propertyName] as any;

    // for arrays
    if (value instanceof Array) {
      // for each item
      objAsAny[propertyName] = value.map((item) => {
        // if date convert to string
        if (item instanceof Date) {
          return item.toUTCString();
        }

        // if object call self with object
        if (item instanceof Object) {
          return datesToStrings(item);
        }

        return item;
      });

      break;
    }

    // for dates convert to string
    if (value instanceof Date) {
      objAsAny[propertyName] = value.toISOString();
      break;
    }

    // for object call self
    if (value instanceof Object) {
      objAsAny[propertyName] = datesToStrings(value);
      break;
    }
  }

  return objAsAny as WithoutDate<T>;
}
