import { Route, Switch, useHistory } from "react-router";
// components
import Chat from "./components/Chat";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Privateroute from "./components/Privateroute";
import { useState, useEffect } from "react";
// firebase deps
import firebase from "firebase";
import { db, auth } from "./firebaseConfig.js";

function App() {
  const [user, setUser] = useState(async () => await auth.currentUser);
  const [inicializing, setInicializing] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((us) => {
      if (us) {
        setUser(us);
        history.push("/chat");
      } else {
        setUser(null);
      }
    });
    setInicializing(false);
    return unsubscribe;
  }, []);

  const signInWithGoogle = async (e) => {
    e.preventDefault();

    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      history.push("/chat");
    } catch (error) {
      console.log("ha ocurrido un error al iniciar sesion", error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 h-screen">
      <Nav user={user} signOut={signOut} />
      {inicializing ? (
        <h4 className="text-xl text-center font-bold mt-4 ">Loading... </h4>
      ) : (
        <Switch>
          <Privateroute path="/chat" user={user} db={db} component={Chat} />
          <Route
            path="/"
            render={(props) => (
              <Home user={user} signIn={signInWithGoogle} {...props} />
            )}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;
