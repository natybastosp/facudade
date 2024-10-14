const fs = require("fs");

// Dicionário de mapeamento de instruções SIMPLE para SML
const instructionMap = {
  input: 10, // SIMPLE: input X -> SML: +10XX
  print: 11, // SIMPLE: print X -> SML: +11XX
  let: null, // SIMPLE: let A = B -> gerado dinamicamente
  if: null, // SIMPLE: if -> gerado dinamicamente
  goto: 40, // SIMPLE: goto -> SML: +40XX (branch)
  end: 43, // SIMPLE: end -> SML: +4300
};

// Função para compilar SIMPLE para SML
function compileSimpleToSML(sourceFile, outputFile) {
  fs.readFile(sourceFile, "utf8", (err, data) => {
    if (err) {
      console.error(`Erro ao ler o arquivo: ${err.message}`);
      return;
    }

    const lines = data.trim().split("\n"); // Separar o arquivo em linhas
    const binaryCode = [];
    const variables = {}; // Mapeamento de variáveis para posições de memória
    let memoryAddress = 0;

    // Traduzir cada linha do código SIMPLE para SML
    lines.forEach((line, lineNumber) => {
      const tokens = line.trim().split(/\s+/); // Dividir por espaços em branco
      const instruction = tokens[1];
      const operand = tokens.slice(2).join(" ");

      // Tratamento de "input" e "print"
      if (instruction === "input" || instruction === "print") {
        const variable = operand;
        if (!variables[variable]) {
          variables[variable] = memoryAddress++;
        }
        const address = variables[variable].toString().padStart(2, "0");
        const opcode = instructionMap[instruction];
        binaryCode.push(`+${opcode}${address}`);
      }

      // Tratamento de "let" para aritmética
      else if (instruction === "let") {
        const [variable, operation] = operand.split("=").map((s) => s.trim());
        if (!variables[variable]) {
          variables[variable] = memoryAddress++;
        }

        // "let f = f * n"
        if (operation.includes("*")) {
          const [leftVar, rightVar] = operation.split("*").map((s) => s.trim());
          if (!variables[rightVar]) {
            variables[rightVar] = memoryAddress++;
          }
          const leftAddress = variables[leftVar].toString().padStart(2, "0");
          const rightAddress = variables[rightVar].toString().padStart(2, "0");
          binaryCode.push(`+20${leftAddress}`); // LOAD f
          binaryCode.push(`+33${rightAddress}`); // MULT n
          binaryCode.push(`+21${leftAddress}`); // STORE f
        }

        // "let f = 1" (atribuição direta)
        else {
          const value = parseInt(operation);
          binaryCode.push(`+20${value.toString().padStart(4, "0")}`); // Carrega valor direto
          binaryCode.push(
            `+21${variables[variable].toString().padStart(2, "0")}`
          ); // Store na variável
        }
      }

      // Tratamento de "if" (desvio condicional)
      else if (instruction === "if") {
        const [leftVar, operator, rightVar, , gotoLine] = operand.split(/\s+/);

        if (!variables[leftVar]) {
          variables[leftVar] = memoryAddress++;
        }
        if (!variables[rightVar]) {
          variables[rightVar] = memoryAddress++;
        }

        const leftAddress = variables[leftVar].toString().padStart(2, "0");
        const rightAddress = variables[rightVar].toString().padStart(2, "0");
        const targetLine = parseInt(gotoLine).toString().padStart(2, "0");

        binaryCode.push(`+20${leftAddress}`); // LOAD n
        if (operator === "<") {
          binaryCode.push(`+31${rightAddress}`); // SUB n
          binaryCode.push(`+41${targetLine}`); // BRANCHNEG
        }
      }

      // Tratamento de "goto"
      else if (instruction === "goto") {
        const targetLine = parseInt(operand).toString().padStart(2, "0");
        binaryCode.push(`+40${targetLine}`); // GOTO
      }

      // Tratamento de "end"
      else if (instruction === "end") {
        binaryCode.push("+4300"); // HALT
      }
    });

    // Escrever o arquivo binary.txt com o código SML
    fs.writeFile(outputFile, binaryCode.join("\n"), (err) => {
      if (err) {
        console.error(`Erro ao salvar o arquivo: ${err.message}`);
      } else {
        console.log(
          `Compilação concluída com sucesso! O código SML foi salvo em ${outputFile}`
        );
      }
    });
  });
}

// Chamar a função de compilação
const sourceFile = "source.txt"; // Nome do arquivo de entrada
const outputFile = "binary.txt"; // Nome do arquivo de saída

compileSimpleToSML(sourceFile, outputFile);
