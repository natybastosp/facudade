import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Confirmar Pedido" onPress={() => router.push("/resumo")} />
    </View>
  );
}
