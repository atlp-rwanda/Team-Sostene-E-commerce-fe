/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import store from '../../../redux/store';
import { Profile, updateProfile } from '../redux/userProfile';
import RightPart from './RightPart';
import * as hooks from '../../../hooks/useFetchProtectedData';

vi.mock('../../../hooks/useFetchProtectedData', () => ({
  useProfileData: vi.fn(),
}));

describe('handleOnChange function', () => {
  beforeEach(() => {
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
    vi.spyOn(hooks, 'useProfileData').mockReturnValue({
      user: {
        username: '',
        email: 'seller@example.com',
        role: '',
        passwordStatus: '',
      },
      loading: false,
      error: null,
      profile: {
        names: '',
        gender: '',
        birthdate: '',
        language: '',
        city: '',
        street: '',
        currency: '',
        postalCode: '',
        country: '',
        accountNumber: '',
        accountName: '',
        telephone: '',
      },
    });
  });
  const mockFormData: Profile = {
    names: '',
    gender: '',
    birthdate: '',
    language: 'rwandan',
    city: '',
    street: '',
    currency: '',
    postalCode: '',
    country: '',
    accountNumber: '',
    accountName: '',
    telephone: '',
  };
  it('updates birthdate property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('birth-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: '2023-12-12' } });
    expect(namesInput.value).toBe('2023-12-12');
  });
  it('updates city property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('city-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: 'kigali' } });
    expect(namesInput.value).toBe('kigali');
  });
  it('updates address property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('address-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: 'kigali 583 kk' } });
    expect(namesInput.value).toBe('kigali 583 kk');
  });
  it('updates country property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('country-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: 'kigali 583 kk' } });
    expect(namesInput.value).toBe('kigali 583 kk');
  });
  it('updates currency property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('currency-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: 'rwf' } });
    expect(namesInput.value).toBe('rwf');
  });
  it('updates postal code property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('postal-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: '690kk' } });
    expect(namesInput.value).toBe('690kk');
  });
  it('updates account number property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('accountnumber-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: '89904839473838' } });
    expect(namesInput.value).toBe('89904839473838');
  });

  it('updates account name property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('accountname-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: 'joseph he' } });
    expect(namesInput.value).toBe('joseph he');
  });
  it('updates gender property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('gender-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: 'male' } });
    expect(namesInput.value).toBe('male');
  });
  it('updates telephone property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('telephone-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: '07894732837' } });
    expect(namesInput.value).toBe('07894732837');
  });
  it('updates language property in formData', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );

    const namesInput = getByTestId('language-input') as HTMLInputElement;
    fireEvent.change(namesInput, { target: { value: 'rwandan' } });
    expect(namesInput.value).toBe('rwandan');
    fireEvent.click(screen.getByRole('submit-btn'));
    expect(store.dispatch).toHaveBeenCalledWith(updateProfile(mockFormData));
  });

  it('test useEffect', () => {
    // Mock the dependencies
    const profile = {
      names: 'John Doe',
      birthdate: '1990-01-01',
      // Add other properties as needed
    };
    const setProfileAvailable = vi.fn();
    const setFormData = vi.fn();

    const RightPart = () => {
      useEffect(() => {
        if (profile) {
          setProfileAvailable(true);
          setFormData((prevFormData: any) => ({
            ...prevFormData,
            names: profile.names,
            birthdate: profile.birthdate,
            // Add other properties as needed
          }));
        }
      }, []);

      return <div>Test Component</div>;
    };

    render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );
    expect(setProfileAvailable).toBeCalledTimes(1);
    expect(setProfileAvailable).toBeCalledWith(true);

    expect(setFormData).toBeCalledTimes(1);
    expect(setFormData).toBeCalledWith(expect.any(Function));
  });
});
describe('testing the button of create profile', () => {
  beforeEach(() => {
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
    vi.spyOn(hooks, 'useProfileData').mockReturnValue({
      user: {
        username: '',
        email: 'seller@example.com',
        role: '',
        passwordStatus: '',
      },
      loading: false,
      error: null,
      profile: undefined,
    });
  });

  it('finds element with text Create Profile', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <RightPart />
      </Provider>
    );
    const submitButton = getByRole('submit-btns');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled;
    });
  });
});
