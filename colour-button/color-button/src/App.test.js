import { render, screen, fireEvent } from '@testing-library/react';
//import { logRoles } from '@testing-library/react';
import App from './App';

test('button has correct initial color and updates when clicked', () => {
  // const { container } =  render(<App/>);
  // logRoles(container);
  render(<App/>)
  //find element with a role of s button and text 'Change to blue'
  const colorBtn = screen.getByRole('button', {name: 'Change to blue'});

  //expect the background color to be red

  expect(colorBtn).toHaveStyle({backgroundColor: 'red'})
});

test('button turns blue when clicked', ()=>{
  render(<App/>);
  const colorBtn = screen.getByRole('button', {name: 'Change to blue'});

  //click button
  fireEvent.click(colorBtn);
  expect(colorBtn).toHaveStyle({'background-color': 'blue'});
  expect(colorBtn).toHaveTextContent('Change to red');
})

test('initial conditions', ()=>{
  render(<App />);

  //check that button starts enabled
const colorBtn = screen.getByRole('button', {name: 'Change to blue'});
expect(colorBtn).toBeEnabled();


  //check that the checkbox starts unchecked
  const checkBox =  screen.getByRole('checkbox');
  expect(checkBox).not.toBeChecked();
})

test('check diabled enabled functionality of button', ()=>{
  render(<App />)

  const btn = screen.getByRole('button')
  const checkbox = screen.getByRole('checkbox');
  
  //click checkbox
  fireEvent.click(checkbox);
  expect(btn).toBeDisabled();
  
  fireEvent.click(checkbox);
  expect(btn).toBeEnabled();
})