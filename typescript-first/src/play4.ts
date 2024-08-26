interface Overloaded {
  (foo: string): string;
  (foo: number): number;
}

// example implementation
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: number | string): number | string {
  if (typeof foo === 'number') {
    return foo * foo;
  } else if (typeof foo === 'string') {
    return `hello ${foo}`;
  }
  return foo;
}

const overloaded: Overloaded = stringOrNumber;

interface CallMeWithNewToGetString {
  new (): string;
  hello(): string;
}
// Usage
declare const Foo: CallMeWithNewToGetString;

interface SomeTypeInterface {
  bar: number;
  bas: string;
}

export function doSomething(): void {
  const str = overloaded(''); // type of `str` is inferred as `string`
  const num = overloaded(123); // type of `num` is inferred as `number`

  const bar = new Foo(); // bar is inferred to be of type string
  console.log(bar);

  const foo: SomeTypeInterface = {
    bar: 123,
    bas: 'hello',
  };
  console.log(foo.bar);
}
