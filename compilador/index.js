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

  function analise(linha) {
    let tokens = [];
    let esperaAtribuicao = false;

    while (linha.length > 0) {
      const token = obterProximoToken(linha);
      if (!token) {
        console.error(`Token não reconhecido na linha: ${linha}`);
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
    let index = 0;
    const linhaNumero = tokens[index].value;
    index++;

    const statementToken = tokens[index];
    const statement = statementToken.value.toUpperCase();

    if (statementHandlers[statement]) {
      return statementHandlers[statement](tokens, index + 1, linhaNumero);
    } else {
      console.error(
        "Erro sintático: instrução inválida ou palavra-chave desconhecida."
      );
    }
  }

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
              console.error("Erro sintático: Operador sem operandos válidos.");
            }
            expressao.push(token);
          } else {
            console.error("Erro sintático: Token inesperado na expressão LET.");
          }
          index++;
        }

        if (
          expressao.length > 0 &&
          expressao[expressao.length - 1].tipo === "OPERADOR_MATEMATICO"
        ) {
          console.error(
            "Erro sintático: Expressão não pode terminar com um operador."
          );
        }

        return { tipo: "LET", identificador, expressao, linhaNumero };
      } else {
        console.error("Erro sintático: Faltando operador '=' após a variável.");
      }
    } else {
      console.error("Erro sintático: Esperado identificador após LET.");
    }
  }

  function analisarIf(tokens, index, linhaNumero) {
    const thenIndex = tokens.findIndex(
      (token, i) => token.value.toUpperCase() === "THEN" && i > index
    );
    if (thenIndex === -1) {
      console.error(
        "Erro sintático: falta a palavra-chave THEN na instrução IF."
      );
    }

    const condition = tokens.slice(index, thenIndex);
    const gotoLine = tokens[thenIndex + 1].value;
    if (!linhasValidas.includes(gotoLine)) {
      console.error(`Erro sintático: linha de destino ${gotoLine} não existe.`);
    }

    return { tipo: "IF", condition, gotoLine, linhaNumero };
  }

  function analisarGoto(tokens, index, linhaNumero) {
    const gotoLine = tokens[index].value;
    if (!linhasValidas.includes(gotoLine)) {
      console.error(`Erro sintático: linha de destino ${gotoLine} não existe.`);
    }
    return { tipo: "GOTO", gotoLine, linhaNumero };
  }

  function analisarPrint(tokens, index, linhaNumero) {
    if (tokens[index].tipo === "IDENTIFICADOR") {
      return { tipo: "PRINT", identificador: tokens[index].value, linhaNumero };
    } else {
      console.error("Erro sintático na instrução PRINT.");
    }
  }

  function analisarInput(tokens, index, linhaNumero) {
    if (tokens[index].tipo === "IDENTIFICADOR") {
      return { tipo: "INPUT", identificador: tokens[index].value, linhaNumero };
    } else {
      console.error("Erro sintático na instrução INPUT.");
    }
  }

  return { analise };
}

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
          console.error(
            `Erro semântico: A variável "${ast.identificador}" não foi definida.`
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
        console.error(
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
      console.error(`Erro: A linha ${index + 1} não começa com um número.`);
    }

    const tokens = lexer.analise(linha);
    const numeroLinha = parseInt(tokens[0].value);

    if (linhasProcessadas.has(numeroLinha)) {
      console.error(`Erro: A linha ${numeroLinha} já foi usada.`);
    }

    if (numeroLinha <= ultimaLinha) {
      console.error(
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
      console.error(
        `Erro: O comando "end" deve ser a última linha do programa.`
      );
    }

    linhasValidas.push(numeroLinha);
  });

  if (!encontrouEnd) {
    console.error(`Erro: O programa deve terminar com o comando "end".`);
  }

  const sintaxe = AnalisadorSintatico(linhasValidas);
  const semantico = AnalisadorSemantico();

  lines.forEach((linha) => {
    try {
      const tokens = lexer.analise(linha);
      const ast = sintaxe.analise(tokens);
      semantico.analise(ast);
      console.log("Compilado:", ast);
    } catch (error) {
      console.error(error.message);
    }
  });
}

compile("codigo.txt");
