import { useNavigate, Link } from "react-router-dom";

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">About KissanHelper</h3>
            <p className="text-gray-400">
              Empowering farmers with innovative technology solutions for
              sustainable agriculture and better yields.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://youtube.com"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a className="hover:text-green-500 transition-colors">
                  Soil Analysis
                </a>
              </li>
              <li>
                <a className="hover:text-green-500 transition-colors">
                  Crop Planning
                </a>
              </li>
              <li>
                <a className="hover:text-green-500 transition-colors">
                  Weather Alerts
                </a>
              </li>
              <li>
                <a className="hover:text-green-500 transition-colors">
                  Market Prices
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and farming tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-1"
              />
              <button className="bg-green-500 text-black px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-4 md:mb-0 text-center"></div>
            <p className="text-gray-400 text-sm text-center">
              Conditions of Use & Sale,{' '}
              <Link
                to="/privacy-policy"
                className="text-green-700 hover:text-green-500 transition-colors"
              >
                Privacy Notice
              </Link>
              , Interest-Based Ads © ,{' '}
              <a
                href="https://kissanhelper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:text-green-500 transition-colors"
              >
                KissanHelper.com
              </a>
              , Inc. or its affiliates
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
