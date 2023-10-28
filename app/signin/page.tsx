import SignInForm from './components/SignInForm';

export const metadata = {
  title: 'Sign In',
};

export default function SignIn() {
  return (
    <div className="m-14 flex h-full flex-1 items-center justify-center">
      <div className="flex w-2/4 flex-col items-stretch justify-center gap-10 p-7 shadow-2xl">
        <h2 className="p-7 text-center text-4xl font-bold">Sign in</h2>
        <SignInForm />
      </div>
    </div>
  );
}
