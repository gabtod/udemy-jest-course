import { render, screen } from "../../test-utils/testing-library-utils";
import OrderConfirmation from "./OrderConfirmation";
import { server } from "../../mocks/server";
import { HttpResponse, rest } from "msw";

test("receive error from server when submitting order", async () => {
  //simulate a new handler
  server.resetHandlers(
    rest.post("http:localhost:3030/order", (req, res, ctx) => {
      return res(ctx.json(null, { status: 500 }));
    })
  );

  render(<OrderConfirmation />);
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "An unexpected error occured. Please try again later"
  );
});
