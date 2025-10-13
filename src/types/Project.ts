import type { PageRoute } from './PageRoute';

// project structure definition
export interface Project {
  id: PageRoute;
  name: string;
  description: string;
  icon: React.ElementType; // Lucide icon component
  component: React.FC;
}