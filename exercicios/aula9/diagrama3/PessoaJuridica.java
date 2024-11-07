package aula9.diagrama3;

public class PessoaJuridica extends Pessoa {
    private String cnpj;

    // Construtor
    public PessoaJuridica(String nome, String sobrenome, String cnpj) {
        super(nome, sobrenome);
        this.cnpj = cnpj;
    }

    // Método para definir o CNPJ
    public void setCNPJ(String cnpj) {
        this.cnpj = cnpj;
    }

    // Método para obter o CNPJ
    public String getCNPJ() {
        return cnpj;
    }

    // Override do método toString para incluir o CNPJ
    @Override
    public String toString() {
        return super.toString() + ", CNPJ=" + cnpj;
    }
}

