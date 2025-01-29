class Stack {
  constructor(items) {
    this._items = Array.isArray(items) ? items : [];
  }

  push(item) {
    this._items.push(item);
  }

  pop() {
    return this._items.pop();
  }

  peek() {
    if (this._items.length) {
      return this._items[this._items.length - 1];
    }
  }

  list() {
    return this._items;
  }
  clone() {
    return new Stack([...this._items]);
  }
}

export default Stack;
