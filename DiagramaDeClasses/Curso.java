package DiagramaDeClasses;

import java.util.ArrayList;
import java.util.List;

public class Curso {
    private String nome;
    private String codigo;
    private List<Aluno> alunosMatriculados; // Relacionamento com Aluno
    private List<Professor> professores; // Relacionamento com Professor

    public Curso(String nome, String codigo) {
        this.nome = nome;
        this.codigo = codigo;
        this.alunosMatriculados = new ArrayList<>();
        this.professores = new ArrayList<>();
    }

    public void adicionarAluno(Aluno aluno) {
        if (!alunosMatriculados.contains(aluno)) {
            alunosMatriculados.add(aluno);
        }
    }

    public void removerAluno(Aluno aluno) {
        alunosMatriculados.remove(aluno);
    }

    public List<Aluno> listarAlunos() {
        return alunosMatriculados;
    }

    public List<Professor> listarProfessores() {
        return professores;
    }

    public void adicionarProfessor(Professor professor) {
        if (!professores.contains(professor)) {
            professores.add(professor);
        }
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public String getCodigo() {
        return codigo;
    }
}

