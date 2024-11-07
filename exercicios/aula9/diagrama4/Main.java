package aula9.diagrama4;

public class Main {
    public static void main(String[] args) {
        // Criando o endereço do fornecedor
        Endereco endereco = new Endereco("Rua das Flores", "São Paulo", "SP", "12345-678", "Brasil");

        // Criando o fornecedor
        Fornecedor fornecedor = new Fornecedor("Fornecedor XYZ", 1001, endereco);

        // Criando produtos fornecidos pelo fornecedor
        Produto produto1 = new Produto(1, "Cadeira de Escritório", 450.00, fornecedor);
        Produto produto2 = new Produto(2, "Mesa de Escritório", 650.00, fornecedor);

        // Exibindo as informações dos produtos e seus fornecedores
        System.out.println(produto1);
        System.out.println(produto2);
    }
}

