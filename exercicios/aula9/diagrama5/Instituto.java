package aula9.diagrama5;

import java.util.List;

public class Instituto {
    private String siglaInstituto;
    private String nomeInstituto;
    private Universidade universidade;
    private List<Curso> cursos;
    private Servidor coordenador;

    // Construtor
    public Instituto(String siglaInstituto, String nomeInstituto, Universidade universidade) {
        this.siglaInstituto = siglaInstituto;
        this.nomeInstituto = nomeInstituto;
        this.universidade = universidade;
    }

    // Getters e Setters
    public String getSiglaInstituto() {
        return siglaInstituto;
    }

    public void setSiglaInstituto(String siglaInstituto) {
        this.siglaInstituto = siglaInstituto;
    }

    public String getNomeInstituto() {
        return nomeInstituto;
    }

    public void setNomeInstituto(String nomeInstituto) {
        this.nomeInstituto = nomeInstituto;
    }

    public Universidade getUniversidade() {
        return universidade;
    }

    public void setUniversidade(Universidade universidade) {
        this.universidade = universidade;
    }

    public List<Curso> getCursos() {
        return cursos;
    }

    public void setCursos(List<Curso> cursos) {
        this.cursos = cursos;
    }

    public Servidor getCoordenador() {
        return coordenador;
    }

    public void setCoordenador(Servidor coordenador) {
        this.coordenador = coordenador;
    }
}

