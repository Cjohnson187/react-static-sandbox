import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Layers } from 'lucide-react';

import { HomePage } from './pages/HomePage';


// --- TYPE DEFINITIONS ---
import type { PageRoute } from './types/PageRoute'

import { getRouteFromHash, navigateTo, PROJECTS } from './utils/HashRouter';

// --- MAIN APPLICATION COMPONENT (Handles Routing Logic) ---
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getRouteFromHash());
  
  // Memoize the map that acts as our "router" dictionary
  const componentsMap: Record<PageRoute, React.FC<any>> = useMemo(() => {
    const map: Partial<Record<PageRoute, React.FC<any>>> = {};
    
    // 1. Add all project components
    PROJECTS.forEach(p => {
        map[p.id] = p.component;
    });

    // 2. Add the Home component, injecting the navigation function
    map['home'] = () => <HomePage projects={PROJECTS} onSelectProject={navigateTo} />;

    return map as Record<PageRoute, React.FC<any>>;
  }, []);

  // Use useCallback to memoize the hash update logic
  const handleHashChange = useCallback(() => {
    setCurrentPage(getRouteFromHash());
  }, []);

  // Set up the hashchange listener on mount and clean up on unmount
  useEffect(() => {
    // Set initial page from hash if it exists (e.g. if the page was refreshed on a project page)
    setCurrentPage(getRouteFromHash()); 

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);


  // Determine the component to render based on the current page state
  const CurrentComponent = componentsMap[currentPage] || componentsMap['home'];
  const isHomePage = currentPage === 'home';

  // Get the project name for the header
  const currentProjectName = PROJECTS.find(p => p.id === currentPage)?.name;

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Header for Navigation (Back button) */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gray-800 shadow-md border-b border-gray-700 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-teal-400">
          {isHomePage ? 'Portfolio Home' : currentProjectName || 'Project Detail'}
        </h1>
        {!isHomePage && (
          <button
            // Use the navigation function to update the hash
            onClick={() => navigateTo('home')}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-teal-700 text-white text-sm font-medium rounded-full transition duration-150 shadow-md"
          >
            <Layers className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden pt-16 md:pt-20">
        <div className="flex-1 overflow-auto">
          {/* Renders the current "page" component */}
          <CurrentComponent />
        </div>
      </main>
    </div>
  );
}
