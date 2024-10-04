import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    title : string,
    content : string,
    author : {
        name : string
    },
    id : string
}

export const useBlog = ({id}: {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                alert("Error while fetching the blog");
                setLoading(false)
            })
    }, []);
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers : {
                Authorization : "Bearer " + token
            }
        })
            .then(response => {
                setBlogs(response.data.blogs)
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
                setBlogs([]);
                setLoading(false)
            })
    }, [])
    return {
        loading,
        blogs
    }
}