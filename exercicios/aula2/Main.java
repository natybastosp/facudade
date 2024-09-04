

public class Main {
  public static void main(String[] args) {
    System.out.println("Obtendo argumentos");

    // primeira opção
    for (int i = 0; i < args.length; i++) {
      System.out.println("args[" + i + "] = " + args[i]);
    }

    // for iteravel
    for (String arg : args) {
      System.out.println("Argumentos " + arg);
    }

  }


}