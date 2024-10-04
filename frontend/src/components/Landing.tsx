import { useNavigate } from "react-router-dom"
import { Appbar } from "./Appbar"
import { useRecoilState } from "recoil"
import { authAtom } from "../atoms"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Spinner } from "./Spinner"

const blogPosts = [
  {
    id: 1,
    title: "The Art of Simplicity in Design",
    excerpt: "Exploring how simplicity in design can lead to more effective and user-friendly interfaces. We delve into the principles of minimalism and their application in modern web design.",
    author: "Emma Thompson",
    date: "May 15, 2023",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Future of Artificial Intelligence",
    excerpt: "A deep dive into the latest advancements in AI and machine learning. We explore potential applications and the ethical considerations that come with this rapidly evolving technology.",
    author: "Michael Chen",
    date: "May 18, 2023",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Sustainable Living: Small Changes, Big Impact",
    excerpt: "Discover practical tips for adopting a more sustainable lifestyle. Learn how small, everyday choices can contribute to a healthier planet and a more eco-friendly future.",
    author: "Olivia Rodriguez",
    date: "May 21, 2023",
    readTime: "6 min read"
  }
]

export function Landing() {
    const [, setUser] = useRecoilState(authAtom);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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

    if(loading) {
        return <div className="h-screen w-screen grid place-content-center">
        <Spinner />
        </div>
    } else {
        return <div className="min-h-screen bg-white flex flex-col">
        <Appbar />

        <main className="flex-grow container mx-auto px-4 py-12">
            <section className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Welcome to YourBlog</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover stories, ideas, and expertise from writers on any topic. Join our community of curious minds.
            </p>
            <button onClick={() => {
                navigate("/blogs")
            }} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Start Reading
            </button>

            </section>

            <section className="grid place-items-center">
            <h2 className="text-3xl font-bold mb-8 text-center">Recent Posts</h2>
            <div className="space-y-12">
                {blogPosts.map((post) => (
                <article key={post.id} className="border-b pb-8">
                    <h3 className="text-2xl font-bold mb-2">
                    <div className="transition-colors">
                        {post.title}
                    </div>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                    </div>
                </article>
                ))}
            </div>
            </section>
        </main>

        <footer className="bg-gray-100 mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            © {new Date().getFullYear()} Medium. All rights reserved.
            </div>
        </footer>
        </div>
    }
}