# Project Report: k.ai (Khabri.ai)
### Modern AI-Driven News Verification Platform

---

## 1. Executive Summary
**k.ai** (formerly Khabri.ai) is a high-fidelity, production-ready AI platform designed to combat the global "infodemic." By merging real-time Google Search data with a proprietary evidence-signal classification engine, k.ai provides instantaneous, data-backed verdicts on news headlines and social media forwards. The platform is built with a "data-first" philosophy, ensuring that AI decisions are always grounded in verified journalistic coverage.

---

## 2. Problem Statement
In the age of viral misinformation, existing fact-checking processes are often too slow or rely on static databases that become obsolete within hours. Users need a tool that can:
1. **Verify** news in real-time as stories break.
2. **Retrieve** evidence from a wide array of trusted sources.
3. **Analyze** contradictory reports automatically using AI.
4. **Present** results in a highly readable, premium interface.

---

## 3. Core Features
- **Real-Time Verification Engine**: Uses the Serper.dev API to query Google News indices for every user claim.
- **Evidence-Backed Verdicts**: Provides four distinct statuses: `TRUE`, `FALSE`, `MISLEADING`, and `NOT VERIFIED`.
- **Live News Stream**: Surfaced directly from verified Indian and global publishers to keep users informed before they even search.
- **Vernacular Intelligence**: Optimized to handle and extract claims from English and Hindi/Bengali headlines.
- **High-Fidelity UI/UX**: A state-of-the-art dark/light mode interface built with Framer Motion for a fluid, premium feel.

---

## 4. Technical Stack
### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (PostCSS 4+)
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & API
- **Architecture**: Serverless Next.js Functions
- **Search Engine**: Serper.dev (Google Search Cluster)
- **Infrastructure**: Vercel Edge Runtime

---

## 5. System Architecture & Data Flow
The platform follows a clean, "backend-less" serverless architecture to ensure maximum speed and cost-efficiency:

1. **User Input**: User submits a news claim via the `FactForm`.
2. **Real-Time Data Retrieval**: The system triggers a server-side request to the Serper API, targeting a cluster of trusted domains (e.g., BBC, NDTV, The Hindu).
3. **NLP Processing**:
    - **Keyword Extraction**: The AI strips stop-words and isolates the "core claim."
    - **Context Mapping**: Headlines are scored against the claim for relevance.
4. **Classification Logic**:
    - **Confirmation Search**: Looks for signals like "confirmed", "official", or "verified".
    - **Denial Search**: Looks for debunking signals like "fake", "rumor", or "misinformation".
    - **Conflict Detection**: Identifies if different sources are providing contradictory evidence.
5. **UI Rendering**: The `ResultCard` displays the verdict, extracted keywords, related articles, and a confidence score.

---

## 6. Branding & Design Principles
k.ai is branded as a premium "AI Research Lab" product.
- **Logo**: The "k.ai" brand uses a gradient-accentuated iconic shorthand.
- **Aesthetics**: Glassmorphism, blurred background glows, and high-contrast typography (Inter/Black weights).
- **User Experience**: Multi-step skeleton loaders during AI analysis to communicate deep processing to the user.

---

## 7. Future Roadmap
- **Social Media Integration**: Launching WhatsApp and Telegram bots for "forwarded" message verification.
- **On-Chain Verification**: Storing verified reports on a public ledger for immutable truth tracking.
- **Live Dashboard**: A "Misinformation Map" tracking viral fake news trends in real-time across India.

---

## 8. Founding Team
- **Rachit Kumar Tiwari**: Visionary Founder & Lead Developer
- **Subhadip Karmakar**: Visionary Founder & Technical Architect

---
**© 2026 KHABRI.AI LABS**  
*Verify Before You Trust.*
