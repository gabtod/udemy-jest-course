import { useOrderDetails } from "../../../contexts/OrderDetails";
import { formatCurrency } from "../../../utils";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <button
        onClick={() => {
          setOrderPhase("review");
        }}
      >
        Order Sundae
      </button>
    </div>
  );
}
