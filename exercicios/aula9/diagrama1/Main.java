package aula9.diagrama1;

public class Main {
    public static void main(String[] args) {
        // Criando um objeto Fone
        Fone fone = new Fone("Residencial", "12345-6789", false);

        // Criando um objeto Pessoa
        Pessoa pessoa = new Pessoa("João", "Silva", fone);

        // Exibindo informações da pessoa
        System.out.println(pessoa.getPessoa());

        // Testando método isCelular()
        System.out.println("É celular? " + fone.isCelular());
    }
}
