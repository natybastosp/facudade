/* 
Juliana Alves Pacheco - 2122082026
Natalia Bastos Pereira - 2212082020
*/

const fs = require("fs");

// Função que processa o código em SIMPLE e gera o código em SML
function compile(source) {
  const binaryCode = [];

  // Mapeamento de linhas do código SIMPLE para SML (exemplo simplificado)
  const simpleToSML = {
    rem: "+0000",
    input: "+1014", // Mapeie conforme necessário
    goto: "+2115",
    let: "+4110",
    if: "+3016",
    print: "+2014",
    end: "+0001",
  };

  const lines = source.split("\n");

  lines.forEach((line) => {
    const parts = line.trim().split(" ");
    const lineNum = parts[0]; // O número da linha (05, 10, etc.)
    const command = parts[1]; // O comando (rem, input, etc.)

    if (simpleToSML[command]) {
      binaryCode.push(simpleToSML[command]);
    }
  });

  return binaryCode.join("\n");
}

// Função principal
function main() {
  // Ler o arquivo source.txt
  fs.readFile("source.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo source.txt:", err);
      return;
    }

    // Compilar o código
    const binaryOutput = compile(data);

    // Escrever o resultado em binary.txt
    fs.writeFile("binary.txt", binaryOutput, (err) => {
      if (err) {
        console.error("Erro ao escrever o arquivo binary.txt:", err);
        return;
      }
      console.log("Compilação concluída. binary.txt gerado com sucesso.");
    });
  });
}

// Invocar a função principal
main();
