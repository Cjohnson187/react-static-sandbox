import { Lightbulb, ChartLine, Axe} from 'lucide-react';
import { CounterProject } from '../projects/Counter';
import CarpentryShowcase from '../projects/carpentry/demo1';
import StudioShowcase from '../projects/carpentry/demo2';

import bigO from '../projects/bigO/BigO';
// --- TYPE DEFINITIONS ---
import type { PageRoute } from '../types/PageRoute'
import type { Project } from '../types/Project'

// --- PROJECT DATA ---
// Define ALL projects and their corresponding components here
export const PROJECTS: Project[] = [
    { 
        id: 'bigo', 
        name: 'Big O Complexity Cheatsheet', 
        description: 'Big O Complexity reference for common data structures and algorithms.', 
        icon: ChartLine,
        component: bigO
    },
    { 
        id: 'counter', 
        name: 'React Counter App', 
        description: 'A classic demonstration of useState hook for managing numeric state.', 
        icon: Lightbulb,
        component: CounterProject
    },
    { 
        id: 'carpentry-demo1', 
        name: 'carpentry-demo1', 
        description: 'First option for carpentry demo page.', 
        icon: Axe,
        component: CarpentryShowcase
    },
    { 
        id: 'carpentry-demo2', 
        name: 'carpentry-demo2', 
        description: 'Second option for carpentry demo page.', 
        icon: Axe,
        component: StudioShowcase
    },
    // Add more projects here
];

// --- UTILITY FOR HASH ROUTING ---

/**
 * Parses the URL hash and returns the corresponding PageRoute ID.
 * @returns The matched PageRoute or 'home' if no match is found.
 */
export const getRouteFromHash = (): PageRoute => {
    // Get the hash part (e.g., '#counter') and remove the '#'
    const hash = window.location.hash.slice(1).toLowerCase();
    
    // Find a matching project ID
    const projectMatch = PROJECTS.find(p => p.id === hash);

    if (projectMatch) {
        return projectMatch.id;
    }
    
    // Default to 'home' if the hash is empty or invalid
    return 'home';
};

/**
 * Navigates the application by updating the URL hash.
 * @param routeId The ID of the PageRoute to navigate to.
 */
export const navigateTo = (routeId: PageRoute): void => {
    // Set the hash without triggering a full page reload
    if (routeId === 'home') {
        window.location.hash = ''; // Clear hash for the home page
    } else {
        window.location.hash = routeId;
    }
};
