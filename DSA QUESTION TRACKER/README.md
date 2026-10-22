# 🚀 DSA Question Tracker

A modern, responsive, frontend-only **Data Structures & Algorithms (DSA) Question Tracker** built with vanilla HTML, CSS, and JavaScript. Designed to help you track your problem-solving progress across major algorithmic patterns and topics (Dynamic Programming, Graphs, Trees, Arrays, and more) with real-time percentage progress and difficulty analytics.

---

## ✨ Features

- **Topic-Wise Problem Categorization**:
  - Arrays & Hashing
  - Two Pointers & Sliding Window
  - Stack & Queue
  - Linked List
  - Binary Search
  - Trees & BST
  - Graphs (BFS, DFS, Dijkstra, Topo Sort)
  - Dynamic Programming (1D, 2D, Knapsack, LIS, LCS)
  - Heap & Greedy
  - Backtracking & Recursion
- **Direct Problem Links**: Every problem links directly to its official LeetCode page.
- **Real-Time Progress Tracking & Analytics**:
  - Live **% Solved** circular dashboard ring.
  - Difficulty-wise solved metrics & progress bars (Easy, Medium, Hard).
  - Per-topic progress badges with percentage and count.
- **Local Persistence**:
  - All marked questions, bookmarks, and notes are automatically saved to your browser's `localStorage`.
- **Search & Advanced Filtering**:
  - Real-time search by question name, hint, or topic.
  - Filter by difficulty (*All*, *Easy*, *Medium*, *Hard*).
  - Filter by status (*All*, *Solved*, *Unsolved*, *Bookmarked*).
  - Quick topic navigation pill tabs.
- **Interactive Tools**:
  - 🎲 **Pick Random**: Picks an unsolved problem at random to challenge yourself.
  - 📝 **Personal Notes**: Store your key intuition, edge cases, and time/space complexities per problem.
  - ➕ **Add Custom Problem**: Easily add any new problem with LeetCode URL, topic, and difficulty.
  - 🌓 **Dark & Light Theme Toggle**: Seamless switch between sleek dark mode and clean light mode, remembered across sessions.
  - 💾 **Export / Backup**: Download your progress as a JSON backup.
  - 🎉 **Celebration Effects**: Built-in canvas celebration animations when you solve problems!

---

## 📁 How to Add to Your `WebDev_MiniProjects` Repo

If your repository is cloned locally:
1. Copy the folder `DSA QUESTION TRACKER` into your `WebDev_MiniProjects` directory:
   ```bash
   # Example:
   cp -r "DSA QUESTION TRACKER" /path/to/WebDev_MiniProjects/
   ```
2. Commit and push:
   ```bash
   git add "DSA QUESTION TRACKER"
   git commit -m "Add DSA Question Tracker project"
   git push origin main
   ```

---

## 🌐 Deploying to Frontend Hosting

Since this is a 100% frontend static project (HTML, CSS, JS), you can deploy it for free in seconds on:
- **GitHub Pages**: Go to your repository **Settings** -> **Pages** -> Select Branch `main` -> Save.
- **Vercel**: Import your repository or drag and drop this folder on [vercel.com](https://vercel.com).
- **Netlify**: Drag and drop the folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 🛠 Tech Stack
- **HTML5**: Semantic and accessible markup.
- **CSS3**: Modern glassmorphic dark design system with CSS custom properties.
- **JavaScript (ES6+)**: Zero external dependencies; uses native LocalStorage and Canvas.
