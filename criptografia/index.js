class VigenereCipher {
  constructor(key) {
    this.key = key.toUpperCase(); // Inicializa a chave em maiúsculas
  }

  // Método para converter um caractere para um número (A = 0, B = 1, ..., Z = 25)
  charToNum(char) {
    return char.toUpperCase().charCodeAt(0) - 65;
  }

  // Método para converter um número de volta para uma letra
  numToChar(num) {
    return String.fromCharCode((num % 26) + 65); // Mantém o número no intervalo de A-Z
  }

  // Método para repetir a chave até o tamanho do texto
  repeatKey(textLength) {
    let repeatedKey = "";
    for (let i = 0; i < textLength; i++) {
      repeatedKey += this.key[i % this.key.length];
    }
    return repeatedKey;
  }

  // Método para criptografar uma letra do texto com uma letra da chave
  encryptLetter(plainChar, keyChar) {
    const plainNum = this.charToNum(plainChar);
    const keyNum = this.charToNum(keyChar);
    const encryptedNum = (plainNum + keyNum) % 26; // Soma e mantém no alfabeto com mod 26
    return this.numToChar(encryptedNum);
  }

  // Método principal para criptografar o texto
  encrypt(plaintext) {
    let encryptedText = "";
    const repeatedKey = this.repeatKey(plaintext.length);

    for (let i = 0; i < plaintext.length; i++) {
      if (plaintext[i].match(/[A-Za-z]/)) {
        // Verifica se o caractere é uma letra
        encryptedText += this.encryptLetter(plaintext[i], repeatedKey[i]);
      } else {
        encryptedText += plaintext[i]; // Se não for letra, mantém o caractere original
      }
    }

    return encryptedText;
  }
}

// Exemplo de uso:
const cipher = new VigenereCipher("KEY"); // Instancia a classe com a chave "KEY"
const encryptedMessage = cipher.encrypt("HELLO THIS IS A SECRET MESSAGE");
console.log("Mensagem criptografada:", encryptedMessage);
