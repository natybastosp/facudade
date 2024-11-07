package aula9.diagrama5;

public abstract class Curso {
    private String codigoCurso;
    private String nomeCurso;

    // Construtor
    public Curso(String codigoCurso, String nomeCurso) {
        this.codigoCurso = codigoCurso;
        this.nomeCurso = nomeCurso;
    }

    // Getters e Setters
    public String getCodigoCurso() {
        return codigoCurso;
    }

    public void setCodigoCurso(String codigoCurso) {
        this.codigoCurso = codigoCurso;
    }

    public String getNomeCurso() {
        return nomeCurso;
    }

    public void setNomeCurso(String nomeCurso) {
        this.nomeCurso = nomeCurso;
    }
}

