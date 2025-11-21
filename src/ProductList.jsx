import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Make sure this path is correct

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();

    const plantsArray = [ /* your plantsArray as given */ ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // dispatch to Redux store
        setAddedToCart(prev => ({ ...prev, [plant.name]: true })); // track added items
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            {/* Navbar here */}
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" onClick={handleHomeClick}>
                        <div>
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px' }}>
                    <a href="#" onClick={() => setShowCart(false)} style={{ color: 'white', fontSize: '20px' }}>Plants</a>
                    <a href="#" onClick={handleCartClick} style={{ color: 'white', fontSize: '20px' }}>Cart</a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map(category => (
                        category.plants.map(plant => (
                            <div key={plant.name} className="product-card">
                                <h3>{plant.name}</h3>
                                <img src={plant.image} alt={plant.name} width="200" />
                                <p>{plant.description}</p>
                                <p>{plant.cost}</p>
                                <button 
                                    onClick={() => handleAddToCart(plant)} 
                                    disabled={addedToCart[plant.name]}
                                >
                                    {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                </button>
                            </div>
                        ))
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
