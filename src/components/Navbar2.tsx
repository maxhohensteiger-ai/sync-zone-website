"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import { Globe } from "lucide-react";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Navbar2 = (props: Navbar2Props) => {
  const { logo, navLinks } = {
    ...Navbar2Defaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section className="fixed top-0 left-0 right-0 z-[999] bg-black border-b border-gray-800">
      <div className="flex items-center justify-between px-6 py-3 lg:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <a href={logo.url} className="flex items-center">
            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((navLink, index) =>
            navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
              <SubMenu key={index} navLink={navLink} />
            ) : (
              <a
                key={index}
                href={navLink.url}
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                {navLink.title}
              </a>
            )
          )}
        </nav>

        {/* Right side buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="text-white hover:text-gray-300 transition-colors">
            <Globe className="w-5 h-5" />
          </button>
          <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
            Enterprise inquiries
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
            Log in
          </a>
          <button className="bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
            Create account
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            className="flex flex-col items-center justify-center w-8 h-8"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="block h-0.5 w-6 bg-white mb-1"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white mb-1"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        variants={{
          open: {
            height: "100vh",
            opacity: 1,
          },
          close: {
            height: 0,
            opacity: 0,
          },
        }}
        animate={isMobileMenuOpen ? "open" : "close"}
        initial="close"
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-black"
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((navLink, index) =>
            navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
              <MobileSubMenu key={index} navLink={navLink} />
            ) : (
              <a
                key={index}
                href={navLink.url}
                className="block text-white hover:text-gray-300 transition-colors py-2 text-lg"
              >
                {navLink.title}
              </a>
            )
          )}
          <div className="pt-4 border-t border-gray-800 space-y-3">
            <a href="#" className="block text-white hover:text-gray-300 transition-colors py-2">
              Enterprise inquiries
            </a>
            <a href="#" className="block text-white hover:text-gray-300 transition-colors py-2">
              Log in
            </a>
            <button className="w-full bg-white text-black px-4 py-3 rounded font-medium hover:bg-gray-200 transition-colors">
              Create account
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const SubMenu = ({ navLink }: { navLink: NavLink }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors text-sm font-medium">
        <span>{navLink.title}</span>
        <motion.span
          animate={isDropdownOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
        >
          <RxChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 min-w-48 bg-black border border-gray-800 rounded-lg shadow-xl py-2"
          >
            {navLink.subMenuLinks?.map((subMenuLink, index) => (
              <a
                key={index}
                href={subMenuLink.url}
                className="block px-4 py-2 text-white hover:text-gray-300 hover:bg-gray-900 transition-colors text-sm"
              >
                {subMenuLink.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileSubMenu = ({ navLink }: { navLink: NavLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-white hover:text-gray-300 transition-colors py-2 text-lg"
      >
        <span>{navLink.title}</span>
        <motion.span
          animate={isOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
        >
          <RxChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-4 space-y-2">
              {navLink.subMenuLinks?.map((subMenuLink, index) => (
                <a
                  key={index}
                  href={subMenuLink.url}
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  {subMenuLink.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar2Defaults: Props = {
  logo: {
    url: "#",
    src: "/public/images/logo.png",
    alt: "Sync-zone Logo",
  },
  navLinks: [
    {
      title: "Proxies",
      url: "#",
      subMenuLinks: [
        { title: "Residential Proxies", url: "#" },
        { title: "Datacenter Proxies", url: "#" },
        { title: "ISP Proxies", url: "#" },
        { title: "Mobile Proxies", url: "#" },
      ],
    },
    {
      title: "Scrapers",
      url: "#",
      subMenuLinks: [
        { title: "Web Scraper", url: "#" },
        { title: "Search Engine Scraper", url: "#" },
        { title: "Social Media Scraper", url: "#" },
        { title: "E-commerce Scraper", url: "#" },
      ],
    },
    { title: "Pricing", url: "#" },
    {
      title: "Data for AI",
      url: "#",
      subMenuLinks: [
        { title: "Training Data", url: "#" },
        { title: "Real-time Data", url: "#" },
        { title: "Structured Data", url: "#" },
      ],
    },
    {
      title: "Resources",
      url: "#",
      subMenuLinks: [
        { title: "Documentation", url: "#" },
        { title: "Blog", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Support", url: "#" },
      ],
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

export default Navbar2;