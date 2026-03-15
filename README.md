# 📝 Google Forms Clone

### _Create, Share, and Analyze Forms with Ease_

**Google Forms Clone** is a full-stack monorepo application that replicates the core experience of Google Forms. It allows users to build dynamic forms, manage various question types, and analyze responses in real-time with a focus on seamless data synchronization and a polished Material Design UI.

---

### 🚀 Tech Stack & Architecture

Built as a **Monorepo** to ensure tight integration between the frontend and backend:

| Category         | Tools & Technologies                                     |
| ---------------- | -------------------------------------------------------- |
| **Frontend**     | **React** ⚛️, **TypeScript** 🟦, **Vite** ⚡             |
| **Backend**      | **Node.js** 🟢, **GraphQL** 🕸️, **Apollo/Yoga**          |
| **State & API**  | **RTK Query** 🔄, **Redux Toolkit** 🛠️                   |
| **Styling & UI** | **CSS Modules** 🎨, **iziToast** 🍞, **Material Design** |

---

### ✨ Key Features & Technical Implementation

#### 🧠 Data Management & Synchronization

- **RTK Query Tags:** Advanced cache management using "Provides/Invalidates" tags. Creating or deleting a form automatically triggers a background re-fetch of the forms list without a page reload.
- **GraphQL Integration:** Type-safe API communication with automated code generation (`graphql-codegen`) for consistent data structures across the stack.
- **Real-time Updates:** Responses are synchronized using form-specific tags, ensuring you see new data as soon as it's submitted.

#### 🎭 User Interface & UX

- **Form Builder:** A drag-and-drop-style editor to add, update, or remove questions and options dynamically.
- **iziToast Notifications:** Elegant, non-intrusive feedback for successful form publication, validation errors, and deletion confirmations.
- **Interactive Validation:** Smart scrolling to the first error in long forms and visual indicators for required fields.
- **Responsive Design:** Fully adaptive layout that works perfectly on desktops, tablets, and mobile devices.

#### 🎨 Styling & Quality

- **CSS Modules:** Locally scoped styles to prevent conflicts and ensure maintainability.
- **TypeScript:** Strict typing across the entire monorepo to catch errors during development.

---

### 🛠 Getting Started

You can launch the entire ecosystem with a single command from the root directory.

1. **Clone the repository:**

```bash
git clone <your-repository-url>
cd google-forms-clone

```

2. **Install dependencies (Root):**

```bash
npm install

```

3. **Run the development server:**

```bash
npm run dev

```

_This will concurrently start:_

- **Backend:** `http://localhost:4000`
- **Frontend:** `http://localhost:5173`

---

### 🛠 Development Scripts

- `npm run dev` — Starts both Client and Server simultaneously.
- `npm run dev --prefix client` — Starts only the React frontend.
- `npm run dev --prefix server` — Starts only the GraphQL backend.

---

> This project was developed to demonstrate modern full-stack integration and state management. Feel free to ⭐ this repository if you find it helpful!

---
