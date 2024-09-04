package Calculadore;

public class Main {
    public static void main(String[] args) {
        Calculadora calc = new Calculadora();

        calc.somar(10);
        calc.exibir(); // Output: Resultado atual: 10

        calc.subtrair(5);
        calc.exibir(); // Output: Resultado atual: 5

        calc.multiplicar(2);
        calc.exibir(); // Output: Resultado atual: 10

        calc.dividir(5);
        calc.exibir(); // Output: Resultado atual: 2

        calc.dividir(0); // Output: Erro: Divisão por zero não permitida!
        calc.exibir(); // Output: Resultado atual: 2

        calc.zerar();
        calc.exibir(); // Output: Resultado atual: 0
    }
}
