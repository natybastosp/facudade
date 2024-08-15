package exercicios;

public class Triangulo {
    double ladoA;
    double ladoB;
    double ladoC;

    public boolean formaTriangulo() {
        return (ladoA + ladoB > ladoC) && (ladoA + ladoC > ladoB) && (ladoB + ladoC > ladoA);
    }

    public String obterTipo() {
        if (!formaTriangulo()) {
            return null;
        }
        if (ladoA == ladoB && ladoB == ladoC) {
            return "Equilátero";
        } else if (ladoA == ladoB || ladoA == ladoC || ladoB == ladoC) {
            return "Isósceles";
        } else {
            return "Escaleno";
        }
    }
}
