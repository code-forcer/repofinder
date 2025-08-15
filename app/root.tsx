import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

// ---------- Meta Tags ----------
export const meta: Route.MetaFunction = () => [
  { title: "RepoFinder – Find the perfect GitHub repo fast" },
  {
    name: "description",
    content:
      "RepoFinder helps you instantly search, explore, and discover GitHub repositories by name, keyword, or topic.",
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://repofinder-phi.vercel.app/" },
  { property: "og:title", content: "RepoFinder – Find the perfect GitHub repo fast" },
  {
    property: "og:description",
    content:
      "Instantly search and explore GitHub repositories. Filter by name, topic, or stars to find your next project.",
  },
  { property: "og:image", content: "https://repofinder-phi.vercel.app//og-image.png" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:url", content: "https://https://repofinder-phi.vercel.app/" },
  { name: "twitter:title", content: "RepoFinder – Find the perfect GitHub repo fast" },
  {
    name: "twitter:description",
    content:
      "Instantly search and explore GitHub repositories. Filter by name, topic, or stars to find your next project.",
  },
  { name: "twitter:image", content: "https://repofinder-phi.vercel.app//og-image.png" },
];

// ---------- Fonts & Styles ----------
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
