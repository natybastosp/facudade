package aula9.diagrama4;

public class Endereco {
    private String rua;
    private String cidade;
    private String estado;
    private String cep;
    private String pais;

    // Construtor
    public Endereco(String rua, String cidade, String estado, String cep, String pais) {
        this.rua = rua;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.pais = pais;
    }

    // Getters e Setters
    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    // Override do método toString para facilitar a exibição
    @Override
    public String toString() {
        return "Endereco [rua=" + rua + ", cidade=" + cidade + ", estado=" + estado + 
               ", cep=" + cep + ", pais=" + pais + "]";
    }
}
