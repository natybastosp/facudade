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

// Posições fixas para o programa do fatorial
const MEMORY = {
  N: 14, // Variável n
  F: 15, // Variável f
  ONE: 15, // Constante 1
  NEG_ONE: 16, // Constante -1
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
    console.error("Erro ao ler o arquivo source.txt:", err);
    return null;
  }
}

function generateFactorialSML() {
  const smlCode = [
    // 1. Lê o valor de n
    OPCODES.READ * 100 + MEMORY.N, // +1014

    // 2. Carrega n e verifica se é negativo
    OPCODES.LOAD * 100 + MEMORY.N, // +2014
    OPCODES.BRANCHNEG * 100 + 10, // +4110

    // 3. Verifica se é zero
    OPCODES.BRANCHZERO * 100 + 12, // +4212

    // 4. Multiplica n pelo fatorial atual
    OPCODES.MULTIPLY * 100 + MEMORY.ONE, // +3315
    OPCODES.STORE * 100 + MEMORY.F, // +2115

    // 5. Decrementa n
    OPCODES.LOAD * 100 + MEMORY.N, // +2014
    OPCODES.SUBTRACT * 100 + 16, // +3016
    OPCODES.STORE * 100 + MEMORY.N, // +2114

    // 6. Volta ao início do loop
    OPCODES.BRANCH * 100 + 3, // +4003

    // 7. Imprime o resultado
    OPCODES.WRITE * 100 + 16, // +1116
    OPCODES.HALT * 100 + 0, // +4300

    // 8. Caso especial (n < 0)
    OPCODES.WRITE * 100 + 15, // +1115
    OPCODES.HALT * 100 + 0, // +4300

    // 9. Variáveis e constantes
    0, // +0000 (n)
    1, // +0001 (constante 1)
    -1, // -0001 (constante -1)
  ];

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
    const smlCode = generateFactorialSML();
    writeBinaryCode(smlCode);
  }
}

main();
