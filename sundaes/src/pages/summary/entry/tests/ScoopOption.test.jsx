import { render, screen } from "../../../../test-utils/testing-library-utils";
import ScoopOtion from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("scoops input turns red when invalid input is added", async () => {
  const user = userEvent.setup();
  render(<ScoopOtion />);

  const chocolateScoopInput = screen.getByRole("spinbutton");

  // invalid input with negative number
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, "-2");
  expect(chocolateScoopInput).toHaveClass("is-invalid");
  //invalid input with decimal point
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, "2.5");
  expect(chocolateScoopInput).toHaveClass("is-invalid");

  //invalid input with >10 input
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, "-11");
  expect(chocolateScoopInput).toHaveClass("is-invalid");

  //valid when input is positive integer less than 10
  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, "2");
  expect(chocolateScoopInput).not.toHaveClass("is-invalid");
});
