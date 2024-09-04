package Calculadora_3;

public class Main {
    public static void main(String[] args) {
        CalculadoraAvancada calcAvancada = new CalculadoraAvancada();

        calcAvancada.somar(10);
        calcAvancada.exibir(); // Output: Resultado atual: 10

        calcAvancada.potencia(3);
        calcAvancada.exibir(); // Output: Resultado atual: 1000

        calcAvancada.raiz(3);
        calcAvancada.exibir(); // Output: Resultado atual: 10

        calcAvancada.inverterSinal();
        calcAvancada.exibir(); // Output: Resultado atual: -10

        calcAvancada.salvarEstado();
        calcAvancada.zerar();
        calcAvancada.exibir(); // Output: Resultado atual: 0

        calcAvancada.restaurarEstado();
        calcAvancada.exibir(); // Output: Resultado atual: -10
    }
}

