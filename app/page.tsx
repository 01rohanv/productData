"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types";
import { Grid } from "@mui/material";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // api calling
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // on cell clicking function
  const handleCellClick = (product: Product, index: number) => {
    setSelectedProduct(product);
    setSelectedIndex(index);
  };

  // on keyboard keys press function
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (products.length === 0) return;

    let newIndex: number | null = null;

    switch (event.key) {
      case "ArrowUp":
        newIndex = selectedIndex !== null ? Math.max(0, selectedIndex - 5) : 0;
        break;
      case "ArrowDown":
        newIndex =
          selectedIndex !== null
            ? Math.min(products.length - 1, selectedIndex + 5)
            : 0;
        break;
      case "ArrowLeft":
        newIndex = selectedIndex !== null ? Math.max(0, selectedIndex - 1) : 0;
        break;
      case "ArrowRight":
        newIndex =
          selectedIndex !== null
            ? Math.min(products.length - 1, selectedIndex + 1)
            : 0;
        break;
      default:
        break;
    }

    if (newIndex !== null) {
      setSelectedProduct(products[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <div className="border border-gray-500">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 text-white">
                {products.map((product, index) => (
                  <div
                    key={index}
                    onClick={() => handleCellClick(product, index)}
                    onKeyDown={handleKeyPress}
                    tabIndex={0}
                    className={`${
                      selectedIndex === index ? "bg-gray-400" : "bg-black"
                    } cursor-pointer p-4 border border-gray-500`}
                  >
                    {product.title}
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={5}>
            {selectedProduct && (
              <div className="mt-8 border border-gray-500 rounded-lg p-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full sm:w-64 h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-lg font-bold mt-4">
                  {selectedProduct.title}
                </p>
                <p className="text-sm mt-2">{selectedProduct.price}</p>
                <p className="mt-2">{selectedProduct.description}</p>
                <p className="mt-2">{selectedProduct.category}</p>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
