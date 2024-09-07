# Compilador Simples

Este projeto implementa um compilador básico em JavaScript que realiza três etapas principais: **análise léxica**, **análise sintática** e **análise semântica**. O compilador aceita uma linguagem simples, com comandos como `input`, `let`, `print`, `goto`, e operadores aritméticos (`+`, `-`, `*`, `/`) e relacionais (`>`, `<`).

## Estrutura do Projeto

O compilador é composto por três principais componentes:

1. **Lexer**: Responsável por converter o código-fonte em uma lista de tokens.
2. **Parser**: Constrói uma árvore sintática abstrata (AST) a partir dos tokens.
3. **SemanticAnalyzer**: Realiza a análise semântica da AST para verificar inconsistências no código, como o uso de variáveis não declaradas.

### Tokens Suportados

- **Palavras-chave**: `rem`, `input`, `let`, `print`, `end`, `goto`, `if`, `then`.
- **Operadores**: `+`, `-`, `*`, `/`, `>`, `<`.
- **Identificadores**: Variáveis alfanuméricas.
- **Números**: Sequências de dígitos.

## Funcionalidades Suportadas

O compilador aceita uma linguagem simples que suporta:

- Atribuições usando `let`.
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
3. **Erro Semântico**: Se há problemas de significado, como o uso de variáveis não declaradas.

### Exemplo de Código com Erro Semântico

```txt
10 input x
20 print y
30 end
```

Neste exemplo, o compilador acusará um **erro semântico**, pois a variável `y` não foi declarada antes de seu uso:

```
Erro de compilação: SemanticError - Variável indefinida: y
```

### Exemplo de Código com Erro Léxico

```txt
10 input x
20 let y = 123abc
30 print y
40 end
```

Neste caso, o compilador encontrará um **erro léxico** ao tentar interpretar `123abc` como um número:

```
Erro de compilação: LexerError - Número inválido na linha 20, coluna 9
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
   O compilador irá ler o arquivo `entrada.txt`, gerar tokens, construir a AST, realizar a análise semântica e retornar o resultado da compilação.

---

### Exemplo de Execução

```bash
$ node compilador.js
AST: {
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
          "type": "Identifier",
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
      "line": 50
    }
  ]
}
Análise semântica concluída sem erros.
Compilação bem-sucedida!
```
