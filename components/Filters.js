import { X } from "lucide-react";

const Filters = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
    resetFilters,
  }) => (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-card">
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
  
        <select
          className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
  
        <input
          type="number"
          placeholder="Min Price"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 max-w-32"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value.replace(/^0+/, ""))}
        />
  
        <input
          type="number"
          placeholder="Max Price"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 max-w-32"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value.replace(/^0+/, ""))}
        />
  
        <select
          className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">Sort by</option>
          <option value="a-z">Name (A-Z)</option>
          <option value="z-a">Name (Z-A)</option>
          <option value="price-low-high">Price (Low to High)</option>
          <option value="price-high-low">Price (High to Low)</option>
        </select>
  
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <X size={16} />
          Reset
        </button>
      </div>
    </div>
  );
  
  export default Filters;