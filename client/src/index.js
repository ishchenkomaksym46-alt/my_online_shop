import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Signin from './auth/signin.js';
import Login from './auth/login.js';
import MainPage from './mainPage/mainPage.jsx';
import AddProduct from './addProduct/addProduct.jsx';
import DeleteProduct from './deleteProduct/deleteProduct.jsx';
import MoreInfo from './moreInfo/moreInfo.jsx';
import Cart from './cart/cart.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/addProduct' element={<AddProduct />} />
      <Route path='/deleteProduct' element={<DeleteProduct />} />
      <Route path='/moreInfo/:id' element={<MoreInfo />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  </BrowserRouter>
);
