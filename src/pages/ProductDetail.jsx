import React, {useState, useRef, useEffect} from 'react'
import { Col, Container, Row } from 'reactstrap'
import { useParams } from 'react-router-dom'
import CommonSection from '../components/UI/CommonSection'
import products from "../assets/data/products"
import Helmet from '../components/Helmet/Helmet'
import { motion } from "framer-motion";
import '../Styles/product-details.css'
import ProductsList from '../components/UI/ProductsList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const [tab, setTab] = useState('desc')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const dispatch = useDispatch()

  const [rating, setRating] = useState(null)
  const {id} = useParams();
  const product = products.find((item) => item.id === id);

  const {imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product ;

  const relatedProducts = products.filter((item)=> item.category === category)

  const submitReviewHandler = (e) =>{
    e.preventDefault();
    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value
    const reviewObj = {
      user : reviewUserName,
      text : reviewUserMsg,
      rating
    }
    console.log(reviewObj)
    toast.success('Product added successfully')
  };

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      productName,
      price,
      image: imgUrl
    }));
    toast.success('Review submited')
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={category.toUpperCase()}/>

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src= {imgUrl} alt="" />
            </Col>
            <Col lg='6'>
              <div className="product_details">
                <h2>{productName}</h2>
                <div className='product_rating d-flex align-item-center gap-5 mb-3'>
                  <div>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                  </div>

                  <p>(<span>{avgRating}</span> rating)</p>
                </div>

                <span className='product_price'>${price}</span>
                <p className='mt-3'>{shortDesc}</p>

                <motion.button whileTap={{scale: 1.2}} className="buy_btn" onClick={addToCart}>Add to Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_wrapper d-flex align-item-center gap-5">
                <h6 className={`${tab ==='desc' ? 'tab_active' : ""}`} onClick={() => setTab('desc')}>
                  Description
                </h6>
                <h6 className={`${tab ==='rev' ? 'tab_active' : ""}`} onClick={() => setTab('rev')}>
                  Reviews ({reviews.length})
                </h6>
              </div>
              {
                tab === 'desc' ? <div className="tab_content mt-4">
                <p>{description}</p>
              </div> 
              : (<div className="tab_content mt-4">
                    <div className='tab_content mt-4'>
                      <ul>
                        {
                          reviews.map((item,index)=> (<li key={index}>
                                                        <p>
                                                          <span className='rating_bot'>{item.rating}<i class="ri-star-s-fill"></i></span> {item.text}
                                                        </p>
                                                      </li>) )
                        }
                      </ul>

                      <div className="review_form">
                        <h4>Leave your experience</h4>
                        <form action ="" onSubmit={submitReviewHandler}>
                          <div className="form_group">
                            <input type="text"  placeholder='Enter Name' ref={reviewUser} required/>
                          </div>
                          <div className="form_group rating_bot d-flex align-align-items-center gap-4">
                          <span onClick={() => setRating(1)}>1<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(2)}>2<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(3)}>3<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(4)}>4<i class="ri-star-s-fill"></i></span>
                          <span onClick={() => setRating(5)}>5<i class="ri-star-s-fill"></i></span>
                          </div>
                          <div className="form_group">
                            <textarea row={4} type="text"  placeholder='Review Message...' ref={reviewMsg} required/>
                          </div>
                          <motion.button whileTap={{scale: 1.2}} type='submit' className="buy_btn">Submit</motion.button>
                        </form>
                      </div>
                    </div>
                </div>)
              }
              
            </Col>
            <Row>
            <Col lg='12'>
              <h2 className='related'>You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts}/>
            </Row>

          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetail