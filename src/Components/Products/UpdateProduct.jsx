import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/User.context';
import { toast } from 'react-hot-toast';

const UpdateProduct = () => {
    const [productData, setProductData] = useState();
    const [isDataChanged, setIsDataChanged] = useState(false);
    const { id } = useParams();
    console.log(id, "-id")
    console.log(productData, "productData")

    const { state } = useContext(AuthContext);


    function handleChange(event) {
        setIsDataChanged(true);
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setIsDataChanged(false);
        if (productData.name && productData.price && productData.image && state?.user) {
            const response = await axios.post("http://localhost:8000/update-product", { id: productData._id, name: productData.name, price: productData.price, image: productData.image, userId: state?.user?._id })
            if (response.data.status === "Success") {
                setProductData(response.data.data)
                toast.success("Product Updated Successfully.")
            } else {
                toast.error("Internal Server error")
                setIsDataChanged(true);
            }
        } else {
            toast.error("Please fill the all fields..")
            setIsDataChanged(true);
        }
    }


    useEffect(() => {
        async function getProductData() {
            const response = await axios.post('http://localhost:8000/single-sell-product', { id })
            setProductData(response.data)
        }
        if (id) {
            getProductData()
        }
    }, [id])
    return (
        <div>
            <h1>Update Product</h1>
            {productData ?
                <div style={{}}>
                    <img src={productData.image} />
                    <form onSubmit={handleSubmit}>
                        <label>Name :</label><br />
                        <input type='text' value={productData.name} name='name' onChange={handleChange} /><br />
                        <label>Price :</label><br />
                        <input type='number' value={productData.price} name='price' onChange={handleChange} /><br />
                        <label>Image :</label><br />
                        <input type='text' value={productData.image} name='image' onChange={handleChange} /><br />
                        <input type='submit' disabled={!isDataChanged} /><br />
                    </form>
                </div>
                : <h3>Loading...</h3>
            }
        </div>
    )
}

export default UpdateProduct