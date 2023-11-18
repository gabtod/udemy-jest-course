import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); //[["chocolate", 2], ["vanilla", 1]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = totals.toppingArray > 0;
  let toppingDisplay = null;

  if (hasToppings) {
    const toppingArray = Object.keys(optionCounts.toppings); //['M&Ms', 'Gummi bears']
    const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);
    toppingDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
