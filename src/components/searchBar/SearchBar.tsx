import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchRef.current?.value != '') {
      navigate(`/search/${searchRef.current?.value}`);
    }
  };
  return (
    <form className="w-8/12" onSubmit={handleSearch}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          data-testid="search_text"
          ref={searchRef}
          id="default-search"
          className="block w-full  p-2 pl-3 text-sm text-black border bg-translucent border-translucent rounded-sm focus:outline-none"
          placeholder="What are you looking for?"
          required
        />
        <button
          data-testid="search_btn"
          type="submit"
          className="text-black absolute right-2.5 bottom-1  p-1 "
        >
          <FontAwesomeIcon icon="magnifying-glass" />
        </button>
      </div>
    </form>
  );
}