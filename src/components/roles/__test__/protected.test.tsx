import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  AdminComponent,
  ProtectedComponent,
  ReverseProtectedComponent,
  SellerComponent,
} from '../Protected';
import store from '../../../redux/store';
import { clearToken, setToken } from '../../../redux/slices/tokenSlice';

describe('Testing Protected Components', () => {
  test('Testing Protected Component Not Logged In', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProtectedComponent replace={<p>Hello</p>}>
          <div>Protected content</div>
        </ProtectedComponent>
      </Provider>
    );

    expect(getByText('Hello')).toBeInTheDocument();
  });
  test('Testing Protected Component', () => {
    store.dispatch(setToken('token'));
    const { getByText } = render(
      <Provider store={store}>
        <ProtectedComponent>
          <div>Protected content</div>
        </ProtectedComponent>
      </Provider>
    );

    expect(getByText('Protected content')).toBeInTheDocument();
  });
  test('Testing Reverse Protected Component Not Logged In', () => {
    store.dispatch(clearToken());
    const { getByText } = render(
      <Provider store={store}>
        <ReverseProtectedComponent replace={<div>Replace content</div>}>
          <div>Protected content</div>
        </ReverseProtectedComponent>
      </Provider>
    );

    expect(getByText('Protected content')).toBeInTheDocument();
  });
  test('Testing Reverse Protected Component', () => {
    store.dispatch(setToken('token'));
    const { getByText } = render(
      <Provider store={store}>
        <ReverseProtectedComponent replace={<div>Replace content</div>}>
          <div>Protected content</div>
        </ReverseProtectedComponent>
      </Provider>
    );

    expect(getByText('Replace content')).toBeInTheDocument();
  });
  test('Testing Admin Component', () => {
    store.dispatch(
      setToken(
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJpZCI6IjhlMjUzZT
        JiLTExYWItNDhlNy1hNWRjLTA2NTI1ZDkzOTkwOCIsInVzZX
        JuYW1lIjoiYWRtaW50ZXN0IiwiZW1haWwiOiJhZG1pbjEwMUBleGFtcGxlLmNvb
        SIsInJvbGUiOiJBRE1JTiIsInN0YXR1cyI6IkFDVElWRSIsImlhd
        CI6MTY4NjU3OTc4OX0.LgToOmwyEA44c6Odjg5a385xd5Gn1RpFsPm6Ey35MLU`
      )
    );
    const { getByText } = render(
      <Provider store={store}>
        <AdminComponent replace={<div>Replace content</div>}>
          <div>Protected content</div>
        </AdminComponent>
      </Provider>
    );

    expect(getByText('Protected content')).toBeInTheDocument();
  });
  test('Testing Admin Component Not Logged In', () => {
    store.dispatch(clearToken());
    const { getByText } = render(
      <Provider store={store}>
        <AdminComponent replace={<div>Replace content</div>}>
          <div>Protected content</div>
        </AdminComponent>
      </Provider>
    );
    expect(getByText('Replace content')).toBeInTheDocument();
  });
  test('Testing Admin Component Not Admin', () => {
    store.dispatch(clearToken());
    const { getByText } = render(
      <Provider store={store}>
        <AdminComponent replace={<div>Replace content</div>}>
          <div>Protected content</div>
        </AdminComponent>
      </Provider>
    );

    expect(getByText('Replace content')).toBeInTheDocument();
  });
  test('Testing Seller Component', () => {
    store.dispatch(
      setToken(
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB
        mMTU0OGIwLWI3Y2UtNDllMy1hMmVmLWJhZmZmZmQzODNhYSIsIn
        VzZXJuYW1lIjoidGVzdGluZ3NlbGxlciIsImVtYWlsIjoidGVzdGl
        uZ3NlbGxlckBleGFtcGxlLmNvbSIsInJvbGUiOiJTRUxMRVIiLCJzd
        GF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE2ODY2MDE2NzB9.ws
        EpGeT4X02iKdwlPv54QaD_2IEhsHISgSIVXO5CWpI`
      )
    );
    const { getByText } = render(
      <Provider store={store}>
        <SellerComponent replace={<div>Replace content</div>}>
          <div>Protected content</div>
        </SellerComponent>
      </Provider>
    );

    expect(getByText('Protected content')).toBeInTheDocument();
  });
  test('Testing Seller Component Not seller', () => {
    store.dispatch(
      setToken(
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJpZCI6IjhlMjUzZT
        JiLTExYWItNDhlNy1hNWRjLTA2NTI1ZDkzOTkwOCIsInVzZX
        JuYW1lIjoiYWRtaW50ZXN0IiwiZW1haWwiOiJhZG1pbjEwMUBleGFtcGxlLmNvb
        SIsInJvbGUiOiJBRE1JTiIsInN0YXR1cyI6IkFDVElWRSIsImlhd
        CI6MTY4NjU3OTc4OX0.LgToOmwyEA44c6Odjg5a385xd5Gn1RpFsPm6Ey35MLU`
      )
    );
    const { getByText } = render(
      <Provider store={store}>
        <SellerComponent replace={<div>Replace content</div>}>
          <div>Protected content</div>
        </SellerComponent>
      </Provider>
    );

    expect(getByText('Replace content')).toBeInTheDocument();
  });
});
