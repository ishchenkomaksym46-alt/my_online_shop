import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function MoreInfo() {
    const [productInfo, setProductInfo] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getProductData = async () => {
            const res = await fetch(`http://localhost:5000/moreInfo/${id}`);
            const data = await res.json();
            setProductInfo(data.data);
        }

        if (id) {
            getProductData();
        }
    }, [id])
    
    return(
        <div>
            {productInfo.map(el => (
                <div key={el.id}>
                    <img src={el.img} alt="product" width={350}/>
                    <h2>Product name: {el.name}</h2>
                    <h3>Product description: {el.description}</h3>
                    <h4>Price {el.price}</h4>
                    <h5>Product image url: {el.img}</h5>
                </div>
            ))}
        </div>
    )
}

export default MoreInfo;
