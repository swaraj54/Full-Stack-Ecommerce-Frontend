import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Register from './Components/Register';
import AddProduct from './Components/AddProduct';
import AllProducts from './Components/AllProducts';
import Navbar from './Components/Navbar';
import ProductsHandler from './Components/Products/ProductsHandler';
import Profile from './Components/Profile';
import Test from './Components/Test';
import UpdateProduct from './Components/Products/UpdateProduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/test' element={<Test />} />
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/add-product' element={<AddProduct />} />
        <Route exact path='/all-products' element={<AllProducts />} />
        <Route exact path='/productshandler' element={<ProductsHandler />} />
        <Route exact path='/update-product/:id' element={<UpdateProduct />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
