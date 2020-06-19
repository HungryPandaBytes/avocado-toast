import React from 'react';
// import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import App from './App';

// const renderWithRouter = (component: any) => {
//   const history = createMemoryHistory();
//   return {
//     ...render(
//       <Router history={history} >
//         {component}
//       </Router >
//     )
//   }
// }

// it('should render the home page', () => {
//   const { container, getByTestId } = renderWithRouter(<App />);
//   const navbar = getByTestId('navbar');
//   const link = getByTestId('home-link');

//   expect(container.innerHTML).toMatch('Daily');
//   expect(navbar).toContainElement(link);
// })

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

