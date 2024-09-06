/*
Juliana Alves Pacheco 2122082026
Natalia Baastos Pereira 2212082020
*/

const fs = require("fs");

// Analisador Léxico
class LexicalAnalyzer {
  constructor() {
    this.tokenDefinitions = [
      { category: "LINE_NUMBER", pattern: /^\d+/ },
      { category: "KEYWORD", pattern: /\b(rem|input|let|if|goto|print|end)\b/ },
      {
        category: "IDENTIFIER",
        pattern:
          /[a-zA-ZçãõâêîôûáéíóúàèìòùÇÃÕÂÊÎÔÛÁÉÍÓÚÀÈÌÒÙ][a-zA-Z0-9çãõâêîôûáéíóúàèìòùÇÃÕÂÊÎÔÛÁÉÍÓÚÀÈÌÒÙ]*/,
      },
      { category: "NUMBER", pattern: /^\d+/ },
      { category: "ASSIGN_OPERATOR", pattern: /^=/ },
      { category: "MATH_OPERATOR", pattern: /^[+\-*/%]/ },
      { category: "WHITESPACE", pattern: /^\s+/ },
    ];
  }

  extractNextToken(line) {
    for (let def of this.tokenDefinitions) {
      const match = line.match(def.pattern);
      if (match) {
        return { category: def.category, value: match[0] };
      }
    }
    return null;
  }

  analyze(line) {
    let tokens = [];
    let awaitingAssignment = false;

    while (line.length > 0) {
      const token = this.extractNextToken(line);

      if (!token) {
        this.displayError(`Unrecognized token in line: ${line}`);
        break;
      }

      if (token.category === "WHITESPACE") {
        line = line.slice(token.value.length);
        continue;
      }

      tokens.push({ category: token.category, value: token.value });
      line = line.slice(token.value.length);

      if (token.category === "KEYWORD" && token.value.toLowerCase() === "let") {
        awaitingAssignment = true;
      }

      if (token.category === "KEYWORD" && token.value.toLowerCase() === "rem") {
        return tokens;
      }
    }

    return tokens;
  }

  displayError(message) {
    console.error(`Error: ${message}`);
  }
}

// Analisador Sintático
class SyntacticAnalyzer {
  constructor(validLines) {
    this.statementHandlers = {
      LET: this.processLet.bind(this),
      IF: this.processIf.bind(this),
      GOTO: this.processGoto.bind(this),
      PRINT: this.processPrint.bind(this),
      INPUT: this.processInput.bind(this),
      REM: () => ({ type: "REM" }),
      END: () => ({ type: "END" }),
    };
    this.validLines = validLines;
  }

  analyze(tokens) {
    let index = 0;
    const lineNumber = tokens[index].value;
    index++;

    const statementToken = tokens[index];
    const statement = statementToken.value.toUpperCase();

    if (this.statementHandlers[statement]) {
      return this.statementHandlers[statement](tokens, index + 1, lineNumber);
    } else {
      this.displayError(
        `Syntax Error: Invalid statement or unknown keyword in line ${lineNumber}.`
      );
    }
  }

  processLet(tokens, index, lineNumber) {
    if (tokens[index].category === "IDENTIFIER") {
      const identifier = tokens[index].value;
      index++;

      if (
        tokens[index].category === "ASSIGN_OPERATOR" &&
        tokens[index].value === "="
      ) {
        index++;

        let expression = [];
        while (index < tokens.length) {
          const token = tokens[index];

          if (token.category === "IDENTIFIER" || token.category === "NUMBER") {
            expression.push(token);
          } else if (token.category === "MATH_OPERATOR") {
            if (
              expression.length === 0 ||
              expression[expression.length - 1].category === "MATH_OPERATOR"
            ) {
              this.displayError(
                `Syntax Error: Operator without valid operands in line ${lineNumber}.`
              );
            }
            expression.push(token);
          } else {
            this.displayError(
              `Syntax Error: Unexpected token in LET expression in line ${lineNumber}.`
            );
          }
          index++;
        }

        if (
          expression.length > 0 &&
          expression[expression.length - 1].category === "MATH_OPERATOR"
        ) {
          this.displayError(
            `Syntax Error: Expression cannot end with an operator in line ${lineNumber}.`
          );
        }

        return { type: "LET", identifier, expression, lineNumber };
      } else {
        this.displayError(
          `Syntax Error: Missing "=" operator after variable in line ${lineNumber}.`
        );
      }
    } else {
      this.displayError(
        `Syntax Error: Expected identifier after LET in line ${lineNumber}.`
      );
    }
  }

