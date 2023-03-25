import axios from "axios"
import { useCallback, useState } from "react"
import Input from "@/components/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

const Auth =() => {
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"))
  }, []);

  const login = useCallback(async () => {
    try{
      await signIn("credentials", {
        email, 
        password,
        redirect: false,
        callbackUrl: "/"
      });
      router.push("/");
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-screen w-screen bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
            <nav className="px-12 py-5">
                <img src="/images/logo.png" alt="logo" className="h-12" />
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md">
                  <h2 className="text-white text-4xl mb-8 font-semibold">
                    {variant === "login" ? "Sign in" : "Register"}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {variant === "register" && (
                    <Input 
                    label="Username"
                    onChange={(event:any)=> setName(event.target.value)} 
                    id="name"
                    value={name}
                    />
                    )}
                    <Input 
                    label="Email"
                    onChange={(event:any)=> setEmail(event.target.value)} 
                    id="email"
                    type="email"
                    value={email}
                    />
                    <Input 
                    label="Password"
                    onChange={(event:any)=> setPassword(event.target.value)} 
                    id="password"
                    type="password"
                    value={password}
                    />
                  </div>
                  <button
                  onClick={variant === "login" ? login : register} 
                  className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                    {variant === "login" ? "Login" : "Sign up"}
                  </button>
                  <p className="text-neutral-500 mt-12">
                    {variant === "login" ? "First time using Netflix" : "Already have an account?"}
                    <span
                    onClick={toggleVariant}
                    className="text-white ml-1 hover:underline cursor-pointer">
                      {variant === "login" ? "Create an account" : "Login"}
                    </span>
                  </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth