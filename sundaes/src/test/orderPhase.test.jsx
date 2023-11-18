import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { logRoles } from "@testing-library/react";

import App from "../App";

test("Order Phase for happy path", async () => {
  const user = userEvent.setup();
  //render app
  const { container, unmount } = render(<App />);
  logRoles(container);

  //add ice cream scoops and toppings
  const chocolateScoopInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, "2"); //4 dollars

  const cherriesToppingInput = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesToppingInput); //1.5 dollars

  const grandTotal = await screen.findByRole("heading", {
    name: /grand total/i,
  });
  expect(grandTotal).toHaveTextContent("5.50");

  //find and click order button
  const orderButton = screen.getByRole("button", { name: "Order Sundae" });
  await user.click(orderButton);

  //check summary info based on order
  const scoopSummary = await screen.findByRole("heading", {
    name: "Scoops: $4.00",
  });
  const toppingSummary = await screen.findByRole("heading", {
    name: "Toppings: $1.50",
  });
  const totalSummary = await screen.findByRole("heading", {
    name: "Order summary",
  });
  expect(scoopSummary).toBeInTheDocument();
  expect(toppingSummary).toBeInTheDocument();
  expect(totalSummary).toBeInTheDocument();

  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //accept t&c and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsAndConditionsCheckbox);

  const confirmationButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmationButton);

  //expect loading to show
  // const loadingText = screen.getByText("Loading");
  // expect(loadingText).toBeInTheDocument();

  //confirm order number on confirmation page
  const thankYouText = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouText).toBeInTheDocument();

  //expect the loading to be gone
  const noLoadingText = screen.queryByText("loading");
  expect(noLoadingText).not.toBeInTheDocument();

  //click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: "Create new order",
  });
  await user.click(newOrderButton);
  //check that scoops and toppings subtotal have been reset
  const scoopSubtotalHeading = await screen.findByText("Scoops total: $0.00");
  const toppingSubtotalHeading = screen.getByText("Toppings total: $0.00");

  expect(scoopSubtotalHeading).toBeInTheDocument();
  expect(toppingSubtotalHeading).toBeInTheDocument();
  //do we need to await anything to avoid test errors???

  unmount();
});

test("Topping header is not on Summary Page when not ordered", async () => {
  const user = userEvent.setup();
  render(<App />);

  const chocolateScoopInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, "2");

  const orderButton = screen.getByRole("button", { name: "Order Sundae" });
  await user.click(orderButton);

  const scoopText = screen.getByText("Scoops: $4.00");
  expect(scoopText).toBeInTheDocument();

  const noToppingText = screen.queryByText("Toppings", { exact: false });
  expect(noToppingText).not.toBeInTheDocument();
});

test("Toppings header is not on Summary Page, if orderred but then removed", async () => {
  const user = userEvent.setup();
  render(<App />);

  const vanillaScoopInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaScoopInput);
  await user.type(vanillaScoopInput, "3");

  const mmsToppingInput = await screen.findByRole("checkbox", {
    name: /m&ms/i,
  });
  await user.click(mmsToppingInput);
  expect(mmsToppingInput).toBeChecked();

  const toppingSubtotalText = await screen.findByText("Toppings total:", {
    exact: false,
  });
  expect(toppingSubtotalText).toHaveTextContent("1.50");

  await user.click(mmsToppingInput);
  expect(mmsToppingInput).not.toBeChecked();
  expect(toppingSubtotalText).toHaveTextContent("0.00");

  const orderButton = screen.getByRole("button", { name: "Order Sundae" });
  await user.click(orderButton);

  const scoopText = screen.getByText("Scoops: $6.00");
  expect(scoopText).toBeInTheDocument();

  const noToppingText = screen.queryByText("Toppings", { exact: false });
  expect(noToppingText).not.toBeInTheDocument();
});
