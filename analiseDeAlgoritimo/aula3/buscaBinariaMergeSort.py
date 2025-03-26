#Função de ordenação Merge Sort
def mergeSort(arr):
    # Verifica se o array tem um ou nenhum elemento
    if len(arr) <= 1:
        return arr
    
    # Encontra o meio do array
    meio = len(arr) // 2
    
    # Inicializa os arrays da esquerda e da direita
    esquerda = []
    direita = []
    
    # Preenche o array da esquerda com a primeira metade do array original
    for i in range(0, meio):
        esquerda.append(arr[i])
        
    # Preenche o array da direita com a segunda metade do array original
    for i in range(meio, len(arr)):
        direita.append(arr[i])
    
    # Ordena os arrays da esquerda e da direita
    esqueda_ordenada = mergeSort(esquerda)
    direita_ordenada = mergeSort(direita)
    
    # Retorna o array ordenado
    return merge(esqueda_ordenada, direita_ordenada)

def merge(esquerda, direita):
    # Inicializa o array de resultado
    resultado = []
    
    i_esq = 0
    i_dir = 0
    
    # Enquanto houver elementos nos arrays da esquerda e da direita
    while i_esq < len(esquerda) and i_dir < len(direita):
        # Se o elemento da esquerda for menor que o da direita
        if esquerda[i_esq] < direita[i_dir]:
            # Adiciona o elemento da esquerda ao array de resultado
            resultado.append(esquerda[i_esq])
            i_esq += 1
        else:
            # Adiciona o elemento da direita ao array de resultado
            resultado.append(direita[i_dir])
            i_dir += 1
            
    # Adiciona os elementos restantes do array da direita ao array de resultado  
    while i_dir < len(direita):
        resultado.append(direita[i_dir])
        i_dir += 1
            
    # Adiciona os elementos restantes do array da esquerda ao array de resultado
    while i_esq < len(esquerda):
       resultado.append(esquerda[i_esq])
       i_esq += 1
       
    # Retorna o array de resultado
    return resultado

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
    arr = [12, 11, 13, 5, 6, 7]
    alvo = 12
    resultado = mergeSort(arr)

    print("O array ordenado é: ", resultado)
    print("O index é :",busca_binario(alvo, resultado))
    
main()