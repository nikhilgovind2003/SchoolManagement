import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to='/' className="text-3xl font-bold text-indigo-600">School Library</Link>
          <nav>
            <ul className="flex space-x-6 font-semibold">
              <li>
                <Link to="/signup" className="text-gray-700 hover:text-indigo-600">SignUp</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 hover:text-indigo-600">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-6">Welcome to Our School Library</h2>
        <p className="text-lg text-gray-700 mb-12">
          Explore a wide collection of books and manage all library operations with ease. Join us today!
        </p>
      <Link to="/signup">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-10">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="Search Books" 
                className="mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-indigo-700">Search Books</h4>
              <p className="text-gray-700 mt-2">Find your favorite books quickly with our smart search feature.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <img 
                src="https://via.placeholder.com/100" 
                alt="Manage Borrowing" 
                className="mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-indigo-700">Manage Borrowing</h4>
              <p className="text-gray-700 mt-2">Easily keep track of all borrowed and returned books.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
              <img 
                src="https://via.placeholder.com/100" 
                alt="Student Profiles" 
                className="mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-indigo-700">Student Profiles</h4>
              <p className="text-gray-700 mt-2">Manage student profiles and their borrowing history efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 School Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
