import { useState } from 'react';
import { Avatar } from './BlogsCard';

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
                <Avatar name="Faizan" size="big" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul className="py-1">
                        <li>
                            <button
                                onClick={() => alert("Navigating to My Blogs")}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                My Blogs
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => alert("Navigating to All Blogs")}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                All Blogs
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => alert("Logging out...")}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

    export default DropdownButton;
