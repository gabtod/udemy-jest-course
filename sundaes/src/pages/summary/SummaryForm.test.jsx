import { render, screen } from "@testing-library/react";
import SummaryForm from "./SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial Conditions", () => {
  render(<SummaryForm />);

  const button = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and conditions/i,
  });

  //expect checkbox to be unchecked
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears on mouseover of the checkbox label
  const tandc = screen.getByText(/terms and conditions/i);
  await user.hover(tandc);
  const popover = screen.getByText(/no ice cream will/i);
  expect(popover).toBeInTheDocument();

  //po pover disappears when we mouse out
  await user.unhover(tandc);
  expect(popover).not.toBeInTheDocument();
});
