package aula9.diagrama2;

public class Main {
    public static void main(String[] args) {
        // Exemplo de uso das classes
        Pessoa pessoa = new Pessoa("João", "Silva");
        
        Fone fone1 = new Fone("+55", "123456789", true);
        Fone fone2 = new Fone("+55", "987654321", false);

        pessoa.addFone(fone1);
        pessoa.addFone(fone2);

        System.out.println(pessoa);
    }
}
