import { useEffect, useState } from "react";

export default function Home(){
    const[accessories, setAccessories]= useState([])
    const[searchQuery, setSearchQuery]= useState("")

    useEffect(()=>{
        fetch("http://localhost:3000/accessories")
         .then((res)=> res.json())
         .then((data)=> {setAccessories(data)})
    },[])

    const filteredAccessories = accessories.filter((accessory)=>{
        accessory.name.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return(
        <div>
            <input value={searchQuery} className="form-control mb-4" type="text" placeholder="Search for an accessory" onChange={(e)=>setSearchQuery(e.target.value)} />
            <h1 className="product">Available Products</h1>
            <div className="row">
                {
                    accessories && accessories.map((accessory,index)=>(
                       <li key={index} className="col-md-4 mb-4" >
                        <img alt = {accessory.name} src={accessory.image} className="img-fluid"/>
                        <h3 className="card-title">{accessory.name}</h3>
                        <h3>Price:Ksh. {accessory.price}</h3>
                        <button className="btn btn-success">Add To Cart</button>
                       </li>
                    ))
                }
            </div>
            
        </div>
    )
}