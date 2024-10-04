import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms";



export const Appbar = () => {
    const user: any = useRecoilValue(authAtom);
    console.log(user)
    const navigate = useNavigate();
    return <div className="border-b flex justify-between items-center py-5 px-10">
        <Link to={"/blogs"}>
            <div className="font-bold">
                Medium
            </div>
        </Link>
        <div className="flex items-center">
            <button onClick={() => {
                navigate("/publish")
            }} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br border font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-5">New</button>
            <div className="bg-slate-400 w-10 h-10 rounded-full grid place-content-center  text-md mr-3 font-bold">
                {user.name[0] || 'A'}
            </div>
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin")
            }} className="border bg-slate-800 text-white px-5 py-2 rounded-md hover:bg-black hover:text-white">
                Logout
            </button>
        </div>
    </div>
}