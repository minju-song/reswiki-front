import { useEffect, useState } from "react";

interface SearchComponentProps {
  searchMonter: string; // 검색어
  setSearchMonter: (value: string) => void;
  onKeyPress: (keyword: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchMonter,
  setSearchMonter,
  onKeyPress,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const keyword = searchMonter.trim();
      if (keyword) {
        onKeyPress(keyword);
      }
    }
  };

  return (
    <div className="bg-white flex rounded-full items-center p-1">
      <div className="flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="gray"
          className="size-6 stroke-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="찾으시는 가게를 입력해주세요."
        value={searchMonter}
        onChange={(e) => setSearchMonter(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
        className="flex-4 bg-transparent px-2 text-gray-400 w-11/12"
      />
      <div className="focus flex-1" onClick={(e) => setSearchMonter("")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gray"
          className="size-6 fill-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchComponent;
