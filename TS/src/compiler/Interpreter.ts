import { TokenType } from "../const/TokenType";
import { Binary, Expr, Grouping, Literal, Unary, Visitor } from "./Expr";

export class Interpreter implements Visitor<any> {
  visitLiteralExpr(expr: Literal) {
    return expr.value;
  }
  visitGroupingExpr(expr: Grouping): any {
    return this.evaluate(expr);
  }
  visitUnaryExpr(expr: Unary): any {
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.MINUS:
        return -right;
      case TokenType.BANG:
        return !this.isTruthy(right);
    }

    return null;
  }
  visitBinaryExpr(expr: Binary): any {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.MINUS:
        return Number.parseFloat(left) - Number.parseFloat(right);
      case TokenType.SLASH:
        return Number.parseFloat(left) / Number.parseFloat(right);
      case TokenType.STAR:
        return Number.parseFloat(left) * Number.parseFloat(right);
      case TokenType.PLUS:
        if (typeof left === "number" && typeof right === "number") {
          return left + right;
        }
        if (typeof left === "string" && typeof right === "string") {
          return left + right;
        }
        break;
    }

    return null;
  }

  private isTruthy(object: any) {
    if (object === null) return false;
    return Boolean(object);
  }
  private evaluate(expr: Expr) {
    return expr.accept(this);
  }
}
