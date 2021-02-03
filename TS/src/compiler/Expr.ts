import { Token } from "./Token";

abstract class Expr {}

class Binary extends Expr {
  readonly left: Expr;
  readonly operator: Token;
  readonly right: Expr;

  constructor(left: Expr, operator: Token, right: Expr) {
    super();

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

class Grouping extends Expr {
  readonly expression: Expr;

  constructor(expression: Expr) {
    super();

    this.expression = expression;
  }
}

class Literal extends Expr {
  readonly value: any;

  constructor(value: any) {
    super();

    this.value = value;
  }
}

class Unary extends Expr {
  readonly operator: Token;
  readonly right: Expr;

  constructor(operator: Token, right: Expr) {
    super();

    this.operator = operator;
    this.right = right;
  }
}
