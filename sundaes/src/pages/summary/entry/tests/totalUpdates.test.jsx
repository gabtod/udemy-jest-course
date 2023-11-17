import { render, screen } from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

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

test("update toppings subtotal when toppings are changed", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  //default toppings total should be 0
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");
  //check 1 box, check subtotal
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesTopping);

  expect(toppingSubtotal).toHaveTextContent("1.50");

  //check another box, check subtotal
  const mnmsTopping = await screen.findByRole("checkbox", { name: /m&ms/i });
  await user.click(mnmsTopping);

  expect(toppingSubtotal).toHaveTextContent("3.00");

  //uncheck a box, and check subtotal
  await user.click(mnmsTopping);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test.skip("grand total starts at 0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /grand total: \$/i });

    expect(total).toHaveTextContent("0.00");
    unmount();
  });
  test("grand total updates propertly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /grand total:/i });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(total).toHaveTextContent("4.00");

    const toppingInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(toppingInput);
    expect(total).toHaveTextContent("5.50");
  });
  test("grand total updates propertly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /grand total: /i });

    const toppingInput = await screen.findByRole("checkbox", { name: "M&Ms" });
    const toopingInput2 = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(toppingInput);
    await user.click(toopingInput2);

    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(scoopInput);
    await user.type(scoopInput, "1");

    expect(total).toHaveTextContent("5.00");
  });
  test("grand total updates propertly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);

    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(scoopInput);
    await user.type(scoopInput, "3");

    const total = screen.getByRole("heading", { name: /grand total/i });
    expect(total).toHaveTextContent("7.50");

    await user.clear(scoopInput);
    await user.type(scoopInput, "1");
    expect(total).toHaveTextContent("3.50");
  });
});
