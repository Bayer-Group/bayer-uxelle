import { forwardRef, type HTMLAttributes } from "react";
import { Typography } from "../Typography";
import { Button } from "../Button";
import { FacebookIcon } from "./SocialIcons/FacebookIcon";
import { InstagramIcon } from "./SocialIcons/InstagramIcon";
import { LinkedinIcon } from "./SocialIcons/LinkedinIcon";
import { TikTokIcon } from "./SocialIcons/TikTokIcon";
import { XIcon } from "./SocialIcons/XIcon";
import { YoutubeIcon } from "./SocialIcons/YoutubeIcon";
import "./Footer.css";

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Content for the top main section (e.g. columns, links, CTAs). */
  topMainContent?: React.ReactNode;
  /** Content for the top legal section (e.g. approval code, disclaimers). */
  topLegal?: React.ReactNode;
  /** Content for the bottom main section (e.g. logo, branding). */
  bottomMainContent?: React.ReactNode;
  /** Content for the bottom legal section (e.g. copyright, legal copy). */
  bottomLegal?: React.ReactNode;
  /** When true, shows the top legal slot. */
  showTopLegal?: boolean;
  /** When true, shows the bottom legal slot. */
  showBottomLegal?: boolean;
}

/** Default prop values */
export const FOOTER_DEFAULTS = {
  topMainContent: undefined,
  topLegal: undefined,
  bottomMainContent: undefined,
  bottomLegal: undefined,
  showTopLegal: true,
  showBottomLegal: true,
} as const;

/** Prop controls for Storybook and docs */
export const FOOTER_PROP_CONTROLS = {
  topMainContent: {
    type: "text" as const,
    control: false,
    description: "Content for the top main section (e.g. columns, links, CTAs).",
    defaultValue: undefined,
  },
  topLegal: {
    type: "text" as const,
    control: false,
    description: "Content for the top legal section (e.g. approval code, disclaimers).",
    defaultValue: undefined,
  },
  bottomMainContent: {
    type: "text" as const,
    control: false,
    description: "Content for the bottom main section (e.g. logo, branding).",
    defaultValue: undefined,
  },
  bottomLegal: {
    type: "text" as const,
    control: false,
    description: "Content for the bottom legal section (e.g. copyright, legal copy).",
    defaultValue: undefined,
  },
  showTopLegal: {
    type: "boolean" as const,
    description: "When true, shows the top legal slot.",
    defaultValue: true,
  },
  showBottomLegal: {
    type: "boolean" as const,
    description: "When true, shows the bottom legal slot.",
    defaultValue: true,
  },
} as const;

/** Default top main content: two columns + social icons. Exported for stories and examples. */
export function DefaultTopMainContent() {
  return (
    <div className="uxl-footer__top-main-default">
      <div className="uxl-footer__top-main-columns">
        <div className="uxl-footer__top-main-column">
          <Typography
            type="Body Medium"
            width
            text="This Typography component can be replaced by anything in this Content Slot. These are the voyages of the starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before"
          />
          <Button
            emphasis="medium"
            size="large"
            trailingIcon
            trailingIconName="chevron_right"
            trailingIconVariant="sharpUnfilled"
          >
            <Typography type="Button" width text="Button" />
          </Button>
          <a href="#">
            <Typography type="Body Medium" text="Link" />
          </a>
        </div>
        <div className="uxl-footer__top-main-column">
          <Typography
            type="Body Medium"
            width
            text="This Typography component can be replaced by anything in this Content Slot. These are the voyages of the starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before"
          />
          <Button
            emphasis="medium"
            size="large"
            trailingIcon
            trailingIconName="chevron_right"
            trailingIconVariant="sharpUnfilled"
          >
            <Typography type="Button" width text="Button" />
          </Button>
          <a href="#">
            <Typography type="Body Medium" text="Link" />
          </a>
        </div>
      </div>
      <div className="uxl-footer__social-icons" role="group" aria-label="Social media">
        <a href="#" aria-label="YouTube" className="uxl-footer__social-icon">
          <YoutubeIcon />
        </a>
        <a href="#" aria-label="X" className="uxl-footer__social-icon">
          <XIcon />
        </a>
        <a href="#" aria-label="LinkedIn" className="uxl-footer__social-icon">
          <LinkedinIcon />
        </a>
        <a href="#" aria-label="Facebook" className="uxl-footer__social-icon">
          <FacebookIcon />
        </a>
        <a href="#" aria-label="Instagram" className="uxl-footer__social-icon">
          <InstagramIcon />
        </a>
        <a href="#" aria-label="TikTok" className="uxl-footer__social-icon">
          <TikTokIcon />
        </a>
      </div>
    </div>
  );
}

/** Default top legal content. Exported for stories and examples. */
export function DefaultTopLegal() {
  return <Typography type="Condensed" width text="Approval Code" />;
}

/** Default bottom main content: logo and tagline. Exported for stories and examples. */
export function DefaultBottomMainContent() {
  return (
    <div className="uxl-footer__bottom-main-default">
      <Typography type="Condensed Alt" text="Votre espace dédié" />
    </div>
  );
}

/** Default bottom legal content. Exported for stories and examples. */
export function DefaultBottomLegal() {
  return <Typography type="Condensed" width text="Legal Copy goes here" />;
}

/**
 * Two-tier footer for enterprise applications.
 *
 * - **Top section**: Main content and optional legal slot (e.g. approval code).
 * - **Bottom section**: Branding and optional legal slot (e.g. copyright).
 * - **Slots**: Pass topMainContent, topLegal, bottomMainContent, bottomLegal to customize each region.
 * - **Visibility**: Use showTopLegal and showBottomLegal to toggle the legal sections.
 *
 * @example
 * ```tsx
 * <Footer
 *   topMainContent={<DefaultTopMainContent />}
 *   topLegal={<DefaultTopLegal />}
 *   bottomMainContent={<DefaultBottomMainContent />}
 *   bottomLegal={<DefaultBottomLegal />}
 *   showTopLegal
 *   showBottomLegal
 * />
 * ```
 */
export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  (
    {
      topMainContent = FOOTER_DEFAULTS.topMainContent,
      topLegal = FOOTER_DEFAULTS.topLegal,
      bottomMainContent = FOOTER_DEFAULTS.bottomMainContent,
      bottomLegal = FOOTER_DEFAULTS.bottomLegal,
      showTopLegal = FOOTER_DEFAULTS.showTopLegal,
      showBottomLegal = FOOTER_DEFAULTS.showBottomLegal,
      className = "",
      ...props
    },
    ref,
  ) => {
    const classNames = ["uxl-footer", className].filter(Boolean).join(" ");

    return (
      <footer ref={ref} className={classNames} {...props}>
        <div className="uxl-footer__top" data-color-switcher="secondary">
          <div className="uxl-footer__top-main">{topMainContent ?? <DefaultTopMainContent />}</div>
          {showTopLegal && (
            <div className="uxl-footer__top-legal">{topLegal ?? <DefaultTopLegal />}</div>
          )}
        </div>
        <div className="uxl-footer__bottom">
          <div className="uxl-footer__bottom-main">
            {bottomMainContent ?? <DefaultBottomMainContent />}
          </div>
          {showBottomLegal && (
            <div className="uxl-footer__bottom-legal">{bottomLegal ?? <DefaultBottomLegal />}</div>
          )}
        </div>
      </footer>
    );
  },
);

Footer.displayName = "Footer";
