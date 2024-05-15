# howto.zemn.xyz

This is my personal knowledge base: Quick tips and tricks to
remember how to do things I repeat, so I can skip the search next
time.

## Stack

This project is built with the following technologies:

- [Astro](https://astro.build/) - static site generation
- [React](https://reactjs.org/) - component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - hosting

## Project Structure

```
root
├── public               # static assets
│   └── posts            # images of posts
└── src
    ├── components      # astro and react components
    ├── layouts          # page layouts
    ├── pages            # page files
    │   ├── categories  # category pages
    │   └── posts        # markdown files
    └── styles           # global stylesheets
```

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/andrewzn69/howto.zemn.xyz
cd howto.zemn.xyz
bun install
bun run dev
```

This will start the development server. Open [http://localhost:4321](http://localhost:4321) to view it in the browser.
