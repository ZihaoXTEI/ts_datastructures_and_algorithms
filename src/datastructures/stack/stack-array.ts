// 利用数组实现栈
export class StackArray<T> {
	private items: T[]

	constructor() {
		this.items = []
	}

	/**
	 * @description: 向栈添加元素
	 * @function push
	 * @param {T} element
	 */
	push(element: T) {
		// push 方法用于在数组的末端添加一个或多个元素
		this.items.push(element)
	}

	/**
	 * @description: 从栈移除元素
	 * @function pop
	 */
	pop() {
		// pop 方法用于删除数组的最后一个元素
		return this.items.pop()
	}

	/**
	 * @description: 查看栈顶元素
	 * @function peek
	 */
	peek() {
		let length = this.items.length
		return this.items[length - 1]
	}

	/**
	 * @description: 判断栈是否为空
	 * @function isEmpty
	 */
	isEmpty() {
		return this.items.length === 0
	}

	/**
	 * @description: 获取栈的长度
	 * @function size
	 */
	size() {
		return this.items.length
	}

	[Symbol.iterator]() {
		let index = 0
		return {
			next: () => {
				if (index < this.items.length) {
					return { done: false, value: this.items[index++] }
				} else {
					return { done: true }
				}
			}
		}
	}
}
