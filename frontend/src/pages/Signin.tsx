import { useRecoilValue } from "recoil"
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { authAtom } from "../atoms"

export const Signin = () => {
    const user = useRecoilValue(authAtom);
    console.log(user)
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="">
            <Auth type="signin"/>
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
}