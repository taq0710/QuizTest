import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDa9OS0SGYeY0ofeznyaGuD75de2xMlLXw",
  authDomain: "mmo-project-885ff.firebaseapp.com",
  projectId: "mmo-project-885ff",
  storageBucket: "mmo-project-885ff.appspot.com",
  messagingSenderId: "42809888400",
  appId: "1:42809888400:web:efe5e9bb60b789276dd215",
  measurementId: "G-J9JFWKHZTD",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const provider = new FacebookAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return await auth.currentUser?.getIdToken()
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    return await auth.currentUser?.getIdToken()
  } catch (err: any) {
    console.warn(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  signInWithGoogle,
  logout,
  signInWithFacebook,
};

