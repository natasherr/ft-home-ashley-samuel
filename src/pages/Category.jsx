import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Category() {
    const { category } = useParams()
    const [accessories, setAccessories] = useState([])

    useEffect(() => {
        fetch(`https://ft-home-ashley-samuel-1.onrender.com/accessories/${category}`)
            .then(response => response.json())
            .then(data => setAccessories(data))
    }, [category])

    return (
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Accessories</h1>
        </div>
    )
}