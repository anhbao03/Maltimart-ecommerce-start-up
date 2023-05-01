import {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase.config";

const useAuth = () => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user =>{
            if (user) {
                setCurrentUser(user);
                console.log("currentUser",currentUser)
            } else {
                setCurrentUser(null);
            }
        }))
    });

  return (
    {
        currentUser, 
    }
  )
}

export default useAuth
