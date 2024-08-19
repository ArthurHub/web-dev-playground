import { doSomething } from "./play1.js";
import * as play2 from "./play2.js";

function main() {
  // hello world
  var message = "Hello World";
  console.log(message);

  doSomething();

  play2.doSomething();
}

main();
