// Comprehensive dataset of famous DSA problems categorized by topic
const initialTopicsData = [
  {
    id: "arrays-hashing",
    name: "Arrays & Hashing",
    icon: "grid",
    description: "Core array manipulations, frequency counters, and hash maps",
    problems: [
      {
        id: "arr-1",
        title: "Two Sum",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/two-sum/",
        platform: "LeetCode",
        hint: "Use a hash map to look up complements in O(1) time."
      },
      {
        id: "arr-2",
        title: "Contains Duplicate",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
        platform: "LeetCode",
        hint: "A hash set allows O(N) duplicate checking."
      },
      {
        id: "arr-3",
        title: "Valid Anagram",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
        platform: "LeetCode",
        hint: "Count character frequencies or compare sorted strings."
      },
      {
        id: "arr-4",
        title: "Group Anagrams",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
        platform: "LeetCode",
        hint: "Use character frequency or sorted string as hash key."
      },
      {
        id: "arr-5",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
        platform: "LeetCode",
        hint: "Bucket sort or min-heap gives O(N) or O(N log K)."
      },
      {
        id: "arr-6",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
        platform: "LeetCode",
        hint: "Calculate prefix and suffix products in two passes with O(1) extra space."
      },
      {
        id: "arr-7",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
        platform: "LeetCode",
        hint: "Check start of sequences using a set: if num-1 is not in set, expand forward."
      }
    ]
  },
  {
    id: "two-pointers",
    name: "Two Pointers & Sliding Window",
    icon: "split",
    description: "Techniques for linear scans, sub-arrays, and shrinking/expanding windows",
    problems: [
      {
        id: "tp-1",
        title: "Valid Palindrome",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
        platform: "LeetCode",
        hint: "Two pointers from ends meeting in the middle, skipping non-alphanumeric."
      },
      {
        id: "tp-2",
        title: "Two Sum II - Input Array Is Sorted",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        platform: "LeetCode",
        hint: "Use left and right pointers; adjust based on whether sum is too small or large."
      },
      {
        id: "tp-3",
        title: "3Sum",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/3sum/",
        platform: "LeetCode",
        hint: "Sort array, fix one element, and run Two Sum II on the remaining portion."
      },
      {
        id: "tp-4",
        title: "Container With Most Water",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
        platform: "LeetCode",
        hint: "Greedily move the pointer with the smaller height inwards."
      },
      {
        id: "tp-5",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        platform: "LeetCode",
        hint: "Track minimum price seen so far and maximize current price - min price."
      },
      {
        id: "tp-6",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        platform: "LeetCode",
        hint: "Sliding window with hash map storing the last seen index of characters."
      },
      {
        id: "tp-7",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
        platform: "LeetCode",
        hint: "Two pointers maintaining leftMax and rightMax, or monotonic stack."
      }
    ]
  },
  {
    id: "stack-queue",
    name: "Stack & Queue",
    icon: "layers",
    description: "LIFO and FIFO structures, monotonic stacks, and parentheses matching",
    problems: [
      {
        id: "sq-1",
        title: "Valid Parentheses",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
        platform: "LeetCode",
        hint: "Push opening brackets to stack; pop and match when closing bracket appears."
      },
      {
        id: "sq-2",
        title: "Min Stack",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/min-stack/",
        platform: "LeetCode",
        hint: "Store pairs (val, currentMin) or maintain a secondary min tracking stack."
      },
      {
        id: "sq-3",
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        platform: "LeetCode",
        hint: "Operands push to stack; when operator met, pop top two and push result."
      },
      {
        id: "sq-4",
        title: "Daily Temperatures",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
        platform: "LeetCode",
        hint: "Monotonic decreasing stack holding indices."
      },
      {
        id: "sq-5",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        platform: "LeetCode",
        hint: "Monotonic increasing stack of bar indices to find previous and next smaller bar."
      }
    ]
  },
  {
    id: "linked-list",
    name: "Linked List",
    icon: "link",
    description: "Pointers, slow & fast runner technique, reversals, and merges",
    problems: [
      {
        id: "ll-1",
        title: "Reverse Linked List",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
        platform: "LeetCode",
        hint: "Iteratively update prev, curr, next pointers in a single pass."
      },
      {
        id: "ll-2",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
        platform: "LeetCode",
        hint: "Use a dummy head node and iteratively attach the smaller node."
      },
      {
        id: "ll-3",
        title: "Reorder List",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
        platform: "LeetCode",
        hint: "Find middle with slow/fast pointers, reverse second half, merge alternatively."
      },
      {
        id: "ll-4",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        platform: "LeetCode",
        hint: "Advance fast pointer by N steps first, then move slow and fast together."
      },
      {
        id: "ll-5",
        title: "Linked List Cycle",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
        platform: "LeetCode",
        hint: "Floyd's cycle-finding algorithm: slow moves 1 step, fast moves 2 steps."
      },
      {
        id: "ll-6",
        title: "LRU Cache",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
        platform: "LeetCode",
        hint: "Doubly linked list combined with hash map for O(1) get and put operations."
      },
      {
        id: "ll-7",
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
        platform: "LeetCode",
        hint: "Use a min-heap or divide-and-conquer pairwise merge."
      }
    ]
  },
  {
    id: "binary-search",
    name: "Binary Search",
    icon: "search",
    description: "Logarithmic search on sorted arrays, search spaces, and monotonic functions",
    problems: [
      {
        id: "bs-1",
        title: "Binary Search",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/binary-search/",
        platform: "LeetCode",
        hint: "Standard low + (high - low) / 2 to avoid overflow."
      },
      {
        id: "bs-2",
        title: "Search a 2D Matrix",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
        platform: "LeetCode",
        hint: "Treat the 2D matrix as a flattened 1D sorted array: row = mid / cols, col = mid % cols."
      },
      {
        id: "bs-3",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
        platform: "LeetCode",
        hint: "Binary search on speed k from 1 to max(piles); test if total hours <= h."
      },
      {
        id: "bs-4",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        platform: "LeetCode",
        hint: "Compare mid with right: if nums[mid] > nums[right], min is on the right."
      },
      {
        id: "bs-5",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        platform: "LeetCode",
        hint: "Identify which half is sorted, then check if target lies within that range."
      },
      {
        id: "bs-6",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        platform: "LeetCode",
        hint: "Partition both arrays simultaneously such that left half equals right half in length."
      }
    ]
  },
  {
    id: "trees",
    name: "Trees & Binary Search Trees",
    icon: "tree",
    description: "DFS, BFS, traversals, BST properties, and recursion on hierarchical structures",
    problems: [
      {
        id: "tree-1",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
        platform: "LeetCode",
        hint: "Recursively swap left and right subtrees."
      },
      {
        id: "tree-2",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        platform: "LeetCode",
        hint: "1 + max(maxDepth(left), maxDepth(right))."
      },
      {
        id: "tree-3",
        title: "Same Tree",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/same-tree/",
        platform: "LeetCode",
        hint: "Check root values match and recursively check both left and right branches."
      },
      {
        id: "tree-4",
        title: "Subtree of Another Tree",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/",
        platform: "LeetCode",
        hint: "Check isSameTree at current node, or recursively search in left and right."
      },
      {
        id: "tree-5",
        title: "Lowest Common Ancestor of a BST",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
        platform: "LeetCode",
        hint: "If both p and q are greater than root, go right; if smaller, go left; else root is LCA."
      },
      {
        id: "tree-6",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        platform: "LeetCode",
        hint: "Queue-based BFS keeping track of queue length at each level."
      },
      {
        id: "tree-7",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
        platform: "LeetCode",
        hint: "DFS with lower and upper bounds (min, max) passed down recursively."
      },
      {
        id: "tree-8",
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        platform: "LeetCode",
        hint: "In-order traversal yields nodes in ascending order."
      },
      {
        id: "tree-9",
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        platform: "LeetCode",
        hint: "Post-order DFS computing max single branch contribution while updating global sum."
      }
    ]
  },
  {
    id: "graphs",
    name: "Graphs",
    icon: "share-2",
    description: "Breadth-first search, depth-first search, topological sort, Dijkstra, and union-find",
    problems: [
      {
        id: "gr-1",
        title: "Number of Islands",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
        platform: "LeetCode",
        hint: "Iterate grid; when '1' encountered, run DFS/BFS to sink the island and increment count."
      },
      {
        id: "gr-2",
        title: "Clone Graph",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
        platform: "LeetCode",
        hint: "DFS/BFS with a map of oldNode -> copyNode to handle cycles and cross edges."
      },
      {
        id: "gr-3",
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
        platform: "LeetCode",
        hint: "Reverse flow: DFS upwards from Pacific and Atlantic borders, then intersect."
      },
      {
        id: "gr-4",
        title: "Course Schedule",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
        platform: "LeetCode",
        hint: "Detect cycle in directed graph using Kahn's algorithm (in-degrees) or 3-color DFS."
      },
      {
        id: "gr-5",
        title: "Course Schedule II",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
        platform: "LeetCode",
        hint: "Topological sort returning the processed order of zero-in-degree nodes."
      },
      {
        id: "gr-6",
        title: "Rotting Oranges",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
        platform: "LeetCode",
        hint: "Multi-source BFS starting with all initial rotten oranges at time 0."
      },
      {
        id: "gr-7",
        title: "Network Delay Time",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
        platform: "LeetCode",
        hint: "Dijkstra's shortest path algorithm with priority queue."
      },
      {
        id: "gr-8",
        title: "Word Ladder",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
        platform: "LeetCode",
        hint: "Shortest transformation sequence via BFS; change one character at a time."
      }
    ]
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    icon: "cpu",
    description: "Overlapping subproblems, optimal substructure, 1D/2D memoization and tabulation",
    problems: [
      {
        id: "dp-1",
        title: "Climbing Stairs",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
        platform: "LeetCode",
        hint: "dp[i] = dp[i-1] + dp[i-2], equivalent to Fibonacci numbers."
      },
      {
        id: "dp-2",
        title: "House Robber",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/house-robber/",
        platform: "LeetCode",
        hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]); keep two variables for O(1) memory."
      },
      {
        id: "dp-3",
        title: "House Robber II",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
        platform: "LeetCode",
        hint: "Houses are circular: max of robbing nums[0..n-2] and nums[1..n-1]."
      },
      {
        id: "dp-4",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
        platform: "LeetCode",
        hint: "Expand around centers (odd and even lengths) or 2D DP."
      },
      {
        id: "dp-5",
        title: "Coin Change",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/coin-change/",
        platform: "LeetCode",
        hint: "dp[a] = min(dp[a], 1 + dp[a - coin]) for each coin."
      },
      {
        id: "dp-6",
        title: "Maximum Subarray (Kadane's)",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
        platform: "LeetCode",
        hint: "curSum = max(num, curSum + num); update maxOverall."
      },
      {
        id: "dp-7",
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
        platform: "LeetCode",
        hint: "O(N^2) DP or O(N log N) using patience sorting + binary search."
      },
      {
        id: "dp-8",
        title: "Partition Equal Subset Sum",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
        platform: "LeetCode",
        hint: "0/1 Knapsack: check if subset with sum = totalSum / 2 exists."
      },
      {
        id: "dp-9",
        title: "Unique Paths",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
        platform: "LeetCode",
        hint: "dp[r][c] = dp[r-1][c] + dp[r][c-1] with 1D space optimization."
      },
      {
        id: "dp-10",
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
        platform: "LeetCode",
        hint: "2D grid: if match, 1 + dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1])."
      },
      {
        id: "dp-11",
        title: "Edit Distance",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
        platform: "LeetCode",
        hint: "dp[i][j] considers insert, delete, or replace operations."
      }
    ]
  },
  {
    id: "heaps-greedy",
    name: "Heap & Greedy",
    icon: "award",
    description: "Priority queues, top/bottom elements, interval scheduling, and greedy choices",
    problems: [
      {
        id: "hg-1",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        platform: "LeetCode",
        hint: "Min-heap of size K or QuickSelect in average O(N) time."
      },
      {
        id: "hg-2",
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
        platform: "LeetCode",
        hint: "Two heaps: max-heap for lower half, min-heap for upper half."
      },
      {
        id: "hg-3",
        title: "Jump Game",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/jump-game/",
        platform: "LeetCode",
        hint: "Track furthest reachable index: maxReach = max(maxReach, i + nums[i])."
      },
      {
        id: "hg-4",
        title: "Jump Game II",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
        platform: "LeetCode",
        hint: "Greedy BFS: track current jump's end and farthest reachable index."
      },
      {
        id: "hg-5",
        title: "Gas Station",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/gas-station/",
        platform: "LeetCode",
        hint: "If total gas < total cost, return -1; else restart candidate whenever curGas drops below 0."
      },
      {
        id: "hg-6",
        title: "Non-overlapping Intervals",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
        platform: "LeetCode",
        hint: "Sort by end time; keep intervals with earlier finish times."
      }
    ]
  },
  {
    id: "backtracking",
    name: "Backtracking & Recursion",
    icon: "git-branch",
    description: "Decision trees, permutations, combinations, subsets, and constraint satisfaction",
    problems: [
      {
        id: "bt-1",
        title: "Subsets",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/subsets/",
        platform: "LeetCode",
        hint: "At each element, choose to include or exclude it in the subset branch."
      },
      {
        id: "bt-2",
        title: "Combination Sum",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
        platform: "LeetCode",
        hint: "Allow reuse of the same element; prune branch when target is exceeded."
      },
      {
        id: "bt-3",
        title: "Permutations",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/permutations/",
        platform: "LeetCode",
        hint: "Track visited elements or swap elements in-place."
      },
      {
        id: "bt-4",
        title: "Word Search",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/word-search/",
        platform: "LeetCode",
        hint: "DFS exploring 4 directions with temporary board character masking."
      },
      {
        id: "bt-5",
        title: "N-Queens",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/n-queens/",
        platform: "LeetCode",
        hint: "Place queens row by row, tracking columns and both diagonal sets."
      }
    ]
  }
];
