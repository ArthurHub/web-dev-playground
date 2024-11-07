// Therefore those skilled at the unorthodox
// are infinite as heaven and earth,
// inexhaustible as the great rivers.
// When they come to an end,
// they begin again,
// like the days and months;
// they die and are reborn,
// like the four seasons.
//
// - Sun Tsu, The Art of War.
//
// ArthurHub, 2024

class Foo<T> {
  readonly _foo: T;
  constructor(foo: T) {
    this._foo = foo;
  }
  get foo(): T {
    return this._foo;
  }
}

const FooNumber = Foo<number>;

const { called } = new (class {
  count = 0;
  called = (): void => {
    this.count++;
    console.log(`Called : ${this.count}`);
  };
  other = (): void => {
    this.count++;
    console.log(`Called : ${this.count}`);
  };
})();

export function testCalled(): void {
  called(); // Called : 1
  called(); // Called : 2

  const myFoo = new FooNumber(123);
  console.log(myFoo);
}
