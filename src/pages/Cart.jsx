import React, { useState, useEffect } from 'react';
export default function Cart() {
  // Sample cart data with images added
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice]= useState(0)

  useEffect(()=>{
    fetch("http://localhost:3000/accessories")
     .then((res)=>res.json())
     .then((data)=>{
       // Initializing quantity to 1 if not present
              const itemsWithQuantity = data.map(item => ({ ...item, quantity: item.quantity || 1 }));
              setCartItems(itemsWithQuantity)
     })
  },[])

  useEffect(() => {
      // Calculate total price whenever cartItems change
      const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      setTotalPrice(total);
    }, [cartItems])

  // Handle quantity change
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <div className="row">
        {/* Checking if cart is empty */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="col-12">
            {/* Cart items */}
            {cartItems.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center border p-3 mb-3">
                <div className="d-flex">
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto', marginRight: '15px' }} />
                  <div>
                  <h5>{item.name}</h5>
                  <p>Price:Ksh. {item.price}</p>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: '60px', marginLeft: '10px' }}
                    />
                  </label>
                </div>
              </div>
              <div>
            <button className="btn btn-danger" onClick={() => removeItem(item.id)}>
                 Remove
             </button>
              </div>
            </div>
            ))}

            {/* Total price */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4>Total Price: {totalPrice}</h4>
            </div>
            <div>
              <button className="btn btn-success">Proceed To Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
