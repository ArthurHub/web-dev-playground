import { doSomething } from "./play1";
import { doSomething as doSomething2 } from "./play2";

function main() {
  // hello world
  var message = "Hello World";
  console.log(message);

  doSomething();

  doSomething2();
}

main();
