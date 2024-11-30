package DiagramaDeClasses;

import java.util.ArrayList;
import java.util.List;

public class Aluno {
    private String nome;
    private String matricula;
    private List<Curso> cursosMatriculados; // Relacionamento com Curso

    public Aluno(String nome, String matricula) {
        this.nome = nome;
        this.matricula = matricula;
        this.cursosMatriculados = new ArrayList<>();
    }

    public void matricular(Curso curso) {
        if (!cursosMatriculados.contains(curso)) {
            cursosMatriculados.add(curso);
            curso.adicionarAluno(this);
        }
    }

    public void cancelarMatricula(Curso curso) {
        if (cursosMatriculados.contains(curso)) {
            cursosMatriculados.remove(curso);
            curso.removerAluno(this);
        }
    }

    public void listarCursos() {
        System.out.println("Cursos matriculados por " + nome + ":");
        for (Curso curso : cursosMatriculados) {
            System.out.println("- " + curso.getNome());
        }
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public String getMatricula() {
        return matricula;
    }
}
