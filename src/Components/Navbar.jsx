import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/User.context'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");
    const { state, logout } = useContext(AuthContext);
    const router = useNavigate();

    console.log(role, "_ role")

    useEffect(() => {
        if (state.user) {
            setUser(state?.user);
            setRole(state?.user?.role)
        } else {
            setUser({});
            setRole("");
        }
    }, [state])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-around" }}>

                <h4 style={{ cursor: "pointer", border: '1px solid black' }}>Home - everyone</h4>
                {role == "Admin" &&
                    <h4 style={{ cursor: "pointer", border: '1px solid black' }}>User Handler - admin</h4>}
                {(role == "Admin" || role == "Seller") &&
                    <h4 onClick={() => router('/productshandler')} style={{ cursor: "pointer", border: '1px solid black' }}>Product Handler - seller, admin</h4>}
                <h4 onClick={() => router('/all-products')} style={{ cursor: "pointer", border: '1px solid black' }}>All product - everyone</h4>

                {(role == "Seller" || role == "Admin") && <h4 onClick={() => router("/add-product")}>Add Product</h4>}
                {role == "Buyer" && <h4 style={{ cursor: "pointer", border: '1px solid black' }}>Cart only buyer</h4>}
                {user?.name ?
                    <>
                        <h4 onClick={() => router('/profile')} style={{ cursor: "pointer", border: '1px solid black' }}>{user.name}</h4>
                        <h4 style={{ cursor: "pointer", border: '1px solid black' }} onClick={logout}>Logout</h4>
                    </> :
                    <h4 onClick={() => router('/login')}>Login</h4>

                }
            </div>
        </div>
    )
}

export default Navbar