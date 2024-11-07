package aula9.diagrama3;

public class Fone {
    private String codigo;
    private String numero;
    private boolean celular;

    // Construtor
    public Fone(String codigo, String numero, boolean celular) {
        this.codigo = codigo;
        this.numero = numero;
        this.celular = celular;
    }

    // Método para definir os dados do telefone
    public void setFone(String codigo, String numero, boolean celular) {
        this.codigo = codigo;
        this.numero = numero;
        this.celular = celular;
    }

    // Método para obter o número completo do telefone
    public String getFone() {
        return codigo + " " + numero;
    }

    // Método para verificar se o telefone é celular
    public boolean isCelular() {
        return celular;
    }

    // Override do método toString para facilitar a exibição
    @Override
    public String toString() {
        return "Fone [codigo=" + codigo + ", numero=" + numero + ", celular=" + celular + "]";
    }
}

