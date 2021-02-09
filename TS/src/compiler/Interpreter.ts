import { TokenType } from "../const/TokenType";
import {
  Binary,
  Expr,
  Grouping,
  Literal,
  Unary,
  Visitor as ExprVisitor,
} from "./Expr";
import { Expression, Stmt, Visitor as StmtVisitor } from "./Stmt";

export class Interpreter implements ExprVisitor<any>, StmtVisitor<void> {
  interpret(statements: Stmt[]): void {
    try {
      for (const statement of statements) {
        this.execute(statement);
      }
    } catch (err) {
      console.error(err);
    }
  }
  visitExpressionStmt(stmt: Expression) {
    this.evaluate(stmt.expression);
    return null;
  }
  visitPrintStmt(stmt: Expression) {
    const val = this.evaluate(stmt.expression);
    console.log(`[Print] ${JSON.stringify(val)}`);
    return null;
  }
  visitLiteralExpr(expr: Literal) {
    return expr.value;
  }
  visitGroupingExpr(expr: Grouping): any {
    return this.evaluate(expr.expression);
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
  private execute(stmt: Stmt) {
    stmt.accept(this);
  }
  private evaluate(expr: Expr) {
    return expr.accept(this);
  }
}
