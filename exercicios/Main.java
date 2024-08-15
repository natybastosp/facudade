package exercicios;

// Importando as classes necessárias
import exercicios.Aluno;
import exercicios.Livro;
import exercicios.Retangulo;
import exercicios.Triangulo;

public class Main {
    public static void main(String[] args) {
        // Exercicio 1: Aluno
        Aluno aluno1 = new Aluno();
        aluno1.nome = "Natália";
        aluno1.idade = 20;
        aluno1.curso = "Engenharia da Computação";
        aluno1.apresentar();
        
        System.out.println(); // Separador de saída

        // Exercicio 2: Livro
        Livro livro1 = new Livro();
        livro1.titulo = "A Seleção";
        livro1.autor = "Kiera Cass";
        livro1.ano = 2012;
        livro1.exibir();
        
        System.out.println(); // Separador de saída

        // Exercicio 3: Retângulo
        Retangulo retangulo1 = new Retangulo();
        retangulo1.comprimento = 5.0;
        retangulo1.largura = 3.0;
        double area = retangulo1.calcularArea();
        System.out.println("Área do retângulo: " + area);
        
        System.out.println(); // Separador de saída

        // Exercicio 4: Triângulo
        Triangulo triangulo1 = new Triangulo();
        triangulo1.ladoA = 3.0;
        triangulo1.ladoB = 4.0;
        triangulo1.ladoC = 5.0;
        System.out.println("Tipo do triangulo1: " + triangulo1.obterTipo());
    }
}
