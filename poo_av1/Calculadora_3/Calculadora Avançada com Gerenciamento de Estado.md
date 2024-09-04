## Exercício 3: Classe `CalculadoraAvancada` - Calculadora Avançada com Gerenciamento de Estado

### Visão Geral

Este exercício envolve a criação de uma classe `CalculadoraAvancada`, que estende a classe `Calculadora`, adicionando funcionalidades avançadas como cálculo de potência, extração de raiz, divisão inteira, inversão de sinal e gerenciamento de estado (salvamento e restauração do resultado).

### Funcionalidades

- **Atributo**:

  - `estadoSalvo`: Armazena o último valor salvo do resultado (`null` quando não há estado salvo).

- **Métodos**:
  - `potencia(int expoente)`: Eleva o valor atual de `resultado` à potência de `expoente`.
  - `raiz(int expoente)`: Calcula a raiz do valor atual de `resultado` com base no `expoente` fornecido.
  - `divisaoInteira(int divisor)`: Realiza a divisão inteira do valor de `resultado` pelo `divisor`, descartando o restante.
  - `inverterSinal()`: Inverte o sinal do valor de `resultado`.
  - `salvarEstado()`: Salva o valor atual de `resultado` em `estadoSalvo`.
  - `restaurarEstado()`: Restaura o valor salvo em `estadoSalvo` para `resultado`, caso `estadoSalvo` não seja `null`.

### Exemplo de Uso

```java
CalculadoraAvancada calcAvancada = new CalculadoraAvancada();
calcAvancada.somar(16);
calcAvancada.potencia(2);
calcAvancada.exibir(); // Saída: Resultado atual: 256

calcAvancada.salvarEstado();
calcAvancada.zerar();
calcAvancada.exibir(); // Saída: Resultado atual: 0

calcAvancada.restaurarEstado();
calcAvancada.exibir(); // Saída: Resultado atual: 256
```
