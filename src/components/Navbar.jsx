import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  
    // Function to handle search form submission
    const handleSearch = (event) => {
        event.preventDefault();
        const query = event.target.searchInput.value;
        console.log("Searching for:", query);
        // Implement search functionality here
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-lg">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">Cart</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            category
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Exterior</a>
                            <a className="dropdown-item" href="#">Interior</a>
                        </div>
                    </li>
                </ul>

            </div>
        </nav>
    );
}
