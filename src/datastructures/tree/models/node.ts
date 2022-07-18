export class Node<K> {
  left: Node<K> | undefined
  right: Node<K> | undefined
  public key: K

  constructor(key: K) {
    this.key = key
  }

  toString() {
    return `${this.key}`
  }
}
