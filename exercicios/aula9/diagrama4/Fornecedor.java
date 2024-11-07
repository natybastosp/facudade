package aula9.diagrama4;

public class Fornecedor {
    private String nome;
    private int numero;
    private Endereco endereco;

    // Construtor
    public Fornecedor(String nome, int numero, Endereco endereco) {
        this.nome = nome;
        this.numero = numero;
        this.endereco = endereco;
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    // Override do método toString para facilitar a exibição
    @Override
    public String toString() {
        return "Fornecedor [nome=" + nome + ", numero=" + numero + ", endereco=" + endereco + "]";
    }
}

