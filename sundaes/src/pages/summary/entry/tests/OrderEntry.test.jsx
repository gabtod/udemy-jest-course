//import { render, screen, waitFor } from "@testing-library/react";
import {
  render,
  screen,
  waitFor,
} from "./../../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handles errors for scoops and topping routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disable order button if no scoops are added", async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = screen.getByRole("button", { name: "Order Sundae" });

  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(orderButton).toBeEnabled();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");

  expect(orderButton).toBeDisabled();
});
