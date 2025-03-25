import { View, FlatList, Image, Text, Button } from "react-native";
import { useRouter } from "expo-router";

const cardapio = [
  {
    id: "1",
    nome: "Hambúrguer",
    descricao: "Delicioso hambúrguer artesanal",
    preco: 20,
    imagem: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    nome: "Pizza",
    descricao: "Pizza de queijo com borda recheada",
    preco: 35,
    imagem: "https://via.placeholder.com/100",
  },
];

export default function Index() {
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={cardapio}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Image
              source={{ uri: item.imagem }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>R$ {item.preco}</Text>
            <Button title="Adicionar" onPress={() => router.push("/resumo")} />
          </View>
        )}
      />
      <Button
        title="Finalizar Pedido"
        onPress={() => router.push("/cadastro")}
      />
    </View>
  );
}
