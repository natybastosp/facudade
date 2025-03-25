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

def main():
    # Array de entrada
    arr = [12, 11, 13, 5, 6, 7]
    
    # Chama a função de ordenação
    resultado = mergeSort(arr)
    
    # Imprime o array ordenado
    print("Array ordenado: ", resultado)
    
main()