import { FlatList } from "react-native";
import CardapioItem from "../components/CardapioItem";
import { cardapio } from "../data/cardapio";

export default function Cardapio() {
  return (
    <FlatList
      data={cardapio}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CardapioItem item={item} />}
    />
  );
}
