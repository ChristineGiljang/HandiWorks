import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">Handiworks</h3>
          <p className="text-sm text-gray-600">
            Trusted cleaning services in Cebu, just a few clicks away.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:underline">
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-2">Categories</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home Cleaning
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Office Cleaning
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Car Cleaning
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Specialty
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#">
              <Facebook className="w-5 h-5 text-gray-600 hover:text-green-600" />
            </a>
            <a href="#">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-green-600" />
            </a>
            <a href="#">
              <Instagram className="w-5 h-5 text-gray-600 hover:text-green-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Handiworks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
