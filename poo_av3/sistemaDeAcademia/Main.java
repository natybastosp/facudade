package sistemaDeAcademia;

public class Main {
    public static void main(String[] args) {
        // Criando instâncias de cada tipo de usuário
        Aluno aluno = new Aluno("João", "senha123", "A001", "M12345");
        Recepcionista recepcionista = new Recepcionista("Maria", "senha456", "R001");
        Instrutor instrutor = new Instrutor("Carlos", "senha789", "I001");

        // Demonstrando o uso dos métodos
        System.out.println("=== Aluno ===");
        System.out.println(aluno);
        aluno.agendarAula();
        aluno.cancelarAula();

        System.out.println("\n=== Recepcionista ===");
        System.out.println(recepcionista);
        recepcionista.registrarNovoAluno();
        recepcionista.gerenciarPagamentos();

        System.out.println("\n=== Instrutor ===");
        System.out.println(instrutor);
        instrutor.registrarNovoAluno();
        instrutor.gerenciarPagamentos();
        instrutor.criarPlanosTreino();
        instrutor.avaliarDesempenhoAlunos();
    }
}
