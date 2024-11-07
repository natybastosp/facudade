package aula9.diagrama5;

public class Servidor {
    private int siape;
    private String nomeServidor;

    // Construtor
    public Servidor(int siape, String nomeServidor) {
        this.siape = siape;
        this.nomeServidor = nomeServidor;
    }

    // Getters e Setters
    public int getSiape() {
        return siape;
    }

    public void setSiape(int siape) {
        this.siape = siape;
    }

    public String getNomeServidor() {
        return nomeServidor;
    }

    public void setNomeServidor(String nomeServidor) {
        this.nomeServidor = nomeServidor;
    }
}

