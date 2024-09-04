package Carro;

public class Carro {
    // Private attributes
    private int velocidade;
    private int velocidadeMaxima;

    // Constructor
    public Carro(int velocidadeMaxima) {
        this.velocidade = 0; // Initialize velocidade to 0
        this.velocidadeMaxima = velocidadeMaxima; // Set the maximum speed
    }

    // Method to accelerate the car
    public void acelera() {
        if (velocidade < velocidadeMaxima) {
            velocidade++;
        } else {
            System.out.println("Velocidade máxima atingida!"); // Optional: Inform the user
        }
    }

    // Method to brake the car
    public void freia() {
        if (velocidade > 0) {
            velocidade--;
        } else {
            System.out.println("O carro já está parado!"); // Optional: Inform the user
        }
    }

    // Method to display the current speed
    public void exibirVelocidade() {
        System.out.println("Velocidade atual: " + velocidade + " km/h");
    }

    // Getter for the current speed (optional, if needed)
    public int getVelocidade() {
        return velocidade;
    }

    // Getter for the maximum speed (optional, if needed)
    public int getVelocidadeMaxima() {
        return velocidadeMaxima;
    }
}
