import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Landing = () => {
    return(
    <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="text-2xl font-bold text-gray-800">BlogsNest</Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/signin" className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                        Login
                    </Link>
                </motion.div>
            </nav>
        </header>

        <main className="flex-grow">
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Welcome to BlogsNest</h1>
                        <p className="text-xl mb-8 text-gray-600">Your cozy corner for thoughts and stories</p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/signup" className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-lg">
                                Start Blogging
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why Choose BlogsNest?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Easy to Use", description: "Intuitive interface for seamless blogging experience" },
                            { title: "Beautiful Themes", description: "Customize your blog with our stunning themes" },
                            { title: "Engaged Community", description: "Connect with like-minded bloggers and readers" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-white p-6 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>

        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; 2023 BlogsNest. All rights reserved.</p>
            </div>
        </footer>
    </div>
    )
}