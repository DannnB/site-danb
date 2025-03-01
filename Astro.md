Added prod

# AstroPaper 📄



![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/satnaing/astro-paper?color=%232F3741&style=for-the-badge)

AstroPaper is a minimal, responsive and SEO-friendly Astro blog theme. This theme is designed and crafted based on [my personal blog](https://satnaing.dev/blog).

This theme is aimed to be accessible out of the box. Light and dark mode are supported by default and additional color schemes can also be configured.

This theme is self-documented \_ which means articles/posts in this theme can also be considered as documentations. So, see the documentation for more info.

## 🔥 Features

- [x] super fast performance
- [x] fully responsive and accessible
- [x] SEO-friendly
- [x] light & dark mode
- [x] fuzzy search
- [x] draft posts & pagination
- [x] sitemap & rss feed
- [x] highly customizable

## 🚀 Project Structure

Inside of AstroPaper, you'll see the following folders and files:

```
/
├── public/
│   ├── assets/
│   │   └── logo.svg
│   │   └── logo.png
│   └── favicon.svg
│   └── default-og.png
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── socialIcons.ts
│   ├── components/
│   ├── contents/
│   │   └── some-blog-posts.md
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── types.ts
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

All blog posts are stored in `src/contents/` directory.

## 📖 Documentation

Documentation can be read in two formats\_ _markdown_ & _blog post_.

- Configuration - [markdown](src/contents/how-to-configure-astropaper-theme.md) | [blog post](https://astro-paper.pages.dev/posts/how-to-configure-astropaper-theme/)
- Add Posts - [markdown](src/contents/adding-new-post.md) | [blog post](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/)
- Customize Color Schemes - [markdown](src/contents/customizing-astropaper-theme-color-schemes.md) | [blog post](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)
- Predefined Color Schemes - [markdown](src/contents/predefined-color-schemes.md) | [blog post](https://astro-paper.pages.dev/posts/predefined-color-schemes/)

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://reactjs.org/)  
**Styling** - [TailwindCSS](https://tailwindcss.com/)  
**UI/UX** - [Figma](https://figma.com)  
**Fuzzy Search** - [FuseJS](https://fusejs.io/)  
**Icons** - [Boxicons](https://boxicons.com/) | [Tablers](https://tabler-icons.io/)  
**Deployment** - [Cloudflare Pages](https://pages.cloudflare.com/)

## 👨🏻‍💻 Running Locally

Clone the project

```bash
git clone https://github.com/satnaing/astro-paper.git
```

Go to the project directory

```bash
cd astro-paper
```

Remove remote origin

```bash
git remote remove origin
```

Remove Google site verification

```bash
rm -rf public/googlebbcd930f1ecacd3a.html
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

## 🧞 Astro Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## 👀 Want to learn more?

If you want to know more about Astro check [thier documentation](https://docs.astro.build) or jump into their [Discord server](https://astro.build/chat).

## License

Licensed under the MIT License, Copyright © 2022
