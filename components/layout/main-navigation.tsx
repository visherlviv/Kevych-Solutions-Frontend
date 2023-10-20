import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

function MainNavigation() {
  const { data: session, status } = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <header className="bg-purple-700 p-4">
      <Link href='/' className="text-white text-2xl font-semibold">
        Viktor's train schedule admin panel
      </Link>
      <nav>
        <ul className="flex space-x-4">
          {!session && status !== 'loading' && (
            <li>
              <Link href='/auth' className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/trains' className="text-white hover:text-gray-300">
                Trains
              </Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler} className="text-white hover:text-gray-300">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
