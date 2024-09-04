package Calculadore;

public class Calculadora {
    // Private attribute
    private int resultado;

    // Constructor
    public Calculadora() {
        this.resultado = 0; // Initialize resultado to 0
    }

    // Method to add a value to resultado
    public void somar(int valor) {
        resultado += valor;
    }

    // Method to subtract a value from resultado
    public void subtrair(int valor) {
        resultado -= valor;
    }

    // Method to multiply resultado by a value
    public void multiplicar(int valor) {
        resultado *= valor;
    }

    // Method to divide resultado by a value
    public void dividir(int valor) {
        if (valor != 0) {
            resultado /= valor;
        } else {
            System.out.println("Erro: Divisão por zero não permitida!");
        }
    }

    // Method to reset resultado to 0
    public void zerar() {
        resultado = 0;
    }

    // Method to display the current resultado
    public void exibir() {
        System.out.println("Resultado atual: " + resultado);
    }

    // Method to return the current resultado
    public int obterResultado() {
        return resultado;
    }
}

