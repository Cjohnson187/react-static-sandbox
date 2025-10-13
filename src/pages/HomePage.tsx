import React from 'react';
import { Clipboard } from 'lucide-react';

// --- TYPE DEFINITIONS ---
import type { PageRoute } from '../types/PageRoute'
import type { Project } from '../types/Project'

interface HomePageProps {
    projects: Project[];
    onSelectProject: (id: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ projects, onSelectProject }) => (
  <div className="p-8 md:p-12 bg-gray-900 min-h-full">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-teal-400 mb-4 border-b border-gray-700 pb-2">
        My React Portfolio Sandbox
      </h1>
      <p className="text-xl text-gray-400 mb-12">
        Click on any project below to view the live component.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="block text-left p-6 bg-gray-800 rounded-2xl shadow-xl hover:bg-gray-700/70 transition duration-300 transform hover:scale-[1.02] border-t-4 border-teal-600/50 hover:border-teal-400"
          >
            <project.icon className="w-10 h-10 text-teal-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">{project.name}</h2>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </button>
        ))}
        
        {/* Placeholder for expansion */}
        <div className="block text-left p-6 bg-gray-800 rounded-2xl shadow-inner border-t-4 border-gray-600/50 cursor-not-allowed">
            <Clipboard className="w-10 h-10 text-gray-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-500 mb-2">Add New Project</h2>
            <p className="text-gray-600 text-sm">Define a new project in the projects array and PageRoute type inside App.tsx.</p>
        </div>

      </div>
    </div>
  </div>
);