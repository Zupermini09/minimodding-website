import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";

// Map markdown elements onto the site's typographic system so article bodies
// read identically to hand-built pages. Internal links route through next/link.
const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-12 text-3xl font-bold tracking-tight text-foreground first:mt-0 sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-lg font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-base leading-relaxed text-foreground/90">{children}</p>
  ),
  a: ({ href, children }) => {
    const url = href ?? "#";
    const isInternal = url.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={url}
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline-offset-4 hover:underline"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/90 marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-foreground/90 marker:text-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-[3px] border-line-strong pl-5 italic text-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded-md border-[1.5px] border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-2xl border-[1.5px] border-line bg-surface-2 p-5 font-mono text-sm leading-relaxed text-foreground [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="mt-6 w-full rounded-2xl border-[1.5px] border-line"
    />
  ),
};

export default function Markdown({ children }: { children: string }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
