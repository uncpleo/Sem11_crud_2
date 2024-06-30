import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from "./components/page.jsx"

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div>
      <Page/>
      <button className='main-button' onClick={handleLogout}>Logout</button>
    </div>
  );
}
