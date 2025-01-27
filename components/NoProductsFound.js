import React from "react";
import { Search } from "lucide-react";

const NoProductsFound = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Search size={64} className="text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
  </div>
);

export default NoProductsFound;