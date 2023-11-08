import Image from 'next/image';
import SignInForm from '../components/SignInForm';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInForm />
    </main>
  );
}
