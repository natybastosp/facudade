package sistemasDeVendas;

// Classe Funcionario
public class Funcionario extends Usuario {
    public Funcionario(String nome, String senha) {
        super(nome, senha);
    }

    public void exibirProduto() {
        System.out.println("exibirProduto");
    }

    public void venderProduto() {
        System.out.println("venderProduto");
    }
}
