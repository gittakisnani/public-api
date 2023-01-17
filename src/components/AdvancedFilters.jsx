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
        <label htmlFor="isOnView" className="flex items-center gap-2">
          <input
            checked={advancedFilters?.isOnView}
            onChange={handleAdvancedFilters}
            type="checkbox"
            name="isOnView"
            id="isOnView"
            className="checkbox"
          />
          On View
        </label>
        <label htmlFor="departmentId" className="flex flex-col gap-2">
          <input
            value={advancedFilters.department}
            onChange={handleAdvancedFilters}
            placeholder="Department ID"
            type="number"
            className="p-1 border-b"
            name="departmentId"
            id="departmentId"
          />
        </label>
        <label htmlFor="medium" className="flex flex-col gap-2">
          <input
            value={advancedFilters.medium}
            onChange={handleAdvancedFilters}
            placeholder="Medium"
            type="text"
            className="p-1 border-b"
            name="medium"
            id="medium"
          />
        </label>
        <label htmlFor="geoLocation" className="flex flex-col gap-2">
          <input
            value={advancedFilters.geoLocation}
            onChange={handleAdvancedFilters}
            placeholder="Geo Location"
            type="text"
            className="p-1 border-b"
            name="geoLocation"
            id="geoLocation"
          />
        </label>
        <label htmlFor="dateBegin" className="flex flex-col gap-2">
          <input
            value={advancedFilters.dateBegin}
            onChange={handleAdvancedFilters}
            placeholder="Begin Date"
            type="number"
            min={1700}
            max={2199}
            className="p-1 border-b"
            name="dateBegin"
            id="dateBegin"
          />
        </label>
        <label htmlFor="dateEnd" className="flex flex-col gap-2">
          <input
            value={advancedFilters.dateEnd}
            onChange={handleAdvancedFilters}
            placeholder="End Date"
            type="number"
            min={1700}
            max={2199}
            className="p-1 border-b"
            name="dateEnd"
            id="dateEnd"
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
