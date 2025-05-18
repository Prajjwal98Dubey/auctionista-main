import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    return {
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
    };
  } catch (error) {
    console.log(error);
  }
};
