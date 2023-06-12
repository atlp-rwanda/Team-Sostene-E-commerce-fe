import React, { ReactNode } from 'react';
import store from '../../redux/store';
import jwtDecode from 'jwt-decode';
import { isLoggedIn } from '../../helpers/auth';

interface ProtectComponentProps {
  children: ReactNode;
  replace?: ReactNode;
}

interface DecodedToken {
  role: string;
}

export const ProtectedComponent: React.FC<ProtectComponentProps> = ({ replace, children }) => {
  if (isLoggedIn()) {
    return <>{children}</>;
  }
  return <>{replace}</>;
};

export const ReverseProtectedComponent: React.FC<ProtectComponentProps> = ({
  replace,
  children,
}) => {
  if (isLoggedIn()) {
    return <>{replace}</>;
  }
  return <>{children}</>;
};

export const AdminComponent: React.FC<ProtectComponentProps> = ({ replace, children }) => {
  try {
    if (isLoggedIn()) {
      const token = store.getState().token.value as string;
      const decodedToken = jwtDecode(token);
      const typedDecodedToken = decodedToken as DecodedToken;
      const role = typedDecodedToken.role;
      if (isLoggedIn() && role === 'ADMIN') {
        return <>{children}</>;
      }
    }
    return <>{replace}</>;
  } catch (error) {
    return <>{children}</>;
  }
};

export const SellerComponent: React.FC<ProtectComponentProps> = ({ replace, children }) => {
  try {
    if (isLoggedIn()) {
      const token = store.getState().token.value as string;
      const decodedToken = jwtDecode(token);
      const typedDecodedToken = decodedToken as DecodedToken;
      const role = typedDecodedToken.role;
      if (isLoggedIn() && role === 'SELLER') {
        return <>{children}</>;
      }
    }
    return <>{replace}</>;
  } catch (error) {
    return <>{replace}</>;
  }
};
