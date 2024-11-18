const fs = require("fs");

class TableEntry {
  constructor(symbol, type, location) {
    this.symbol = symbol;
    this.type = type; // 'C' para constante, 'L' para linha, 'V' para variável
    this.location = location; // Localização na memória
  }
}

const symbolTable = [];
let instructionCounter = 0;
let dataCounter = 99;
let memory = Array(100).fill(0);
let flags = new Map(); // Substituímos o array por um mapa

// Função para adicionar símbolos à tabela
function addSymbol(symbol, type) {
  let entry = symbolTable.find((e) => e.symbol === symbol && e.type === type);
  if (!entry) {
    const location =
      type === "C" || type === "V" ? dataCounter-- : instructionCounter;
    entry = new TableEntry(symbol, type, location);
    symbolTable.push(entry);
  }
  return entry.location;
}

// Validações das linhas de entrada
function validateLine(line) {
  const tokens = line.trim().split(" ");
  if (tokens.length < 2) {
    console.error("Erro: Linha inválida", line);
    return false;
  }

  const lineNumber = parseInt(tokens[0]);
  if (isNaN(lineNumber) || lineNumber < 0 || lineNumber > 99) {
    console.error("Erro: Número da linha inválido", line);
    return false;
  }

  const validCommands = ["rem", "input", "if", "let", "goto", "print", "end"];

  if (!validCommands.includes(tokens[1])) {
    console.error("Erro: Comando não reconhecido", tokens[1]);
    return false;
  }

  return true;
}

// Processamento do comando `if`
function processIf(tokens) {
  const condVar = tokens[2];
  const operator = tokens[3];
  const compareValue = parseInt(tokens[4]);
  const jumpLine = parseInt(tokens[6]);

  const condLoc = addSymbol(condVar.charCodeAt(0), "V");
  memory[instructionCounter++] = 2000 + condLoc; // LOAD condVar
  const compareLoc = addSymbol(compareValue, "C");
  memory[instructionCounter++] = 3100 + compareLoc; // SUB compareValue

  // Gerenciar operadores
  switch (operator) {
    case "==":
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4200; // BRANCHZERO
      break;
    case "!=":
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4100; // BRANCHNEG
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4200; // BRANCHZERO
      break;
    case "<":
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4100; // BRANCHNEG
      break;
    case "<=":
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4100; // BRANCHNEG
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4200; // BRANCHZERO
      break;
    case ">":
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 3100; // Invertendo a lógica
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4100; // BRANCHNEG
      break;
    case ">=":
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4200; // BRANCHZERO
      flags.set(instructionCounter, jumpLine);
      memory[instructionCounter++] = 4100; // BRANCHNEG
      break;
    default:
      console.error("Operador não reconhecido:", operator);
  }
}

// Processamento do comando `let`
function processLet(tokens) {
  const variable = tokens[2];
  const expression = tokens.slice(4).join(" ");
  const varLoc = addSymbol(variable.charCodeAt(0), "V");

  const exprParts = expression.split(" ");
  if (exprParts.length === 1) {
    const value = isNaN(exprParts[0])
      ? addSymbol(exprParts[0].charCodeAt(0), "V")
      : addSymbol(parseInt(exprParts[0]), "C");
    memory[instructionCounter++] = 2000 + value; // LOAD valor
  } else {
    let currentLoc =
      isNaN(exprParts[0]) === false
        ? addSymbol(parseInt(exprParts[0]), "C")
        : addSymbol(exprParts[0].charCodeAt(0), "V");
    memory[instructionCounter++] = 2000 + currentLoc; // LOAD primeiro operando

    for (let i = 1; i < exprParts.length; i += 2) {
      const operator = exprParts[i];
      const operand =
        isNaN(exprParts[i + 1]) === false
          ? addSymbol(parseInt(exprParts[i + 1]), "C")
          : addSymbol(exprParts[i + 1].charCodeAt(0), "V");
      const operatorCode = {
        "+": 3000,
        "-": 3100,
        "*": 3300,
        "/": 3200,
        "%": 3300,
      }[operator];
      memory[instructionCounter++] = operatorCode + operand; // Operação
    }
  }
  memory[instructionCounter++] = 2100 + varLoc; // STORE variável
}

// Primeira passagem: análise inicial do código
function firstPass(program) {
  program.forEach((line) => {
    if (!validateLine(line)) {
      console.error("Erro: Linha inválida no programa SIMPLE:", line);
      return;
    }
    const tokens = line.split(" ");
    const lineNumber = parseInt(tokens[0]);
    const command = tokens[1];

    addSymbol(lineNumber, "L");

    switch (command) {
      case "rem":
        break;
      case "input":
        const inputVar = tokens[2];
        const inputLoc = addSymbol(inputVar.charCodeAt(0), "V");
        memory[instructionCounter++] = 1000 + inputLoc;
        break;
      case "if":
        processIf(tokens);
        break;
      case "let":
        processLet(tokens);
        break;
      case "goto":
        const targetLine = parseInt(tokens[2]);
        flags.set(instructionCounter, targetLine);
        memory[instructionCounter++] = 4000;
        break;
      case "print":
        const printVar = tokens[2];
        const printLoc = addSymbol(printVar.charCodeAt(0), "V");
        memory[instructionCounter++] = 1100 + printLoc;
        break;
      case "end":
        memory[instructionCounter++] = 4300;
        break;
      default:
        console.error("Comando não reconhecido:", command);
    }
  });
}

// Segunda passagem: resolução de endereços de salto
function secondPass() {
  flags.forEach((targetLine, index) => {
    const targetLoc = symbolTable.find(
      (e) => e.symbol === targetLine && e.type === "L"
    );
    if (targetLoc) {
      memory[index] += targetLoc.location;
    } else {
      console.error("Erro: Linha alvo não encontrada:", targetLine);
    }
  });
}

// Função principal para compilar
function compileSimple(inputFile, outputFile) {
  const source = fs.readFileSync(inputFile, "utf-8").split("\n");
  firstPass(source);
  secondPass();
  const compiled = memory
    .slice(0, instructionCounter)
    .map((x) => String(x).padStart(4, "0"))
    .join("\n");
  fs.writeFileSync(outputFile, compiled);
  console.log("Compilação concluída. Código salvo em", outputFile);
}

// Executar compilador
compileSimple("source.txt", "binary.txt");
