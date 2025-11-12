import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Newspaper, Info, MessageCircle, Menu, X, User, Settings, LogOut, Home } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        return user;
      } catch (error) {
        return null;
      }
    },
  });

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  const navLinks = [
    { name: "Home", path: "Home", icon: Home },
    { name: "Templates", path: "Templates", icon: FileText },
    { name: "Jobs", path: "Jobs", icon: Briefcase },
    { name: "News", path: "News", icon: Newspaper },
    { name: "About", path: "About", icon: Info },
    { name: "Contact", path: "Contact", icon: MessageCircle },
  ];

  // Get current page name from location
  const getCurrentPage = () => {
    const path = location.pathname.split('/').pop() || 'Home';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const currentPage = getCurrentPage();
  const isActive = (path) => currentPage === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 group flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300"
            >
              <FileText className="w-5 h-5 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">ResumeCraft</span>
              <span className="text-xs text-gray-500 block -mt-1">AI Resume Builder</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <li key={link.name}>
                  <Link
                    to={createPageUrl(link.path)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 group ${
                      active
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-all duration-300 ${
                      active ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                    }`} />
                    <span className={active ? 'font-bold' : 'font-medium'}>{link.name}</span>
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Section: Auth + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-200"
                  >
                    <Avatar className="w-8 h-8 border-2 border-blue-200">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold">
                        {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                      {user.full_name || "User"}
                    </span>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 shadow-xl border-gray-200">
                  <DropdownMenuLabel className="font-semibold">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold text-gray-900">{user.full_name || "User"}</p>
                      <p className="text-xs font-normal text-gray-500 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={createPageUrl("Dashboard")} className="flex items-center">
                      <FileText className="w-4 h-4 mr-3 text-blue-600" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={createPageUrl("Profile")} className="flex items-center">
                      <User className="w-4 h-4 mr-3 text-blue-600" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={createPageUrl("Analytics")} className="flex items-center">
                      <Settings className="w-4 h-4 mr-3 text-blue-600" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  variant="ghost"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-gray-200 bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={createPageUrl(link.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      active
                        ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      base44.auth.redirectToLogin();
                    }}
                    variant="outline"
                    className="w-full justify-center font-semibold rounded-lg"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      base44.auth.redirectToLogin();
                    }}
                    className="w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}