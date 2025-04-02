"""
Calcular a complexidade dos códigos:
3.1, 3.2, 4.1, 4.2, 9.1, 9.2, 10.1, 10.2, 12.1, 12.2, 13.1, 13.2, 14.1, 14.2
No arquivo anexo

---------------------------------------- (sem essas linhas pelo amor de deus)
3.1:n^2
4.1:n*log(n)
12.2:n!*n*log(n)*n^3*n^n*n*n*n
----------------------------------------

"""

# 3.1
def fatorial(n): 
    if n == 0:
        return 1
    return n * fatorial(n - 1)

# 3.2
def fatorial_iterativo(n):
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    return resultado

# 4.1
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
        
        
# 4.2
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
            
# 9.1
def produto_triplo_maximo(arr):
    n =len(arr)
    max_produto = float('-inf')
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                max_produto = max(max_produto, arr[i] * arr[j] * arr[k])
    return max_produto

# 9.2
def produto_triplo_maximo_otimizado(arr):
    arr.sort()
    return arr[-1] * arr[-2] * arr[-3]

# 10.1
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
   
# 10.2   
def quicksort_sort_pior(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    left = [x for x in arr if x < pivot]
    middle = [pivot]
    right = [x for x in arr if x > pivot]
    return quicksort_sort_pior(left) + middle + quicksort_sort_pior(right)

# 12.1
def combinacao(n, k, memo={}):
    if k == 0 or k == n:
        return 1
    if (n, k) in memo:
        return memo[(n, k)]
    memo[(n, k)] = combinacao(n - 1, k - 1, memo) + combinacao(n - 1, k, memo)
    return memo[(n, k)]

#12.2
def combinacao_sem_memo(n, k):
    if k == 0 or k == n:
        return 1
    return combinacao_sem_memo(n - 1, k - 1) + combinacao_sem_memo(n - 1, k)
 

#13.2
def is_prime_native(n):
    if n <=1:
        return False
    for i in range(2, n):
        if n in range(2, n):
            if n % i == 0:
                return False
    return True        
                   
#14.1
def has_cycle(graph):
    visited = set()          # Conjunto para nós já visitados
    rec_stack = set()        # Conjunto para rastrear a pilha de recursão
    
    def dfs_cycle(node):
        visited.add(node)
        rec_stack.add(node)
        
        for neighbor in graph[node]:  # Itera pelos vizinhos do nó atual
            if neighbor not in visited:
                if dfs_cycle(neighbor):  # Chamada recursiva
                    return True
            elif neighbor in rec_stack:  # Se o vizinho está na pilha de recursão
                return True              # Ciclo detectado
        
        rec_stack.remove(node)  # Remove o nó da pilha ao retroceder
        return False
    
    # Verifica todos os nós do grafo
    for node in graph:
        if node not in visited:
            if dfs_cycle(node):
                return True  # Ciclo encontrado
    
    return False  # Nenhum ciclo encontrado 

#14.2
from collections import deque

def has_cycle_bfs(graph):
    visited = set()  # Conjunto para armazenar nós visitados
    for start in graph:  # Itera por todos os nós do grafo
        if start not in visited:
            queue = deque([start])  # Inicia a fila BFS
            parent = {start: None}  # Dicionário para rastrear pais
            
            while queue:
                node = queue.popleft()
                visited.add(node)
                
                for neighbor in graph[node]:
                    if neighbor not in visited:
                        parent[neighbor] = node
                        queue.append(neighbor)
                    elif parent[node] != neighbor:
                        # Se o vizinho já foi visitado e não é o pai do nó atual
                        return True  # Ciclo detectado
    return False  # Nenhum ciclo encontrado  

