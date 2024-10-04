import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "../atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export const ProtectedRoutes = ({children}: ProtectedRoutesProps) => {
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
    return <>
        {loading ? <div className="h-screen w-screen grid place-content-center">
          <Spinner />
        </div> : (Object.keys(user).length == 0 ? <Navigate to='/signin' /> : children)}
    </>
}
