
import {Link} from "react-router-dom"

export default function Navbar(){

    return(

        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to='/'>CarKit Hub</Link>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/" className="nav-link">Home </Link>
      </li>
       <li className="nav-item">
        <Link to="cart"className="nav-link" >Cart</Link>
      </li>

       <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
          </a>
          
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link className="dropdown-item" href="#">Interior</Link></li>
              <li><Link className="dropdown-item" href="#">Exterior</Link></li>
          </ul>
      </li>     
    </ul>
    
  </div>
</nav>
        </div>
    )
}
