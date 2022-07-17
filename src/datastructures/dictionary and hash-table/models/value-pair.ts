// 键值对
export class ValuePair<K, V> {
  public key: K
  public value: V

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

export class ValuePairLazy<K, V> extends ValuePair<K, V> {
  public isDeleted: boolean

  constructor(key: K, value: V, isDeleted = false) {
    super(key, value)
    this.isDeleted = isDeleted
  }
}
