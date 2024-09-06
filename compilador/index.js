/*
Juliana Alves Pacheco 2122082026
Natalia Baastos Pereira 2212082020
*/

const fs = require("fs");

function AnalisadorLexico() {
  const tokenDefinitions = [
    { type: "NUMERO_LINHA", regex: /^\d+/ },
    { type: "PALAVRA", regex: /\b(rem|input|let|if|goto|print|end)\b/ },
    {
      type: "IDENTIFICADOR",
      regex:
        /[a-zA-ZçãõâêîôûáéíóúàèìòùÇÃÕÂÊÎÔÛÁÉÍÓÚÀÈÌÒÙ][a-zA-Z0-9çãõâêîôûáéíóúàèìòùÇÃÕÂÊÎÔÛÁÉÍÓÚÀÈÌÒÙ]*/,
    },
    { type: "NUMERO", regex: /^\d+/ },
    { type: "OPERADOR", regex: /^=/ },
    { type: "OPERADOR_MATEMATICO", regex: /^[+\-*/%]/ },
    { type: "ESPACO", regex: /^\s+/ },
  ];

  function obterProximoToken(linha) {
    for (let def of tokenDefinitions) {
      const match = linha.match(def.regex);
      if (match) {
        return { type: def.type, value: match[0] };
      }
    }
    return null;
  }
  // ta dando ruim na função analise ta pegando letras aleatorias
  function analise(linha) {
    // Função que analisa a linha
    let tokens = [];
    let esperaAtribuicao = false;

    while (linha.length > 0) {
      const token = obterProximoToken(linha);
      if (!token) {
        console.log(`Token não reconhecido na linha: ${linha}`);
      }

      // Ignorar espaços
      if (token.type === "ESPACO") {
        linha = linha.slice(token.value.length);
        continue;
      }

      // Adicionar token ao array de tokens
      tokens.push({ tipo: token.type, value: token.value });
      linha = linha.slice(token.value.length);

      if (token.type === "PALAVRA" && token.value.toLowerCase() === "let") {
        esperaAtribuicao = true;
      }

      // Se encontrarmos rem, ignorar o restante da linha
      if (token.type === "PALAVRA" && token.value.toLowerCase() === "rem") {
        return tokens;
      }
    }

    return tokens;
  }

  return { analise };
}

/**
 * AnalisadorSintatico class.
 *
 * @class
 * @param {Array} linhasValidas - The valid lines.
 * @returns {Object} - The AnalisadorSintatico object.
 */
function AnalisadorSintatico(linhasValidas) {
  const statementHandlers = {
    LET: analisarLet,
    IF: analisarIf,
    GOTO: analisarGoto,
    PRINT: analisarPrint,
    INPUT: analisarInput,
    REM: () => ({ tipo: "REM" }),
    END: () => ({ tipo: "END" }),
  };

  function analise(tokens) {
    // Função que analisa os tokens
    let index = 0;
    const linhaNumero = tokens[index].value;
    index++;

    const statementToken = tokens[index];
    const statement = statementToken.value.toUpperCase();

    if (statementHandlers[statement]) {
      return statementHandlers[statement](tokens, index + 1, linhaNumero);
    } else {
      console.log(
        "Erro sintático: instrução inválida ou palavra-chave desconhecida.",
        tokens[index],
        "linha",
        linhaNumero
      );
    }
  }

  // Funções para analisar cada tipo de instrução
  function analisarLet(tokens, index, linhaNumero) {
    if (tokens[index].tipo === "IDENTIFICADOR") {
      const identificador = tokens[index].value;
      index++;

      if (tokens[index].tipo === "OPERADOR" && tokens[index].value === "=") {
        index++;

        let expressao = [];
        while (index < tokens.length) {
          let token = tokens[index];
          if (token.tipo === "IDENTIFICADOR" || token.tipo === "NUMERO") {
            expressao.push(token);
          } else if (token.tipo === "OPERADOR_MATEMATICO") {
            if (
              expressao.length === 0 ||
              expressao[expressao.length - 1].tipo === "OPERADOR_MATEMATICO"
            ) {
              console.log(
                "Erro sintático: Operador sem operandos válidos.",
                tokens[index],
                "linha",
                linhaNumero
              );
            }
            expressao.push(token);
          } else {
            console.log(
              "Erro sintático: Token inesperado na expressão LET.",
              tokens[index],
              "linha",
              linhaNumero
            );
          }
          index++;
        }

        if (
          expressao.length > 0 &&
          expressao[expressao.length - 1].tipo === "OPERADOR_MATEMATICO"
        ) {
          console.log(
            "Erro sintático: Expressão não pode terminar com um operador.",
            tokens[index],
            "linha",
            linhaNumero
          );
        }

        return { tipo: "LET", identificador, expressao, linhaNumero };
      } else {
        console.log(
          "Erro sintático: Faltando operador '=' após a variável.",
          tokens[index],
          "linha",
          linhaNumero
        );
      }
    } else {
      console.log(
        "Erro sintático: Esperado identificador após LET.",
        tokens[index],
        "linha",
        linhaNumero
      );
    }
  }

  // Função para analisar a instrução IF
  function analisarIf(tokens, index, linhaNumero) {
    const thenIndex = tokens.findIndex(
      (token, i) => token.value.toUpperCase() === "THEN" && i > index
    );
    if (thenIndex === -1) {
      console.log(
        "Erro sintático: falta a palavra-chave THEN na instrução IF.",
        tokens[index],
        "linha",
        linhaNumero
      );
    }

    const condition = tokens.slice(index, thenIndex);
    const gotoLine = tokens[thenIndex + 1].value;
    if (!linhasValidas.includes(gotoLine)) {
      console.log(
        `Erro sintático: linha de destino ${gotoLine} não existe.`,
        tokens[index]
      );
    }

    return { tipo: "IF", condition, gotoLine, linhaNumero };
  }

  function analisarGoto(tokens, index, linhaNumero) {
    const gotoLine = tokens[index].value;
    if (!linhasValidas.includes(gotoLine)) {
      console.log(`Erro sintático: linha de destino ${gotoLine} não existe.`);
    }
    return { tipo: "GOTO", gotoLine, linhaNumero };
  }

  function analisarPrint(tokens, index, linhaNumero) {
    if (tokens[index].tipo === "IDENTIFICADOR") {
      return { tipo: "PRINT", identificador: tokens[index].value, linhaNumero };
    } else {
      console.log(
        "Erro sintático na instrução PRINT.",
        tokens[index],
        "linha",
        linhaNumero
      );
    }
  }

  function analisarInput(tokens, index, linhaNumero) {
    if (tokens[index].tipo === "IDENTIFICADOR") {
      return { tipo: "INPUT", identificador: tokens[index].value, linhaNumero };
    } else {
      console.log(
        "Erro sintático na instrução INPUT.",
        tokens[index],
        "linha",
        linhaNumero
      );
    }
  }

  return { analise };
}

