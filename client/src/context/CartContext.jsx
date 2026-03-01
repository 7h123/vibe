import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('novaCart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('novaCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.product === product._id);
            if (existing) {
                return prev.map(item => item.product === product._id
                    ? { ...item, qty: item.qty + qty }
                    : item
                );
            }
            return [...prev, {
                product: product._id,
                name: product.name,
                price: product.price,
                material: product.material,
                image: product.images?.[0],
                dimensions: product.specs?.dimensions,
                qty
            }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.product !== id));
    };

    const updateQty = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev => prev.map(item =>
            item.product === id ? { ...item, qty: newQty } : item
        ));
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
