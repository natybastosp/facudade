const fs = require("fs");

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

// Inicializa a memória para as variáveis
let memory = {
  vars: {}, // Mapa para variáveis
  nextAddr: 14, // Endereço de memória disponível para variáveis
};

function readSourceCode() {
  try {
    const data = fs.readFileSync("source.txt", "utf8");
    return data
      .trim()
      .split("\n")
      .map((line) => {
        const [lineNumber, ...command] = line.trim().split(" ");
        return {
          lineNumber: parseInt(lineNumber),
          command: command.filter((c) => c !== ""),
        };
      });
  } catch (err) {
    //console.error("Erro ao ler o arquivo source.txt:", err);
    return null;
  }
}

function getVarAddress(variable) {
  if (!(variable in memory.vars)) {
    memory.vars[variable] = memory.nextAddr++;
  }
  return memory.vars[variable];
}

function generateSML(sourceCode) {
  let smlCode = [];

  sourceCode.forEach((line) => {
    const tokens = line.command;
    const command = tokens[0].toLowerCase();

    // console.log(`Processando comando: ${command} com tokens: ${tokens}`); // Debug

    switch (command) {
      case "rem":
        break; // Ignora os comentários
      case "input":
        const inputVar = tokens[1];
        const inputAddr = getVarAddress(inputVar);
        smlCode.push(OPCODES.READ * 100 + inputAddr); // READ
        break;
      case "print":
        const printVar = tokens[1];
        const printAddr = getVarAddress(printVar);
        smlCode.push(OPCODES.WRITE * 100 + printAddr); // WRITE
        break;
      case "let":
        const varName = tokens[1];
        const op1 = tokens[3];
        const operator = tokens[4];
        const op2 = tokens[5];

        const varAddr = getVarAddress(varName);

        // Verifica se op1 é um número ou uma variável
        const op1Addr = isNaN(op1) ? getVarAddress(op1) : parseInt(op1);
        let op2Addr;

        // Verifica se op2 está presente
        if (op2) {
          // Verifica se op2 é um número negativo
          if (op2[0] === "-") {
            op2Addr = parseInt(op2); // Processa números negativos
          } else if (isNaN(op2)) {
            op2Addr = getVarAddress(op2);
          } else {
            op2Addr = parseInt(op2);
          }
        } else {
          // Caso op2 não exista, não faz nada
          op2Addr = 0; // Ou outra lógica de valor padrão para operações sem op2
        }

        // Carrega op1 para o acumulador
        smlCode.push(OPCODES.LOAD * 100 + op1Addr);

        // Aplica a operação
        switch (operator) {
          case "+":
            smlCode.push(OPCODES.ADD * 100 + op2Addr);
            break;
          case "-":
            smlCode.push(OPCODES.SUBTRACT * 100 + op2Addr);
            break;
          case "*":
            smlCode.push(OPCODES.MULTIPLY * 100 + op2Addr);
            break;
          case "/":
            smlCode.push(OPCODES.DIVIDE * 100 + op2Addr);
            break;
          case "%":
            smlCode.push(OPCODES.MODULE * 100 + op2Addr);
            break;
          default:
            console.error(`Operação desconhecida: ${operator}`);
        }

        // Armazena o resultado na variável
        smlCode.push(OPCODES.STORE * 100 + varAddr);
        break;
      case "if":
        const conditionVar = tokens[1];
        const conditionOperator = tokens[2];
        const conditionValue = tokens[3];
        const label = parseInt(tokens[5]);

        const conditionAddr = getVarAddress(conditionVar);
        const valueAddr = isNaN(conditionValue)
          ? getVarAddress(conditionValue)
          : parseInt(conditionValue);

        // Carrega a variável no acumulador
        smlCode.push(OPCODES.LOAD * 100 + conditionAddr);

        // Aplica a operação condicional
        if (conditionOperator === "<") {
          smlCode.push(OPCODES.SUBTRACT * 100 + valueAddr);
          smlCode.push(OPCODES.BRANCHNEG * 100 + label);
        } else if (conditionOperator === "=") {
          smlCode.push(OPCODES.SUBTRACT * 100 + valueAddr);
          smlCode.push(OPCODES.BRANCHZERO * 100 + label);
        } else if (conditionOperator === ">") {
          smlCode.push(OPCODES.SUBTRACT * 100 + valueAddr);
          smlCode.push(OPCODES.BRANCHNEG * 100 + label);
        }
        break;
      case "goto":
        const gotoLabel = parseInt(tokens[1]);
        smlCode.push(OPCODES.BRANCH * 100 + gotoLabel);
        break;
      case "end":
        smlCode.push(OPCODES.HALT * 100); // Finaliza o programa
        break;
      default:
        console.error(`Comando desconhecido: ${command}`);
    }
  });

  // Adiciona espaços de memória para as variáveis e constantes
  smlCode.push(0); // Endereço da variável n
  smlCode.push(1); // Constante 1
  smlCode.push(-1); // Constante -1

  return smlCode;
}

function writeBinaryCode(code) {
  try {
    const data = code
      .map((instruction) => {
        const prefix = instruction >= 0 ? "+" : "-";
        return `${prefix}${Math.abs(instruction).toString().padStart(4, "0")}`;
      })
      .join("\n");

    fs.writeFileSync("binary.txt", data);
    console.log("Código SML gerado com sucesso em binary.txt");
  } catch (err) {
    console.error("Erro ao escrever o arquivo binary.txt:", err);
  }
}

function main() {
  const sourceCode = readSourceCode();
  if (sourceCode !== null) {
    const smlCode = generateSML(sourceCode);
    writeBinaryCode(smlCode);
  }
}

main();
