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
    this.position = 0;
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
      } else if (["+", "-", "*", "/"].includes(char)) {
        this.tokens.push({
          type: "OPERATOR",
          value: char,
          line: this.line,
          column: this.column,
        });
        this.position++;
        this.column++;
      } else if (["<", ">"].includes(char)) {
        let value = char;
        if (
          this.position + 1 < this.input.length &&
          this.input[this.position + 1] === "="
        ) {
          value += "=";
          this.position++;
          this.column++;
        }
        this.tokens.push({
          type: "COMPARISON",
          value: value,
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

    const normalizedIdentifier = identifier.toLowerCase();

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

    if (keywords.includes(normalizedIdentifier)) {
      return {
        type: "KEYWORD",
        value: identifier,
        line: this.line,
        column: startColumn,
      };
    } else {
      return {
        type: "IDENTIFIER",
        value: identifier,
        line: this.line,
        column: startColumn,
      };
    }
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

    // Verifica se o último comando é um 'EndStatement'
    if (
      program.body.length === 0 ||
      program.body[program.body.length - 1].type !== "EndStatement"
    ) {
      throw new ParserError(
        "Falta o comando 'end' no final do programa",
        this.lastLineNumber
      );
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
        const keyword = this.previous().value.toLowerCase();
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
          case "if":
            return this.parseIf(lineNumber);
          case "goto":
            return this.parseGoto(lineNumber);
          default:
            throw new Error(`Palavra-chave inesperada: ${keyword}`);
        }
      } else if (this.match("IDENTIFIER")) {
        return this.parseImplicitAssignment(lineNumber, this.previous().value);
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

    // Adicionando verificação semântica
    if (
      value.type === "BinaryExpression" &&
      ["<", ">", "<=", ">="].includes(value.operator)
    ) {
      throw new SemanticError(
        `Não é permitido atribuir uma expressão de comparação diretamente a uma variável na linha ${lineNumber}`
      );
    }

    return {
      type: "AssignmentStatement",
      variable: variable.value,
      value: value,
      line: lineNumber,
    };
  }

  parseImplicitAssignment(lineNumber, variableName) {
    this.consume("EQUALS", 'Esperado "=" na atribuição');
    const value = this.parseExpression();
    return {
      type: "AssignmentStatement",
      variable: variableName,
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

  parseIf(lineNumber) {
    const condition = this.parseExpression();
    if (
      this.match("KEYWORD") &&
      this.previous().value.toLowerCase() === "goto"
    ) {
      const gotoStatement = this.parseGoto(lineNumber);
      return {
        type: "IfGotoStatement",
        condition: condition,
        gotoStatement: gotoStatement,
        line: lineNumber,
      };
    } else if (
      this.match("KEYWORD") &&
      this.previous().value.toLowerCase() === "then"
    ) {
      const thenBranch = this.parseStatement();
      return {
        type: "IfThenStatement",
        condition: condition,
        thenBranch: thenBranch,
        line: lineNumber,
      };
    } else {
      throw new Error("Esperado 'GOTO' ou 'THEN' após a condição do IF");
    }
  }

  parseGoto(lineNumber) {
    const lineNumberToGoto = this.consume(
      "NUMBER",
      "Esperado número da linha após 'goto'"
    );
    return {
      type: "GotoStatement",
      lineNumber: lineNumberToGoto.value,
      line: lineNumber,
    };
  }

  parseExpression() {
    return this.parseRelational();
  }

  parseRelational() {
    let expr = this.parseAdditive();

    while (this.match("COMPARISON")) {
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
    let expr = this.parseTerm();

    while (this.match("OPERATOR")) {
      const operator = this.previous().value;
      const right = this.parseTerm();
      expr = {
        type: "BinaryExpression",
        operator: operator,
        left: expr,
        right: right,
      };
    }

    return expr;
  }

  parseTerm() {
    if (this.match("NUMBER")) {
      return {
        type: "Literal",
        value: this.previous().value,
      };
    }

    if (this.match("IDENTIFIER")) {
      return {
        type: "Variable",
        name: this.previous().value,
      };
    }

    throw new Error(`Expressão inválida na linha ${this.peek().line}`);
  }

  consume(type, message) {
    if (this.check(type)) {
      return this.advance();
    }

    throw new Error(message);
  }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  check(type) {
    if (this.isAtEnd()) {
      return false;
    }
    return this.peek().type === type;
  }

  advance() {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  }

  isAtEnd() {
    return this.current >= this.tokens.length;
  }

  peek() {
    return this.tokens[this.current];
  }

  previous() {
    return this.tokens[this.current - 1];
  }
}

try {
  const input = fs.readFileSync("entrada.txt", "utf-8");
  const lexer = new Lexer(input);
  const tokens = lexer.tokenize();

  const parser = new Parser(tokens);
  const program = parser.parse();

  console.log("Tokens:", tokens);
  console.log("Árvore Sintática:", JSON.stringify(program, null, 2));
} catch (error) {
  console.error(error.message);
}
