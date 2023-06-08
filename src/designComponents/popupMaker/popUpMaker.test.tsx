import { render, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import PopUpMaker from './popUpMaker';

describe('PopUpMaker', () => {
  it('renders component and closes popup on outside click and close button click', () => {
    const setIsPopupOpen = vi.fn();
    const ComponentMock = () => <h1>Mock Component</h1>;
    const card = {
      productImages: [{ url: 'image-url-1' }, { url: 'image-url-2' }],
      id: '1',
      category: 'Category',
      ratings: 4,
      price: 10,
      bonus: 5,
      collectionId: 'collection-1',
      createdAt: '2023-05-28',
      expDate: '2023-06-30',
      expiredflag: false,
      name: 'Product 1',
      quantity: 10,
      details: 'Product details',
    };

    const { getByAltText, getAllByRole, getAllByTestId, getByText } = render(
      <PopUpMaker setIsPopupOpen={setIsPopupOpen} Component={ComponentMock} card={card} />
    );
    const image = getAllByRole('img');
    expect(image).toHaveLength(1);
    fireEvent.click(getByAltText('Icon'));
    const outsideClickHandler = getAllByTestId('testOutsideClickHandler');
    outsideClickHandler.forEach((element) => {
      fireEvent.click(element);
      expect(setIsPopupOpen).toHaveBeenCalledWith(false);
    });
    fireEvent.click(document);
    expect(getAllByTestId('popUpMakerId').length).toBeGreaterThan(0);
    expect(getAllByTestId('testOutsideClickHandler').length).toBeGreaterThan(0);
    expect(getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0);
    expect(getByText('Mock Component')).toBeInTheDocument();
  });
});
