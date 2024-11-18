/* 
Juliana Alves Pacheco - 2122082026
Natalia Bastos Pereira - 2212082020
*/


const fs = require('fs');

// Variáveis globais
let variableMap = {}; // Mapeamento de variáveis para endereços de memória
let memoryCounter = 14; // Começar do endereço 10 (depois de 00-09, para variáveis)

// Função para compilar o código SIMPLE para SML
function compileSIMPLEtoSML(simpleCode) {
    const compiled = [];
    const labels = {};
    const unresolvedJumps = [];

    // Separar as linhas e processar o código SIMPLE
    const lines = simpleCode.split('\n');
    lines.forEach((line, idx) => {
        // Remover comentários e espaços extras
        const cleanLine = line.split('//')[0].trim();
        if (!cleanLine) return; // Ignorar linhas vazias ou comentários

        const parts = cleanLine.split(/\s+/);

        // Verificar se a linha tem pelo menos um comando
        if (parts.length < 2) {
            console.warn(`Linha inválida ou incompleta na linha ${idx + 1}: ${cleanLine}`);
            return;
        }

        const [label, command, ...args] = parts;

        // Verificar se a linha contém um label
        if (!isNaN(label)) {
            labels[label] = compiled.length; // Registrar posição do label
        }

        // Ignorar linhas com REM
        if (command.toUpperCase() === 'REM') {
            return; // Ignora a linha
        }

        switch (command.toUpperCase()) {
            case 'INPUT': {
                const memoryAddress = getMemoryAddress(args[0]);
                compiled.push(`+10${memoryAddress}`); // Lê do teclado e armazena em 'n'
                break;
            }
            case 'OUTPUT':
            case 'PRINT': { // Tratar PRINT como OUTPUT
                const memoryAddress = getMemoryAddress(args[0]);
                compiled.push(`+11${memoryAddress}`); // Escreve na tela o valor de 'n'
                break;
            }
            case 'LET': {
                const [variable, operation] = args.join(' ').split('=');
                if (!variable || !operation) {
                    console.warn(`Erro no comando LET na linha ${idx + 1}: ${cleanLine}`);
                    return;
                }

                const [operand1, operator, operand2] = operation.trim().split(/\s+/);
                const operand1Address = getMemoryAddress(operand1);
                const operand2Address = getMemoryAddress(operand2);

                if (operator === '+') {
                    compiled.push(`+20${operand1Address}`); // LOAD operand1
                    compiled.push(`+30${operand2Address}`); // ADD operand2
                    const resultAddress = getMemoryAddress(variable);
                    compiled.push(`+21${resultAddress}`); // STORE resultado em variable
                } else if (operator === '-') {
                    compiled.push(`+20${operand1Address}`); // LOAD operand1
                    compiled.push(`+31${operand2Address}`); // SUB operand2
                    const resultAddress = getMemoryAddress(variable);
                    compiled.push(`+21${resultAddress}`); // STORE resultado em variable
                } else if (operator === '*') {
                    compiled.push(`+20${operand1Address}`); // LOAD operand1
                    compiled.push(`+33${operand2Address}`); // MULT operand2
                    const resultAddress = getMemoryAddress(variable);
                    compiled.push(`+21${resultAddress}`); // STORE resultado em variable
                } else if (operator === '/') {
                    compiled.push(`+20${operand1Address}`); // LOAD operand1
                    compiled.push(`+32${operand2Address}`); // DIV operand2
                    const resultAddress = getMemoryAddress(variable);
                    compiled.push(`+21${resultAddress}`); // STORE resultado em variable
                }
                break;
            }
case 'IF': {
    const ifStatement = args.join(' ').trim();
    // Remover espaços extras e garantir que o 'GOTO' esteja corretamente posicionado
    const gotoIndex = ifStatement.toUpperCase().indexOf('GOTO');

    if (gotoIndex === -1) {
        console.warn(`Erro no comando IF na linha ${idx + 1}: não foi encontrado 'GOTO'`);
        return;
    }

    // Extrair a condição e o label, levando em consideração que "GOTO" pode ter espaços ao redor
    const condition = ifStatement.substring(0, gotoIndex).trim();
    const labelName = ifStatement.substring(gotoIndex + 4).trim(); // Pega tudo após "GOTO"

    if (!condition || !labelName) {
        console.warn(`Erro no comando IF na linha ${idx + 1}: condição ou rótulo ausente`);
        return;
    }

    const [operand1, operator, operand2] = condition.split(/\s+/);
    const operand1Address = getMemoryAddress(operand1);
    const operand2Address = getMemoryAddress(operand2);

    // Tratar os operadores de comparação
    switch (operator) {
        case '<':
            compiled.push(`+20${operand1Address}`); // LOAD operand1
            compiled.push(`+31${operand2Address}`); // SUB operand2
            unresolvedJumps.push({ label: labelName, index: compiled.length });
            compiled.push(`+41XX`); // BRANCHNEG XX
            break;
        case '>':
            compiled.push(`+20${operand2Address}`); // LOAD operand2
            compiled.push(`+31${operand1Address}`); // SUB operand1
            unresolvedJumps.push({ label: labelName, index: compiled.length });
            compiled.push(`+41XX`); // BRANCHNEG XX
            break;
        case '<=':
            compiled.push(`+20${operand1Address}`); // LOAD operand1
            compiled.push(`+31${operand2Address}`); // SUB operand2
            unresolvedJumps.push({ label: labelName, index: compiled.length });
            compiled.push(`+42XX`); // BRANCHZERO XX
            break;
        case '>=':
            compiled.push(`+20${operand2Address}`); // LOAD operand2
            compiled.push(`+31${operand1Address}`); // SUB operand1
            unresolvedJumps.push({ label: labelName, index: compiled.length });
            compiled.push(`+42XX`); // BRANCHZERO XX
            break;
        case '==':
            compiled.push(`+20${operand1Address}`); // LOAD operand1
            compiled.push(`+31${operand2Address}`); // SUB operand2
            unresolvedJumps.push({ label: labelName, index: compiled.length });
            compiled.push(`+42XX`); // BRANCHZERO XX
            break;
        case '!=':
            compiled.push(`+20${operand1Address}`); // LOAD operand1
            compiled.push(`+31${operand2Address}`); // SUB operand2
            unresolvedJumps.push({ label: labelName, index: compiled.length });
            compiled.push(`+41XX`); // BRANCHNEG XX
            break;
        default:
            console.warn(`Operador desconhecido no IF: ${operator}`);
    }
    break;
}
            case 'GOTO': {
                unresolvedJumps.push({ label: args[0], index: compiled.length });
                compiled.push(`+40XX`); // BRANCH XX
                break;
            }
            case 'END': {
                compiled.push('+4300'); // HALT
                break;
            }
            default:
                console.warn(`Comando desconhecido na linha ${idx + 1}: ${command}`);
        }
    });

    // Resolver os saltos (jumps)
    unresolvedJumps.forEach(({ label, index }) => {
        if (labels[label] !== undefined) {
            const resolvedAddress = labels[label].toString().padStart(2, '0');
            compiled[index] = compiled[index].replace('XX', resolvedAddress);
        } else {
            throw new Error(`Label não encontrado: ${label}`);
        }
    });
    
        compiled.push("-0001");


    return compiled.join('\n');
}

// Função para gerar endereços de memória para variáveis
function getMemoryAddress(variable) {
    if (!variableMap[variable]) {
        variableMap[variable] = memoryCounter++;
    }
    return variableMap[variable].toString().padStart(2, '0');
}

// Função principal para invocar a compilação
function main() {
    const sourceFile = 'source.txt';
    const outputFile = 'binary.txt';

    try {
        // Ler o código SIMPLE do arquivo
        const simpleCode = fs.readFileSync(sourceFile, 'utf8');
        console.log('Código SIMPLE carregado:');
        console.log(simpleCode);

        // Compilar o código SIMPLE para SML
        const smlCode = compileSIMPLEtoSML(simpleCode);
        console.log('Código SML gerado:');
        console.log(smlCode);

        // Escrever o código SML no arquivo de saída
        fs.writeFileSync(outputFile, smlCode);
        console.log(`Código SML salvo em ${outputFile}`);
    } catch (err) {
        console.error('Erro durante a compilação:', err.message);
    }
}

// Invocar a execução do compilador
main();
