import type { BigOData } from './bigO';

/**
 * Static data definition for the Big O Complexity Cheatsheet.
 * This data is strongly typed using the BigOData interface.
 */
export const TIME_COMPLEXITY_DATA: BigOData = {
  legend: [
    { rating: 'Excellent (O(1))', color: 'text-green-400', range: ['O(1)', 'O(n+k)'] },
    { rating: 'Good (O(log n))', color: 'text-lime-400', range: ['O(log n)', 'O(n log n)', 'O(n log^2 n)', 'O(n+k)'] },
    { rating: 'Fair (O(n log n))', color: 'text-yellow-400', range: ['O(n log n)', 'O(n k)'] },
    // Corrected non-standard Tailwind class text-red-440 to text-red-400
    { rating: 'Poor (O(n^2))', color: 'text-red-400', range: ['O(n^2)', 'O(2^n)', 'O(n!)'] },
  ],
  dsOperations: [
    { type: 'Array', access: 'O(1)', search: 'O(n)', insertion: 'O(n)', deletion: 'O(n)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Stack', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Queue', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Singly-Linked List', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Doubly-Linked List', access: 'O(n)', search: 'O(n)', insertion: 'O(1)', deletion: 'O(1)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Hash Table (Average)', access: 'O(1)', search: 'O(1)', insertion: 'O(1)', deletion: 'O(1)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Hash Table (Worst)', access: 'O(n)', search: 'O(n)', insertion: 'O(n)', deletion: 'O(n)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Binary Search Tree (Average)', access: 'O(log n)', search: 'O(log n)', insertion: 'O(log n)', deletion: 'O(log n)', worstTime: 'O(n)', worstSpace: 'O(n)' },
    { type: 'Self-Balancing Tree (AVL/RB)', access: 'O(log n)', search: 'O(log n)', insertion: 'O(log n)', deletion: 'O(log n)', worstTime: 'O(log n)', worstSpace: 'O(log n)' },
  ],
  sortingAlgorithms: [
    { name: 'Quicksort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)', space: 'O(log n)' },
    { name: 'Mergesort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    { name: 'Heapsort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
    { name: 'Timsort', best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    { name: 'Insertion Sort', best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)', space: 'O(1)' },
    { name: 'Selection Sort', best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)', space: 'O(1)' },
    { name: 'Bubble Sort', best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)', space: 'O(1)' },
    { name: 'Counting Sort', best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)', space: 'O(k)' },
    { name: 'Radix Sort', best: 'O(n k)', average: 'O(n k)', worst: 'O(n k)', space: 'O(n+k)' },
  ],
};