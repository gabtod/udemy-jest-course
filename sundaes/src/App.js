import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/summary/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/*
        Summary page and entry page need a provider
        */}
        <OrderEntry></OrderEntry>
      </OrderDetailsProvider>
      {/*confrimation page does not need a provider*/}
    </Container>
  );
}

export default App;
