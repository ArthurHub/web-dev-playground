export function doSomething(): void {
  const big = 100n;
  console.log(big);
  someFunc();
}

class Foo {
  members: number[] = []; // Initialize directly
  add(x: number): void {
    this.members.push(x);
  }
}

class test {
  run(): void {
    class Person {
      growOld: () => void;
      constructor(public age: number) {
        this.age = age;
        this.growOld = (): void => {
          this.age++;
        };
      }
    }
    const person = new Person(1);
    setTimeout(person.growOld, 1000);

    setTimeout(function () {
      console.log(person.age);
    }, 2000); // 1, should have been 2
  }
}

function someFunc(): void {
  const data = {
    name: 'John',
    age: 30,
    address: {
      city: 'New York',
      state: 'NY',
    },
  };

  const data2 = {
    ...data,
    more: 'more',
  };

  const {
    name: aName,
    age,
    address: { city: myCity },
    more,
  } = data2;
  console.log(`${aName} ${age} %s %s`, myCity, more);

  const someArray = [9, 2, 5];
  for (const elm of someArray) {
    console.log(elm);
  }
}
