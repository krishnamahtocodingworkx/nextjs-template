import LoginButton from "@/components/loginButton";

export default function Login() {
    return <div className="h-screen flex flex-col items-center justify-center gap-10">
        <h1 className="font-poppins text-3xl">Login Page</h1>
        <LoginButton />
    </div>
}