import { ReactNode, useEffect, useState } from "react";
import { useRecoilState} from "recoil";
import { authAtom } from "../atoms";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "./Spinner";

interface UnprotectedRoutesProps {
  children: ReactNode;
}

export const UnprotectedRoutes = ({ children }: UnprotectedRoutesProps) => {
  const [user, setUser] = useRecoilState(authAtom);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/api/v1/user/me`, {
      headers : {
        Authorization : "Bearer " + token
      }
    })
    .then(response => {
      setUser(response.data.userDetails)
      setLoading(false);
    })
    .catch(e => {
      console.log("Error ",e);
      setUser({});
      setLoading(false);
    })
  }, [])
  console.log(user)
  return <>{loading ? <div className="h-screen w-screen grid place-content-center">
    <Spinner />
  </div> : (Object.keys(user).length == 0 ? children : <Navigate to="/blogs" />)}</>;
};
