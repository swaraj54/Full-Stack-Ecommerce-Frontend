import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/User.context'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsHandler = () => {
    const { state } = useContext(AuthContext);
    const [updatedData, setUpdatedData] = useState({ name: "", price: "", image: "" });
    console.log(updatedData, "updatedData")
    const [user, setUser] = useState({});
    const [userAddedProduct, setUserAddedProduct] = useState([]);
    const router = useNavigate()
    console.log(userAddedProduct, "userAddedProduct from backend")

    useEffect(() => {
        if (state.user) {
            setUser(state?.user)
        } else {
            setUser({});
            setUserAddedProduct([])
        }
    }, [state])


    useEffect(() => {
        async function getSellProduct() {
            const { data } = await axios.post("http://localhost:8000/get-sell-products", { userId: user?._id });
            setUserAddedProduct(data)
        }
        if (user?._id) {
            getSellProduct();
        }
    }, [user])

    return (
        <div>
            <h1>Here is Your selling products</h1>
            <div style={{ display: 'flex', justifyContent: "space-around", flexWrap: 'wrap' }}>
                {userAddedProduct && userAddedProduct.map((pro) => (
                    <div style={{ width: "20%", height: "400px", border: "2px solid black", paddingBottom: "30px" }}>
                        <img style={{ width: "100%", height: "75%" }} src={pro.image} />
                        <h4 style={{ marginBottom: "-40px" }}>Name : {pro.name} </h4><br />
                        <h4 style={{ marginBottom: "-20px" }}>Price: {pro.price}  </h4><br />
                        <button onClick={() => router(`/update-product/${pro._id}`)}>Update</button>
                    </div >
                ))}
            </div >
        </div >
    )
}

export default ProductsHandler