graph TD
A[Início] --> B[Exibir Menu Principal]
B --> C{Escolha do Usuário}
C -->|1| D[Fluxo de Criptografia]
C -->|2| E[Fluxo de Descriptografia]
C -->|3| F[Sair]

    D --> G[Solicitar texto para criptografar]
    G --> H[Gerar chave]
    H --> I[Criptografar com Vigenère]
    I --> J[Criptografar com Transposição Colunar]
    J --> K[Exibir texto criptografado e chave]
    K --> B

    E --> L[Solicitar texto para descriptografar]
    L --> M[Solicitar chave completa]
    M --> N[Descriptografar com Transposição Colunar]
    N --> O[Descriptografar com Vigenère]
    O --> P[Exibir texto descriptografado]
    P --> B

    F --> Q[Fim]