  processIf(tokens, index, lineNumber) {
    const thenIndex = tokens.findIndex(
      (token, i) => token.value.toUpperCase() === "THEN" && i > index
    );
    if (thenIndex === -1) {
      this.displayError(
        `Syntax Error: Missing "THEN" keyword in IF statement in line ${lineNumber}.`
      );
    }

    const condition = tokens.slice(index, thenIndex);
    const gotoLine = tokens[thenIndex + 1].value;
    if (!this.validLines.includes(gotoLine)) {
      this.displayError(
        `Syntax Error: Destination line ${gotoLine} does not exist in line ${lineNumber}.`
      );
    }

    return { type: "IF", condition, gotoLine, lineNumber };
  }

  processGoto(tokens, index, lineNumber) {
    const gotoLine = tokens[index].value;
    if (!this.validLines.includes(gotoLine)) {
      this.displayError(
        `Syntax Error: Destination line ${gotoLine} does not exist in line ${lineNumber}.`
      );
    }
    return { type: "GOTO", gotoLine, lineNumber };
  }

  processPrint(tokens, index, lineNumber) {
    if (tokens[index].category === "IDENTIFIER") {
      return { type: "PRINT", identifier: tokens[index].value, lineNumber };
    } else {
      this.displayError(
        `Syntax Error: Invalid PRINT statement in line ${lineNumber}.`
      );
    }
  }

  processInput(tokens, index, lineNumber) {
    if (tokens[index].category === "IDENTIFIER") {
      return { type: "INPUT", identifier: tokens[index].value, lineNumber };
    } else {
      this.displayError(
        `Syntax Error: Invalid INPUT statement in line ${lineNumber}.`
      );
    }
  }

  displayError(message) {
    console.error(`Error: ${message}`);
  }
}

// Analisador Semântico
class SemanticAnalyzer {
  constructor() {
    this.variables = {};
  }

  analyze(ast) {
    switch (ast.type) {
      case "LET":
        this.checkExpression(ast.expression);
        this.variables[ast.identifier] = true;
        return true;
      case "INPUT":
        this.variables[ast.identifier] = true;
        return true;
      case "PRINT":
        if (!this.variables[ast.identifier]) {
          this.displayError(
            `Semantic Error: Variable "${ast.identifier}" not defined in line ${ast.lineNumber}.`
          );
        }
        return true;
      default:
        return true;
    }
  }

  checkExpression(expression) {
    expression.forEach((token) => {
      if (token.category === "IDENTIFIER" && !this.variables[token.value]) {
        this.displayError(
          `Semantic Error: Variable "${token.value}" used in expression not defined.`
        );
      }
    });
  }

  displayError(message) {
    console.error(`Error: ${message}`);
  }
}

// Função principal de compilação
function compile(filename) {
  const lexer = new LexicalAnalyzer();
  const validLines = [];
  const processedLines = new Set();
  let lastLine = 0;
  let foundEnd = false;

  const lines = fs.readFileSync(filename, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (!/^\d+/.test(line.trim())) {
      console.error(`Error: Line ${index + 1} does not start with a number.`);
    }

    const tokens = lexer.analyze(line);
    const lineNumber = parseInt(tokens[0].value);

    if (processedLines.has(lineNumber)) {
      console.error(`Error: Line ${lineNumber} has already been used.`);
    }

    if (lineNumber <= lastLine) {
      console.error(
        `Error: Line ${lineNumber} is out of order. Should be greater than line ${lastLine}.`
      );
    }

    processedLines.add(lineNumber);
    lastLine = lineNumber;

    if (
      tokens.some(
        (token) => token.category === "KEYWORD" && token.value === "end"
      )
    ) {
      foundEnd = true;
    } else if (foundEnd) {
      console.error(
        `Error: The "end" command must be the last line of the program, found issue in line ${lineNumber}.`
      );
    }

    validLines.push(lineNumber);
  });

  if (!foundEnd) {
    console.error(`Error: The program must end with the "end" command.`);
  }

  const syntaxAnalyzer = new SyntacticAnalyzer(validLines);
  const semanticAnalyzer = new SemanticAnalyzer();

  lines.forEach((line) => {
    try {
      const tokens = lexer.analyze(line);
      const ast = syntaxAnalyzer.analyze(tokens);
      semanticAnalyzer.analyze(ast);
    } catch (error) {
      console.error(error.message);
    }
  });
}

compile("entrada.txt");
