import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () =>
        cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0).toFixed(2);

    const calculateTotalCost = (item) => (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem({ name: item.name }));
        }
    };

    const handleRemove = (item) => dispatch(removeItem({ name: item.name }));

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    const handleCheckoutShopping = (e) => {
        e.preventDefault();
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="continue_shopping_btn">
                <button onClick={handleContinueShopping}>Continue Shopping</button>
                <button onClick={handleCheckoutShopping}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
