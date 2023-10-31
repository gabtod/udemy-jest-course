import { render, screen, fireEvent } from "@testing-library/react";
//import { logRoles } from '@testing-library/react';
import App from "./App";
import { replaceCamelCaseWithSpace } from "./App";

test("button has correct initial color and updates when clicked", () => {
  // const { container } =  render(<App/>);
  // logRoles(container);
  render(<App />);
  //find element with a role of s button and text 'Change to blue'
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //expect the background color to be red

  expect(colorBtn).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("button turns blue when clicked", () => {
  render(<App />);
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //click button
  fireEvent.click(colorBtn);
  expect(colorBtn).toHaveStyle({ "background-color": "MidnightBlue" });
  expect(colorBtn.textContent).toBe("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  //check that button starts enabled
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorBtn).toBeEnabled();

  //check that the checkbox starts unchecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("check diabled enabled functionality of button", () => {
  render(<App />);

  const btn = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  //click checkbox
  fireEvent.click(checkbox);
  expect(btn).toBeDisabled();

  fireEvent.click(checkbox);
  expect(btn).toBeEnabled();
});

test("Disabled button has grey background and reverts to red", () => {
  render(<App />);
  const btn = screen.getByRole("button");
  const chkbx = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(chkbx);
  expect(btn).toHaveStyle({ "background-color": "grey" });
  fireEvent.click(chkbx);
  expect(btn).toHaveStyle({ "background-color": "MediumVioletRed" });

  fireEvent.click(btn);
  fireEvent.click(chkbx);
  expect(btn).toHaveStyle({ "background-color": "grey" });

  fireEvent.click(chkbx);
  expect(btn).toHaveStyle({ "background-color": "MidnightBlue" });
});

//Medium Violet Red
//Mignight Blue

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelCaseWithSpace("Red")).toBe("Red");
  });

  test("works fro 1 internal capital letter", () => {
    expect(replaceCamelCaseWithSpace("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for several internal capital letters", () => {
    expect(replaceCamelCaseWithSpace("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
