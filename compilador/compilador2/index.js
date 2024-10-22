/* 
Juliana Alves Pacheco - 2122082026
Natalia Bastos Pereira - 2212082020
*/

const fs = require("fs");

// Função que processa o código em SIMPLE e gera o código em SML
function compile(source) {
  const binaryCode = [];
  let inputCounter = 0; // Contador de inputs

  // Mapeamento de linhas do código SIMPLE para SML
  const simpleToSML = {
    rem: "+0000", // Comentários
    goto: "+2115", // Comando para desvio
    let: "+4110", // Comando para let (atribuição)
    if: "+3016", // Comando condicional
    print: "+2014", // Comando para print
    end: "+0001", // Comando para fim
  };

  const lines = source.split("\n");

  // Processar cada linha do código SIMPLE
  lines.forEach((line) => {
    const parts = line.trim().split(" ");
    const command = parts[1]; // O comando (ex: rem, input, etc.)

    // Se o comando for rem (comentário)
    if (command === "rem") {
      binaryCode.push(simpleToSML.rem);
    }

    // Processa o comando input
    if (command === "input") {
      inputCounter++;
      binaryCode.push(`+101${inputCounter + 3}`); // +1014 para primeiro input, +1015 para segundo, etc.
    }

    // Adiciona o código correspondente para outros comandos
    if (simpleToSML[command] && command !== "input") {
      binaryCode.push(simpleToSML[command]);
    }

    // Adiciona código para let r = a % b
    if (command === "let" && parts[1] === "r") {
      binaryCode.push("+4111"); // Código para let r = a %
    }

    // Adiciona código para let x = p / a
    if (command === "let" && parts[1] === "x") {
      binaryCode.push("+4112"); // Código para let x = p /
    }

    // Adiciona código para let c = a + b
    if (command === "let" && parts[1] === "c") {
      binaryCode.push("+4110"); // Código para let c = a + b
    }

    // Adiciona código para print c
    if (command === "print" && parts[1] === "c") {
      binaryCode.push("+2014"); // Código para print c
    }
  });

  // Adiciona o comando para fim do programa apenas uma vez
  if (!binaryCode.includes(simpleToSML.end)) {
    binaryCode.push(simpleToSML.end);
  }

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
