## Exercício 1: Classe `Carro` - Gerenciamento de Velocidade

### Visão Geral

Este exercício envolve a modificação de uma classe simples chamada `Carro` para gerenciar a velocidade do carro com a introdução de um limite de velocidade máxima. A classe foi projetada para garantir que a velocidade do carro não possa exceder uma velocidade máxima especificada ou cair abaixo de zero.

### Funcionalidades

- **Atributos**:

  - `velocidade`: A velocidade atual do carro.
  - `velocidadeMaxima`: A velocidade máxima que o carro pode atingir.

- **Métodos**:
  - `acelera()`: Aumenta a velocidade do carro em 1, até o limite da velocidade máxima.
  - `freia()`: Diminui a velocidade do carro em 1, até o limite de zero.
  - `exibirVelocidade()`: Exibe a velocidade atual do carro.

### Exemplo de Uso

```java
Carro carro = new Carro(120); // Carro com velocidade máxima de 120 km/h
carro.acelera();
carro.exibirVelocidade(); // Saída: Velocidade atual: 1 km/h
carro.acelera();
carro.freia();
carro.exibirVelocidade(); // Saída: Velocidade atual: 1 km/h
```

