import { View, Text, Image, Button } from "react-native";
import { usePedido } from "../context/PedidoContext";

export default function CardapioItem({ item }) {
  const { adicionarItem } = usePedido();

  return (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Image
        source={{ uri: item.imagem }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{item.nome}</Text>
      <Text>{item.descricao}</Text>
      <Text>R$ {item.valor.toFixed(2)}</Text>
      <Button title="Adicionar" onPress={() => adicionarItem(item)} />
    </View>
  );
}
