export class Node<T> {
  public element: T
  public next?: Node<T>

  constructor(element: T, next?: Node<T>) {
    this.element = element // 存储元素
    this.next = next // 指向下一个元素
  }
}

export class DoublyNode<T> extends Node<T> {
  public next?: DoublyNode<T>
  public prev?: DoublyNode<T>

  constructor(element: T, next?: DoublyNode<T>, prev?: DoublyNode<T>) {
    super(element, next)
    this.prev = prev
  }
}
