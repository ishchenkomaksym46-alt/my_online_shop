import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const getOrders = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                navigate('/login');
            }

            await fetch('http://localhost:5000/getOrders', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.succes === true) {
                    setOrders(data.orders);
                } else {
                    setError('Cannot get your orders');
                }
            });
        }

        getOrders();
    }, [navigate]);

    return(
        <div>
            {orders.length === 0 && <h2>No orders yet</h2>}

            {orders.map(el => {
                const date = new Date(el.created_at);

                const formattedDate = new Intl.DateTimeFormat('us-US').format(date);

                return(
                    <div key={el.id}>
                        <h1>Product id: {el.product_id}</h1>
                        <h2>Order id: {el.id}</h2>
                        <h3>Created at: {formattedDate}</h3>
                        <button onClick={() => navigate(`/moreInfo/${el.product_id}`)}>Show more</button>
                    </div>
                )
            })}
            <p>{error}</p>
        </div>
    )
}

export default CheckOrders;