import React, { useState } from "react";
// import { useState } from "react";
const ProductForm = () => {
  let [ProductName, setProductName] = useState("");
  let [ProductDescription, setProductDescription] = useState("");
  let [ProductPrice, setProductPrice] = useState("");
  let [ProductImages, setProductImages] = useState([]);

  const handleProductName = (e) => {
    let name = e.target.value;
    setProductName(name);
  };

  const handleProductDescription = (e) => {
    let Description = e.target.value;
    setProductDescription(Description);
  };

  const handleProductPrice = (e) => {
    let Price = e.target.value;
    setProductPrice(Price);
  };

  const handleProductImages = (e) => {
    let files = e.target.files;
    let filesArray = Array.from(files)
    setProductImages(...ProductImages,...filesArray);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    let data={
        ProductName,
        ProductDescription,
        ProductPrice,
        ProductImages
    }

    console.log(data)

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImages([]);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Product Name</label>
      <input
        type="text"
        placeholder="Enter Product Name"
        value={ProductName}
        onChange={handleProductName}
      />
      <label htmlFor="">Product Description</label>
      <input
        type="text"
        placeholder="Enter Product Description"
        value={ProductDescription}
        onChange={handleProductDescription}
      />
      <label htmlFor="">Product Price</label>
      <input
        type="Number"
        placeholder="Enter Product Price"
        value={ProductPrice}
        onChange={handleProductPrice}
      />
      <label htmlFor="">Product Images</label>
      <input
        type="file"
        multiple
        placeholder="Add Product Images"
        // value={ProductImages}
        onChange={handleProductImages}
      />

      <input type="submit" value="Add Product" />
    </form>
  );
};

export default ProductForm;
