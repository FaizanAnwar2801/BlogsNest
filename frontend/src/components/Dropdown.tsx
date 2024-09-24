import { useState } from 'react';
import { Avatar } from './BlogsCard';
import { Link } from 'react-router-dom';

const DropdownButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                aria-label="User menu"  // Adding accessible label for screen readers
                title="Open user menu" // Optional: Tooltip for sighted users
                className="focus:outline-none">
                <Avatar name="User" size="big" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul className="py-1">
                        <li>
                            <Link to={`/user-blogs`}>
                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    My Blogs
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/blogs`}>
                                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    All Blogs
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to= {'/'}>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Logout
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const handleLogout = () => {
    localStorage.removeItem('token')
}

export default DropdownButton;
