# Compilador Simples em JavaScript

Este projeto implementa um compilador básico em JavaScript que realiza duas etapas principais: **análise léxica** e **análise sintática**. O compilador aceita uma linguagem simples, com comandos como `input`, `let`, `print`, `goto`, `if`, e operadores aritméticos (`+`, `-`, `*`, `/`) e relacionais (`<`, `>`, `<=`, `>=`).

## Estrutura do Projeto

O compilador é composto por dois principais componentes:

1. **Lexer**: Responsável por converter o código-fonte em uma lista de tokens.
2. **Parser**: Constrói uma árvore sintática abstrata (AST) a partir dos tokens.

### Tokens Suportados

- **Palavras-chave**: `rem`, `input`, `let`, `print`, `end`, `goto`, `if`, `then`.
- **Operadores**: `+`, `-`, `*`, `/`, `<`, `>`, `<=`, `>=`.
- **Identificadores**: Variáveis alfanuméricas.
- **Números**: Sequências de dígitos.

## Funcionalidades Suportadas

O compilador aceita uma linguagem simples que suporta:

- Atribuições usando `let` ou atribuição implícita.
- Comandos de entrada (`input`) e saída (`print`).
- Comentários com `rem`.
- Controle de fluxo básico com `goto`, `if`, e `then`.
- Operadores aritméticos e relacionais.

### Exemplo de Código Aceitável

O arquivo de entrada pode conter código semelhante a:

```
10 input x
20 let y = x + 10
30 if y > 15 then goto 50
40 print y
50 end
```

### Tratamento de Erros

O compilador captura três tipos de erros:

1. **Erro Léxico**: Se a entrada contém um token inválido ou números mal formados.
2. **Erro Sintático**: Se a sequência de tokens não segue a gramática correta da linguagem.
3. **Erro Semântico**: Implementado de forma básica, capturando alguns erros semânticos simples.

### Exemplo de Código com Erro Léxico

```txt
10 input x
20 let y = 123abc
30 print y
40 end
```

Neste caso, o compilador encontrará um **erro léxico** ao tentar interpretar `123abc` como um número:

```
Erro Léxico: Caractere não reconhecido: a na linha 20, coluna 12
```

### Exemplo de Código com Erro Sintático

```txt
10 input x
20 let y =
30 print y
40 end
```

O compilador acusará um **erro sintático** devido à expressão incompleta na linha 20:

```
Erro Sintático: Expressão inválida na linha 20
```

## Como Executar

1. **Crie um arquivo de entrada**:
   Crie um arquivo `entrada.txt` contendo o código-fonte.

2. **Execute o compilador**:
   No terminal, execute o comando:

   ```bash
   node seuArquivo.js
   ```

3. **Resultado**:
   O compilador irá ler o arquivo `entrada.txt`, gerar tokens, construir a AST e retornar o resultado da compilação.

---

### Exemplo de Execução

```bash
$ node compilador.js
Tokens: [
  { type: 'NUMBER', value: 10, line: 1, column: 1 },
  { type: 'KEYWORD', value: 'input', line: 1, column: 4 },
  { type: 'IDENTIFIER', value: 'x', line: 1, column: 10 },
  { type: 'NEWLINE', line: 1, column: 11 },
  { type: 'NUMBER', value: 20, line: 2, column: 1 },
  { type: 'KEYWORD', value: 'let', line: 2, column: 4 },
  { type: 'IDENTIFIER', value: 'y', line: 2, column: 8 },
  { type: 'EQUALS', value: '=', line: 2, column: 10 },
  { type: 'IDENTIFIER', value: 'x', line: 2, column: 12 },
  { type: 'OPERATOR', value: '+', line: 2, column: 14 },
  { type: 'NUMBER', value: 10, line: 2, column: 16 },
  { type: 'NEWLINE', line: 2, column: 18 },
  { type: 'NUMBER', value: 30, line: 3, column: 1 },
  { type: 'KEYWORD', value: 'end', line: 3, column: 4 },
  { type: 'NEWLINE', line: 3, column: 7 }
]
Árvore Sintática: {
  "type": "Program",
  "body": [
    {
      "type": "InputStatement",
      "variable": "x",
      "line": 10
    },
    {
      "type": "AssignmentStatement",
      "variable": "y",
      "value": {
        "type": "BinaryExpression",
        "operator": "+",
        "left": {
          "type": "Variable",
          "name": "x"
        },
        "right": {
          "type": "Literal",
          "value": 10
        }
      },
      "line": 20
    },
    {
      "type": "EndStatement",
      "line": 30
    }
  ]
}
```

## Conclusão

Este compilador demonstra os princípios básicos de análise léxica e sintática para uma linguagem de programação simples. Ele pode ser estendido para incluir recursos mais avançados, otimizações ou estágios de geração de código para uma implementação de compilador completa.
