package sistemasDeVendas;


// Classe Cliente
public class Cliente extends Usuario {
    private String endereco;
    private String telefone;

    public Cliente(String nome, String senha, String endereco, String telefone) {
        super(nome, senha);
        this.endereco = endereco;
        this.telefone = telefone;
    }

    public void comprarProduto() {
        System.out.println("comprarProduto");
    }

    @Override
    public String toString() {
        return super.toString() + ", Endereço: " + endereco + ", Telefone: " + telefone;
    }
}



