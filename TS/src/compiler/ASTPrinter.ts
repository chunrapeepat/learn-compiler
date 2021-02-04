import { Binary, Expr, Grouping, Literal, Unary, Visitor } from "./Expr";

export class ASTPrinter implements Visitor<string> {
  print(expr: Expr): string {
    return expr.accept(this);
  }

  visitBinaryExpr(expr: Binary): string {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }
  visitGroupingExpr(expr: Grouping): string {
    return this.parenthesize("group", expr.expression);
  }
  visitLiteralExpr(expr: Literal): string {
    if (expr.value == null) return "nil";
    return expr.value.toString();
  }
  visitUnaryExpr(expr: Unary): string {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  parenthesize(name: string, ...exprs: Expr[]) {
    let result = "";
    result += "(";
    result += name;

    exprs.forEach((expr) => {
      result += " ";
      result += expr.accept(this);
    });
    result += ")";

    return result;
  }
}
