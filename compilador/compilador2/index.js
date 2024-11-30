const fs = require("fs");
const path = require("path");

/**
 * Função para mapear comandos SIMPLE para SML
 */
function compileSIMPLEtoSML(simpleCode) {
  const instructionMap = {
    INPUT: 10,
    OUTPUT: 11,
    LET: 20, // Operação baseada no acumulador
    IF: null, // Controle condicional tratado separadamente
    GOTO: 40,
    END: 43,
  };

  const compiled = [];
  const labels = {};
  const unresolvedJumps = [];

  // Separar linhas e processar código SIMPLE
  const lines = simpleCode.split("\n");
  lines.forEach((line, idx) => {
    // Remover comentários e espaços extras
    const cleanLine = line.split("//")[0].trim();
    if (!cleanLine) return;

    const [label, command, ...args] = cleanLine.split(/\s+/);

    // Verificar se a linha contém um label
    if (!isNaN(label)) {
      labels[label] = compiled.length; // Registrar posição do label
    }

    if (command.toUpperCase() === "REM") {
      return; // Ignora a linha
    }

    switch (command.toUpperCase()) {
      case "INPUT": {
        const memoryAddress = args[0];
        compiled.push(`+10${memoryAddress}`);
        break;
      }
      case "OUTPUT": {
        const memoryAddress = args[0];
        compiled.push(`+11${memoryAddress}`);
        break;
      }
      case "LET": {
        // Lógica para LET - Exemplo: LET x = y + z
        // Exige parsing adicional para traduzir para LOAD/STORE/ADD/SUB/MUL/DIV
        const [variable, operation] = args.join(" ").split("=");
        const [operand1, operator, operand2] = operation.trim().split(/\s+/);
        if (operator === "+") {
          compiled.push(`+20${operand1}`); // LOAD operand1
          compiled.push(`+30${operand2}`); // ADD operand2
          compiled.push(`+21${variable}`); // STORE resultado em variable
        } else if (operator === "-") {
          compiled.push(`+20${operand1}`); // LOAD operand1
          compiled.push(`+31${operand2}`); // SUB operand2
          compiled.push(`+21${variable}`); // STORE resultado em variable
        }
        // Adicionar mais operadores conforme necessário.
        break;
      }
      case "IF": {
        // Exemplo: IF x == y GOTO label
        const [condition, targetLabel] = args.join(" ").split("GOTO");
        const [operand1, operator, operand2] = condition.trim().split(/\s+/);

        compiled.push(`+20${operand1}`); // LOAD operand1
        if (operator === "==") {
          compiled.push(`+31${operand2}`); // SUB operand2
          unresolvedJumps.push({
            label: targetLabel.trim(),
            index: compiled.length,
          });
          compiled.push(`+42XX`); // BRANCHZERO XX (resolvido mais tarde)
        } else if (operator === "<") {
          compiled.push(`+31${operand2}`); // SUB operand2
          unresolvedJumps.push({
            label: targetLabel.trim(),
            index: compiled.length,
          });
          compiled.push(`+41XX`); // BRANCHNEG XX (resolvido mais tarde)
        }
        break;
      }
      case "GOTO": {
        unresolvedJumps.push({ label: args[0], index: compiled.length });
        compiled.push(`+40XX`); // BRANCH XX (resolvido mais tarde)
        break;
      }
      case "END": {
        compiled.push("+4300"); // HALT
        break;
      }
      default:
        console.warn(`Comando desconhecido na linha ${idx + 1}: ${command}`);
    }
    return variableMap[variable].toString().padStart(2, '0');
}

  // Resolver jumps
  unresolvedJumps.forEach(({ label, index }) => {
    if (labels[label] !== undefined) {
      const resolvedAddress = labels[label].toString().padStart(2, "0");
      compiled[index] = compiled[index].replace("XX", resolvedAddress);
    } else {
      throw new Error(`Label não encontrado: ${label}`);
    }
  });

  return compiled.join("\n");
}

/**
 * Função principal para executar o compilador
 */
function main() {
  const sourcePath = path.resolve(__dirname, "source.txt");
  const binaryPath = path.resolve(__dirname, "binary.txt");

  try {
    // Ler o arquivo de entrada
    const simpleCode = fs.readFileSync(sourcePath, "utf-8");

    // Compilar código SIMPLE para SML
    const binaryCode = compileSIMPLEtoSML(simpleCode);

    // Escrever o arquivo de saída
    fs.writeFileSync(binaryPath, binaryCode, "utf-8");
    console.log(`Compilação concluída. Código SML salvo em ${binaryPath}`);
  } catch (error) {
    console.error("Erro durante a compilação:", error.message);
  }
}

main();
