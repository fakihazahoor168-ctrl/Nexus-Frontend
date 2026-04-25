# Business Nexus 🚀

Business Nexus is a comprehensive, dual-sided platform designed to connect **Entrepreneurs** looking for funding with **Investors** looking for promising startups. This application offers a premium, intuitive, and feature-rich interface to facilitate seamless collaboration, communication, document management, and transaction simulation.

## 🌟 Key Features

### 👤 Role-Based Access & Dashboards
* **Dual Roles:** Register and explore the platform as either an *Entrepreneur* or an *Investor*.
* **Custom Dashboards:** Personalized UI focusing on startup metrics for entrepreneurs and portfolio overview for investors.

### 🔒 Security & Access Control
* **Multi-Step Authentication:** Provides an engaging login experience with mock Two-Factor Authentication (OTP).
* **Password Strength Meter:** Evaluates password complexity dynamically on sign-up.

### 🤝 Connectivity & Communication
* **Interactive Messaging:** Real-time chat mockups to connect with partners.
* **Virtual Meetings:** WebRTC-styled video calling interface (camera toggles, screen share, and disconnect controls).
* **Calendar Scheduling:** Integrated calendar module to request and track meeting slots.

### 📁 Document Chamber
* **File Management:** Upload, preview, and track documents.
* **E-Signature Simulation:** Digital contract signing flows for legal documentation with status tracking (Draft, Review, Signed).

### 💳 Payments & Deal Funding
* **Financial Wallet:** View simulated available funds.
* **Transaction Actions:** Mock flows for Depositing, Withdrawing, and Transferring funds.
* **Deal Funding:** Simulated transactions allowing investors to directly fund entrepreneur projects.
* **Transaction History:** Granular table tracking all payment and funding activity.

### 🗺 Guided Walkthrough
* **Interactive Tooltips:** Using `react-joyride`, first-time users receive a complete guided tour highlighting key platform features. 

## 🛠 Tech Stack

* **Frontend Framework:** React (with Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (with responsive best practices)
* **Routing:** React Router v6
* **Icons:** Lucide React
* **Walkthrough:** React Joyride
* **Date Handling:** Date-fns

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 16 or newer) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd business-nexus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:5173](http://localhost:5173) in your local browser to view the application.

## 📸 Demo Accounts 
To bypass registration and jump straight into testing, you can use the pre-configured mock buttons on the `Login Page` during runtime:
- **Entrepreneur Demo:** Pre-fills credentials for an entrepreneur startup account.
- **Investor Demo:** Pre-fills credentials for a venture capitalist portfolio account.


*Developed with modern UI/UX principles and glassmorphic aesthetic inspirations to provide a stunning user experience.*
