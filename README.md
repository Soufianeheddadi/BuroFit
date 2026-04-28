# BuroFit

BuroFit is a modern fitness landing website with a built-in assessment funnel.
It is designed to convert visitors into leads through strong calls-to-action, motion-driven sections, and a guided multi-step intake experience.

The project is intentionally lightweight and framework-free:
- One shared stylesheet: `styles.css`
- One shared script file: `app.js`
- Two pages: `index.html` and `assessment.html`

## What This Project Includes

### 1) Marketing Home Page (`index.html`)
- Hero section with strong branding and conversion-focused CTA buttons
- Scroll-based progress indicator (thin bottom progress bar)
- Animated section reveals and hover interactions
- Feature/program/trainer/pricing sections for trust and clarity
- Sticky bottom CTA to keep conversion action visible
- Contact options including WhatsApp/email CTA flow

### 2) Assessment Funnel (`assessment.html`)
- Multi-step checkout-style wizard
- Connected stepper line with active/completed visual states
- Step validation before progression
- Previous/Next navigation flow
- Dynamic body preview panel that reacts to user input
- Final submission step for plan-ready intake data

### 3) Shared Frontend Architecture
- `styles.css` contains all styles for both pages
- `app.js` contains all JavaScript for both pages
- JavaScript logic is page-aware (runs only relevant features per page)

## Tech Stack

- HTML5
- CSS3 (custom properties, responsive layout, animations)
- Vanilla JavaScript (DOM APIs, observers, interaction logic)

No bundlers, frameworks, or build steps are required.

## Project Structure

```text
Fitness website/
├── index.html
├── assessment.html
├── styles.css
├── app.js
├── bb6ce567e84fc8362402c348c957b5f2.webp
└── README.md
```

## How To Run Locally

Because this is a static website, you can run it in two simple ways:

### Option A: Open directly
1. Open `index.html` in your browser.

### Option B: Use a local server (recommended)
If you have VS Code Live Server or any static server, serve the project root and open:
- `index.html` for the landing page
- `assessment.html` for the intake flow

## Main User Flow

1. User lands on `index.html`.
2. User interacts with content and CTA buttons.
3. CTA actions route to `assessment.html`.
4. User completes step-by-step intake.
5. Data is submitted through the form flow for follow-up.

## Design Direction

- Strong dark UI with red-accent brand energy
- Bold headline style paired with clean body typography
- Motion and hover states used to improve engagement without overwhelming usability
- Mobile responsiveness for key sections and form flow

## Customization Guide

### Branding
- Update logo text and brand labels directly in `index.html` and `assessment.html`.

### Colors and style
- Update CSS variables and relevant blocks in `styles.css` to re-theme quickly.

### Interactions and animation
- Modify animation timing, reveal thresholds, and interaction behavior in `app.js`.

### Form fields and funnel logic
- Add/remove steps or fields in `assessment.html`.
- Keep step handling and validation logic in sync in `app.js`.

## Accessibility and UX Notes

- Keep button labels clear and action-oriented.
- Ensure sufficient color contrast after any palette changes.
- Preserve keyboard-friendly focus behavior when editing interactive elements.
- Keep stepper labels concise for small-screen readability.

## Deployment

This project is static and can be deployed on:
- GitHub Pages
- Netlify
- Vercel (static output)
- Any Nginx/Apache static hosting

Deploy by publishing the repository root as a static site.

## Maintenance Tips

- Keep `styles.css` and `app.js` as the single source of truth.
- Avoid reintroducing duplicate page-specific CSS/JS files.
- Test both desktop and mobile after UI changes.
- Verify CTA links still route correctly to the assessment page.

---

Built for a premium, conversion-focused fitness web experience under the **buroFit** brand.