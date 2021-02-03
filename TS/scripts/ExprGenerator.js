const types = [
  "Binary | left: Expr, operator: Token, right: Expr",
  "Grouping | expression: Expr",
  "Literal | value: any",
  "Unary | operator: Token, right: Expr",
];

function defineAst(baseName, types) {
  console.log(`abstract class ${baseName} {}\n\n`);

  types.forEach((type) => {
    defineType(baseName, type);
  });
}

function defineType(baseName, type) {
  const name = type.split("|")[0].trim();
  const argStr = type.split("|")[1].trim();
  const args = argStr
    .split(",")
    .map((x) => x.trim())
    .map((x) => x.split(":").map((y) => y.trim()));

  console.log(`class ${name} extends ${baseName} {
    ${args.map((x) => `readonly ${x[0]}: ${x[1]};`).join("\n")}
  
    constructor(${argStr}) {
      super();
  
      ${args.map((x) => `this.${x[0]} = ${x[0]};`).join("\n")}
    }
  }\n\n`);
}

defineAst("Expr", types);
