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

class FooBase {
  toString(): string {
    const entries = Object.entries(this)
      .map(([key, value]) => `${key}: "${String(value).substring(0, 50)}"`)
      .join(', ');
    return `${this.constructor.name}:(${entries})`;
  }
}

class Foo extends FooBase {
  public name: string = 'some name';
  public age?: number = 78;

  constructor() {
    super();
    console.log('Foo constructor');
  }

  [Symbol.toPrimitive](hint: unknown): string {
    return `Symbol - Foo: bla: ${this.name}`;
  }
}

export function doSomething() {
  const foo = new Foo();
  const bla: string = foo.toString();
  const bla2 = String(foo);
  const bla3 = +foo;
  console.log(`${foo}`);
  console.log('done');
}
