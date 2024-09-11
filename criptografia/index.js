const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function keyGeneration() {
  let key = "";
  let keyLength = Math.floor(Math.random() * 7) + 3;
  for (let i = 0; i < keyLength; i++) {
    key += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  return key;
}

function vigenereEncrypt(text, key) {
  let encryptedText = "";
  key = key.toUpperCase();
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[A-Z]/i)) {
      let shift = key.charCodeAt(keyIndex % key.length) - 65;
      let charCode = char.charCodeAt(0);
      if (char.match(/[A-Z]/)) {
        encryptedText += String.fromCharCode(
          ((charCode - 65 + shift) % 26) + 65
        );
      } else {
        encryptedText += String.fromCharCode(
          ((charCode - 97 + shift) % 26) + 97
        );
      }
      keyIndex++;
    } else {
      encryptedText += char;
    }
  }

  return encryptedText;
}

function vigenereDecrypt(text, key) {
  let decryptedText = "";
  key = key.toUpperCase();
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[A-Z]/i)) {
      let shift = key.charCodeAt(keyIndex % key.length) - 65;
      let charCode = char.charCodeAt(0);
      if (char.match(/[A-Z]/)) {
        decryptedText += String.fromCharCode(
          ((charCode - 65 - shift + 26) % 26) + 65
        );
      } else {
        decryptedText += String.fromCharCode(
          ((charCode - 97 - shift + 26) % 26) + 97
        );
      }
      keyIndex++;
    } else {
      decryptedText += char;
    }
  }

  return decryptedText;
}

function columnarTranspositionEncrypt(text, numColumns) {
  let grid = Array.from({ length: numColumns }, () => "");

  for (let i = 0; i < text.length; i++) {
    grid[i % numColumns] += text[i];
  }

  let columnOrder = [...Array(numColumns).keys()].sort(
    () => Math.random() - 0.5
  );

  let encryptedText = "";
  for (let col of columnOrder) {
    encryptedText += grid[col];
  }

  return { encryptedText, columnOrder };
}

function columnarTranspositionDecrypt(text, numColumns, columnOrder) {
  let numRows = Math.ceil(text.length / numColumns);
  let grid = Array.from({ length: numColumns }, () => "");

  let filledLengths = columnOrder.map((colIndex, i) => {
    return i < text.length % numColumns ? numRows : numRows - 1;
  });

  let position = 0;
  for (let col of columnOrder) {
    grid[col] = text.slice(position, position + filledLengths[col]);
    position += filledLengths[col];
  }

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

function encrypt(text, key, numColumns) {
  let vigenereEncrypted = vigenereEncrypt(text, key);
  let { encryptedText, columnOrder } = columnarTranspositionEncrypt(
    vigenereEncrypted,
    numColumns
  );
  return { encryptedText, columnOrder };
}

function decrypt(text, key, numColumns, columnOrder) {
  let decryptedVigenereText = columnarTranspositionDecrypt(
    text,
    numColumns,
    columnOrder
  );
  let finalDecryptedMessage = vigenereDecrypt(decryptedVigenereText, key);
  return finalDecryptedMessage;
}

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

function encryptFlow() {
  readline.question("Enter the text to encrypt: ", (text) => {
    let key = keyGeneration();
    let numColumns = 5;
    let { encryptedText, columnOrder } = encrypt(text, key, numColumns);
    console.log("\nEncrypted Text:", encryptedText);
    console.log("Key:", key);
    console.log("Number of Columns:", numColumns);
    console.log("Column Order:", columnOrder);
    menu();
  });
}

function decryptFlow() {
  readline.question("Enter the text to decrypt: ", (text) => {
    readline.question("Enter the key: ", (key) => {
      readline.question("Enter the number of columns: ", (numColumns) => {
        readline.question(
          "Enter the column order (comma-separated numbers): ",
          (columnOrderInput) => {
            let columnOrder = columnOrderInput.split(",").map(Number);
            let decryptedText = decrypt(
              text,
              key,
              parseInt(numColumns),
              columnOrder
            );
            console.log("\nDecrypted Text:", decryptedText);
            menu();
          }
        );
      });
    });
  });
}

// Start the program
console.log(
  "Welcome to the Vigenère and Columnar Transposition Cipher Program!"
);
menu();
