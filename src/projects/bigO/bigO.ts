/**
 * Interfaces for the Big O Complexity Cheatsheet data structure.
 * This ensures type safety when handling complexity data.
 */

// Interface for the Legend items
export interface LegendItem {
  rating: string;
  color: string;
  range: string[];
}

// Interface for Data Structure Operation rows
export interface DSOperation {
  type: string;
  access: string;
  search: string;
  insertion: string;
  deletion: string;
  worstTime: string;
  worstSpace: string;
  // Index signature required to allow generic component (ComplexityTable) to iterate over keys dynamically.
  [key: string]: string;
}

// Interface for Sorting Algorithm rows
export interface SortingAlgorithm {
  name: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  // Index signature required to allow generic component (ComplexityTable) to iterate over keys dynamically.
  [key: string]: string;
}

// Interface for the overall data structure
export interface BigOData {
  legend: LegendItem[];
  dsOperations: DSOperation[];
  sortingAlgorithms: SortingAlgorithm[];
}