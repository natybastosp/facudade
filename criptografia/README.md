# Vigenère and Columnar Transposition Cipher

This program implements a two-step encryption process using the Vigenère cipher followed by a columnar transposition cipher. It provides a command-line interface for users to encrypt and decrypt messages.

## Table of Contents

1. [Overview](#overview)
2. [Encryption Process](#encryption-process)
3. [Decryption Process](#decryption-process)
4. [Key Generation and Structure](#key-generation-and-structure)
5. [Code Structure](#code-structure)
6. [How to Use](#how-to-use)

## Overview

This program combines two classical ciphers to create a more secure encryption:

1. **Vigenère Cipher**: A polyalphabetic substitution cipher.
2. **Columnar Transposition Cipher**: A transposition cipher that rearranges the letters of the message.

The program provides a menu-driven interface for users to encrypt messages, decrypt messages, or exit the program.

## Encryption Process

1. The user enters a plaintext message.
2. A key is automatically generated, which includes:
   - A Vigenère key
   - The number of columns for the transposition
   - The column order for the transposition
3. The plaintext is encrypted using the Vigenère cipher.
4. The result is then encrypted again using the columnar transposition cipher.
5. The final ciphertext and the full key are displayed to the user.

## Decryption Process

1. The user enters the ciphertext and the full key.
2. The key is parsed to extract the Vigenère key, number of columns, and column order.
3. The columnar transposition is reversed first.
4. The result is then decrypted using the Vigenère cipher.
5. The original plaintext is displayed to the user.

## Key Generation and Structure

The key is a single string that contains all necessary information for both encryption and decryption. It has the following structure:

```
VigenereKey-NumberOfColumns-ColumnOrder
```

For example: `HELLO-5-2,0,4,1,3`

- `HELLO` is the Vigenère key
- `5` is the number of columns for the transposition
- `2,0,4,1,3` is the order of columns for the transposition

## Code Structure

- `keyGeneration()`: Generates a random key with all necessary components.
- `parseKey()`: Parses the full key into its components.
- `vigenereEncrypt()` and `vigenereDecrypt()`: Implement the Vigenère cipher.
- `columnarTranspositionEncrypt()` and `columnarTranspositionDecrypt()`: Implement the columnar transposition cipher.
- `encrypt()` and `decrypt()`: Combine both ciphers for the full encryption/decryption process.
- `menu()`, `encryptFlow()`, `decryptFlow()`: Handle the user interface and program flow.

## How to Use

1. Ensure you have Node.js installed on your system.
2. Save the code to a file (e.g., `index.js`).
3. Open a terminal and navigate to the directory containing the file.
4. Run the program using the command: `node index.js`
5. Follow the on-screen prompts to encrypt or decrypt messages.

When encrypting, you'll receive a full key. Make sure to save this key securely, as you'll need it to decrypt the message later.

Note: This implementation is for educational purposes and may not be suitable for securing sensitive information in real-world applications.
