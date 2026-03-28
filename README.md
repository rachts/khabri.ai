# khabri.ai

**Verify the news before it verifies you.**

khabri.ai is a premium, AI-driven news verification platform designed to combat misinformation in real-time. Built with a data-first approach, it cross-references claims against trusted global and local news sources using the Serper Google Search API and provides an evidence-backed analysis.

## ✨ Features

- **Live News Feed**: Automatically surfaces the latest verified news from trusted Indian and global publishers via real-time search.
- **AI-Powered Fact-Checking**: Input any headline or social media forward to receive an instant verdict (TRUE, FALSE, MISLEADING, or NOT VERIFIED).
- **Evidence-Based Verdicts**: Every analysis is grounded in real news articles with links to original sources.
- **Multilingual Support**: Optimized for English and vernacular languages (Hindi, Bengali).
- **Premium UI**: High-fidelity dark/light mode interface with fluid animations and responsive layout.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Sourcing**: [Serper.dev](https://serper.dev/) (Google Search API)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Serper.dev](https://serper.dev/) API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/khabri-ai.git
   cd khabri-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   SERPER_API_KEY=your_serper_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 License

This project is licensed under the MIT License.
