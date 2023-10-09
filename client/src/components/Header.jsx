
import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

export default function Header() {
  return (
    <div className="bg-gray-800">
      <header className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/about">
            <FaLeaf className="text-green-500 text-2xl mr-2" />
          </Link>
          <div className="text-white text-xl font-bold">
            <Link to="/about" className="text-white hover:text-gray-300">
              Pador Farms Franchise
            </Link>
          </div>
        </div>
        <nav className="mt-4 lg:mt-0">
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
            <li>
              <Link to="/signup" className="text-white hover:text-gray-300">
                SignUp
              </Link>
            </li>
            <li>
              <Link to="/signin" className="text-white hover:text-gray-300">
                SignIn
              </Link>
            </li>
            <li>
              <Link to="/signout" className="text-white hover:text-gray-300">
                SignOut
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}