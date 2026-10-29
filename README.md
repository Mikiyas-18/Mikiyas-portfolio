# Mikiyas Adawerk – Portfolio

React + Vite. All text, projects and links live in `src/data.js`.

    npm install
    npm run dev        # local preview
    npm run build      # production build in dist/

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project**, import the repo. Vercel detects Vite automatically (build `npm run build`, output `dist`).
3. Under **Environment Variables** add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (values in `.env.example`), then Deploy.
4. In your EmailJS dashboard, allow your new `*.vercel.app` domain for the contact form.

## Before you share it
- Add GitHub and LinkedIn URLs in `socials`, your CV in `public/` and its path in `cvUrl`.
- Add screenshots in `public/projects/` and set `image` on each project.
- Add education or work to `journey` to show that section.
