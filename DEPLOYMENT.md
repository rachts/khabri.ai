# khabri.ai Deployment Guide

This document provides step-by-step instructions for deploying khabri.ai to [Vercel](https://vercel.com/) (recommended) or any other platform supporting Next.js 16.

## 🚀 One-Click Deployment (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fkhabri-ai&env=SERPER_API_KEY)

## 🛠 Manual Vercel Deployment

1.  **Prepare the Project**
    Ensure all changes are pushed to your GitHub repository.

2.  **Add Your Project to Vercel**
    *   Log in to the [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** → **Project**.
    *   Import your `khabri-ai` repository.

3.  **Configure Environment Variables**
    Under the **Environment Variables** section during project configuration, add the following key-pair:
    *   **Key**: `SERPER_API_KEY`
    *   **Value**: *[Your Serper.dev API Key]*

4.  **Build and Deploy**
    Click **Deploy**. Vercel will automatically detect the Next.js project, install dependencies, and build the application.

## 🛠 Self-Hosting (Production)

If you are not using Vercel, you can build and run the production server manually:

1.  **Build the Project**
    ```bash
    npm run build
    ```

2.  **Start the Production Server**
    ```bash
    SERPER_API_KEY=your_key_here npm start
    ```

## ⚠️ Important Considerations

### 1. Environment Variable Management
Never commit your `SERPER_API_KEY` to public repositories. Ensure it is only accessible via Vercel's secret management or local `.env.local` files (which are ignored by `git`).

### 2. Hydration Mismatch Solutions
The project uses `next-themes` and `framer-motion`, which can cause SSR/CSR hydration mismatches. This has been pre-configured using `suppressHydrationWarning` and `mounted` state guards. If you encounter flicker, verify that `ThemeProvider` is correctly wrapping `layout.tsx`.

### 3. Rate Limits
The free tier of Serper.dev provides 2,500 requests. For production scale, consider monitoring your usage in the Serper dashboard.
