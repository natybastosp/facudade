package Calculadora_3;

public class CalculadoraAvancada extends Calculadora {
    // Private attribute to save state
    private Double estadoSalvo;

    // Constructor
    public CalculadoraAvancada() {
        super(); // Call the superclass constructor
        this.estadoSalvo = null; // Initialize estadoSalvo to null
    }

    // Method to raise resultado to a power
    public void potencia(int expoente) {
        int resultadoAtual = getResultado();
        setResultado((int) Math.pow(resultadoAtual, expoente));
    }

    // Method to take the root of resultado
    public void raiz(int expoente) {
        int resultadoAtual = getResultado();
        if (resultadoAtual >= 0) {
            setResultado((int) Math.pow(resultadoAtual, 1.0 / expoente));
        } else {
            System.out.println("Erro: Raiz de número negativo não permitida!");
        }
    }

    // Method to perform integer division
    public void divisaoInteira(int divisor) {
        if (divisor != 0) {
            int resultadoAtual = getResultado();
            setResultado(resultadoAtual / divisor);
        } else {
            System.out.println("Erro: Divisão por zero não permitida!");
        }
    }

    // Method to invert the sign of resultado
    public void inverterSinal() {
        int resultadoAtual = getResultado();
        setResultado(-resultadoAtual);
    }

    // Method to save the current state
    public void salvarEstado() {
        this.estadoSalvo = (double) getResultado();
    }

    // Method to restore the saved state
    public void restaurarEstado() {
        if (estadoSalvo != null) {
            setResultado(estadoSalvo.intValue());
        } else {
            System.out.println("Nenhum estado salvo para restaurar.");
        }
    }
}

