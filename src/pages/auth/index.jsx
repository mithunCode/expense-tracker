import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";
export const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const authInfo = {
      userId: res.user.uid,
      name: res.user.displayName,
      profilePhoto: res.user.photoURL,
      isLoggedIn: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense");
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5 h-screen bg-blue-200">
      <p className="text-xl font-sans font-bold ">
        SIGN IN WITH GOOGLE TO CONTINUE
      </p>
      <button
        className="bg-blue-300 p-2 px-5 rounded-xl shadow-xl font-mono font-semibold"
        onClick={signInWithGoogle}
      >
        Sign In
      </button>
    </div>
  );
};
