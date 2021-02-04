import { ASTPrinter } from "./compiler/ASTPrinter";
import { Parser } from "./compiler/Parser";
import { Scanner } from "./compiler/Scanner";

const source = `-123 * (10 + 20 * 2)`;
const scanner = new Scanner(source);
const parser = new Parser(scanner.scanTokens());
const printer = new ASTPrinter();

const syntaxTree = parser.parse();
if (syntaxTree !== null) {
  console.log("result:", printer.print(syntaxTree));
}
