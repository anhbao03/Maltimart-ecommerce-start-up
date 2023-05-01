import React, {useState} from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'
import products from "../assets/data/products"
import ProductsList from '../components/UI/ProductsList'

import '../Styles/shop.css'

const Shop = () => {

  const [productsData, setProductsData] = useState(products);
  
  const handleFilter = (e) =>{
    let filterValue = e.target.value
    if (filterValue !== null) {
      const filteredProducts = products.filter(
        (item) => item.category === filterValue
      );

      setProductsData(filteredProducts);
    }
  }

  const handleSearch = (e) =>{
    const searchTerm = e.target.value
    if (searchTerm !== null) {
      const searchedProducts = products.filter(
        (item) => item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setProductsData(searchedProducts);
    }
  }

  return (
    <Helmet>
      <CommonSection title={"Product"}/>
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
            <div className="filter_widget">
                <select name="" id="">
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>

                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search_box">
                <input type="text" placeholder='Search.....' onChange={handleSearch}/>
                <span>
                  <i class='ri-search-line'></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {
              productsData.length === 0? <h1 className='text-center fs-4'>No products are found</h1>
              : <ProductsList data={productsData} />
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop
