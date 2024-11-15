import { useEffect, useState } from "react";

export default function Home() {
  const [accessories, setAccessories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/accessories")
      .then((res) => res.json())
      .then((data) => {
        setAccessories(data);
      });
  }, []);

  // Filter the accessories based on the search query
  const filteredAccessories = accessories.filter((accessory) =>
    accessory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle adding an accessory to the cart
  const handleAddToCart = (accessoryName) => {
    alert(`${accessoryName} has been added to your cart!`);
  };

  return (
    <div>
      <input
        value={searchQuery}
        className="form-control mb-4"
        type="text"
        placeholder="Search for an accessory"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h1>Available products</h1>
      <div className="container mx-auto row">
        {filteredAccessories.length > 0 ? (
          filteredAccessories.map((accessory, index) => (
            <li key={index} className="col-md-4 border">
              <img src={accessory.image} className="img-fluid" alt={accessory.name} />
              <h4>{accessory.name}</h4>
              <h3>{accessory.price}</h3>
              <button onClick={() => handleAddToCart(accessory.name)}>
                Add to cart
              </button>
            </li>
          ))
        ) : (
          <p>No accessories found</p>
        )}
      </div>
    </div>
  );
}
