package aula9.diagrama5;

public class Adistancia extends Curso {
    private String nomeCursoAdistancia;

    // Construtor
    public Adistancia(String codigoCurso, String nomeCurso, String nomeCursoAdistancia) {
        super(codigoCurso, nomeCurso);
        this.nomeCursoAdistancia = nomeCursoAdistancia;
    }

    // Getters e Setters
    public String getNomeCursoAdistancia() {
        return nomeCursoAdistancia;
    }

    public void setNomeCursoAdistancia(String nomeCursoAdistancia) {
        this.nomeCursoAdistancia = nomeCursoAdistancia;
    }
}
