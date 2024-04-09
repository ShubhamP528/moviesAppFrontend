import React from "react";
import "@fortawesome/fontawesome-free/css/all.css"; // Import Font Awesome CSS

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
          {/* Company Info */}
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-2">Company Name</h3>
            <p className="text-sm mb-1">123 Street, City, Country</p>
            <p className="text-sm mb-1">info@example.com</p>
            <p className="text-sm mb-1">123-456-7890</p>
          </div>

          {/* Quick Links */}
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li className="mb-1">
                <a href="#" className="text-sm hover:text-gray-400">
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-sm hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-sm hover:text-gray-400">
                  Services
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-sm hover:text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center md:justify-end md:mr-8">
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        {/* Additional Information */}
        <div className="mt-8 text-white text-center md:text-left">
          <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
          <p className="text-sm mt-1">
            Terms of Service | Privacy Policy | Sitemap
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
