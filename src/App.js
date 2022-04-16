import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({});
    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    
    const handlerGoogleSignIn = () =>{
      signInWithPopup(auth, googleProvider)
      .then(result =>{
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error("error", error);
      })
    }

    const handleGitSignIn = ()=>{
      signInWithPopup(auth, gitProvider)
      .then(result =>{
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error =>{
        console.error(error);
      })
    }

    const handleSignOut = ()=>{
      signOut(auth)
      .then(() =>{
        setUser({});
      })
      .catch(error =>{
        setUser({});
      })
    }

  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button> :
        <div>
          <button onClick={handlerGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitSignIn}>Github SignIn</button>
        </div>
      }
      <h2>Name : {user.displayName}</h2>
      <p>your email address : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  )
}

export default App;
