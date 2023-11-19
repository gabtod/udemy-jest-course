import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of image
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping from server", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  //cofirm alt text
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});

test("dont update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  const vanillaScoopInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });

  const scoopSubtotal = screen.getByText("Scoops total: $0.00");

  await user.clear(vanillaScoopInput);
  //test invalid input decimal
  await user.type(vanillaScoopInput, "2.5");
  expect(scoopSubtotal).toHaveTextContent("$0.00");

  //test invalid input >10
  await user.clear(vanillaScoopInput);
  await user.type(vanillaScoopInput, "100");
  expect(scoopSubtotal).toHaveTextContent("0.00");

  //test invalud input with negative number

  await user.clear(vanillaScoopInput);
  await user.type(vanillaScoopInput, "-1");
  expect(scoopSubtotal).toHaveTextContent("0.00");

  //test valid input
  await user.clear(vanillaScoopInput);
  await user.type(vanillaScoopInput, "3");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
