package aula9.diagrama5;

public class Universidade {
    private String sigla;
    private String nome;

    // Construtor
    public Universidade(String sigla, String nome) {
        this.sigla = sigla;
        this.nome = nome;
    }

    // Getters e Setters
    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
