// src/components/Navbar.tsx
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/PF Logo black 2.png'
import { useStores } from '../stores';
const Navbar: React.FC = () => {



    const location = useLocation();
    const { authenticationStore } = useStores();

    const path =!authenticationStore.isAuthenticated? '/' : authenticationStore.UserType === "Maitre" ? '/MaitreApprentissage/dashboard' : '/apprenti/dashboard'

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, isAuthenticated: boolean) => {
      if (isAuthenticated) {
        e.preventDefault(); // Empêche la navigation
      }
      // Autres logiques si nécessaire
    };
    const getNavLinkClass = (path: string): string => {
        return `${location.pathname.startsWith(path) ? "bg-nav-bar-selected" : "text-gray-200"} transition-all duration-300 ease-in-out text-sm font-semibold px-4 text-center rounded-full min-h-7 min-w-40 flex justify-center items-center`;
      };
    return (
      <nav className="bg-white p-4 relative"> {/* Add relative positioning here */}
        <div className="flex justify-start items-center min-h-12 w-full"> {/* Use w-full for full width */}
  
          {/* This div is for the AppName which you want at the start */}
          <div className="text-lg font-semibold text-main-color">
            <Link to={path} className="text-main-color font-semibold	flex items-center text-2xl	">
                <img src={logo}  className="mr-5 ml-16 h-11 w-11"  /> Talents
            </Link>
          </div>
  
          {/* Centered ul with absolute positioning */}
          <ul className="absolute left-1/2 font-display transform -translate-x-1/2 flex text-gray-200 items-center justify-between px-4 bg-main-color rounded-full min-h-12 min-w-[650px]">
  <li className='flex'>
    <NavLink 
      to={authenticationStore.isAuthenticated ? "/apprenti/dashboard": "/apprenti/signUpOne"} 
      className={() => getNavLinkClass('/apprenti')}
      onClick={(e) => handleNavLinkClick(e, authenticationStore.isAuthenticated)}

    >
      Apprenti
    </NavLink>
  </li>
  <li className='flex'>
    <NavLink 
      to={authenticationStore.isAuthenticated ? "/MaitreApprentissage/dashboard": "/MaitreApprentissage/signIn"} 
      className={() => getNavLinkClass('/MaitreApprentissage')}
      onClick={(e) => handleNavLinkClick(e, authenticationStore.isAuthenticated)}
      >
      Maitre d’apprentissage
    </NavLink>
  </li>
  <li className='flex'>
    <NavLink 
      to="/" 
      className={({ isActive }) => 
        `${isActive ? "bg-nav-bar-selected" : "text-gray-200"} transition-all duration-300 ease-in-out text-sm font-semibold px-4 text-center rounded-full min-h-7 min-w-40 flex justify-center items-center`
      }
      onClick={(e) => handleNavLinkClick(e, authenticationStore.isAuthenticated)}

    >
      Référent CFA
    </NavLink>
  </li>
</ul>
        </div>
      </nav>
    );
  };
  

export  {Navbar};
