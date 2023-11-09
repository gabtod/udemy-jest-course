import { render, screen } from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../../contexts/OrderDetails";

test("update scoop subtotal when scoop changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  //start at 0.0
  const subtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(subtotal).toHaveTextContent("0.00");
  //update vanilla scoop to 1, check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(subtotal).toHaveTextContent("2.00");
  //update choc scopp to 2, check subtotal
  const chocInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocInput);
  await user.type(chocInput, "2");
  expect(subtotal).toHaveTextContent("6.00");
});
