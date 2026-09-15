function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search building, facility or location..."
        className="w-full rounded-xl border border-gray-700 bg-gray-900 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
      />
    </div>
  );
}

export default SearchBar;