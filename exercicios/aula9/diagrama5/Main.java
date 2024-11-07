package aula9.diagrama5;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Criando uma universidade
        Universidade universidade = new Universidade("UFG", "Universidade Federal de Goiás");

        // Criando institutos
        Instituto instituto1 = new Instituto("IC", "Instituto de Computação", universidade);
        Instituto instituto2 = new Instituto("IME", "Instituto de Matemática e Estatística", universidade);

        // Associando os institutos à universidade
        List<Instituto> institutos = new ArrayList<>();
        institutos.add(instituto1);
        institutos.add(instituto2);

        // Criando servidores (que podem ser coordenadores)
        Servidor coordenador1 = new Servidor(12345, "Dr. João da Silva");
        Servidor coordenador2 = new Servidor(67890, "Dra. Maria Oliveira");

        // Definindo coordenadores para os institutos
        instituto1.setCoordenador(coordenador1);
        instituto2.setCoordenador(coordenador2);

        // Criando cursos presenciais e a distância
        Curso cursoPresencial = new Presencial("CS101", "Ciência da Computação", "Curso Presencial de Ciência da Computação");
        Curso cursoAdistancia = new Adistancia("DS202", "Data Science", "Curso a Distância de Data Science");

        // Associando os cursos ao instituto
        List<Curso> cursosInstituto1 = new ArrayList<>();
        cursosInstituto1.add(cursoPresencial);
        cursosInstituto1.add(cursoAdistancia);
        instituto1.setCursos(cursosInstituto1);

        // Exibindo informações
        System.out.println("Universidade: " + universidade.getNome());
        System.out.println("Sigla: " + universidade.getSigla());
        
        System.out.println("\nInstitutos da Universidade:");
        for (Instituto instituto : institutos) {
            System.out.println("- Instituto: " + instituto.getNomeInstituto() + " (" + instituto.getSiglaInstituto() + ")");
            System.out.println("  Coordenador: " + instituto.getCoordenador().getNomeServidor());
            
            System.out.println("  Cursos:");
            for (Curso curso : instituto.getCursos()) {
                System.out.println("    - " + curso.getNomeCurso() + " (Código: " + curso.getCodigoCurso() + ")");
                if (curso instanceof Presencial) {
                    System.out.println("      Tipo: Presencial, Nome: " + ((Presencial) curso).getNomeCursoPresencial());
                } else if (curso instanceof Adistancia) {
                    System.out.println("      Tipo: A Distância, Nome: " + ((Adistancia) curso).getNomeCursoAdistancia());
                }
            }
        }
    }
}
