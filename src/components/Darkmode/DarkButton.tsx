import { enable as enableDarkMode, disable as disableDarkMode, setFetchMethod } from 'darkreader';
import { useState, useEffect } from 'react';

export function DarkButton() {
  const [dark, setDark] = useState(Boolean(localStorage.getItem('dark')) || false);
  useEffect(() => {
    setFetchMethod(window.fetch);
    dark
      ? enableDarkMode({
          brightness: 100,
          contrast: 100,
          sepia: 10,
        })
      : disableDarkMode();
    localStorage.setItem('dark', `${dark}`);
  }, [dark]);

  return (
    <div className="flex flex-row justify-end items-end">
      <label className="relative ml-6 inline-flex items-center mr-5 cursor-pointer">
        <input
          onClick={() => setDark((prev) => !prev)}
          data-testid="dark-button"
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-orange rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange"></div>
      </label>
    </div>
  );
}
