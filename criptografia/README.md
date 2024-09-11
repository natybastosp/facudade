# Criptografia com Substituição Polialfabética e Transposição Colunar

## Introdução

Este projeto implementa um modelo de criptografia que combina duas técnicas clássicas: **Substituição Polialfabética** e **Transposição Colunar**. A junção dessas duas técnicas torna a criptografia mais robusta, dificultando ataques simples como força bruta.

### 1. Substituição Polialfabética (Cifra de Vigenère)

A **Cifra de Vigenère** é um método de substituição polialfabética, onde cada letra da mensagem original (texto claro) é substituída por uma outra letra, de acordo com uma chave que determina o deslocamento de cada letra. Diferente de uma cifra de César (que usa um único deslocamento para todas as letras), a cifra de Vigenère utiliza deslocamentos diferentes para cada posição no texto.

#### Como funciona:

- Para cada letra do texto claro, uma letra da chave é usada para determinar o quanto essa letra será deslocada no alfabeto.
- A chave é repetida ciclicamente ao longo do texto, de modo que diferentes partes do texto são criptografadas com diferentes deslocamentos.

**Exemplo**:

- Texto Claro: `"HELLO"`
- Chave: `"KEY"`
  - 'K' indica um deslocamento de 10 posições no alfabeto (letra 'K' é a 11ª letra do alfabeto).
  - 'E' indica um deslocamento de 4 posições.
  - 'Y' indica um deslocamento de 24 posições.
- Aplicando os deslocamentos:
  - 'H' se torna 'R' (deslocado por 10).
  - 'E' se torna 'I' (deslocado por 4).
  - 'L' se torna 'J' (deslocado por 24).
  - 'L' se torna 'V' (novamente deslocado por 10).
  - 'O' se torna 'S' (deslocado por 4).

Resultado criptografado: `"RIJVS"`.

### 2. Transposição Colunar

Após a substituição polialfabética, aplicamos a **Transposição Colunar**, que rearranja os caracteres do texto criptografado para adicionar mais uma camada de segurança. Essa técnica envolve organizar o texto em uma grade de colunas e, em seguida, embaralhar a ordem das colunas com base em uma chave de transposição.

#### Como funciona:

1. O texto criptografado pela cifra de Vigenère é dividido em uma grade com um número fixo de colunas.
2. As colunas são rearranjadas de acordo com uma chave que define a nova ordem.
3. A leitura é feita coluna por coluna na nova ordem, resultando no texto final criptografado.

**Exemplo**:

- Texto criptografado: `"RIJVS"`
- Dividido em uma grade de 3 colunas:
  ```
  R  I  J
  V  S  X  (adicionamos 'X' como preenchimento)
  ```
- Suponha que a chave de transposição seja `[2, 0, 1]`, o que significa que a 3ª coluna será a primeira, a 1ª coluna será a segunda, e a 2ª coluna será a terceira:
  ```
  J  R  I
  X  V  S
  ```
- Texto final criptografado: `"JRIXVS"`.

### 3. Descriptografia

Para descriptografar, o processo é o inverso:

1. **Reverter a Transposição Colunar**: Primeiro, reorganizamos as colunas para voltar à ordem original.
2. **Reverter a Substituição Polialfabética**: Em seguida, aplicamos a chave da cifra de Vigenère para desfazer os deslocamentos e retornar ao texto claro.

---

## Conclusão

Este modelo de criptografia é robusto porque combina duas técnicas complementares: substituição polialfabética (que introduz variação nos deslocamentos de cada letra) e transposição colunar (que embaralha o texto). Isso dificulta que um atacante recupere o texto original sem conhecer tanto a chave de substituição quanto a chave de transposição.

---
