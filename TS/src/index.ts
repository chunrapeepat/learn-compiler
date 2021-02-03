import { ASTPrinter, Binary, Unary, Literal, Grouping } from "./compiler/Expr";
import { Token } from "./compiler/Token";
import { TokenType } from "./const/TokenType";

const expression = new Binary(
  new Unary(new Token(TokenType.MINUS, "-", null, 1), new Literal(123)),
  new Token(TokenType.STAR, "*", null, 1),
  new Grouping(new Literal(45.67))
);
const printer = new ASTPrinter();
console.log("result:", printer.print(expression));
