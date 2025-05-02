# NextJS Portfolio Template

<div align="center">
  <img src="/public/docs/portfolio-light-mode.png" alt="Portfolio Template Light Mode" width="600">
  <p><em>Light Mode View</em></p>
  
  <img src="/public/docs/portfolio-dark-mode.png" alt="Portfolio Template Dark Mode" width="600">
  <p><em>Dark Mode View</em></p>
</div>

## Overview

A clean, modern, and fully customizable portfolio template for developers, designers, and creative professionals. Built with Next.js and TailwindCSS, this template features a data-driven approach that separates content from presentation, making it incredibly easy to personalize without touching the component code.

## Features

- **Data-Driven Architecture** - All content managed through a centralized JSON file
- **Responsive Design** - Optimized for all device sizes with mobile-first approach
- **Dark/Light Mode** - Automatic theme switching based on system preferences
- **Interactive UI** - Modern navigation with smooth transitions
- **Modern Section Components** - Pre-built sections for:
  - Hero/Introduction
  - About
  - Work Experience Timeline
  - Project Showcase
  - Skills Grid
  - Education History
  - Contact Information
- **Easy Customization** - Update content without touching component code
- **SEO Optimized** - Built-in metadata support for better search engine visibility

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Typography**: Geist font via `next/font`
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

To use this template for your own portfolio:

```bash
# Clone the repository
git clone https://github.com/kimsengduong/nextjs-portfolio-template.git my-portfolio

# Navigate to the project directory
cd my-portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

## Customization

### 1. Update Your Personal Information

The portfolio content is driven entirely by the JSON data file:

```
src/data/profile.json
```

Edit this file to include your:

- Name, title, and professional summary
- Work experience
- Projects
- Skills
- Education
- Contact information

### 2. Replace Images

Replace the following files in the public directory:

- `profile.jpg` - Your profile picture
- `favicon.ico` - Site favicon
- `Your_Name_CV.pdf` - Your resume/CV file

### 3. Customize Theme (Optional)

- Edit tailwind.config.js to change color schemes
- Modify component styling in individual component files if desired

## Project Structure

```
portfolio-template/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx            # Main page component
│   │   └── layout.tsx          # Root layout with metadata
│   ├── components/             # Reusable components
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ...
│   │   └── SkillsSection.tsx
│   ├── data/                   # Data files
│   │   ├── profile.json        # Main content configuration
│   │   └── template.json       # Documentation template
│   └── utils/                  # Utility functions
│       └── profileData.ts      # Data loading utilities
├── public/                     # Static files
├── tailwind.config.js          # TailwindCSS configuration
└── README.md                   # Project documentation
```

## Vercel Deployment

This portfolio is optimized for deployment on [Vercel](https://vercel.com/new):

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Your portfolio will be automatically deployed

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Docker Deployment

This template can also be run in a Docker container. To do this, follow these steps:

1. Build the Docker image:

```bash
  docker build -t my-portfolio .
```

2. Run the Docker container:

```bash
  docker run -p 3000:3000 my-portfolio
```

3. Open your browser and navigate to `http://localhost:3000` to view your portfolio.

## Docker Compose Deployment

This template can also be run using Docker Compose. To do this, follow these steps:

1. Build the Docker image and start the container:

```bash
  docker-compose up -d --build
```

2. Open your browser and navigate to `http://localhost:3000` to view your portfolio.
3. To stop the container, run:

```bash
  docker-compose down
```

## JSON Data Template

The template comes with a fully documented JSON template (`src/data/template.json`) that explains all available fields and how to structure your data.

Key sections include:

- Basics (name, title, summary)
- About (detailed paragraphs)
- Experience (work history)
- Projects (portfolio items)
- Skills (categorized by type)
- Education
- Contact information
- Navigation configuration

## Contributing

Contributions are welcome! If you'd like to improve this template:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Credits

- Originally designed by [Kimseng Duong](https://github.com/kimsengduong)
- Icons from [Heroicons](https://heroicons.com/)
- Font by [Geist](https://vercel.com/font)

---

Built with [Next.js](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/).

Similar code found with 1 license type
