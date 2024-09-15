package sistemasDeVendas;

public abstract class Usuario {
    protected String nome;
    protected String senha;

    public Usuario(String nome, String senha) {
        this.nome = nome;
        this.senha = senha;
    }

    @Override
    public String toString() {
        return "Nome: " + nome;
    }
}
