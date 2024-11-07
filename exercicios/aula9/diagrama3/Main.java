package aula9.diagrama3;

public class Main {
    public static void main(String[] args) {
        // Criando uma Pessoa Física
        PessoaFisica pessoaFisica = new PessoaFisica("João", "Silva", "123.456.789-00");
        Fone fone1 = new Fone("+55", "123456789", true);
        pessoaFisica.addFone(fone1);

        // Criando uma Pessoa Jurídica
        PessoaJuridica pessoaJuridica = new PessoaJuridica("Empresa XYZ", "LTDA", "12.345.678/0001-99");
        Fone fone2 = new Fone("+55", "987654321", false);
        pessoaJuridica.addFone(fone2);

        // Exibindo as informações
        System.out.println("Pessoa Física: " + pessoaFisica);
        System.out.println("Pessoa Jurídica: " + pessoaJuridica);
    }
}

