import { FaTimes } from "react-icons/fa";

const AdvancedFilters = ({
  advancedFilters,
  handleAdvancedFilters,
  handleShowFilters,
  clearFilters,
}) => {
  return (
    <div className="absolute top-[100%] w-full mt-2 p-2 bg-white">
      <div className="flex gap-2 justify-between items-center ">
        <h3 className="text-lg font-semibold">
          Search articles with advanced filters
        </h3>
        <button className="text-xl" onClick={handleShowFilters} type="button">
          <FaTimes />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label htmlFor="isHighlight" className="flex items-center gap-2">
          <input
            checked={advancedFilters?.isHighlight}
            onChange={handleAdvancedFilters}
            type="checkbox"
            name="isHighlight"
            id="isHighlight"
            className="checkbox"
          />
          Highlight
        </label>
        <label htmlFor="isPublicDomain" className="flex items-center gap-2">
          <input
            checked={advancedFilters?.isPublicDomain}
            onChange={handleAdvancedFilters}
            type="checkbox"
            name="isPublicDomain"
            id="isPublicDomain"
            className="checkbox"
          />
          Public
        </label>
        <label htmlFor="hasImages" className="flex items-center gap-2">
          <input
            checked={advancedFilters?.hasImages}
            onChange={handleAdvancedFilters}
            type="checkbox"
            name="hasImages"
            id="hasImages"
            className="checkbox"
          />
          With Images
        </label>
        <label htmlFor="accessionYear" className="flex flex-col gap-2">
          <input
            value={advancedFilters.accessionYear}
            onChange={handleAdvancedFilters}
            placeholder="Accession Year"
            type="number"
            className="p-1 border-b"
            name="accessionYear"
            id="accessionYear"
          />
        </label>
        <label htmlFor="department" className="flex flex-col gap-2">
          <input
            value={advancedFilters.department}
            onChange={handleAdvancedFilters}
            placeholder="Department"
            type="text"
            className="p-1 border-b"
            name="department"
            id="department"
          />
        </label>
        <label htmlFor="country" className="flex flex-col gap-2">
          <input
            value={advancedFilters.country}
            onChange={handleAdvancedFilters}
            placeholder="Country"
            type="text"
            className="p-1 border-b"
            name="country"
            id="country"
          />
        </label>
        <label htmlFor="city" className="flex flex-col gap-2">
          <input
            value={advancedFilters.city}
            onChange={handleAdvancedFilters}
            placeholder="City"
            type="text"
            className="p-1 border-b"
            name="city"
            id="city"
          />
        </label>
        <label htmlFor="classification" className="flex flex-col gap-2">
          <input
            value={advancedFilters.classification}
            onChange={handleAdvancedFilters}
            placeholder="Classification"
            type="text"
            className="p-1 border-b"
            name="classification"
            id="classification"
          />
        </label>
        <label htmlFor="tags" className="flex flex-col gap-2 md:col-span-2">
          <input
            value={advancedFilters.tags}
            onChange={handleAdvancedFilters}
            placeholder="Tags"
            type="text"
            className="p-1 border-b"
            name="tags"
            id="tags"
          />
        </label>
      </div>
      <div className="flex justify-end gap-2 items-center mt-2">
        <button className="p-2 bg-gray-200" onClick={clearFilters}>
          Clear
        </button>
        <button
          className="p-2 bg-slate-700 text-white"
          onClick={handleShowFilters}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
