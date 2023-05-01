import React, { useState } from "react";
import "../Styles/login.css";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Singup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const updaloadTask = uploadBytesResumable(storageRef, file);

      updaloadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(updaloadTask.snapshot.ref).then(
            async (downloadURL) => {
              // update user profile
              await updateProfile(user, {
                displayName: username,
                photoURL: downloadURL,
              });

              // store user data in firestore database
              await setDoc(doc(db, "user", user.uid), {
                uid: user.uid,
                displayName: username,
                email,
                photoURL: downloadURL,
              });
            }
          );
        }
      );

      console.log(user);
      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet>
      <Container>
        <Row>
          {loading ? (
            <Col className="text-center">
              <h5 className="fw-bold">Loading.....</h5>
            </Col>
          ) : (
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold fs-4 mb-4">Sign Up</h3>
              <Form className="auth_form" onSubmit={signup}>
                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="Enter your User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form_group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form_group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form_group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>

                <button type="submit" className="buy_btn login_btn">
                  Create an Account
                </button>
                <p>
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Singup;
