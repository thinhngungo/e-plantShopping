import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    // Track which items have been added to the cart
    const [addedToCart, setAddedToCart] = useState({});

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            {/* ...Navbar code omitted for brevity... */}
            
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.flatMap(category => category.plants).map(plant => (
                        <div className="product-card" key={plant.name}>
                            <img src={plant.image} alt={plant.name} />
                            <h3>{plant.name}</h3>
                            <p>{plant.description}</p>
                            <p>{plant.cost}</p>
                            <button
                                disabled={addedToCart[plant.name]}
                                onClick={() => handleAddToCart(plant)}
                            >
                                {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}

            {/* Display total items in cart in navbar */}
            <div className="cart-count">
                Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
        </div>
    );
}

export default ProductList;
