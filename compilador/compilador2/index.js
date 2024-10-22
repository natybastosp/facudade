const fs = require("fs");

// Função para converter as instruções do source.txt para SML
function convertToSML(sourceCode) {
  const lines = sourceCode.split("\n").map((line) => line.trim());
  const smlProgram = [];

  lines.forEach((line) => {
    const [lineNumber, command] = line.split(" ", 2); // Divide o número da linha do comando

    switch (parseInt(lineNumber)) {
      case 10: // input n
        smlProgram.push("+1014"); // Ler valor e armazenar na posição 14
        break;
      case 15: // if n < 0 goto 45
        smlProgram.push("+2014"); // Carrega n
        smlProgram.push("+4110"); // Se n < 0, vá para 45
        break;
      case 20: // let f = 1
        smlProgram.push("+2001"); // Carrega 1
        smlProgram.push("+2115"); // Armazena 1 em f
        break;
      case 25: // if n < 2 goto 50
        smlProgram.push("+2014"); // Carrega n
        smlProgram.push("+3116"); // Subtrai 2 de n
        smlProgram.push("+4212"); // Se n < 2, vá para a linha 50
        break;
      case 30: // let f = f * n
        smlProgram.push("+2015"); // Carrega f
        smlProgram.push("+3314"); // Multiplica f por n
        smlProgram.push("+2115"); // Armazena o resultado em f
        break;
      case 35: // let n = n - 1
        smlProgram.push("+2014"); // Carrega n
        smlProgram.push("+3117"); // Subtrai 1
        smlProgram.push("+2114"); // Armazena o resultado em n
        break;
      case 40: // goto 25
        smlProgram.push("+4025"); // Vá para a linha 25
        break;
      case 45: // let f = -1
        smlProgram.push("+2002"); // Carrega -1
        smlProgram.push("+2115"); // Armazena -1 em f
        break;
      case 50: // print f
        smlProgram.push("+1115"); // Imprime o valor de f
        break;
      case 55: // end
        smlProgram.push("+4300"); // Termina o programa
        break;
      default:
        console.log(`Linha desconhecida: ${lineNumber}`);
        break;
    }
  });

  return smlProgram;
}

// Função principal para ler, converter e gravar o SML no arquivo binary.txt
function processFiles() {
  // Ler o arquivo source.txt
  fs.readFile("source.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo source.txt", err);
      return;
    }

    // Converte o código para SML
    const smlProgram = convertToSML(data);

    // Escreve as instruções SML no arquivo binary.txt
    fs.writeFile("binary.txt", smlProgram.join("\n"), (err) => {
      if (err) {
        console.error("Erro ao escrever o arquivo binary.txt", err);
        return;
      }
      console.log("Programa SML gravado com sucesso no binary.txt!");
    });
  });
}

// Executa o processo
processFiles();
