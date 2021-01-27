export {};

declare global {
  interface Array<T> {
    swap(a: number, b: number): Array<T>;

    last(): T | undefined;
  }
}

interface Array<T> {
  swap(a: number, b: number): Array<T>;

  last(): T | undefined;
}

Array.prototype.swap = function(a: number, b: number) {
  if (a < 0 || a >= this.length || b < 0 || b >= this.length) {
    return this;
  }
  const swapped = [...this];
  swapped[a] = this[b];
  swapped[b] = this[a];
  return swapped;
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

