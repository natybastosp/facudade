import { Stack } from "expo-router";
import { PedidoProvider } from "../context/PedidoContext";

export default function Layout() {
  return (
    <PedidoProvider>
      <Stack screenOptions={{ headerShown: true }} />
    </PedidoProvider>
  );
}
