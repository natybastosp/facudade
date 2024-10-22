

# Projeto de Compilador SIMPLE para SML

## Descrição

Este projeto implementa um compilador que converte código escrito em uma linguagem simples chamada SIMPLE para uma linguagem de máquina chamada SML. O objetivo é traduzir as instruções básicas de um programa SIMPLE em suas representações binárias correspondentes em SML.

## Estrutura do Projeto

- `source.txt`: Arquivo de entrada contendo o código fonte em SIMPLE.
- `binary.txt`: Arquivo de saída onde o código compilado em SML será armazenado.
- `index.js`: Script JavaScript que processa o código SIMPLE e gera o código em SML.

## Funcionalidades

- **Entrada e Saída**: O compilador lê o código fonte de `source.txt` e escreve a saída em `binary.txt`.
- **Suporte a Comandos**: O compilador suporta comandos básicos como:
  - `rem`: Comentários
  - `input`: Leitura de entradas
  - `let`: Atribuições
  - `if`: Condicionais
  - `goto`: Desvios
  - `print`: Impressão de valores
  - `end`: Finalização do programa

## Como Usar

1. **Instalação**: Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixar e instalar o Node.js a partir de [nodejs.org](https://nodejs.org/).

2. **Configuração do Projeto**:
   - Clone o repositório ou baixe os arquivos.
   - Coloque seu código SIMPLE no arquivo `source.txt`.

3. **Compilação**:
   - Execute o script `index.js` usando o Node.js. Você pode fazer isso pelo terminal:
     ```bash
     node index.js
     ```
   - Após a execução, verifique o arquivo `binary.txt` para o código compilado em SML.

## Exemplo de Uso

Considere o seguinte código SIMPLE, que calcula a somatória dos termos da série de Fibonacci:

```plaintext
01 rem Somatoria dos termos da serie de Fibonacci
02 rem input  5 output 12
03 rem input -5 output -1
10 input n
15 if n <= 0 goto 65
20 let a = 0
25 let b = 1
30 let s = 0
35 if n == 0 goto 70
40 let s = s + b
45 let b = b + a
50 let a = b - a
55 let n = n - 1
60 goto 35
65 let s = -1
70 print s
75 end
```

Após a execução do compilador, o arquivo `binary.txt` conterá a versão SML desse código.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).


