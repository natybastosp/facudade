package sistemaDeAcademia;

public class Aluno extends Usuario {
    private String numeroMatricula;

    public Aluno(String nome, String senha, String idUsuario, String numeroMatricula) {
        super(nome, senha, idUsuario);
        this.numeroMatricula = numeroMatricula;
    }

    public void agendarAula() {
        System.out.println("agendarAula");
    }

    public void cancelarAula() {
        System.out.println("cancelarAula");
    }

    @Override
    public String toString() {
        return super.toString() + ", Número de Matrícula: " + numeroMatricula;
    }
}
