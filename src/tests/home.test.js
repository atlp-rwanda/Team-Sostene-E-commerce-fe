import React from 'react';
import { render } from '@testing-library/react';
import Home from '../components/home/home';

describe('Home Component', () => {
  it('renders the component', () => {
    const { getByText, getByAltText } = render(<Home />);
    
    expect(getByText('Ecommerce app')).toBeInTheDocument();
    expect(getByText('your components goes here!')).toBeInTheDocument();
    expect(getByAltText('icon')).toBeInTheDocument();
  });
});
