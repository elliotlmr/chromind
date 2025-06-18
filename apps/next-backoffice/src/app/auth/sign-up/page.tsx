import SignUpForm from "./components/SignUpForm";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
