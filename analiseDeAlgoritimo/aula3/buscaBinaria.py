def busca_binario(alvo, arr):
    # Inicializa os ponteiros
    esquerda = 0
    direita = len(arr) - 1
    
    while esquerda <= direita:
        # Encontra o meio da lista
        meio = (esquerda + direita)  // 2
        
        # Se o elemento do meio for igual ao alvo
        if arr[meio] == alvo:
            # Retorna o índice do elemento
            return meio
        # Se o elemento do meio for menor que o alvo
        else:
            if arr[meio] < alvo:
                # Atualiza o ponteiro da esquerda
                esquerda = meio + 1
            else:
                # Atualiza o ponteiro da direita
                direita = meio - 1
    
    return -1

def main():
    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    alvo = 5
   
    print("O index é :",busca_binario(alvo, arr))
    
main()