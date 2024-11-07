package aula9.diagrama5;

public class Presencial extends Curso {
    private String nomeCursoPresencial;

    // Construtor
    public Presencial(String codigoCurso, String nomeCurso, String nomeCursoPresencial) {
        super(codigoCurso, nomeCurso);
        this.nomeCursoPresencial = nomeCursoPresencial;
    }

    // Getters e Setters
    public String getNomeCursoPresencial() {
        return nomeCursoPresencial;
    }

    public void setNomeCursoPresencial(String nomeCursoPresencial) {
        this.nomeCursoPresencial = nomeCursoPresencial;
    }
}

