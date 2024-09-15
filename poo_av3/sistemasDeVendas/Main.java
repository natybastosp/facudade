package sistemasDeVendas;

public class Main {
    public static void main(String[] args) {
        // Criando instâncias de cada tipo de usuário
        Cliente cliente = new Cliente("João", "senha123", "Rua A, 123", "1234-5678");
        Funcionario funcionario = new Funcionario("Maria", "senha456");
        Gerente gerente = new Gerente("Carlos", "senha789");

        // Demonstrando o uso dos métodos
        System.out.println("=== Cliente ===");
        System.out.println(cliente);
        cliente.comprarProduto();

        System.out.println("\n=== Funcionário ===");
        System.out.println(funcionario);
        funcionario.exibirProduto();
        funcionario.venderProduto();

        System.out.println("\n=== Gerente ===");
        System.out.println(gerente);
        gerente.exibirProduto();
        gerente.venderProduto();
        gerente.fechamentoCaixa();
    }
}
