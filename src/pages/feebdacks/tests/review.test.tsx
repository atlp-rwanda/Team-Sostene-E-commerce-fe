import { formatDate } from "../../../utils/dateFormatting";
import Reviews from '../Reviews';
import { vi } from "vitest";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { handleRateChange } from '../Reviews';

vi.mock('axios');

describe('formatDate', async ()  => {
  test('formats the date correctly', () => {
    const dateString = '2023-06-26';
    const expectedFormattedDate = '26/06/2023';

    const formattedDate = formatDate(dateString);

    expect(formattedDate).toBe(expectedFormattedDate);
  });

  test('renders Reviews component', async () => {
    render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Top Reviews')).toBeInTheDocument();
    });
  });

  test("Test the rating star to be in the document!", async () => {
    const id = '6ac24373-0bc0-414b-92d2-d78f8ada8878'
    render(
      <Provider store={store}>
        <Reviews productId={id}/>
      </Provider>
    );
    await waitFor(() => {
      const btns = screen.getAllByText("Add review");
      expect(btns.length).toBeGreaterThan(0);
      btns.forEach(btn=>{
        fireEvent.click(btn)
      expect(btn).toBeInTheDocument();
        })  
    });
  });

  test('should update the rating value in the review object', () => {
    const setReviewObjMock = vi.fn();
    const value = 4;
    const reviewObj = { rating: '3' };
  
    handleRateChange(value, reviewObj, setReviewObjMock);
  
    expect(setReviewObjMock).toHaveBeenCalledWith({ rating: '4' });
  });

  test('should render the "Add review" button correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );

    const addReviewButton = getByText('Add review');

    expect(addReviewButton).toBeInTheDocument();
  });
});
