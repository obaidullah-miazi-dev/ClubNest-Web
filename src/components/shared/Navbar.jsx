import React, { useState } from 'react';
import logo from '../../assets/ClubNest-logo.png';
import { NavLink } from 'react-router';
import Button from '../Button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Navlinks = (
    <>
      <NavLink to='/' end onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <li>Home</li>
      </NavLink>
      <NavLink to='/' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <li>Clubs</li>
      </NavLink>
      <NavLink to='/' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <li>Events</li>
      </NavLink>
    </>
  );

  return (
    <nav>
      <div className='w-11/12 mx-auto flex items-center justify-between py-4 px-2 border-b border-main/25'>
        {/* Logo */}
        <div>
          <img src={logo} alt='logo' className='w-32' />
        </div>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex list-none gap-8 font-semibold'>
          {Navlinks}
        </div>

        {/* Desktop Buttons */}
        <div className='hidden md:flex items-center gap-3'>
          <Button className='rounded-full'>Log In</Button>
          <Button className='rounded-full'>Register</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='md:hidden text-3xl focus:outline-none'
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-t border-main/25'>
          <div className='flex flex-col items-center gap-6 py-6 font-semibold list-none'>
            {Navlinks}
            <div className='flex flex-col gap-3 w-full px-8'>
              <Button className='rounded-full w-full'>Log In</Button>
              <Button className='rounded-full w-full'>Register</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;