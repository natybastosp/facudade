package sistemasDeVendas;

// Classe Gerente
public class Gerente extends Funcionario {
    public Gerente(String nome, String senha) {
        super(nome, senha);
    }

    public void fechamentoCaixa() {
        System.out.println("fechamentoCaixa");
    }
}
