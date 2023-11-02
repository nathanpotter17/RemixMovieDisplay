import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}


function Layout({ children }: {children: React.ReactNode}) {
  return(
    <>
      <nav className="m-3 text-zinc-800 underline underline-offset-2">
        <Link to="/" prefetch="intent" className="text-2xl font-semibold">
          WhatTo<span className="font-semibold text-indigo-500">Watch.</span>
        </Link>
      </nav>
      <main>
        {children}
      </main>
    </>
  );
}