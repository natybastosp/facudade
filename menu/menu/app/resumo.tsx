import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Resumo() {
  const router = useRouter();

  return (
    <View>
      <Text>Resumo do Pedido:</Text>
      <Text>Hambúrguer - R$20</Text>
      <Text>Pizza - R$35</Text>
      <Text>Total: R$55</Text>
      <Button
        title="Confirmar Pedido"
        onPress={() => alert("Pedido Confirmado!")}
      />
      <Button title="Voltar ao Cardápio" onPress={() => router.push("/")} />
    </View>
  );
}
