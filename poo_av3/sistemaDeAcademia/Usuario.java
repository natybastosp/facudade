package sistemaDeAcademia;

public abstract class Usuario {
    protected String nome;
    protected String senha;
    protected String idUsuario;

    public Usuario(String nome, String senha, String idUsuario) {
        this.nome = nome;
        this.senha = senha;
        this.idUsuario = idUsuario;
    }

    @Override
    public String toString() {
        return "Nome: " + nome + ", ID de Usuário: " + idUsuario;
    }
}
