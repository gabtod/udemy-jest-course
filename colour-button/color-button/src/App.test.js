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