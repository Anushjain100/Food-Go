import React , {useState} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {

  const navigate = useNavigate();
  const [cartView , SetCartView] = useState(false);
  let data = useCart();


  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");

  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" style={{fontWeight: "bold"}} to="/" > GoFoodNIE🍟 </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
     <ul className= "nav-bar nav me-auto " >
        <li className="nav-item">
          <Link className="nav-link avtive fs-5 " aria-current="page"   to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken")) ? 
              <li className="nav-item">
                <Link className="nav-link active fs-5 " aria-current="page" to="/myOrder">History</Link>
              </li>
              :""
            }
        </ul>
        {(!localStorage.getItem("authToken"))?
         <div className='d-flex'>
         <Link className="btn bg-white text-success mx-1" to="/login"  >Login</Link>
         <Link className="btn bg-white text-success mx-1" to="/createuser"  >Signup</Link></div>
        : <><div className="btn bg-white text-danger fw-bold mx-1" to="/login" onClick={handleLogout} >Logout</div>
        <div className="btn bg-white text-warning mx-1 fw-bold" onClick={()=>SetCartView(true)} >
      
          <>Cart🛒 {" "}</>
          
          <>
          {data.length!=0? <Badge pill bg ="danger">{data.length}</Badge> : null}
          </>
        </div>
        {cartView?<Modal onClose={()=>SetCartView(false)}><Cart></Cart></Modal>:null}
        </>
        } 
          </div>
  </div>
</nav>
    </div>
  )
}
