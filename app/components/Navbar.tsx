import React from 'react';
import { Link, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className='navbar'>

        <Link to="/">
            <p className=' text-2xl font-bold text-gradient'>RESUMIND</p>
        </Link>

        <Link to="/upload" className=' primary-button w-fit'>
            Upload Resume 
        </Link>
        {auth.isAuthenticated && (
          <button
            onClick={handleLogout}
            className="primary-button w-fit"
          >
            Logout
          </button>
        )}

    </nav>
  )
}

export default Navbar