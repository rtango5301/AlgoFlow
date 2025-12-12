export type Complexity = {
  best: string;
  average: string;
  worst: string;
  space: string;
};

export type CodeSample = {
  language: string;
  snippet: string;
};

export type StepState = {
  array?: number[];
  highlight?: number[];
  pointers?: Record<string, number>;
  stack?: string[];
  queue?: string[];
  list?: string[];
  note?: string;
  lowHighMid?: {
    low: number;
    high: number;
    mid?: number;
  };
};

export type Step = {
  title?: string;
  description?: string;
  state: StepState;
  pseudocodeLine?: number;
};

export type Algorithm = {
  id: string;
  slug: string;
  name: string;
  category: "Sorting" | "Searching" | "Data Structure";
  difficulty: "Beginner" | "Intermediate";
  shortDescription: string;
  tags: string[];
  complexities: Complexity;
  pseudocode: string[];
  code: CodeSample[];
  steps: Step[];
  defaultInput?: number[];
  presetInputs?: number[][];
};

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    slug: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    difficulty: "Beginner",
    shortDescription: "Step through pairs, swap when out of order; largest element bubbles to the end each pass.",
    tags: ["array", "stable", "simple"],
    complexities: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    pseudocode: [
      "for i from 0 to n - 1",
      "  for j from 0 to n - i - 2",
      "    if a[j] > a[j + 1]",
      "      swap a[j], a[j + 1]",
      "return a",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `function bubbleSort(a: number[]): number[] {
  const arr = [...a];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      },
    ],
    steps: [
      {
        title: "Start",
        description: "Initial array before any passes.",
        state: { array: [5, 2, 4, 1], highlight: [], pointers: { i: 0, j: 0 } },
        pseudocodeLine: 1,
      },
      {
        title: "Compare first pair",
        description: "Compare indices 0 and 1.",
        state: { array: [5, 2, 4, 1], highlight: [0, 1], pointers: { i: 0, j: 0 }, note: "compare" },
        pseudocodeLine: 3,
      },
      {
        title: "Swap happens",
        description: "2 moves before 5.",
        state: { array: [2, 5, 4, 1], highlight: [0, 1], pointers: { i: 0, j: 0 }, note: "swap" },
        pseudocodeLine: 4,
      },
      {
        title: "Next pair",
        description: "Compare indices 1 and 2.",
        state: { array: [2, 5, 4, 1], highlight: [1, 2], pointers: { i: 0, j: 1 }, note: "compare" },
        pseudocodeLine: 3,
      },
      {
        title: "Swap again",
        description: "5 > 4 so swap.",
        state: { array: [2, 4, 5, 1], highlight: [1, 2], pointers: { i: 0, j: 1 }, note: "swap" },
        pseudocodeLine: 4,
      },
      {
        title: "Bubble completes",
        description: "Largest element settles at the end of the pass.",
        state: { array: [2, 4, 1, 5], highlight: [2, 3], pointers: { i: 0, j: 2 }, note: "compare" },
        pseudocodeLine: 3,
      },
      {
        title: "Next pass",
        description: "Continue passes until fully sorted.",
        state: { array: [1, 2, 4, 5], highlight: [0, 1, 2, 3], pointers: { i: 1, j: 0 } },
        pseudocodeLine: 1,
      },
    ],
    defaultInput: [5, 2, 4, 1],
    presetInputs: [
      [5, 2, 4, 1],
      [3, 1, 2, 8, 5],
    ],
  },
  {
    id: "selection-sort",
    slug: "selection-sort",
    name: "Selection Sort",
    category: "Sorting",
    difficulty: "Beginner",
    shortDescription: "Find the minimum each pass and place it at the front.",
    tags: ["array", "in-place"],
    complexities: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    pseudocode: [
      "for i from 0 to n - 1",
      "  min = i",
      "  for j from i + 1 to n - 1",
      "    if a[j] < a[min] then min = j",
      "  swap a[i], a[min]",
      "return a",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `function selectionSort(a: number[]): number[] {
  const arr = [...a];
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}`,
      },
    ],
    steps: [
      {
        title: "Start",
        description: "Assume first element is min.",
        state: { array: [5, 2, 4, 1], highlight: [0], pointers: { i: 0, min: 0 } },
        pseudocodeLine: 1,
      },
      {
        title: "Scan for min",
        description: "Compare j against current min.",
        state: { array: [5, 2, 4, 1], highlight: [0, 1], pointers: { i: 0, j: 1, min: 1 }, note: "compare" },
        pseudocodeLine: 4,
      },
      {
        title: "Found new min",
        description: "1 is the smallest in the unsorted region.",
        state: { array: [5, 2, 4, 1], highlight: [0, 3], pointers: { i: 0, j: 3, min: 3 }, note: "compare" },
        pseudocodeLine: 4,
      },
      {
        title: "Swap into place",
        description: "Place min at position i.",
        state: { array: [1, 2, 4, 5], highlight: [0, 3], pointers: { i: 0, min: 3 }, note: "swap" },
        pseudocodeLine: 5,
      },
    ],
    defaultInput: [5, 2, 4, 1],
    presetInputs: [
      [5, 2, 4, 1],
      [7, 3, 9, 1],
    ],
  },
  {
    id: "merge-sort",
    slug: "merge-sort",
    name: "Merge Sort",
    category: "Sorting",
    difficulty: "Intermediate",
    shortDescription: "Divide the array and merge sorted halves.",
    tags: ["divide-and-conquer", "stable"],
    complexities: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
    },
    pseudocode: [
      "mergeSort(a):",
      "  if n <= 1 return a",
      "  mid = n/2",
      "  left = mergeSort(a[0..mid])",
      "  right = mergeSort(a[mid..n])",
      "  return merge(left, right)",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `function mergeSort(a: number[]): number[] {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const res: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return res.concat(left.slice(i)).concat(right.slice(j));
}`,
      },
    ],
    steps: [
      {
        title: "Split array",
        description: "Divide into left/right halves.",
        state: { array: [5, 1, 4, 2], highlight: [0, 1, 2, 3], note: "split" },
        pseudocodeLine: 3,
      },
      {
        title: "Sort left",
        description: "Recursively sort [5,1].",
        state: { array: [5, 1], highlight: [0, 1], note: "recurse left" },
        pseudocodeLine: 4,
      },
      {
        title: "Sort right",
        description: "Recursively sort [4,2].",
        state: { array: [4, 2], highlight: [0, 1], note: "recurse right" },
        pseudocodeLine: 5,
      },
      {
        title: "Merge halves",
        description: "Merge left and right in order.",
        state: { array: [1, 2, 4, 5], highlight: [0, 1, 2, 3], note: "merge" },
        pseudocodeLine: 6,
      },
    ],
    defaultInput: [5, 1, 4, 2],
    presetInputs: [
      [5, 1, 4, 2],
      [8, 3, 7, 2, 6, 1],
    ],
  },
  {
    id: "insertion-sort",
    slug: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    difficulty: "Beginner",
    shortDescription: "Builds the sorted array one element at a time by insertion.",
    tags: ["array", "adaptive", "stable"],
    complexities: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    pseudocode: [
      "for i from 1 to n - 1",
      "  key = a[i]",
      "  j = i - 1",
      "  while j >= 0 and a[j] > key",
      "    a[j + 1] = a[j]",
      "    j = j - 1",
      "  a[j + 1] = key",
      "return a",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `function insertionSort(a: number[]): number[] {
  const arr = [...a];
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      },
    ],
    steps: [
      {
        title: "Start",
        description: "First element is considered sorted.",
        state: { array: [4, 1, 3, 2], highlight: [0], pointers: { i: 1 } },
        pseudocodeLine: 1,
      },
      {
        title: "Pick key",
        description: "Key = 1, compare with sorted part.",
        state: { array: [4, 1, 3, 2], highlight: [0, 1], pointers: { i: 1, j: 0 } },
        pseudocodeLine: 4,
      },
      {
        title: "Shift larger elements",
        description: "4 shifts right to make room.",
        state: { array: [4, 4, 3, 2], highlight: [0, 1], pointers: { i: 1, j: -1 } },
        pseudocodeLine: 5,
      },
      {
        title: "Insert key",
        description: "Place 1 at index 0.",
        state: { array: [1, 4, 3, 2], highlight: [0], pointers: { i: 1 } },
        pseudocodeLine: 7,
      },
      {
        title: "Next iteration",
        description: "Key = 3, insert into correct spot.",
        state: { array: [1, 4, 3, 2], highlight: [1, 2], pointers: { i: 2, j: 1 } },
        pseudocodeLine: 4,
      },
    ],
    defaultInput: [4, 1, 3, 2],
  },
  {
    id: "linear-search",
    slug: "linear-search",
    name: "Linear Search",
    category: "Searching",
    difficulty: "Beginner",
    shortDescription: "Scan each element until you find the target.",
    tags: ["array", "sequential"],
    complexities: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    pseudocode: [
      "for i from 0 to n - 1",
      "  if a[i] == target",
      "    return i",
      "return -1",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `function linearSearch(a: number[], target: number): number {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === target) return i;
  }
  return -1;
}`,
      },
    ],
    steps: [
      {
        title: "Start",
        description: "Target is 7.",
        state: { array: [3, 5, 7, 9, 11], highlight: [0], pointers: { i: 0 }, note: "Compare index 0" },
        pseudocodeLine: 1,
      },
      {
        title: "Advance",
        description: "Move to index 1.",
        state: { array: [3, 5, 7, 9, 11], highlight: [1], pointers: { i: 1 }, note: "Compare index 1" },
        pseudocodeLine: 1,
      },
      {
        title: "Found target",
        description: "7 matches target, return index.",
        state: { array: [3, 5, 7, 9, 11], highlight: [2], pointers: { i: 2 }, note: "Match!" },
        pseudocodeLine: 2,
      },
    ],
    defaultInput: [3, 5, 7, 9, 11],
    presetInputs: [
      [3, 5, 7, 9, 11],
      [1, 4, 6, 8, 10],
    ],
  },
  {
    id: "binary-search",
    slug: "binary-search",
    name: "Binary Search",
    category: "Searching",
    difficulty: "Intermediate",
    shortDescription: "Split the search space in half each step on a sorted array.",
    tags: ["array", "divide-and-conquer", "sorted"],
    complexities: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },
    pseudocode: [
      "low = 0, high = n - 1",
      "while low <= high",
      "  mid = floor((low + high) / 2)",
      "  if a[mid] == target return mid",
      "  else if a[mid] < target low = mid + 1",
      "  else high = mid - 1",
      "return -1",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `function binarySearch(a: number[], target: number): number {
  let low = 0;
  let high = a.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      },
    ],
    steps: [
      {
        title: "Initialize bounds",
        description: "Search for 9 in a sorted array.",
        state: {
          array: [1, 3, 5, 7, 9, 11, 13],
          highlight: [0, 6],
          lowHighMid: { low: 0, high: 6, mid: 3 },
        },
        pseudocodeLine: 1,
      },
      {
        title: "Check mid",
        description: "Value at mid (index 3) is 7, lower than target.",
        state: {
          array: [1, 3, 5, 7, 9, 11, 13],
          highlight: [3],
          lowHighMid: { low: 4, high: 6, mid: 5 },
        },
        pseudocodeLine: 5,
      },
      {
        title: "Shrink range",
        description: "New mid is index 5, value 11, greater than target.",
        state: {
          array: [1, 3, 5, 7, 9, 11, 13],
          highlight: [5],
          lowHighMid: { low: 4, high: 4, mid: 4 },
        },
        pseudocodeLine: 6,
      },
      {
        title: "Found target",
        description: "Index 4 holds the target 9.",
        state: {
          array: [1, 3, 5, 7, 9, 11, 13],
          highlight: [4],
          lowHighMid: { low: 4, high: 4, mid: 4 },
        },
        pseudocodeLine: 4,
      },
    ],
    defaultInput: [1, 3, 5, 7, 9, 11, 13],
  },
  {
    id: "stack-operations",
    slug: "stack-operations",
    name: "Stack Push/Pop",
    category: "Data Structure",
    difficulty: "Beginner",
    shortDescription: "LIFO structure visualized with push and pop operations.",
    tags: ["LIFO", "array-backed"],
    complexities: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(n)",
    },
    pseudocode: [
      "push(x):",
      "  top = top + 1",
      "  stack[top] = x",
      "pop():",
      "  if empty return error",
      "  value = stack[top]",
      "  top = top - 1",
      "  return value",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `class Stack<T> {
  private items: T[] = [];
  push(x: T) {
    this.items.push(x);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}`,
      },
    ],
    steps: [
      {
        title: "Start empty",
        description: "Stack is empty.",
        state: { stack: [], note: "top = -1" },
        pseudocodeLine: 1,
      },
      {
        title: "Push A",
        description: "Add A to the stack.",
        state: { stack: ["A"], note: "push(A)" },
        pseudocodeLine: 2,
      },
      {
        title: "Push B",
        description: "Add B above A.",
        state: { stack: ["A", "B"], note: "push(B)" },
        pseudocodeLine: 2,
      },
      {
        title: "Pop returns B",
        description: "Top element B is removed.",
        state: { stack: ["A"], note: "pop() -> B" },
        pseudocodeLine: 4,
      },
    ],
  },
  {
    id: "queue-operations",
    slug: "queue-operations",
    name: "Queue Enqueue/Dequeue",
    category: "Data Structure",
    difficulty: "Beginner",
    shortDescription: "FIFO structure visualized with enqueue and dequeue.",
    tags: ["FIFO", "array-backed"],
    complexities: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(n)",
    },
    pseudocode: [
      "enqueue(x):",
      "  tail = tail + 1",
      "  queue[tail] = x",
      "dequeue():",
      "  if empty return error",
      "  value = queue[head]",
      "  head = head + 1",
      "  return value",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `class Queue<T> {
  private items: T[] = [];
  enqueue(x: T) {
    this.items.push(x);
  }
  dequeue(): T | undefined {
    return this.items.shift();
  }
}`,
      },
    ],
    steps: [
      {
        title: "Start empty",
        description: "Queue is empty.",
        state: { queue: [], note: "head=tail=0" },
        pseudocodeLine: 1,
      },
      {
        title: "Enqueue A",
        description: "Add A to the tail.",
        state: { queue: ["A"], note: "enqueue(A)" },
        pseudocodeLine: 2,
      },
      {
        title: "Enqueue B",
        description: "Add B after A.",
        state: { queue: ["A", "B"], note: "enqueue(B)" },
        pseudocodeLine: 2,
      },
      {
        title: "Dequeue returns A",
        description: "Remove from head (FIFO).",
        state: { queue: ["B"], note: "dequeue() -> A" },
        pseudocodeLine: 4,
      },
    ],
  },
  {
    id: "linked-list-traversal",
    slug: "linked-list-traversal",
    name: "Linked List Traversal",
    category: "Data Structure",
    difficulty: "Beginner",
    shortDescription: "Visit each node following next pointers.",
    tags: ["nodes", "pointers"],
    complexities: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    pseudocode: [
      "current = head",
      "while current != null",
      "  visit(current)",
      "  current = current.next",
    ],
    code: [
      {
        language: "TypeScript",
        snippet: `type Node<T> = { value: T; next: Node<T> | null };

function traverse<T>(head: Node<T> | null, visit: (v: T) => void) {
  let current = head;
  while (current) {
    visit(current.value);
    current = current.next;
  }
}`,
      },
    ],
    steps: [
      {
        title: "Start at head",
        description: "Current points to A.",
        state: { list: ["A", "B", "C"], highlight: [0], note: "current = head" },
        pseudocodeLine: 1,
      },
      {
        title: "Visit B",
        description: "Move current to B.",
        state: { list: ["A", "B", "C"], highlight: [1], note: "current = current.next" },
        pseudocodeLine: 4,
      },
      {
        title: "Visit C",
        description: "Move current to C, then null.",
        state: { list: ["A", "B", "C"], highlight: [2], note: "current = current.next" },
        pseudocodeLine: 4,
      },
    ],
  },
];

export const algorithmsBySlug = Object.fromEntries(
  algorithms.map((algo) => [algo.slug, algo]),
);

export function getAlgorithm(slug: string): Algorithm | undefined {
  return algorithmsBySlug[slug];
}
