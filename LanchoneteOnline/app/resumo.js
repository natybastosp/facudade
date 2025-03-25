import { View, Text, FlatList } from "react-native";
import { usePedido } from "../context/PedidoContext";

export default function ResumoPedido() {
  const { cliente, pedido } = usePedido();

  return (
    <View>
      <Text>Cliente: {cliente}</Text>
      <FlatList
        data={pedido}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.nome} - R$ {item.valor.toFixed(2)}
            </Text>
          </View>
        )}
      />
      <Text>
        Total: R${" "}
        {pedido.reduce((total, item) => total + item.valor, 0).toFixed(2)}
      </Text>
    </View>
  );
}
