package sistemaDeAcademia;

public class Recepcionista extends Usuario {
    public Recepcionista(String nome, String senha, String idUsuario) {
        super(nome, senha, idUsuario);
    }

    public void registrarNovoAluno() {
        System.out.println("registrarNovoAluno");
    }

    public void gerenciarPagamentos() {
        System.out.println("gerenciarPagamentos");
    }
}
