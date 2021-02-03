import { TokenType } from "../const/TokenType";

export class Token {
  readonly type: TokenType;
  readonly lexeme: string;
  readonly literal: object;
  readonly line: number;

  constructor(type: TokenType, lexeme: string, literal: object, line: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}
