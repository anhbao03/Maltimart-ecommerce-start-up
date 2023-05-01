// import {React, useState, useEffect} from 'react'
import { Col, Container, Row, ListGroup,ListGroupItem } from 'reactstrap'
import { Link } from "react-router-dom";
import logo from '../../assets/images/eco-logo.png' 
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3' className='pad-t-16'>
          <div className='logo mb-3'>
            <img src={logo} alt='logo'/>
              <div>
                <h1>MultiMart</h1>
              </div>
          </div>
        <p className="footer_text">Giấy chứng nhận ĐKKD số 0101778163 do Sở Kế hoạch Đầu tư Thành phố Hà Nội cấp ngày 28/07/2005

Giấp phép cung cấp dịch vụ Viễn thông số 147/GP-CVT ngày 02/05/2013</p>
          </Col>

          <Col lg='3' className='pad-t-16'>
            <div className="footer_quick-link">
              <h4 className='quick_link-title'>Useful Link</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Privacy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='3' className='pad-t-16'>
          <div className="footer_quick-link">
              <h4 className='quick_link-title'>Top categories</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>IPhone</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Smart Watch</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Arm chair</Link>
                </ListGroupItem>

              </ListGroup>
            </div>
          </Col>

          <Col lg='3' className='pad-t-16'>
          <div className="footer_quick-link">
              <h4 className='quick_link-title'>Contact</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0 color'>
                  <span><i class="ri-map-pin-line">Thanh pho Ho Chi Minh - Viet Nam</i></span>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 color'>
                <span><i class="ri-phone-line">0773644123</i></span>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 color'>
                <span><i clas="ri-facebook-box-fill"><Link className='blue-text' to='https://www.facebook.com/eckbao/'>FaceBook</Link></i></span>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 color'>
                <span><i class="ri-mail-line">quocbaoeck97@gmail.com</i></span>
                </ListGroupItem>

              </ListGroup>
            </div>
          </Col>

          <Col lg='12'>
            <p>Coppyright {year} developed by Dang Hoai Nam Quoc Bao</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
