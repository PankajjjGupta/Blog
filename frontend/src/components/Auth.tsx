import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { SignupInput } from "@pankajgupta029/medium-common"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useRecoilState } from "recoil"
import { authAtom } from "../atoms"
import { Spinner } from "./Spinner"

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [, setUser] = useRecoilState(authAtom)
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        email : "",
        password : ""
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const buttonTextToDisplay = type == 'signup'? 'Signup' : 'Signin'
    async function sendRequest () {
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == 'signup' ? "signup" : "signin" }`, postInputs);
            console.log(response)
            const token = response.data.jwt;
            localStorage.setItem("token", token)
            axios.get(`${BACKEND_URL}/api/v1/user/me`, {headers : {
                Authorization : 'Bearer ' + token 
            }})
            .then(response => {
                console.log(response)
                setUser(response.data.userDetails)
            })
            .catch(e => {
                console.log(e)
                setUser({});
            }) 
            setLoading(false)
            navigate("/blogs")
        } catch(e) {
            alert("Error while signing up")
        } finally {
            setLoading(false);
        }
    }
    console.log("re-rendered")
    return <div className="h-screen min-h-[40rem] flex justify-center items-center">
            <div className="w-2/3 md:w-1/2 lg:w-1/2">
                <div className="text-3xl text-center font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-500 text-lg text-center mt-4">
                    {type =='signup' ? "Already have an account?" : "Don't have an account?"}
                    <Link className="pl-2 underline" to={type == 'signup' ? "/signin" : "/signup"}>{type == 'signup' ? 'Login' : 'Signup'}</Link>
                </div>
                <div>
                    {type == 'signup' ? <LabelledInput label="Name" placeholder="John" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name : e.target.value
                        })
                    }}/> : null}

                    <LabelledInput label="Username" placeholder="johndoe@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email : e.target.value
                        })
                    }}/>

                    <LabelledInput label="Password" type="password" placeholder="Password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password : e.target.value
                        })
                    }}/>
                </div>
                <button onClick={sendRequest} type="button" className="grid place-items-center w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 mt-5">{loading ? <Spinner /> : buttonTextToDisplay}</button>
            </div>
    </div>
}

interface LabelledInputType {
    label : string,
    placeholder : string,
    type? : string,
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput ({label, placeholder, onChange, type}: LabelledInputType) {
    return <div className="mt-5">
    <label  className="block mb-2 text-md font-semibold text-gray-900 dark:text-black">{label}</label>
    <input onChange={onChange} type={type || 'text'} id="first_name" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
  </div>
}