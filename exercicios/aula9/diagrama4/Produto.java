package aula9.diagrama4;

public class Produto {
    private int numero;
    private String descricao;
    private double precoUnitario;
    private Fornecedor fornecedor;

    // Construtor
    public Produto(int numero, String descricao, double precoUnitario, Fornecedor fornecedor) {
        this.numero = numero;
        this.descricao = descricao;
        this.precoUnitario = precoUnitario;
        this.fornecedor = fornecedor;
    }

    // Getters e Setters
    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    // Override do método toString para facilitar a exibição
    @Override
    public String toString() {
        return "Produto [numero=" + numero + ", descricao=" + descricao + 
               ", precoUnitario=" + precoUnitario + ", fornecedor=" + fornecedor + "]";
    }
}
