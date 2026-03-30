import { forwardRef } from "react";
import "./Link.css";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** URL the link points to */
  href: string;
  /** Optional icon (or other node) after the text — e.g. `<Icon iconName="outbound" variant="sharpUnfilled" aria-hidden />` */
  icon?: React.ReactNode;
}

/** Default prop values */
export const LINK_DEFAULTS = {} as const;

export const LINK_PROP_CONTROLS = {} as const;

/** Props that must not reach the DOM */
const LINK_DOM_OMIT: readonly (keyof LinkProps)[] = ["icon"];

/**
 * Link component for individual links outside navigation contexts.
 * Composable: pass Typography (or other content) as children.
 * Use for CTAs, external links, or isolated action links within cards or layouts.
 *
 * @example
 * <Link
 *   href="#"
 *   icon={<Icon iconName="outbound" variant="sharpUnfilled" aria-hidden />}
 * >
 *   <Typography type="Body Medium" text="Link" inline />
 * </Link>
 *
 * - **Accessibility**: Uses semantic <a> with proper href. Add rel="noopener noreferrer" for external links.
 * - **States**: Hover increases underline thickness per design tokens.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      children,
      icon,
      className = "",
      target,
      rel,
      ...rest
    },
    ref
  ) => {
    const classNames = ["uxl-link", className].filter(Boolean).join(" ");

    const domProps = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !LINK_DOM_OMIT.includes(key as keyof LinkProps)
      )
    );

    const effectiveRel =
      rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

    return (
      <a
        ref={ref}
        href={href}
        className={classNames}
        target={target}
        rel={effectiveRel}
        {...domProps}
      >
        <span className="uxl-link__text">{children}</span>
        {icon ? (
          <span className="uxl-link__icon" aria-hidden>
            {icon}
          </span>
        ) : null}
      </a>
    );
  }
);

Link.displayName = "Link";
