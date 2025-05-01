
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, Product } from '@/data/products';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

const ProductList = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Colors from all products
  const allColors = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00', '#808080', '#FFC0CB', '#FFFF00'];
  const colorNames: {[key: string]: string} = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FF0000': 'Red',
    '#0000FF': 'Blue',
    '#00FF00': 'Green',
    '#808080': 'Gray',
    '#FFC0CB': 'Pink',
    '#FFFF00': 'Yellow'
  };

  // Available sizes
  const allSizes = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

  // Fetch products based on category
  useEffect(() => {
    const fetchedProducts = getProducts(categoryId);
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, [categoryId]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Price filter
    filtered = filtered.filter((product) => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, priceRange, selectedColors, selectedSizes]);

  // Handle color selection
  const handleColorToggle = (color: string) => {
    setSelectedColors(prevColors => 
      prevColors.includes(color)
        ? prevColors.filter(c => c !== color)
        : [...prevColors, color]
    );
  };

  // Handle size selection
  const handleSizeToggle = (size: number) => {
    setSelectedSizes(prevSizes => 
      prevSizes.includes(size)
        ? prevSizes.filter(s => s !== size)
        : [...prevSizes, size]
    );
  };

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 300]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-navy">
              {categoryId ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}'s Shoes` : 'All Shoes'}
            </h1>
            <Button onClick={() => setIsMobileFilterOpen(true)} variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </Button>
          </div>

          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <h2 className="text-xl font-bold mb-6 text-navy">Filters</h2>
            
            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 300]}
                value={priceRange}
                onValueChange={handlePriceChange}
                min={0}
                max={300}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            {/* Colors */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {allColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorToggle(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColors.includes(color) ? 'border-brick' : 'border-transparent'
                    } flex items-center justify-center`}
                    style={{ backgroundColor: color }}
                    title={colorNames[color]}
                  >
                    {selectedColors.includes(color) && (
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M12 5L6.5 10.5L4 8" 
                          stroke={color === '#FFFFFF' || color === '#FFFF00' || color === '#00FF00' ? '#000000' : '#FFFFFF'} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`py-2 rounded-md border ${
                      selectedSizes.includes(size) 
                        ? 'bg-navy text-white border-navy' 
                        : 'bg-white text-navy border-gray-300'
                    } text-sm hover:bg-gray-100`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Reset Button */}
            <Button 
              onClick={resetFilters} 
              variant="outline" 
              className="w-full"
            >
              Reset Filters
            </Button>
          </aside>

          {/* Mobile Filters Sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-navy">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    <X size={24} />
                  </Button>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 300]}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={300}
                    step={10}
                    className="mb-4"
                  />
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Colors */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorToggle(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColors.includes(color) ? 'border-brick' : 'border-transparent'
                        } flex items-center justify-center`}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColors.includes(color) && (
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              d="M12 5L6.5 10.5L4 8" 
                              stroke={color === '#FFFFFF' || color === '#FFFF00' || color === '#00FF00' ? '#000000' : '#FFFFFF'} 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Sizes */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Sizes</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`py-2 rounded-md border ${
                          selectedSizes.includes(size) 
                            ? 'bg-navy text-white border-navy' 
                            : 'bg-white text-navy border-gray-300'
                        } text-sm`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <Button 
                    onClick={() => {
                      resetFilters();
                      setIsMobileFilterOpen(false);
                    }} 
                    variant="outline" 
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button 
                    onClick={() => setIsMobileFilterOpen(false)} 
                    className="flex-1 bg-navy"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="hidden md:flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-navy">
                {categoryId ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}'s Shoes` : 'All Shoes'}
              </h1>
              <p className="text-gray-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-xl text-gray-500 mb-4">No products match your filters</p>
                <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
