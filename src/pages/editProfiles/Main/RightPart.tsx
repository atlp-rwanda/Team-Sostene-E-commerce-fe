import axios from 'axios';
import { useEffect, useState } from 'react';
import { USER_PROFILE, useProfileData } from '../../../hooks/useFetchProtectedData';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateProfile } from '../redux/userProfile';
import { BACKEND_URL } from '../../../utils/constants';

function RightPart() {
  const { loading, profile, error, user } = useProfileData();
  const tokenOne = useAppSelector((state) => state.token.value);
  const dispatch = useAppDispatch();
  const [profileAvailable, setProfileAvailable] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (profile) {
      setProfileAvailable(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        names: profile.names,
        birthdate: profile.birthdate,
        city: profile.city,
        street: profile.street,
        language: profile.language,
        country: profile.country,
        currency: profile.currency,
        gender: profile.gender,
        accountName: profile.accountName,
        accountNumber: profile.accountNumber,
        telephone: profile.telephone,
        postalCode: profile.postalCode,
      }));
    }
  }, [loading, profile, error]);

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    switch (name) {
      case 'names':
        setFormData((prevFormData) => ({
          ...prevFormData,
          names: value,
        }));
        break;
      case 'birthdate':
        setFormData((prevFormData) => ({
          ...prevFormData,
          birthdate: value,
        }));
        break;
      case 'country':
        setFormData((prevFormData) => ({
          ...prevFormData,
          country: value,
        }));
        break;
      case 'language':
        setFormData((prevFormData) => ({
          ...prevFormData,
          language: value,
        }));
        break;
      case 'postalcode':
        setFormData((prevFormData) => ({
          ...prevFormData,
          postalCode: value,
        }));
        break;
      case 'accountNumber':
        setFormData((prevFormData) => ({
          ...prevFormData,
          accountNumber: value,
        }));
        break;
      case 'accountName':
        setFormData((prevFormData) => ({
          ...prevFormData,
          accountName: value,
        }));
        break;
      case 'gender':
        setFormData((prevFormData) => ({
          ...prevFormData,
          gender: value,
        }));
        break;
      case 'telephone':
        setFormData((prevFormData) => ({
          ...prevFormData,
          telephone: value,
        }));
        break;
      case 'currency':
        setFormData((prevFormData) => ({
          ...prevFormData,
          currency: value,
        }));
        break;
      case 'city':
        setFormData((prevFormData) => ({
          ...prevFormData,
          city: value,
        }));
        break;
      default:
        setFormData((prevFormData) => ({
          ...prevFormData,
          street: value,
        }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      axios.put(`${BACKEND_URL}/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${tokenOne}`,
        },
      });
      dispatch(updateProfile(formData));
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="w-full text-xs md:text-sm items-center  pt-2">
      {/* <div className="text-gray-500 font-bold w-[90%] mx-auto">Edit your Profile</div> */}
      {user ? <ProfileCard user={user} /> : ''}
      {loading ? (
        <p>Loading...</p>
      ) : profileAvailable ? (
        <div className="">
          <div className="flex w-[90%] space-x-10 mt-3 mx-auto">
            <div className="space-y-3 items-center w-1/2">
              <p className="font-semibold">Full Names</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Hero Jos"
                name="names"
                value={formData.names}
                data-testid="names-input"
                onChange={handleOnChange}
              />
            </div>
            <div className="space-y-3 items-center w-1/2">
              <p className="font-semibold">Birth date</p>
              <input
                type="date"
                placeholder="2000-12-12"
                name="birthdate"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                value={formData.birthdate}
                onChange={handleOnChange}
                data-testid="birth-input"
              />
            </div>
          </div>
          <div className="flex w-[90%] space-x-10 mt-3 mx-auto">
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">City</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Kigali"
                name="city"
                value={formData.city}
                onChange={handleOnChange}
                data-testid="city-input"
              />
            </div>
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Address</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Kigali, KK538, Rwanda"
                name="address"
                value={formData.street}
                onChange={handleOnChange}
                data-testid="address-input"
              />
            </div>
          </div>
          <div className="flex w-[90%] space-x-10 mt-3 mx-auto">
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Country</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="country"
                name="country"
                value={formData.country}
                onChange={handleOnChange}
                data-testid="country-input"
              />
            </div>
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Currency</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Kigali, KK538, Rwanda"
                name="currency"
                value={formData.currency}
                onChange={handleOnChange}
                data-testid="currency-input"
              />
            </div>
          </div>
          <div className="flex w-[90%] space-x-10 mt-3 mx-auto">
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Postal Code</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="postalcode"
                name="postalcode"
                value={formData.postalCode}
                onChange={handleOnChange}
                data-testid="postal-input"
              />
            </div>
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Account number</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleOnChange}
                data-testid="accountnumber-input"
              />
            </div>
          </div>
          <div className="flex w-[90%] space-x-10 mt-3 mx-auto">
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Language</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Language"
                name="language"
                value={formData.language}
                onChange={handleOnChange}
                data-testid="language-input"
              />
            </div>
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Account name</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Account Name"
                name="accountName"
                value={formData.accountName}
                onChange={handleOnChange}
                data-testid="accountname-input"
              />
            </div>
          </div>
          <div className="flex w-[90%] space-x-10 mt-3 mx-auto">
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Gender</p>
              <input
                name="gender"
                className="h-8 border border-translucent bg-gray-100 text-black rounded-[4px] p-4 w-[100%] outline-none"
                onChange={handleOnChange}
                value={formData.gender}
                data-testid="gender-input"
              />
            </div>
            <div className="space-y-3 w-1/2">
              <p className="font-semibold">Telephone</p>
              <input
                type="text"
                className="h-8 border border-translucent bg-gray-100 rounded-[4px] p-4 w-[100%] outline-none"
                placeholder="Telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleOnChange}
                data-testid="telephone-input"
              />
            </div>
          </div>
          <div className="flex w-[90%] space-x-10 mt-3 mx-auto flex-row">
            <div className="w-full flex justify-center items-center space-x-[10%] py-4">
              <button
                className="text-white font-bold text-[15px] p-2 bg-orange border-b-2 "
                onClick={handleSubmit}
                role="submit-btn"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full text-center">
          No Profile Created,
          <button
            onClick={() => setProfileAvailable(true)}
            className="p-2 underline text-orange font-bold"
            role="submit-btns"
          >
            Create Profile
          </button>
        </div>
      )}
    </div>
  );
}
function ProfileCard({ user }: { user: USER_PROFILE }) {
  return (
    <div className="w-full my-5 flex justify-center items-center ">
      <div className="w-10/12 md:w-1/2 h-full bg-white flex flex-col border border-translucent items-center justify-start pt-3 rounded-sm">
        <div className=" h-14 w-14 rounded-full bg-orange flex justify-center items-center text-3xl">
          {user.email.split('')[0].toUpperCase()}
        </div>
        <div className="p-4 font-semibold">{user.username}</div>
        <div className="p-4 pt-0 text-sm italic">{user.email}</div>
        <div className="p-2 bg-green text-black text-sm">{user.role}</div>
        <div className="m-2 p-2 bg-red text-white text-sm">
          {user.passwordStatus === 'NEEDS_PASSWORD_UPDATE' ? (
            <p>
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i> Password Expired!
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default RightPart;
