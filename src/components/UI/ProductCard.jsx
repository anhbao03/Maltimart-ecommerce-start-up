/* eslint-disable no-template-curly-in-string */
import React from "react";
// import productImg from "../../assets/images/arm-chair-01.jpg";
import { motion } from "framer-motion";
import "../../Styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const ProductCard = ({ item, index }) => {

  const dispatch = useDispatch()

  const addToCart = () =>{
    dispatch(cartActions.addItem({
      id: item.id,
      productName: item.name,
      price: item.price,
      imgUrl: item.image
    })
    );
    toast.success('Product added successfully')
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product_item">
        <div className="product_img">
          <motion.img whileHover={{ scale: 0.85 }} src={item.image} alt="" />
        </div>
        <div className="p-2 product_info">
          <h3 className="product_name">
            <Link to={`/shop/${item.id}`}>{item.name}</Link>
          </h3>
          <span className="text-center d-block">{item.name}</span>
        </div>
        <div className="product_card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">{item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
