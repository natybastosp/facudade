import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { usePedido } from "../context/PedidoContext";
import { useRouter } from "expo-router";

export default function CadastroCliente() {
  const [nome, setNome] = useState("");
  const { setCliente } = usePedido();
  const router = useRouter();

  const salvarCliente = () => {
    setCliente(nome);
    router.push("/cardapio");
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, padding: 5 }}
      />
      <Button title="Avançar" onPress={salvarCliente} />
    </View>
  );
}
