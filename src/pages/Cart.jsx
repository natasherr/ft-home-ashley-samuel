import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  const loadCartItems = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (Array.isArray(storedCart)) {
        setCartItems(storedCart);
      } else {
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  // Remove an item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      return; // Prevent invalid quantity
    }
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container md-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} >
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
                <h4>{item.name}</h4>
                <h5>${item.price.toFixed(2)}</h5>

                <div className="d-flex align-items-center mb-2">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    className="form-control w-25"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value, 10))
                    }
                  />
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: Ksh. {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 d-flex justify-content-between">
            <h4>Total: Ksh. {totalPrice.toFixed(2)}</h4>
            <button
              className="btn btn-primary"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

