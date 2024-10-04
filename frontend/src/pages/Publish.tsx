import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const naviagte = useNavigate();
    return <div>
        <Appbar />
        <div className="flex justify-center items-center flex-col mt-10">
            <div className="max-w-screen-lg mb-6 w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" id="default-input" className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  /" placeholder="Title"/>
                <TextEditor onChange={(e) => {
                    setContent(e.target.value)
                }}/>
            </div>
            <button type="submit" onClick={() => {
                    const token = localStorage.getItem("token");
                    axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content
                    }, {
                        headers : {
                            Authorization : `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        naviagte(`/blog/${response.data.blogId}`);
                    })
                    .catch(e => {
                        console.log(e);
                        alert("Error while posting the blog")
                    })
                }} className="inline-flex mt-4 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                    Publish post
                </button>
        </div>
    </div>
}

function TextEditor ({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="w-full my-4 rounded-lg">
    <div className="bg-white rounded-b-lg">
        <textarea id="editor" onChange={onChange} rows={8} className="border-2 p-2 block w-full rounded-md text-sm text-gray-800 bg-white outline-none" placeholder="Write an article..." required ></textarea>
    </div>
</div>
}