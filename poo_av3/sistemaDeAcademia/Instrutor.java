package sistemaDeAcademia;

public class Instrutor extends Recepcionista {
    public Instrutor(String nome, String senha, String idUsuario) {
        super(nome, senha, idUsuario);
    }

    public void criarPlanosTreino() {
        System.out.println("criarPlanosTreino");
    }

    public void avaliarDesempenhoAlunos() {
        System.out.println("avaliarDesempenhoAlunos");
    }
}
