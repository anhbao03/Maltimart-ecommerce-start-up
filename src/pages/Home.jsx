import {React, useState, useEffect} from 'react'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import heroImg from '../assets/images/hero-img.png'
import '../Styles/home.css'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
// import products from "../assets/data/products"
import axios from 'axios';
import counterImg from "../assets/images/counter-timer-img.png"
import Clock from '../components/UI/Clock'
import { Link } from "react-router-dom";   
import { motion } from 'framer-motion'                                                                                                                                                     

const Home = () => {

  const year = new Date().getFullYear();
  const [arowanas, setArowanas] = useState([]);
  const [accessory, setAccessory] = useState([]);
  // const [mobileProducts, setMobileProducts] = useState([]);
  // const [wirelessProducts, setWirelessProducts] = useState([]);
  // const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    getData();
    // const {data} = axios.get('https://react-native-shop.onrender.com/products');
    // console.log(data);
    // const filteredTrendingProducts = data.filter((item) => item.category ==="Arowana");
    // const filteredBestSalesProducts = data.filter((item) => item.category ==="Accessory");


    // setTrendingProducts(filteredTrendingProducts);
    // setBestSalesProducts(filteredBestSalesProducts);


    
    // const filteredMobileProducts = products.filter((item) => item.category ==="mobile");
    // const filteredWirelessProducts = products.filter((item) => item.category ==="wireless");
    // const filteredPopularProducts = products.filter((item) => item.category ==="watch");

    // setMobileProducts(filteredMobileProducts);
    // setWirelessProducts(filteredWirelessProducts);
    // setPopularProducts(filteredPopularProducts);
  });

  const getData = async() => {
    let arowanaList = [];
    let accessoryList = [];

    const {data} = await axios.get('https://react-native-shop.onrender.com/products');
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      if (data[index].category === 'Arowana') {
        arowanaList.push(data[index]);
      } else if (data[index].category === 'Accessory') {
        accessoryList.push(data[index]);
      }
    }
  
    setArowanas(arowanaList);
    setAccessory(accessoryList);
  }

  return (
    <Helmet title={'HOME'}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero_content">
                <p className="hero_subtitle">Trending product in {year}</p>
                <h2>Make your interior More Minimalistic and Modern</h2>
                <p>Everyone need and Everything in here</p>
                <button className="buy_btn">SHOP NOW</button>
              </div>
            </Col>

            <Col lg='6' md='6'>
              <div className="hero_img">
                <img src={heroImg} alt=''/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />
        <section className='trending_product'>
          <Container>
            <Row>
              <Col lg='12' className='text-center'>
                <h2 className='section_title'>Trending products</h2>
              </Col>
              <ProductsList data={arowanas} />
            </Row>
          </Container>
        </section>

        <section className="best_sales">
        <Container>
            <Row>
              <Col lg='12' className='text-center'>
                <h2 className='section_title'>Best Sales</h2>
              </Col>
              <ProductsList data={accessory} />
            </Row>
          </Container>
        </section>

        <section className="timer_count">
        <Container>
          <Row>
            <Col lg='6' md='6'>
            <div className="clock_top-content">
              <h4 className='text-white fs-6 mb-2'>Limit Offers</h4>
              <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
            </div>
            <Clock />
            <motion.button whileHover={{scale:1.2}} className="buy_btn store_btn"><Link to='/shop'>Visit Store</Link></motion.button>
            </Col>

            <Col lg='6' md='6'className='text-end'>
              <img src={counterImg} alt='' />
            </Col>
          </Row>
        </Container>
        </section>

        {/* <section className="new_arrivals">
        <Container>
            <Row>
              <Col lg='12' className='text-center'>
                <h2 className='section_title'>New Arivals</h2>
              </Col>
              <ProductsList data={mobileProducts} />
              <ProductsList data={wirelessProducts} />
            </Row>
          </Container>
        </section> */}

        {/* <section className="popular_category">
        <Container>
            <Row>
              <Col lg='12' className='text-center'>
                <h2 className='section_title mb-5'>Popular in Category</h2>
              </Col>
              <ProductsList data={popularProducts} />
            </Row>
          </Container>
        </section> */}

    </Helmet>
  )
}

export default Home