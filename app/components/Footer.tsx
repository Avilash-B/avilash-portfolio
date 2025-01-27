const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Avilash. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition duration-150 ease-in-out">Self Hosted</a>
            {/* <a href="#" className="hover:text-gray-300 transition duration-150 ease-in-out">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition duration-150 ease-in-out">Terms of Service</a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

