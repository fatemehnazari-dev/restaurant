# Banafsh Restaurant Website

A responsive, Persian right-to-left restaurant website built with semantic HTML, modern CSS, and beginner-friendly JavaScript. The project presents a restaurant brand, featured food, customer reviews, contact details, a reservation request form, and a separate drinks menu with a browser-based cart.

**Live demo:** [fatemehnazari-dev.github.io/restaurant](https://fatemehnazari-dev.github.io/restaurant/)

## Project Highlights

- **Two connected pages:** a restaurant home page and a dedicated drinks menu, with working navigation between them.
- **Restaurant-focused content:** featured menu categories, guest reviews, an about section, contact information, and reservation details.
- **Clear food and drink presentation:** image-led menu and product layouts, prices in toman, cart-based drink ordering, and direct contact links.
- **Interactive drinks cart:** add products, adjust quantities, remove items, and see the total; the cart is saved in the visitor's browser with `localStorage`.
- **Responsive layouts:** CSS Grid and Flexbox adapt the content for desktop, tablet, and mobile screens.
- **Consistent visual identity:** a deep-purple foundation with yellow and orange accents, reusable CSS custom properties, and the local Vazirmatn font.
- **Persian and RTL support:** pages declare the `fa-IR` language and right-to-left reading direction.
- **Accessibility basics:** semantic landmarks, descriptive image text, labeled navigation and form fields, visible keyboard focus, and reduced-motion support.
- **Lightweight static delivery:** no JavaScript framework, build step, or third-party runtime dependency is required.

## Pages

| Page                                   | Description                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`index.html`](index.html)             | Home page, restaurant menu highlights, reviews, about section, contact information, and reservation request form. |
| [`pages/drink.html`](pages/drink.html) | Drinks catalogue with product imagery, prices, and click-to-call order links.                                     |

## How to Use the Website

1. Open the [home page](index.html) or visit the [live demo](https://fatemehnazari-dev.github.io/restaurant/).
2. Use the navigation or **View Menu** link to browse the page sections. Select the drinks menu to see all eight listed drinks.
3. Select **Add to cart** on a drink. Open the cart to adjust quantities, remove items, or clear the cart. Cart contents remain available in the same browser after reloading the page.
4. Select **Prepare order email** in the cart to open a prefilled order draft in the visitor's configured email application.
5. Go to **Reservation request**, enter the required details, and submit. The page checks the phone number and prevents selecting a past date, then offers a prefilled email draft addressed to the listed email.
6. Use the contact section to call or email the restaurant directly.

> **Demo behavior:** This is a static front-end project. The cart is stored only in the current browser and is not sent to a server. Orders and reservation requests are prepared as email drafts; they are not submitted, stored, or confirmed automatically. There is no online payment or order-management system. Email drafts depend on an email application being configured. Phone and email values in the HTML are sample contact details and should be replaced with the restaurant's verified details before real-world use.

## Run Locally

No installation or compilation is needed. Clone or download the repository and open `index.html` in a browser. For a local development server, open the project folder in VS Code and use an available static-server extension such as Live Server.

The website is also published with GitHub Pages at the live demo link above.

## Project Structure

```text
.
├── index.html                  # Restaurant home page
├── pages/
│   └── drink.html              # Drinks catalogue
├── scripts/
│   └── site.js                 # Cart, local storage, and reservation helpers
├── styles/
│   └── styles.css              # Shared styles, design tokens, and responsive rules
├── images/                     # Food, drink, brand, and decorative assets
├── fonts/                      # Local Vazirmatn font
└── README.md
```

## Implementation Techniques

- Semantic HTML elements such as `header`, `nav`, `main`, `section`, `article`, `figure`, and `footer` provide a clear document structure.
- CSS custom properties define the color palette and shared shadow, while reusable classes keep buttons, headings, and sections visually consistent.
- CSS Grid handles the menu, reviews, product catalogue, and form layout; Flexbox is used for navigation, actions, and compact alignment.
- Media queries progressively adapt the layouts for narrower screens. The stylesheet also includes `:focus-visible` states and a `prefers-reduced-motion` preference.
- Images use descriptive alternative text; below-the-fold drink images use native lazy loading.
- A small vanilla JavaScript file adds cart controls, persists cart data in `localStorage`, and prepares order and reservation email drafts.
- The home page includes a description and theme-color metadata, a favicon, and the locally hosted Vazirmatn typeface.

## Skills Demonstrated

- Building and structuring multi-page websites with HTML5.
- Creating responsive layouts with CSS Grid, Flexbox, and media queries.
- Applying RTL direction, Persian-language metadata, and a local Persian font.
- Establishing a consistent design system with CSS variables and reusable components.
- Improving accessibility through semantic structure, labels, alternative text, keyboard focus, and reduced-motion support.
- Creating working page navigation, telephone links, email links, and a browser-native reservation request flow.
- Using DOM events, form validation, `localStorage`, and `mailto` links for small client-side interactions.
- Organizing local assets and preparing a static website for GitHub Pages deployment.

## Updating the Project

- **Restaurant contact details:** update `hello@gmail.com` and `09121234567` in `index.html` and `pages/drink.html`. Keep the `mailto:` and `tel:` URL values in sync with their visible text.
- **Food and reviews:** edit the relevant sections in `index.html` and replace images in `images/` as needed.
- **Drink names and prices:** update the product articles in `pages/drink.html`.
- **Cart persistence:** the drinks cart uses the `banafsh-drinks-cart` browser storage key; clearing it in the cart removes the saved contents.
- **Brand colors, responsive behavior, and shared components:** edit the CSS custom properties and rules in `styles/styles.css`.
- **Brand imagery and typography:** replace the corresponding files in `images/` or `fonts/`, and update their paths in the HTML or CSS.

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=222222)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222222?style=flat&logo=github&logoColor=white)

## Screenshots

<img width="1328" height="637" alt="Banafsh restaurant website screenshot" src="https://github.com/user-attachments/assets/533ec493-1931-4aa5-bb00-07133447c0d2" />

<img width="1331" height="625" alt="Banafsh restaurant website screenshot" src="https://github.com/user-attachments/assets/9aa46034-5539-45c3-94e2-a561e88bb0a8" />

<img width="1341" height="640" alt="Banafsh restaurant website screenshot" src="https://github.com/user-attachments/assets/6460f171-3c48-4da6-8b32-fc7c2005bcf8" />

## License

No license is currently specified. Contact the repository owner before reusing the project or its assets.
