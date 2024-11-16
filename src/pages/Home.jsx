import { useEffect, useState } from "react";
export default function Home() {
  const [accessories, setAccessories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0); // Track number of items in the cart
  const [selectedProduct, setSelectedProduct] = useState(null); // For viewing and editing product details
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" }); // For creating new product

  // Fetch accessories on component mount
  useEffect(() => {
    fetch("http://localhost:3000/accessories")
      .then((res) => res.json())
      .then((data) => setAccessories(data));
  }, []);

  // Update cart count when cart changes
  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(currentCart.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  // Filter accessories based on the search query
  const filteredAccessories = accessories.filter((accessory) =>
    accessory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle adding an accessory to the cart
  const handleAddToCart = (accessory) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItem = currentCart.find((item) => item.id === accessory.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if it exists
    } else {
      currentCart.push({ ...accessory, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Update the cart count
    setCartCount(currentCart.reduce((acc, item) => acc + item.quantity, 0));

    // Notify user with a more friendly notification
    alert(`${accessory.name} has been added to your cart!`);
  };

  // Handle form changes for creating a new product
  const handleNewProductChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Handle new product submission
  const handleCreateNewProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/accessories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessories([...accessories, data]); // Add the new product to the list
        setNewProduct({ name: "", price: "", image: "" }); // Reset form
      });
  };

  // Function to handle editing product details
  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Populate the selected product for editing
  };

  // Handle product edit form changes
  const handleEditChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Handle saving edited product details
  const handleSaveEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/accessories/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProduct),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setAccessories(
          accessories.map((accessory) =>
            accessory.id === updatedProduct.id ? updatedProduct : accessory
          )
        );
        setSelectedProduct(null); // Close the edit form
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Available Products</h1>
        <div className="cart-info">
          <span>Cart Items: {cartCount}</span>
        </div>
      </div>

      <input
        value={searchQuery}
        className="form-control mb-4"
        type="text"
        placeholder="Search for an accessory"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Display the form to add a new product */}
      <div className="mb-4">
        <h2>Add a New Product</h2>
        <form onSubmit={handleCreateNewProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleNewProductChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={handleNewProductChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Product Image URL"
            value={newProduct.image}
            onChange={handleNewProductChange}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="container mx-auto row">
        {filteredAccessories.length > 0 ? (
          filteredAccessories.map((accessory) => (
            <div key={accessory.id} >
              <div className="card">
                <img
                  src={accessory.image}
                  className="card-img-top"
                  alt={accessory.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{accessory.name}</h5>
                  <p className="card-text">Price: Ksh .{accessory.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(accessory)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={() => handleEditProduct(accessory)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No accessories found</p>
        )}
      </div>

      {/* Edit product form */}
      {selectedProduct && (
        <div className="edit-form">
          <h2>Edit Product</h2>
          <form onSubmit={handleSaveEdit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={selectedProduct.name}
              onChange={handleEditChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={selectedProduct.price}
              onChange={handleEditChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Product Image URL"
              value={selectedProduct.image}
              onChange={handleEditChange}
              required
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
}

