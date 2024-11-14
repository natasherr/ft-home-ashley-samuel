import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">CarKit Hub</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link to="/" class="nav-link">Home</Link>
                </li> 
                <li class="nav-item active">
                    <Link to="cart" class="nav-link">Cart</Link>
                </li> 
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>            
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Catergory
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    </div>
                </li>
                </ul>

            </div>
            </nav>
        </div>
    )
}