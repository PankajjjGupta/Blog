import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms";

export const Appbar = () => {
  const user: any = useRecoilValue(authAtom);
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className="border-b flex justify-between items-center py-5 px-5 md:px-10">
      <Link to={"/blogs"}>
        <div className="font-bold text-lg md:text-xl">Medium</div>
      </Link>
      
      <div className="flex items-center space-x-3 md:space-x-5">
        <button
          onClick={() => {
            navigate("/publish");
          }}
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br border font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5"
        >
          New
        </button>

        <div className="bg-slate-400 w-8 h-8 md:w-10 md:h-10 rounded-full grid place-content-center text-sm md:text-md font-bold">
          {Object.entries(user).length > 0 ? user.name[0] : "A"}
        </div>

        {Object.entries(user).length > 0 ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="border bg-slate-800 text-white px-4 py-2 rounded-md text-sm md:px-5 md:py-2.5 hover:bg-black hover:text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="border bg-slate-800 text-white px-4 py-2 rounded-md text-sm md:px-5 md:py-2.5 hover:bg-black hover:text-white"
          >
            Signin
          </button>
        )}
      </div>
    </div>
  );
};
