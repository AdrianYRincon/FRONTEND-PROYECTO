class Queue<T> {
  private items: T[] = [];
  private front: number = 0;
  private rear: number = 0;
  private count: number = 0;

  enqueue(item: T): void {
    this.items[this.rear] = item;
    this.rear = (this.rear + 1) % this.items.length;
    this.count++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.items[this.front];
    this.front = (this.front + 1) % this.items.length;
    this.count--;

    return item;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.items[this.front];
  }

  size(): number {
    return this.count;
  }

  getItems() {
    return [...this.items];
  }
}

export default Queue;
