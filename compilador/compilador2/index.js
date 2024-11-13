const fs = require("fs");

// Constantes para os códigos de operação da SML
const OPCODES = {
  READ: 10,
  WRITE: 11,
  LOAD: 20,
  STORE: 21,
  ADD: 30,
  SUBTRACT: 31,
  DIVIDE: 32,
  MULTIPLY: 33,
  MODULE: 34,
  BRANCH: 40,
  BRANCHNEG: 41,
  BRANCHZERO: 42,
  HALT: 43,
};

// Função para ler o código SIMPLE do arquivo source.txt
function readSourceCode() {
  try {
    const data = fs.readFileSync("source.txt", "utf8");
    const lines = data.trim().split("\n");
    const program = [];

    for (const line of lines) {
      const [lineNumber, ...command] = line.split(" ");
      program.push({ lineNumber: parseInt(lineNumber), command });
    }

    return program;
  } catch (err) {
    console.error("Erro ao ler o arquivo source.txt:", err);
    return null;
  }
}

// Função para gerar o código SML a partir do código SIMPLE
function generateSMLCode(program) {
  const smlCode = [];
  let memoryIndex = 0;
  let labelPositions = {};

  // Primeiro passo: Localizar as posições dos rótulos
  for (const { lineNumber, command } of program) {
    switch (command[0]) {
      case "rem":
      case "input":
      case "let":
      case "print":
        memoryIndex += command[0] === "let" ? 2 : 1;
        break;
      case "if":
        labelPositions[parseInt(command[5])] = memoryIndex + 2;
        memoryIndex += 2;
        break;
      case "goto":
        labelPositions[parseInt(command[1])] = memoryIndex + 1;
        memoryIndex += 1;
        break;
      case "end":
        memoryIndex += 1;
        break;
      default:
        console.error(`Instrução inválida na linha ${lineNumber}: ${line}`);
        return null;
    }
  }

  // Segundo passo: Gerar as instruções SML
  memoryIndex = 0;
  for (const { lineNumber, command } of program) {
    switch (command[0]) {
      case "rem":
        // Ignorar linhas de comentário
        break;
      case "input":
        // Gerar instrução READ para ler a entrada do usuário
        smlCode.push(OPCODES.READ * 100 + memoryIndex);
        smlCode.push(OPCODES.STORE * 100 + memoryIndex);
        memoryIndex++;
        break;
      case "let":
        if (command[1] === "f") {
          // Gerar instrução LOAD e STORE para atribuir valor à variável 'f'
          smlCode.push(OPCODES.LOAD * 100 + parseInt(command[3]));
          smlCode.push(OPCODES.STORE * 100 + memoryIndex);
        } else if (command[1] === "n") {
          // Gerar instrução LOAD e STORE para atribuir valor à variável 'n'
          smlCode.push(OPCODES.LOAD * 100 + parseInt(command[3]));
          smlCode.push(OPCODES.STORE * 100 + memoryIndex + 1);
        }
        memoryIndex += 2;
        break;
      case "if":
        // Gerar instrução LOAD, BRANCHNEG e BRANCH para realizar o salto condicional
        smlCode.push(OPCODES.LOAD * 100 + memoryIndex + 1);
        smlCode.push(
          OPCODES.BRANCHNEG * 100 + labelPositions[parseInt(command[5])]
        );
        smlCode.push(
          OPCODES.BRANCH * 100 + labelPositions[parseInt(command[5])]
        );
        memoryIndex += 2;
        break;
      case "goto":
        // Gerar instrução BRANCH para realizar o salto incondicional
        smlCode.push(
          OPCODES.BRANCH * 100 + labelPositions[parseInt(command[1])]
        );
        break;
      case "print":
        // Gerar instrução LOAD e WRITE para imprimir o valor da variável 'f'
        smlCode.push(OPCODES.LOAD * 100 + memoryIndex);
        smlCode.push(OPCODES.WRITE * 100 + 0);
        memoryIndex += 1;
        break;
      case "end":
        // Gerar instrução HALT para finalizar o programa
        smlCode.push(OPCODES.HALT * 100 + 0);
        break;
      default:
        console.error(`Instrução inválida na linha ${lineNumber}: ${line}`);
        return null;
    }
  }

  return smlCode;
}

// Função para escrever o código SML no arquivo binary.txt
function writeBinaryCode(code) {
  try {
    const data = code
      .map((instruction) => `+${instruction.toString().padStart(4, "0")}`)
      .join("\n");
    fs.writeFileSync("binary.txt", data);
    console.log("Código SML gerado com sucesso em binary.txt");
  } catch (err) {
    console.error("Erro ao escrever o arquivo binary.txt:", err);
  }
}

// Ponto de entrada do programa
function main() {
  const sourceCode = readSourceCode();
  if (sourceCode !== null) {
    const smlCode = generateSMLCode(sourceCode);
    if (smlCode !== null) {
      writeBinaryCode(smlCode);
    }
  }
}

main();
