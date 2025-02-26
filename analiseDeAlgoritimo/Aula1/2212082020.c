#include <stdio.h>

// Funções relacionadas a redes sociais
void curtir_publicacao(int n) {
    printf("Você curtiu a publicação %d\n", n);
}

void comentar_publicacao(int n) {
    printf("Você comentou na publicação %d\n", n);
}

void compartilhar_publicacao(int n) {
    printf("Você compartilhou a publicação %d\n", n);
}

void enviar_mensagem(int n) {
    printf("Você enviou uma mensagem para %d\n", n);
}

void ver_notificacoes(int n) {
    printf("Você viu as notificações %d\n", n);
}

int main() {
    printf("  +-----------------------+\n");
    printf("  |        MENU         |\n");
    printf("  +-----------------------+\n");
    printf("  | 1. Curtir Publicação  |\n");
    printf("  | 2. Comentar Publicação |\n");
    printf("  | 3. Compartilhar Publicação|\n");
    printf("  | 4. Enviar Mensagem   |\n");
    printf("  | 5. Ver Notificações  |\n");
    printf("  | 6. Sair             |\n");
    printf("  +-----------------------+\n");

    char opcao;

    do {
        printf("Escolha uma opção (1-x é pra sair): ");
        scanf(" %c", &opcao);

        switch (opcao) {
            case '1':
                curtir_publicacao(1);
                break;
            case '2':
                comentar_publicacao(2);
                break;
            case '3':
                compartilhar_publicacao(3);
                break;
            case '4':
                enviar_mensagem(4);
                break;
            case '5':
                ver_notificacoes(5);
                break;
            case 'x':
                printf("Saindo do programa.\n");
                break;
            default:
                printf("Opção inválida. Tente novamente.\n");
        }
    } while (opcao != 'x');

    return 0;
}