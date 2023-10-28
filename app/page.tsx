import Image from 'next/image';
import Sample from '../app/utils/Sample';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href="/signin">Sign in now!</a>
    </main>
  );
}
