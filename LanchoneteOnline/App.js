import { registerRootComponent } from "expo";
import { ExpoRouter } from "expo-router";

export default function App() {
  return <ExpoRouter />;
}

registerRootComponent(App);
