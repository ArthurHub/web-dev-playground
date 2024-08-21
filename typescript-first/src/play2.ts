export function doSomething() {
  doPromise1();

  doPromise2();

  dramaticWelcome();
}

function doPromise1() {
  Promise.resolve(123)
    .then((res) => {
      console.log(res); // 123
      return 456;
    })
    .then((res) => {
      console.log(res); // 456
      return Promise.resolve(123); // Notice that we are returning a Promise
    })
    .then((res) => {
      console.log(res); // 123 : Notice that this `then` is called with the resolved value
      return 123;
    });
}

const promise = new Promise<number>((resolve, reject) => {
  resolve(123);
});

function doPromise2() {
  promise
    .then((res) => {
      console.log(res + 5); // 123
      return 456;
    })
    .then((res) => {
      console.log(res); // 456
      return Promise.resolve(123); // Notice that we are returning a Promise
    })
    .then((res) => {
      console.log(res); // 123 : Notice that this `then` is called with the resolved value
      return 123;
    });
}

function delay(milliseconds: number, count: number): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(count);
    }, milliseconds);
  });
}

// async function always returns a Promise
async function dramaticWelcome(): Promise<void> {
  console.log("Hello");

  for (let i = 0; i < 5; i++) {
    // await is converting Promise<number> into number
    const count: number = await delay(500, i);
    console.log(count);
  }

  console.log("World!");
}