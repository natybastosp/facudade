# Analisador e Compilador de Código

Este projeto consiste em um analisador léxico, sintático e semântico para um conjunto específico de instruções de um programa de código. Abaixo está uma explicação de cada parte do código.

## Analisador Léxico

A função `AnalisadorLexico` é responsável por dividir o código em tokens.

### Definições de Tokens

```javascript
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
```

Define os tipos de tokens e suas expressões regulares correspondentes.

### Função `obterProximoToken`

```javascript
function obterProximoToken(linha) {
  for (let def of tokenDefinitions) {
    const match = linha.match(def.regex);
    if (match) {
      return { type: def.type, value: match[0] };
    }
  }
  return null;
}
```

Encontra e retorna o próximo token na linha de entrada com base nas definições de tokens.

### Função `analise`

```javascript
function analise(linha) {
  let tokens = [];
  let esperaAtribuicao = false;

  while (linha.length > 0) {
    const token = obterProximoToken(linha);
    if (!token) {
      throw new Error(`Token não reconhecido na linha: ${linha}`);
    }

    if (token.type === "ESPACO") {
      linha = linha.slice(token.value.length);
      continue;
    }

    tokens.push({ tipo: token.type, value: token.value });
    linha = linha.slice(token.value.length);

    if (token.type === "PALAVRA" && token.value.toLowerCase() === "let") {
      esperaAtribuicao = true;
    }

    if (token.type === "PALAVRA" && token.value.toLowerCase() === "rem") {
      return tokens;
    }
  }

  return tokens;
}
```

Analisa a linha de entrada e gera tokens. Ignora espaços e trata a palavra-chave `rem` para finalizar a linha de tokens.

## Analisador Sintático

A função `AnalisadorSintatico` é responsável por analisar a estrutura dos tokens gerados e garantir que estão corretos.

### Função `analise`

```javascript
function analise(tokens) {
  let index = 0;
  const linhaNumero = tokens[index].value;
  index++;

  const statementToken = tokens[index];
  const statement = statementToken.value.toUpperCase();

  if (statementHandlers[statement]) {
    return statementHandlers[statement](tokens, index + 1, linhaNumero);
  } else {
    throw new Error(
      "Erro sintático: instrução inválida ou palavra-chave desconhecida."
    );
  }
}
```

Analisa a estrutura dos tokens com base na instrução encontrada e delega para o manipulador adequado.

### Funções de Manipulação de Instruções

Cada função como `analisarLet`, `analisarIf`, `analisarGoto`, etc., processa uma instrução específica, validando a sintaxe e retornando um objeto de estrutura.

## Analisador Semântico

A função `AnalisadorSemantico` verifica a correção semântica do código.

### Função `analise`

```javascript
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
        throw new Error(
          `Erro semântico: A variável "${ast.identificador}" não foi definida.`
        );
      }
      return true;
    default:
      return true;
  }
}
```

Valida o uso das variáveis e expressões, garantindo que todas as variáveis usadas estejam definidas.

## Função de Compilação

A função `compile` orquestra o processo de leitura do arquivo, análise léxica, sintática e semântica.

### Passos da Função `compile`

1. **Leitura do Arquivo**: Lê o arquivo de código e divide em linhas.
2. **Análise Léxica**: Analisa cada linha para gerar tokens.
3. **Validação das Linhas**: Verifica a ordem e unicidade das linhas.
4. **Análise Sintática e Semântica**: Analisa cada linha e valida o código.

```javascript
function compile(filename) {
  const lexer = AnalisadorLexico();
  const linhasValidas = [];
  const linhasProcessadas = new Set();
  let ultimaLinha = 0;
  let encontrouEnd = false;

  const lines = fs.readFileSync(filename, "utf8").split("\n");
  lines.forEach((linha, index) => {
    if (!/^\d+/.test(linha.trim())) {
      throw new Error(`Erro: A linha ${index + 1} não começa com um número.`);
    }

    const tokens = lexer.analise(linha);
    const numeroLinha = parseInt(tokens[0].value);

    if (linhasProcessadas.has(numeroLinha)) {
      throw new Error(`Erro: A linha ${numeroLinha} já foi usada.`);
    }

    if (numeroLinha <= ultimaLinha) {
      throw new Error(
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
      throw new Error(
        `Erro: O comando "end" deve ser a última linha do programa.`
      );
    }

    linhasValidas.push(numeroLinha);
  });

  if (!encontrouEnd) {
    throw new Error(`Erro: O programa deve terminar com o comando "end".`);
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
```

Lê o código, valida e compila cada linha, reportando erros encontrados.

---

```

```
