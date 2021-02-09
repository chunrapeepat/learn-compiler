import { ASTPrinter } from "./compiler/ASTPrinter";
import { Interpreter } from "./compiler/Interpreter";
import { Parser } from "./compiler/Parser";
import { Scanner } from "./compiler/Scanner";

// const source = `-123 * (10 + 20 * 2);`;
const source = `
print "hello world";
print 10;
print -123 * (10 + 20 * 2);
10 + 20;
`;
const scanner = new Scanner(source);
const parser = new Parser(scanner.scanTokens());
const statements = parser.parse();

const interpreter = new Interpreter();
interpreter.interpret(statements);
// const printer = new ASTPrinter();

// const syntaxTree = parser.parse();
// if (syntaxTree !== null) {
//   console.log("result:", printer.print(syntaxTree));
// }
