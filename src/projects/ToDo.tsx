import React from 'react';
import { CheckSquare} from 'lucide-react';

// TODO list placeholder component
export const TodoListProject: React.FC = () => (
    <div className="p-10 flex flex-col items-center justify-center h-full bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border border-fuchsia-500/30">
            <h3 className="text-3xl font-bold mb-4 text-fuchsia-400">To-Do List Project (Ready to Build!)</h3>
            <p className="text-gray-400">
                This project will be built to use Firebase Firestore for data persistence.
            </p>
            <CheckSquare className="w-16 h-16 text-fuchsia-600 mx-auto mt-6" />
        </div>
    </div>
);
