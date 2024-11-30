package DiagramaDeClasses;

public class Main {
    public static void main(String[] args) {
        // Criando objetos
        Curso curso1 = new Curso("Matemática", "C001");
        Curso curso2 = new Curso("Física", "C002");

        Aluno aluno1 = new Aluno("João", "A001");
        Aluno aluno2 = new Aluno("Maria", "A002");

        Professor professor1 = new Professor("Dr. Silva", "P001", curso1);

        // Matricular alunos
        aluno1.matricular(curso1);
        aluno2.matricular(curso1);
        aluno1.matricular(curso2);

        // Associar professor a outro curso
        professor1.adicionarCurso(curso2);

        // Listagens
        aluno1.listarCursos();
        aluno2.listarCursos();

        System.out.println("\nAlunos no curso de Matemática:");
        for (Aluno aluno : curso1.listarAlunos()) {
            System.out.println("- " + aluno.getNome());
        }

        professor1.listarCursos();
    }
}
