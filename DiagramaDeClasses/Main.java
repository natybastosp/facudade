package DiagramaDeClasses;

public class Main {
    public static void main(String[] args) {
        // Criando objetos de Curso
        Curso curso1 = new Curso("Matemática", "C001");
        Curso curso2 = new Curso("Física", "C002");

        // Criando objetos de Aluno
        Aluno aluno1 = new Aluno("João", "A001");
        Aluno aluno2 = new Aluno("Maria", "A002");

        // Criando objeto de Professor
        Professor professor1 = new Professor("Dr. Silva", "P001", curso1);

        // Matriculando alunos em cursos
        aluno1.matricular(curso1);
        aluno2.matricular(curso1);
        aluno1.matricular(curso2);

        // Associando professor a outro curso
        professor1.adicionarCurso(curso2);

        // Listagem de cursos dos alunos
        aluno1.listarCursos();
        aluno2.listarCursos();

        // Listagem de alunos no curso 1
        System.out.println("\nAlunos no curso de Matemática:");
        for (Aluno aluno : curso1.listarAlunos()) {
            System.out.println("- " + aluno.getNome());
        }

        // Listagem de cursos do professor
        professor1.listarCursos();
    }
}
