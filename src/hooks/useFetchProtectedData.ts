/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { profileInterface } from '../pages/editProfiles/Main/profileSlice';
import { addProfile } from '../pages/editProfiles/redux/userProfile';
import { BACKEND_URL } from '../utils/constants';

export interface USER_PROFILE {
  username: string;
  email: string;
  role: string;
  passwordStatus: string;
}

export const useProfileData = () => {
  const [profile, setProfile] = useState<profileInterface>();
  const [user, setInfo] = useState<USER_PROFILE>();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const tokenOne = useAppSelector((state) => state.token.value);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${tokenOne}`,
          },
        });
        setLoading(false);
        dispatch(addProfile(response.data.profile));
        setProfile(response.data.profile);
        setInfo(response.data.user);
      } catch (error) {
        setLoading(false);
        setError(error as Error);
      }
    };
    getData();
  }, []);
  return {
    user,
    loading,
    error,
    profile,
  };
};

// export  { useProfileData };