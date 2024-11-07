package aula9.diagrama3;

public class PessoaFisica extends Pessoa {
    private String cpf;

    // Construtor
    public PessoaFisica(String nome, String sobrenome, String cpf) {
        super(nome, sobrenome);
        this.cpf = cpf;
    }

    // Método para definir o CPF
    public void setCPF(String cpf) {
        this.cpf = cpf;
    }

    // Método para obter o CPF
    public String getCPF() {
        return cpf;
    }

    // Override do método toString para incluir o CPF
    @Override
    public String toString() {
        return super.toString() + ", CPF=" + cpf;
    }
}

