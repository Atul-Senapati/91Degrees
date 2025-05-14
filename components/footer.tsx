import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";
import Link from "next/link";
import { FOOTER_DATA } from "@/components/constants/footerData"; // Adjust path as needed

// Map icon names to components
const iconMap = {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
};

const Footer = () => {
  const { company, contact, quickLinks, socialMedia } = FOOTER_DATA;

  return (
    <footer className="w-full bg-pink-100 dark:bg-pink-950/10 border-t border-gray-200 dark:border-gray-700 py-8 md:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
              {company.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {company.description}
            </p>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <FaBuilding className="text-pink-500 flex-shrink-0" size={16} />
              <p>
                {company.registeredAddress.name}
                <br />
                {company.registeredAddress.address}
              </p>
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">CIN:</span>{" "}
              {company.registeredAddress.cin}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
              Contact Us
            </h3>
            <div className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-pink-500 flex-shrink-0" size={16} />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300 truncate"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-pink-500 flex-shrink-0" size={16} />
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaWhatsapp className="text-pink-500 flex-shrink-0" size={16} />
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  Join our WhatsApp Community
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs md:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
              Connect With Us
            </h3>
            <div className="flex gap-3 md:gap-4">
              {socialMedia.map((social) => {
                const IconComponent = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
            <div className="mt-4">
              <h4 className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">
                Subscribe to Our Newsletter
              </h4>
              <div className="mt-2 flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 rounded-t-md sm:rounded-l-md sm:rounded-r-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm w-full"
                />
                <button className="px-4 py-2 bg-pink-500 text-white rounded-b-md sm:rounded-r-md sm:rounded-l-none hover:bg-pink-600 transition-colors duration-300 text-sm mt-2 sm:mt-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            © 2025 {company.name}, a division of {company.registeredAddress.name}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;