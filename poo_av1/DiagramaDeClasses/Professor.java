package DiagramaDeClasses;

import java.util.ArrayList;
import java.util.List;

public class Professor {
    private String nome;
    private String matricula;
    private List<Curso> cursosLecionados; // Relacionamento com Curso

    public Professor(String nome, String matricula, Curso cursoInicial) {
        this.nome = nome;
        this.matricula = matricula;
        this.cursosLecionados = new ArrayList<>();
        adicionarCurso(cursoInicial); // Garante pelo menos 1 curso associado
    }

    public void listarCursos() {
        System.out.println("Cursos lecionados por " + nome + ":");
        for (Curso curso : cursosLecionados) {
            System.out.println("- " + curso.getNome());
        }
    }

    public void adicionarCurso(Curso curso) {
        if (!cursosLecionados.contains(curso)) {
            cursosLecionados.add(curso);
            curso.adicionarProfessor(this); // Relacionamento bidirecional
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
