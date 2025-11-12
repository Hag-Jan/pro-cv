

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createPageUrl } from "@/utils";
import {
  Home,
  LayoutDashboard,
  FileText,
  Briefcase,
  Sparkles,
  Mail,
  Lightbulb,
  UserPlus,
  Settings,
  LogOut,
  User,
  ChevronRight,
  ChevronDown,
  BookOpen,
  MessageSquare,
  Newspaper,
  FolderOpen,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/common/Navbar";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [careerResourcesExpanded, setCareerResourcesExpanded] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        setUser(user);
        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
  });

  // Check if current page is Editor - auto-collapse sidebar
  const isEditorPage = currentPageName === 'Editor';
  const isHomePage = currentPageName === 'Home';

  // Auto-collapse sidebar on Editor page
  useEffect(() => {
    if (isEditorPage) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [isEditorPage]);

  // Main navigation - Core workflows only
  const mainNavigation = [
    { name: "Home", icon: Home, path: "Home" },
    { name: "Dashboard", icon: LayoutDashboard, path: "Dashboard" },
    { name: "Templates", icon: FileText, path: "Templates" },
  ];

  // Essential tools - Most frequently used
  const toolsNavigation = [
    { name: "AI Resume Review", icon: Sparkles, path: "AIResumeReview" },
    { name: "Cover Letters", icon: Mail, path: "CoverLetterLibrary" },
    { name: "Interview Coach", icon: Lightbulb, path: "InterviewCoach" },
    { name: "Collaboration", icon: UserPlus, path: "ResumeCollaboration" },
  ];

  // Career resources - Collapsible section
  const careerResources = [
    { name: "Job Matcher", icon: Briefcase, path: "JobMatcher" },
    { name: "Jobs Board", icon: Briefcase, path: "Jobs" },
    { name: "Career News", icon: Newspaper, path: "News" },
  ];

  // Footer links - Bottom of sidebar
  const footerLinks = [
    { name: "About", icon: BookOpen, path: "About" },
    { name: "Contact", icon: MessageSquare, path: "Contact" },
  ];

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  const isActivePath = (path) => {
    return currentPageName === path;
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Full-width layout for Home page with navbar
  if (isHomePage) {
    return (
      <div className="w-full min-h-screen">
        <Navbar />
        {children}
      </div>
    );
  }

  const sidebarWidth = sidebarCollapsed ? 'w-20' : 'w-64';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex overflow-hidden">
      {/* Streamlined Sidebar - FIXED WIDTH */}
      <AnimatePresence>
        <motion.aside
          initial={false}
          animate={{ width: sidebarCollapsed ? 80 : 256 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`${sidebarWidth} bg-white border-r border-gray-200 shadow-lg flex flex-col fixed left-0 top-0 bottom-0 z-50`}
        >
          {/* Logo/Brand - Collapsible */}
          <div className={`p-6 border-b border-gray-100 flex-shrink-0 ${sidebarCollapsed ? 'px-2' : ''}`}>
            {sidebarCollapsed ? (
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
            ) : (
              <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ResumeCraft</h1>
                  <p className="text-xs text-gray-500">AI Resume Builder</p>
                </div>
              </Link>
            )}
          </div>

          {/* Toggle Button */}
          <div className={`px-4 py-2 border-b border-gray-100 flex-shrink-0 ${sidebarCollapsed ? 'px-2' : ''}`}>
            <button
              onClick={toggleSidebar}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-6 h-6" />
              ) : (
                <>
                  <ChevronLeft className="w-6 h-6" />
                  <span className="text-sm font-medium">Collapse</span>
                </>
              )}
            </button>
          </div>

          {/* Navigation - SCROLLABLE */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {/* Main Features */}
            <div className="space-y-1 mb-4">
              {mainNavigation.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.path)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    title={sidebarCollapsed ? item.name : ''}
                  >
                    <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"} ${sidebarCollapsed ? 'mx-auto' : ''}`} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="text-sm font-medium flex-1">{item.name}</span>
                        {isActive && <ChevronRight className="w-5 h-5" />}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>

            {!sidebarCollapsed && (
              <>
                {/* Divider */}
                <div className="border-t border-gray-200 my-3"></div>

                {/* Essential Tools */}
                <div className="space-y-1 mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                    Tools
                  </h3>
                  {toolsNavigation.map((item) => {
                    const isActive = isActivePath(item.path);
                    return (
                      <Link
                        key={item.name}
                        to={createPageUrl(item.path)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`} />
                        <span className="text-sm font-medium flex-1">{item.name}</span>
                        {isActive && <ChevronRight className="w-5 h-5" />}
                      </Link>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-3"></div>

                {/* Career Resources - Collapsible */}
                <div className="mb-4">
                  <button
                    onClick={() => setCareerResourcesExpanded(!careerResourcesExpanded)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all group"
                  >
                    <Briefcase className="w-6 h-6 flex-shrink-0 text-gray-500 group-hover:text-blue-600" />
                    <span className="text-sm font-medium flex-1 text-left">Career Resources</span>
                    {careerResourcesExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {careerResourcesExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 ml-3 border-l-2 border-gray-200 pl-2 space-y-1"
                      >
                        {careerResources.map((item) => {
                          const isActive = isActivePath(item.path);
                          return (
                            <Link
                              key={item.name}
                              to={createPageUrl(item.path)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                                isActive
                                  ? "bg-blue-50 text-blue-700 font-medium"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              <item.icon className="w-5 h-5" />
                              <span>{item.name}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Spacer to push footer items to bottom */}
                <div className="flex-1"></div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-3"></div>

                {/* Footer Links */}
                <div className="space-y-1">
                  {footerLinks.map((item) => {
                    const isActive = isActivePath(item.path);
                    return (
                      <Link
                        key={item.name}
                        to={createPageUrl(item.path)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                          isActive
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

            {/* Collapsed Mode - Essential Icons Only */}
            {sidebarCollapsed && (
              <>
                <div className="border-t border-gray-200 my-3"></div>
                
                {/* Tools - Icons Only */}
                <div className="space-y-1 mb-4">
                  {toolsNavigation.map((item) => {
                    const isActive = isActivePath(item.path);
                    return (
                      <Link
                        key={item.name}
                        to={createPageUrl(item.path)}
                        className={`flex items-center justify-center px-3 py-3 rounded-lg transition-all group ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        title={item.name}
                      >
                        <item.icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`} />
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </nav>

          {/* User Profile - Bottom */}
          <div className={`p-4 border-t border-gray-100 flex-shrink-0 ${sidebarCollapsed ? 'px-2' : ''}`}>
            {user ? (
              sidebarCollapsed ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-center">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-lg">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Profile")} className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Analytics")} className="cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.full_name || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Profile")} className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Analytics")} className="cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            ) : (
              <Button onClick={() => base44.auth.redirectToLogin()} className="w-full" size={sidebarCollapsed ? "icon" : "default"}>
                {sidebarCollapsed ? <User className="w-6 h-6" /> : "Sign In"}
              </Button>
            )}
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content - NO HORIZONTAL SCROLL */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} overflow-x-hidden`}>
        {children}
      </main>
    </div>
  );
}

