def matriz_identidade_otimizada(n):  # Define a função que cria uma matriz identidade de tamanho n x n.
    matriz = [[0 for _ in range(n)] for _ in range(n)]  # Cria uma matriz n x n preenchida com zeros.
    for i in range(n):  # Itera sobre cada índice da matriz (de 0 a n-1).
        matriz[i][i] = 1  # Define os elementos da diagonal principal como 1.
    return matriz  # Retorna a matriz identidade gerada.


def merge_sorte(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sorte(arr[:mid])
    right = merge_sorte(arr[mid:])
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def main():
    print(matriz_identidade_otimizada(5))
    print(merge_sorte([5, 10, 5,3, 4]))
    
main()  # Chama a função principal.