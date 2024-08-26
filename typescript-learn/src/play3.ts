interface Point {
  x: number;
  y: number;
}

// interface Point {
//   z: number;
// }

enum AnimalFlags {
  None = 0,
  HasClaws = 0b1,
  CanFly = 0b10,
  CanPoop = 0b100,
}

const enum AnimalEnum {
  None = 'none',
  HasClaws = 'hasClaws',
  CanFly = 'canFly',
  CanEat = 'canEat',
  CanPoop = 'canPoop',
}

class MyPoint implements Point {
  x: number;
  y: number; // Same as Point

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public toString(): string {
    return `A-point: (${this.x}, ${this.y})`;
  }
}

interface LongHandAllowsOverloadDeclarations {
  (a: number): number;
  (a: string): string;
}

export function doSomething(): void {
  const point: MyPoint = new MyPoint(1, 2);
  console.log(`this: ${point}`);

  let flags: AnimalFlags = AnimalFlags.HasClaws | AnimalFlags.CanFly;
  console.log(`flags = ${flags}`);
  flags = 33 as AnimalFlags;
  console.log(`flags = ${!!(flags & AnimalFlags.HasClaws)}`);

  let animal = AnimalEnum.HasClaws;
  console.log(`animal = ${animal}`);
  animal = 'hello' as AnimalEnum;
  // console.log(`animal = ${animal}, ${animal === 'hello'}`);
  // animal = { x: 'df' } as AnimalEnum;
  // console.log(`animal = ${animal}`);

  const rand = Math.random();
  console.log(`rand = ${rand}`);
  // window.alert('Hello World alert');
}
