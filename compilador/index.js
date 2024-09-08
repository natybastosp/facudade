const fs = require("fs");

class LexerError extends Error {
  constructor(message, line, column) {
    super(`Erro Léxico: ${message} na linha ${line}, coluna ${column}`);
    this.name = "LexerError";
  }
}

class ParserError extends Error {
  constructor(message, line) {
    super(`Erro Sintático: ${message} na linha ${line}`);
    this.name = "ParserError";
  }
}

class SemanticError extends Error {
  constructor(message) {
    super(`Erro Semântico: ${message}`);
    this.name = "SemanticError";
  }
}

class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0; // Corrigido: removido o 'x'
    this.line = 1;
    this.column = 1;
    this.tokens = [];
  }

  tokenize() {
    while (this.position < this.input.length) {
      const char = this.input[this.position];
      if (char === "\n") {
        this.tokens.push({
          type: "NEWLINE",
          line: this.line,
          column: this.column,
        });
        this.line++;
        this.column = 1;
        this.position++;
      } else if (/\s/.test(char)) {
        this.position++;
        this.column++;
      } else if (/\d/.test(char)) {
        this.tokens.push(this.readNumber());
      } else if (/[a-zA-Z]/.test(char)) {
        this.tokens.push(this.readIdentifier());
      } else if (char === "=") {
        this.tokens.push({
          type: "EQUALS",
          value: "=",
          line: this.line,
          column: this.column,
        });
        this.position++;
        this.column++;
      } else if (["+", "-", "*", "/", ">", "<"].includes(char)) {
        this.tokens.push({
          type: "OPERATOR",
          value: char,
          line: this.line,
          column: this.column,
        });
        this.position++;
        this.column++;
      } else if (char === "r" && this.input.startsWith("rem", this.position)) {
        this.tokens.push(this.readComment());
      } else {
        throw new LexerError(
          `Caractere não reconhecido: ${char}`,
          this.line,
          this.column
        );
      }
    }
    return this.tokens;
  }

  readNumber() {
    let number = "";
    const startColumn = this.column;
    while (
      this.position < this.input.length &&
      /\d/.test(this.input[this.position])
    ) {
      number += this.input[this.position];
      this.position++;
      this.column++;
    }
    if (isNaN(number)) {
      throw new LexerError("Número inválido", this.line, startColumn);
    }
    return {
      type: "NUMBER",
      value: parseInt(number),
      line: this.line,
      column: startColumn,
    };
  }

  readIdentifier() {
    let identifier = "";
    const startColumn = this.column;
    while (
      this.position < this.input.length &&
      /[a-zA-Z0-9]/.test(this.input[this.position])
    ) {
      identifier += this.input[this.position];
      this.position++;
      this.column++;
    }
    const keywords = [
      "rem",
      "input",
      "let",
      "print",
      "end",
      "goto",
      "if",
      "then",
    ];
    return {
      type: keywords.includes(identifier) ? "KEYWORD" : "IDENTIFIER",
      value: identifier,
      line: this.line,
      column: startColumn,
    };
  }

  readComment() {
    let comment = "";
    const startColumn = this.column;
    while (
      this.position < this.input.length &&
      this.input[this.position] !== "\n"
    ) {
      comment += this.input[this.position];
      this.position++;
      this.column++;
    }
    return {
      type: "COMMENT",
      value: comment.trim(),
      line: this.line,
      column: startColumn,
    };
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
    this.lastLineNumber = 0;
  }

  parse() {
    const program = {
      type: "Program",
      body: [],
    };

    while (!this.isAtEnd()) {
      try {
        const stmt = this.parseStatement();
        if (stmt) {
          program.body.push(stmt);
        }
      } catch (error) {
        throw new ParserError(error.message, this.peek().line);
      }
    }

    return program;
  }

  parseStatement() {
    if (this.match("NEWLINE")) {
      return null;
    }

    if (this.match("NUMBER")) {
      const lineNumber = this.previous().value;

      if (lineNumber <= this.lastLineNumber) {
        throw new Error(
          `Número da linha ${lineNumber} não está em ordem crescente`
        );
      }
      this.lastLineNumber = lineNumber;

      if (this.match("KEYWORD")) {
        const keyword = this.previous().value;
        switch (keyword) {
          case "rem":
            return this.parseComment(lineNumber);
          case "input":
            return this.parseInput(lineNumber);
          case "let":
            return this.parseAssignment(lineNumber);
          case "print":
            return this.parsePrint(lineNumber);
          case "end":
            return this.parseEnd(lineNumber);
          default:
            throw new Error(`Palavra-chave inesperada: ${keyword}`);
        }
      } else if (this.match("IDENTIFIER")) {
        return this.parseImplicitAssignment(lineNumber);
      }
    }

    throw new Error(`Token inesperado: ${JSON.stringify(this.peek())}`);
  }

  parseComment(lineNumber) {
    let commentText = "";
    while (!this.isAtEnd() && !this.check("NEWLINE")) {
      commentText += this.advance().value + " ";
    }
    return {
      type: "Comment",
      value: commentText.trim(),
      line: lineNumber,
    };
  }

  parseInput(lineNumber) {
    const variable = this.consume(
      "IDENTIFIER",
      "Esperado nome da variável após 'input'"
    );
    return {
      type: "InputStatement",
      variable: variable.value,
      line: lineNumber,
    };
  }

  parseAssignment(lineNumber) {
    const variable = this.consume(
      "IDENTIFIER",
      "Esperado nome da variável na atribuição"
    );
    this.consume("EQUALS", 'Esperado "=" na atribuição');
    const value = this.parseExpression();
    return {
      type: "AssignmentStatement",
      variable: variable.value,
      value: value,
      line: lineNumber,
    };
  }

  parseImplicitAssignment(lineNumber) {
    const variable = this.previous();
    this.consume("EQUALS", 'Esperado "=" na atribuição');
    const value = this.parseExpression();
    return {
      type: "AssignmentStatement",
      variable: variable.value,
      value: value,
      line: lineNumber,
    };
  }

  parsePrint(lineNumber) {
    const expression = this.parseExpression();
    return {
      type: "PrintStatement",
      expression: expression,
      line: lineNumber,
    };
  }

  parseEnd(lineNumber) {
    return {
      type: "EndStatement",
      line: lineNumber,
    };
  }

  parseExpression() {
    return this.parseRelational();
  }

  parseRelational() {
    let expr = this.parseAdditive();

    while (this.match("OPERATOR", [">", "<"])) {
      const operator = this.previous().value;
      const right = this.parseAdditive();
      expr = {
        type: "BinaryExpression",
        operator: operator,
        left: expr,
        right: right,
      };
    }

    return expr;
  }

  parseAdditive() {
    let expr = this.parseMultiplicative();

    while (this.match("OPERATOR", ["+", "-"])) {
      const operator = this.previous().value;
      const right = this.parseMultiplicative();
      expr = {
        type: "BinaryExpression",
        operator: operator,
        left: expr,
        right: right,
      };
    }

    return expr;
  }

  parseMultiplicative() {
    let expr = this.parsePrimary();

    while (this.match("OPERATOR", ["*", "/"])) {
      const operator = this.previous().value;
      const right = this.parsePrimary();
      expr = {
        type: "BinaryExpression",
        operator: operator,
        left: expr,
        right: right,
      };
    }

    return expr;
  }

  parsePrimary() {
    if (this.match("NUMBER")) {
      return {
        type: "Literal",
        value: this.previous().value,
      };
    }

    if (this.match("IDENTIFIER")) {
      return {
        type: "Identifier",
        name: this.previous().value,
      };
    }

    throw new Error(`Token inesperado: ${JSON.stringify(this.peek())}`);
  }

  match(type, values = []) {
    if (this.check(type, values)) {
      this.advance();
      return true;
    }
    return false;
  }

  check(type, values = []) {
    if (this.isAtEnd()) return false;
    if (this.peek().type !== type) return false;
    if (values.length > 0 && !values.includes(this.peek().value)) return false;
    return true;
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  consume(type, message) {
    if (this.check(type)) return this.advance();
    throw new Error(message);
  }

  peek() {
    return this.tokens[this.current];
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  isAtEnd() {
    return this.current >= this.tokens.length;
  }
}

class SemanticAnalyzer {
  constructor() {
    this.variables = new Set();
  }

  analyze(ast) {
    this.visitNode(ast);
  }

  visitNode(node) {
    switch (node.type) {
      case "Program":
        node.body.forEach((stmt) => this.visitNode(stmt));
        break;
      case "InputStatement":
        this.variables.add(node.variable);
        break;
      case "AssignmentStatement":
        this.variables.add(node.variable);
        this.visitNode(node.value);
        break;
      case "PrintStatement":
        this.visitNode(node.expression);
        break;
      case "BinaryExpression":
        this.visitNode(node.left);
        this.visitNode(node.right);
        break;
      case "Identifier":
        if (!this.variables.has(node.name)) {
          throw new SemanticError(`Variável indefinida: ${node.name}`);
        }
        break;
      case "Literal":
      case "Comment":
      case "EndStatement":
        break;
      default:
        throw new SemanticError(`Tipo de nó desconhecido: ${node.type}`);
    }
  }
}

function compile(filename) {
  try {
    const sourceCode = fs.readFileSync(filename, "utf8");

    const lexer = new Lexer(sourceCode);
    const tokens = lexer.tokenize();
    console.log("Tokens:", JSON.stringify(tokens, null, 2));

    const parser = new Parser(tokens);
    const ast = parser.parse();
    console.log("AST:", JSON.stringify(ast, null, 2));

    const semanticAnalyzer = new SemanticAnalyzer();
    semanticAnalyzer.analyze(ast);
    console.log("Análise semântica concluída sem erros.");

    return "Compilação bem-sucedida!";
  } catch (error) {
    if (error instanceof LexerError) {
      return `Erro Léxico: ${error.message}`;
    } else if (error instanceof ParserError) {
      return `Erro Sintático: ${error.message}`;
    } else if (error instanceof SemanticError) {
      return `Erro Semântico: ${error.message}`;
    } else {
      return `Erro de compilação: ${error.name} - ${error.message}`;
    }
  }
}

console.log(compile("entrada.txt"));
