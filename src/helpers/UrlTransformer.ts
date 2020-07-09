export class UrlTransformer {
  public static encodePlainObject(key: string, value: any) {
    return Object.keys(value)
      .map((v) => `${key}[${v}]=${encodeURI(value[v])}`)
      .join('&');
  }

  public static encodePlainArray(key: string, value: any[]) {
    return value.map((v, i) => `${key}[${i}]=${encodeURI(v)}`).join('&');
  }

  public static encodeArrayOfObjects(key: string, value: any) {
    return value
      .map((object: any, index: number) => {
        return Object.keys(object)
          .map((prop) => `${key}[${prop}][${index}]=${encodeURI(object[prop])}`)
          .join('&');
      })
      .join('&');
  }
}
