package aula9.diagrama1;

public class Fone {
    // Atributos privados
    private String codigo;
    private String numero;
    private boolean celular;

    // Construtor
    public Fone(String codigo, String numero, boolean celular) {
        this.codigo = codigo;
        this.numero = numero;
        this.celular = celular;
    }

    // Método para configurar o telefone
    public void setFone(String codigo, String numero, boolean celular) {
        this.codigo = codigo;
        this.numero = numero;
        this.celular = celular;
    }

    // Método para obter o número de telefone
    public String getFone() {
        return codigo + ": " + numero;
    }

    // Método para verificar se é celular
    public boolean isCelular() {
        return celular;
    }
}
