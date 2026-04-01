import { forwardRef, type HTMLAttributes } from "react";
import { IconButton } from "../IconButton";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Divider } from "../Divider";
import { LanguageSelector } from "../LanguageSelector";
import { NavButton } from "../NavButton";
import { Layout } from "../Layout";
import "./Navigation.css";

export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {
  /** Content for the leading region (e.g. menu icon, logo, title). */
  leadingSlot?: React.ReactNode;
  /** Content for the center region (e.g. primary nav links). */
  centerSlot?: React.ReactNode;
  /** Content for the trailing region (e.g. search, language selector, login). */
  trailingSlot?: React.ReactNode;
  /** Content for the secondary nav bar below the primary bar (e.g. sub-navigation links). Pass null to hide the secondary bar. */
  bottomSlot?: React.ReactNode | null;
}

/** Default prop values */
export const NAVIGATION_DEFAULTS = {
  leadingSlot: undefined,
  centerSlot: undefined,
  trailingSlot: undefined,
  bottomSlot: undefined,
} as const;

/** Default leading content: menu icon, logo, two-line type lockup. Exported for stories and examples. */
export function DefaultLeadingSlot() {
  return (
    <>
      <Layout display="flex" flexDirection="column" gap="4px">
        <Typography type="Condensed Alt" text="FOR PROFESSIONALS" />
        <Typography type="Condensed" text="Your Resource Portal" />
      </Layout>
    </>
  );
}

/** Default center content: primary nav links. Exported for stories and examples. */
export function DefaultCenterSlot() {
  return (
    <>
      <NavButton label="Menu Link" />
      <NavButton label="Menu Link" />
      <NavButton label="Menu Link" />
      <NavButton label="Menu Link" />
      <NavButton label="Menu Link" />
    </>
  );
}

/** Default trailing content: search icon, language selector, divider, login button. Exported for stories and examples. */
export function DefaultTrailingSlot() {
  return (
    <>
      <IconButton iconName="search" aria-label="Search" emphasis="low" size="small" />
      <LanguageSelector value="EN" />
      <Divider orientation="vertical" hierarchy="low" />
      <Button
        emphasis="low"
        size="small"
        trailingIcon
        trailingIconName="keyboard_arrow_down"
        trailingIconVariant="sharpUnfilled"
      >
        <Typography type="Button" width text="Log In" />
      </Button>
    </>
  );
}

/** Default bottom content: secondary nav links. Exported for stories and examples. */
export function DefaultBottomSlot() {
  return (
    <>
      <NavButton label="Menu Link" dataColorSwitcher="secondary" />
      <NavButton label="Menu Link" dataColorSwitcher="secondary" />
      <NavButton label="Menu Link" dataColorSwitcher="secondary" />
      <NavButton label="Menu Link" dataColorSwitcher="secondary" />
      <NavButton label="Menu Link" dataColorSwitcher="secondary" />
    </>
  );
}

/**
 * Two-tier navigation bar for enterprise applications.
 *
 * - **Primary nav**: Leading, center, and trailing regions. Use slots for branding, main links, and utilities.
 * - **Secondary nav**: Optional bottom bar for sub-navigation.
 * - **Slots**: Pass leadingSlot, centerSlot, trailingSlot, and bottomSlot to customize each region.
 *
 * @example
 * ```tsx
 * <Navigation
 *   leadingSlot={
 *     <>
 *       <IconButton emphasis="low" size="medium" iconName="menu" iconVariant="sharpUnfilled" />
 *       <Typography type="Condensed Alt" text="Votre espace dédié" truncation />
 *     </>
 *   }
 *   centerSlot={
 *     <>
 *       <NavButton label="Menu Link" />
 *       <NavButton label="Menu Link" />
 *     </>
 *   }
 *   trailingSlot={
 *     <>
 *       <IconButton iconName="search" aria-label="Search" emphasis="low" size="small" />
 *       <LanguageSelector value="EN" />
 *       <Divider orientation="vertical" hierarchy="low" />
 *       <Button emphasis="low" size="small" trailingIcon trailingIconName="keyboard_arrow_down" trailingIconVariant="sharpUnfilled"><Typography type="Button" width text="Log In" /></Button>
 *     </>
 *   }
 *   bottomSlot={
 *     <>
 *       <NavButton label="Menu Link" dataColorSwitcher="secondary" />
 *       <NavButton label="Menu Link" dataColorSwitcher="secondary" />
 *     </>
 *   }
 * />
 * ```
 */
export const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
  (
    {
      leadingSlot = NAVIGATION_DEFAULTS.leadingSlot,
      centerSlot = NAVIGATION_DEFAULTS.centerSlot,
      trailingSlot = NAVIGATION_DEFAULTS.trailingSlot,
      bottomSlot = NAVIGATION_DEFAULTS.bottomSlot,
      className = "",
      ...props
    },
    ref,
  ) => {
    const classNames = ["uxl-navigation", className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        <nav className="uxl-navigation__primary" aria-label="Primary navigation">
          <div className="uxl-navigation__inner">
            <div className="uxl-navigation__leading">{leadingSlot ?? <DefaultLeadingSlot />}</div>
            <div className="uxl-navigation__center">{centerSlot ?? <DefaultCenterSlot />}</div>
            <div className="uxl-navigation__trailing">
              {trailingSlot ?? <DefaultTrailingSlot />}
            </div>
          </div>
        </nav>
        {bottomSlot !== null && (
          <nav
            className="uxl-navigation__secondary"
            data-color-switcher="secondary"
            aria-label="Secondary navigation"
          >
            <div className="uxl-navigation__inner uxl-navigation__bottom-inner">
              {bottomSlot !== undefined ? bottomSlot : <DefaultBottomSlot />}
            </div>
          </nav>
        )}
      </div>
    );
  },
);

Navigation.displayName = "Navigation";
