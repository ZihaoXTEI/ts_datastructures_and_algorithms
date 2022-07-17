export type IEqualsFunction<T> = (a: T, b: T) => boolean

export type ICompareFunction<T> = (a: T, b: T) => number

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

// 判断两个参数是否相等
export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b
}

// 判断两个参数大小
export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

// 对传入参数转换成 字符串
export function defaultToString(item: any): string {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}