// Analisador Semântico
function AnalisadorSemantico() {
  const variaveis = {};

  function analise(ast) {
    switch (ast.tipo) {
      case "LET":
        verificaExpressao(ast.expressao);
        variaveis[ast.identificador] = true;
        return true;
      case "INPUT":
        variaveis[ast.identificador] = true;
        return true;
      case "PRINT":
        if (!variaveis[ast.identificador]) {
          console.log(
            `Erro semântico: A variável "${ast.identificador}" não foi definida.`,
            ast.linhaNumero
          );
        }
        return true;
      default:
        return true;
    }
  }

  function verificaExpressao(expressao) {
    expressao.forEach((token) => {
      if (token.tipo === "IDENTIFICADOR" && !variaveis[token.value]) {
        console.log(
          `Erro semântico: A variável "${token.value}" usada na expressão não foi definida.`
        );
      }
    });
  }

  return { analise };
}

function compile(filename) {
  const lexer = AnalisadorLexico();
  const linhasValidas = [];
  const linhasProcessadas = new Set();
  let ultimaLinha = 0;
  let encontrouEnd = false;

  const lines = fs.readFileSync(filename, "utf8").split("\n");
  lines.forEach((linha, index) => {
    if (!/^\d+/.test(linha.trim())) {
      console.log(`Erro: A linha ${index + 1} não começa com um número.`);
    }

    const tokens = lexer.analise(linha);
    const numeroLinha = parseInt(tokens[0].value);
    if (linhasProcessadas.has(numeroLinha)) {
      console.log(`Erro: A linha ${numeroLinha} já foi usada.`);
    }

    if (numeroLinha <= ultimaLinha) {
      console.log(
        `Erro: A linha ${numeroLinha} está fora de ordem. Deve ser maior que a linha ${ultimaLinha}.`
      );
    }

    linhasProcessadas.add(numeroLinha);
    ultimaLinha = numeroLinha;

    if (
      tokens.some((token) => token.tipo === "PALAVRA" && token.value === "end")
    ) {
      encontrouEnd = true;
    } else if (encontrouEnd) {
      console.log(
        `Erro: O comando "end" deve ser a última linha do programa.`,
        tokens[index],
        "linha",
        linhaNumero
      );
    }

    linhasValidas.push(numeroLinha);
  });

  if (!encontrouEnd) {
    console.log(
      `Erro: O programa deve terminar com o comando "end".`,
      tokens[index],
      "linha",
      linhaNumero
    );
  }

  const sintaxe = AnalisadorSintatico(linhasValidas);
  const semantico = AnalisadorSemantico();

  lines.forEach((linha) => {
    try {
      const tokens = lexer.analise(linha);
      const ast = sintaxe.analise(tokens);
      semantico.analise(ast);
    } catch (error) {
      console.log(error.message);
    }
  });
}

compile("entrada.txt");
