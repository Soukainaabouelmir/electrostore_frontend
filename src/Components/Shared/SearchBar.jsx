import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative dark:bg-[#1a202c] border border-sm  ">
      <div className="absolute dark:bg-[#1a202c] inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search ..."
        className=" dark:bg-[#1a202c] pl-10 pr-4 py-2 dark:text-white   rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;