// Import the readline module for handling user input/output
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Generates a random key for the cipher
 * @returns {string} A string containing the Vigenère key, number of columns, and column order
 */
function keyGeneration() {
  // Generate the Vigenère part of the key
  let vigenereKey = "";
  let keyLength = Math.floor(Math.random() * 7) + 3; // Random length between 3 and 9
  for (let i = 0; i < keyLength; i++) {
    vigenereKey += String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Random uppercase letter
  }

  // Generate number of columns between 3 and 8
  let numColumns = Math.floor(Math.random() * 6) + 3;

  // Generate column order
  let columnOrder = [...Array(numColumns).keys()].sort(
    () => Math.random() - 0.5
  );

  // Combine all parts into a single key
  let fullKey = `${vigenereKey}-${numColumns}-${columnOrder.join(",")}`;

  return fullKey;
}

/**
 * Parses the full key into its components
 * @param {string} fullKey - The full key string
 * @returns {Object} An object containing the Vigenère key, number of columns, and column order
 */
function parseKey(fullKey) {
  let [vigenereKey, numColumns, columnOrder] = fullKey.split("-");
  return {
    vigenereKey,
    numColumns: parseInt(numColumns),
    columnOrder: columnOrder.split(",").map(Number),
  };
}

/**
 * Encrypts text using the Vigenère cipher
 * @param {string} text - The plaintext to encrypt
 * @param {string} key - The Vigenère key
 * @returns {string} The encrypted text
 */
function vigenereEncrypt(text, key) {
  let encryptedText = "";
  key = key.toUpperCase();
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[A-Z]/i)) {
      // Encrypt only alphabetic characters
      let shift = key.charCodeAt(keyIndex % key.length) - 65;
      let charCode = char.charCodeAt(0);
      if (char.match(/[A-Z]/)) {
        // Uppercase letters
        encryptedText += String.fromCharCode(
          ((charCode - 65 + shift) % 26) + 65
        );
      } else {
        // Lowercase letters
        encryptedText += String.fromCharCode(
          ((charCode - 97 + shift) % 26) + 97
        );
      }
      keyIndex++;
    } else {
      // Non-alphabetic characters remain unchanged
      encryptedText += char;
    }
  }

  return encryptedText;
}

/**
 * Decrypts text using the Vigenère cipher
 * @param {string} text - The ciphertext to decrypt
 * @param {string} key - The Vigenère key
 * @returns {string} The decrypted text
 */
function vigenereDecrypt(text, key) {
  let decryptedText = "";
  key = key.toUpperCase();
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[A-Z]/i)) {
      // Decrypt only alphabetic characters
      let shift = key.charCodeAt(keyIndex % key.length) - 65;
      let charCode = char.charCodeAt(0);
      if (char.match(/[A-Z]/)) {
        // Uppercase letters
        decryptedText += String.fromCharCode(
          ((charCode - 65 - shift + 26) % 26) + 65
        );
      } else {
        // Lowercase letters
        decryptedText += String.fromCharCode(
          ((charCode - 97 - shift + 26) % 26) + 97
        );
      }
      keyIndex++;
    } else {
      // Non-alphabetic characters remain unchanged
      decryptedText += char;
    }
  }

  return decryptedText;
}

/**
 * Encrypts text using the columnar transposition cipher
 * @param {string} text - The text to encrypt
 * @param {number} numColumns - The number of columns to use
 * @param {number[]} columnOrder - The order of columns for transposition
 * @returns {string} The encrypted text
 */
function columnarTranspositionEncrypt(text, numColumns, columnOrder) {
  // Create a grid to hold the characters
  let grid = Array.from({ length: numColumns }, () => "");

  // Fill the grid column by column
  for (let i = 0; i < text.length; i++) {
    grid[i % numColumns] += text[i];
  }

  // Read off the characters from the grid according to the column order
  let encryptedText = "";
  for (let col of columnOrder) {
    encryptedText += grid[col];
  }

  return encryptedText;
}

/**
 * Decrypts text using the columnar transposition cipher
 * @param {string} text - The text to decrypt
 * @param {number} numColumns - The number of columns used in encryption
 * @param {number[]} columnOrder - The order of columns used in encryption
 * @returns {string} The decrypted text
 */
function columnarTranspositionDecrypt(text, numColumns, columnOrder) {
  let numRows = Math.ceil(text.length / numColumns);
  let grid = Array.from({ length: numColumns }, () => "");

  // Calculate the length of each column
  let filledLengths = columnOrder.map((colIndex, i) => {
    return i < text.length % numColumns ? numRows : numRows - 1;
  });

  // Fill the grid according to the column order
  let position = 0;
  for (let col of columnOrder) {
    grid[col] = text.slice(position, position + filledLengths[col]);
    position += filledLengths[col];
  }

  // Read the grid row by row to get the original text
  let decryptedText = "";
  for (let i = 0; i < numRows; i++) {
    for (let col of grid) {
      if (col[i]) {
        decryptedText += col[i];
      }
    }
  }

  return decryptedText;
}

/**
 * Encrypts text using both Vigenère and columnar transposition ciphers
 * @param {string} text - The plaintext to encrypt
 * @param {string} fullKey - The full key containing all necessary information
 * @returns {string} The encrypted text
 */
function encrypt(text, fullKey) {
  let { vigenereKey, numColumns, columnOrder } = parseKey(fullKey);
  let vigenereEncrypted = vigenereEncrypt(text, vigenereKey);
  let finalEncrypted = columnarTranspositionEncrypt(
    vigenereEncrypted,
    numColumns,
    columnOrder
  );
  return finalEncrypted;
}

/**
 * Decrypts text using both columnar transposition and Vigenère ciphers
 * @param {string} text - The ciphertext to decrypt
 * @param {string} fullKey - The full key containing all necessary information
 * @returns {string} The decrypted text
 */
function decrypt(text, fullKey) {
  let { vigenereKey, numColumns, columnOrder } = parseKey(fullKey);
  let columnarDecrypted = columnarTranspositionDecrypt(
    text,
    numColumns,
    columnOrder
  );
  let finalDecrypted = vigenereDecrypt(columnarDecrypted, vigenereKey);
  return finalDecrypted;
}

/**
 * Displays the main menu and handles user input
 */
function menu() {
  console.log("\n--- Encryption/Decryption Menu ---");
  console.log("1. Encrypt");
  console.log("2. Decrypt");
  console.log("3. Exit");

  readline.question("Enter your choice (1-3): ", (choice) => {
    switch (choice) {
      case "1":
        encryptFlow();
        break;
      case "2":
        decryptFlow();
        break;
      case "3":
        console.log("Exiting...");
        readline.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        menu();
    }
  });
}

/**
 * Handles the encryption process flow
 */
function encryptFlow() {
  readline.question("Enter the text to encrypt: ", (text) => {
    let fullKey = keyGeneration();
    let encryptedText = encrypt(text, fullKey);
    console.log("\nEncrypted Text:", encryptedText);
    console.log(
      "Key (includes Vigenère key, number of columns, and column order):",
      fullKey
    );
    menu();
  });
}

/**
 * Handles the decryption process flow
 */
function decryptFlow() {
  readline.question("Enter the text to decrypt: ", (text) => {
    readline.question("Enter the full key: ", (fullKey) => {
      let decryptedText = decrypt(text, fullKey);
      console.log("\nDecrypted Text:", decryptedText);
      menu();
    });
  });
}

// Start the program
console.log(
  "Welcome to the Vigenère and Columnar Transposition Cipher Program!"
);
menu();
