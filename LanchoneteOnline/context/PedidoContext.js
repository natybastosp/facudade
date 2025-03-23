import { createContext, useState, useContext } from "react";

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [cliente, setCliente] = useState("");
  const [pedido, setPedido] = useState([]);

  const adicionarItem = (item) => {
    setPedido([...pedido, item]);
  };

  return (
    <PedidoContext.Provider
      value={{ cliente, setCliente, pedido, adicionarItem }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  return useContext(PedidoContext);
}
