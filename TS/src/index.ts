import { Scanner } from "./compiler/Scanner";

const sourceCode = `!*+-/=<> <= ==
for 
var name = "Chun Rapeepat";`;

const scanner = new Scanner(sourceCode);
console.log(scanner.scanTokens());
