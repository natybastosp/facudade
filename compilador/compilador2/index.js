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

    switch (command) {
      case "rem":
        binaryCode.push(simpleToSML.rem); // Adiciona código de comentário
        console.log("Comentário:", parts.slice(2).join(" "));
        break;

      case "input":
        inputCounter++;
        binaryCode.push(`+101${inputCounter + 3}`); // +1014 para primeiro input, +1015 para segundo, etc.
        break;

      case "let":
        binaryCode.push(simpleToSML.let); // Adiciona código de let
        break;

      case "print":
        binaryCode.push(simpleToSML.print); // Adiciona código de print
        break;

      case "if":
        binaryCode.push(simpleToSML.if); // Adiciona código de if
        break;

      default:
        // Gerenciamento de operações
        if (parts.length > 1) {
          const operation = parts[1]; // Operação a ser realizada

          if (command === "let" && operation === "c") {
            binaryCode.push(simpleToSML.let); // Código para let
          }

          if (command === "goto") {
            binaryCode.push(simpleToSML.goto); // Adiciona código para goto
          }

          // Verifica se a linha contém um comando de desvio
          if (command === "if") {
            binaryCode.push(simpleToSML.if); // Código para if
            binaryCode.push(simpleToSML.goto); // Código para desvio
          }
        }
        break; // Não faz nada se o comando não for reconhecido
    }
  });

  // Adiciona o comando para fim do programa apenas uma vez
  if (!binaryCode.includes(simpleToSML.end)) {
    binaryCode.push(simpleToSML.end); // Adiciona código de fim
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
