package aula9.diagrama1;

public class Pessoa {
    // Atributos privados
    private String nome;
    private String sobrenome;
    private Fone fone;

    // Construtor
    public Pessoa(String nome, String sobrenome, Fone fone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.fone = fone;
    }

    // Método para configurar a pessoa
    public void setPessoa(String nome, String sobrenome, Fone fone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.fone = fone;
    }

    // Método para obter os dados da pessoa
    public String getPessoa() {
        return "Nome: " + nome + " " + sobrenome + ", Telefone: " + (fone != null ? fone.getFone() : "Nenhum telefone");
    }
}

