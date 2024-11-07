package aula9.diagrama3;

import java.util.ArrayList;
import java.util.List;

public class Pessoa {
    private String nome;
    private String sobrenome;
    private List<Fone> fones;

    // Construtor
    public Pessoa(String nome, String sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.fones = new ArrayList<>();
    }

    // Método para adicionar um telefone
    public void addFone(Fone fone) {
        if (fone != null) {
            fones.add(fone);
        }
    }

    // Método para definir os dados da Pessoa
    public void setPessoa(String nome, String sobrenome, List<Fone> fones) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        if (fones != null) {
            this.fones = fones;
        }
    }

    // Método para obter os dados da Pessoa
    public Pessoa getPessoa() {
        return this;
    }

    // Método para obter os telefones associados à pessoa
    public List<Fone> getFones() {
        return fones;
    }

    // Override do método toString para facilitar a exibição
    @Override
    public String toString() {
        return "Pessoa [nome=" + nome + ", sobrenome=" + sobrenome + ", fones=" + fones + "]";
    }
}

