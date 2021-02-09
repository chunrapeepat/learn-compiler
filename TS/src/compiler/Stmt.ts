import { Expr } from "./Expr";

interface Visitor<R> {
  visitExpressionStmt(expr: Expression): R;
  visitPrintStmt(expr: Print): R;
}

abstract class Stmt {
  abstract accept<R>(visitor: Visitor<R>): R;
}

class Expression extends Stmt {
  readonly expression: Expr;

  constructor(expression: Expr) {
    super();

    this.expression = expression;
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitExpressionStmt(this);
  }
}

class Print extends Stmt {
  readonly expression: Expr;

  constructor(expression: Expr) {
    super();

    this.expression = expression;
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitPrintStmt(this);
  }
}
