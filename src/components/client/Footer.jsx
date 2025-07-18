import React from 'react';
import { FaReddit, FaDiscord, FaInstagram, FaFacebook } from 'react-icons/fa';
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-8 py-12 mt-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="md:w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <img
             src={logo}
              alt="Logo"
              className="h-20 w-auto"
            />
          </div>
          <p className="text-gray-400 leading-relaxed mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum modi, possimus dolore saepe nobis itaque cupiditate veniam nostrum, provident quam, nequeab dicta velit debitis cum unde recusandae. Fuga, consectetur.
          </p>

          <h4 className="font-semibold mb-2">Join Us on</h4>
          <div className="flex gap-3 text-2xl">
            <FaReddit className="hover:text-red-500 cursor-pointer" />
            <FaDiscord className="hover:text-indigo-400 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
          </div>

          <p className="text-gray-500 mt-6">© 2025 All rights reserved by Visual.</p>
        </div>

        {/* Right: Newsletter */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-2">GET NOTIFIED</h3>
          <p className="text-gray-400 mb-4">
            Get emails for latest news about anime, and more.
          </p>

          <div className="flex rounded-md overflow-hidden border border-gray-500 w-full">
            <input
              type="email"
              placeholder="info@example.com"
              className="w-full px-4 py-2 bg-transparent text-white outline-none"
            />
            <button className="bg-white text-black font-semibold px-6">
              Subscribe
            </button>
          </div>

          <hr className="my-4 border-gray-600" />
          <p className="text-gray-500 text-sm">
            By subscribing you agree to our terms and conditions
          </p>

          <div className="mt-6 flex gap-4 justify-end text-sm text-gray-400">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Comments Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
