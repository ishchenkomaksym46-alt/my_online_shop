import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loginCheck = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/mainPageCheck', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }

                console.log(data.user);
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        const getProducts = async () => {
            await fetch('http://localhost:5000/getProducts')
            .then(res => res.json())
            .then(result => setProducts(result));
        }

        loginCheck();
        getProducts();
    }, [navigate]);

    const addToCart = async (product) => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_name: product.name,
                    product_description: product.description,
                    product_price: product.price
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Cannot add product to cart.');
                return;
            }

            setError('');
        } catch (fetchError) {
            setError('Cannot add product to cart.');
        }
    };
    
    return(
        <div>
            <a href="/addProduct">Add product</a>
            <a href="/deleteProduct">Delete Product</a>
            <a href="/cart">Cart</a>
            <a href="/getOrders">Check my orders</a>
            {error && <p>{error}</p>}
            {products.map(el => (
                <div key={el.id}>
                    <img src={el.img} alt="product" width={250}></img>
                    <h2>{el.name}</h2>
                    <h3>Price: {el.price}</h3>
                    <button onClick={() => addToCart(el)}>Add to cart</button>
                    <button onClick={() => navigate(`/pay/${el.id}`)}>Buy right now</button>
                    <button onClick={() => navigate(`/moreInfo/${el.id}`)}>More information</button>
                </div>
            ))}
        </div>
    )
}

export default MainPage;
