import Image from 'next/image';
import Sample from '../app/utils/Sample';
import SignInForm from './components/SignInForm';
import Sidebar from './components/SideBar';
import GridList from './components/GridList';

export default function Home() {
  return (
    <main className="w-full">
      <GridList/>
    </main>
  );
}
