import { useState } from 'react';
import { Avatar } from './BlogsCard';
import { Link } from 'react-router-dom';
import fetchUserData from './fetchUserData';

const DropdownButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    fetchUserData()
    const userName = localStorage.getItem("userName") || "";

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                aria-label="User menu"  // Adding accessible label for screen readers
                title="Open user menu" // Optional: Tooltip for sighted users
                className="focus:outline-none">
                <Avatar name={userName} size="big" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                            <div className="flex justify-start px-4 py-2 text-lg text-gray-800 font-bold border-b">
                            {userName}
                            </div>
                            <Link to={`/user-blogs`}>
                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    My Blogs
                                </button>
                            </Link>
                            <Link to={`/blogs`}>
                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    All Blogs
                                </button>
                            </Link>
                            <Link to={'/'}>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Logout
                                </button>
                            </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
}

export default DropdownButton;
