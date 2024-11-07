/** Type Hierarchy */
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/** Two sample functions */
let iTakePoint2D = (point: Point2D): void => {
  console.log(point);
};
let iTakePoint3D = (point: Point3D): void => {
  console.log(point);
};

class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {
    this.feet = numFeet;
  }
}

class Cat extends Animal {}

class Size {
  feet: number;
  //   meters: number;
  constructor(meters: number) {
    // this.meters = meters;
    this.feet = meters * 3.28084;
  }
}

interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
type Shape = Square | Rectangle;

function area(s: Shape): number {
  //   if (s.kind === 'square') {
  //     // Now TypeScript *knows* that `s` must be a square ;)
  //     // So you can use its members safely :)
  //     return s.size * s.size;
  //   } else {
  //     // Wasn't a square? So TypeScript will figure out that it must be a Rectangle ;)
  //     // So you can use its members safely :)
  //     return s.width * s.height;
  //   }

  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
  }
}

export function doSomething(): void {
  iTakePoint3D = iTakePoint2D; // Okay : Reasonable
  //   iTakePoint2D = iTakePoint3D; // NOT-Okay : YAY!

  let a: Animal = new Animal('dog', 4);
  let s: Size = new Size(1);

  a = s; // OK
  s = a; // OK
}
