## Exercício 2: Classe `Calculadora` - Operações Aritméticas Básicas

### Visão Geral

Este exercício envolve a implementação de uma classe `Calculadora` que fornece operações aritméticas básicas. A classe encapsula o atributo `resultado` e oferece métodos para realizar soma, subtração, multiplicação, divisão, zerar o resultado, além de exibir ou obter o valor atual do resultado.

### Funcionalidades

- **Atributo**:

  - `resultado`: Armazena o valor atual das operações realizadas.

- **Métodos**:
  - `somar(int valor)`: Adiciona o valor ao atributo `resultado`.
  - `subtrair(int valor)`: Subtrai o valor do atributo `resultado`.
  - `multiplicar(int valor)`: Multiplica o atributo `resultado` pelo valor.
  - `dividir(int valor)`: Divide o atributo `resultado` pelo valor (com verificação para evitar divisão por zero).
  - `zerar()`: Reseta o atributo `resultado` para zero.
  - `exibir()`: Exibe o valor atual do atributo `resultado`.
  - `obterResultado()`: Retorna o valor atual armazenado no atributo `resultado`.

### Exemplo de Uso

```java
Calculadora calc = new Calculadora();
calc.somar(10);
calc.exibir(); // Saída: Resultado atual: 10
calc.subtrair(5);
calc.exibir(); // Saída: Resultado atual: 5
```
