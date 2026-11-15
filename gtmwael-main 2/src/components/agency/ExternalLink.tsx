import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = { href: string; className?: string; style?: CSSProperties; children: ReactNode };

/** http(s) → new tab with noopener; "#anchor" → plain <a>; anything else → router Link. */
export function ExternalLink({ href, className, style, children }: Props) {
  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return <a href={href} className={className} style={style}>{children}</a>;
  }
  return <Link to={href} className={className} style={style}>{children}</Link>;
}
