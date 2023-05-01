import React,{useState} from 'react'
import '../Styles/login.css'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Row, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      setLoading(false);
      toast.success('Successfully logged in')
      navigate('/home')
      
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
    }
  }

  return (
    <Helmet>
      <Container>
        <Row>
          {
            loading ? <Col className='text-center'><h5 className='fw-bold'>Loading.....</h5></Col> :
            
            <Col lg='6' className='m-auto text-center'>
            <h3 className='fw-bold fs-4 mb-4'>Login</h3>
            <Form className='auth_form' onSubmit={signIn}>
              <FormGroup className='form_group'>
                <input type='email' placeholder='Enter your email'
                value={email} onChange={e=>setEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup className='form_group'>
                <input type='password' placeholder='Enter your password'
                value={password} onChange={e=>setPassword(e.target.value)}/>
              </FormGroup>

              <button type='submit' className="buy_btn login_btn">Login</button>
              <p>Don't have an account ?{" "} <Link to='/signup'>Create an account</Link></p>  
            </Form>

          </Col>
          }
          
        </Row>
      </Container>
    </Helmet>
  )
}

export default Login
