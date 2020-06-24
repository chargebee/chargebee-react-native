import { isPlainObject, snakeCase, chain } from 'lodash';

export class UrlTransformer {
  public static encode(src: object) {
    return chain(src)
      .entries()
      .map(([key, value]) => this.toUrl(key, value))
      .compact()
      .join('&')
      .value();
  }

  public static toUrl(key: string, value: any): string {
    if (this.isArrayOfObjects(value)) {
      return this.encodeArrayOfObjects(key, value);
    }
    if (UrlTransformer.isPlainArray(value)) {
      return this.encodePlainArray(key, value);
    }
    if (isPlainObject(value)) {
      return this.encodePlainObject(key, value);
    }
    return this.encodePrimitive(key, value);
  }

  private static isArrayOfObjects(value: any) {
    return Array.isArray(value) && isPlainObject(value[0]);
  }

  private static isPlainArray(value: any) {
    return Array.isArray(value) && !isPlainObject(value[0]);
  }

  private static encodePlainObject(key: string, value: any) {
    return Object.keys(value)
      .map((v) => `${snakeCase(key)}[${snakeCase(v)}]=${encodeURI(value[v])}`)
      .join('&');
  }

  private static encodePlainArray(key: string, value: any[]) {
    return value
      .map((v, i) => `${snakeCase(key)}[${i}]=${encodeURI(v)}`)
      .join('&');
  }

  private static encodeArrayOfObjects(key: string, value: any) {
    return value
      .map((object: any, index: number) => {
        return Object.keys(object)
          .map(
            (prop) =>
              `${snakeCase(key)}[${snakeCase(prop)}][${index}]=${encodeURI(
                object[prop]
              )}`
          )
          .join('&');
      })
      .join('&');
  }

  private static encodePrimitive(base: string, value: any) {
    return `${base}=${value}`;
  }
}
