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

/** Bayer circle logo – inline SVG for reliable bundling. Exported for docs and examples. */
export function BayerCircleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M22.5474 7.13679H25.3263C25.6421 7.13679 25.8948 6.88416 25.8948 6.56837C25.8948 6.25258 25.6421 5.99995 25.3263 5.99995H22.5474V7.13679ZM22.5474 9.78942H25.3895C25.7685 9.78942 26.0211 9.53679 26.0211 9.15784C26.0211 8.7789 25.7685 8.52626 25.3895 8.52626H22.5474V9.78942ZM27.0316 7.76837C27.4106 8.14732 27.6632 8.65258 27.6632 9.221C27.6632 10.3578 26.779 11.2421 25.6421 11.2421H21.0316V4.61047H25.579C26.6527 4.61047 27.5369 5.49468 27.5369 6.56837C27.4737 7.01047 27.2842 7.45258 27.0316 7.76837ZM28.1053 19.1368H26.4L25.8948 17.9999H22.1685L21.6632 19.1368H19.9579L23.2421 12.5052H24.7579L28.1053 19.1368ZM24 14.2105L22.8632 16.6105H25.1369L24 14.2105ZM26.2737 20.5894H28.1685L24.8211 24.8842V27.221H23.2421V24.8842L19.8948 20.5894H21.7895L24.0632 23.621L26.2737 20.5894ZM35.0527 20.5894V22.0421H30.6316V23.1789H34.9263V24.6315H30.6316V25.8947H35.0527V27.3473H29.0527V20.5894H35.0527ZM39.9158 24.6947H38.7158V27.221H37.1369V20.5894H41.179C42.3158 20.5894 43.2 21.5368 43.2 22.6736C43.2 23.621 42.5685 24.3789 41.7474 24.6315L43.7053 27.221H41.8106L39.9158 24.6947ZM41.0527 21.9789H38.779V23.2421H41.0527C41.4316 23.2421 41.6842 22.9263 41.6842 22.6105C41.6842 22.2947 41.3685 21.9789 41.0527 21.9789ZM20.5895 27.221H18.8842L18.379 26.0842H14.6527L14.1474 27.221H12.4421L15.7895 20.5894H17.3053L20.5895 27.221ZM16.4842 22.2947L15.3474 24.6947H17.6842L16.4842 22.2947ZM6.44214 23.1157H9.22108C9.53687 23.1157 9.78951 22.8631 9.78951 22.5473C9.78951 22.2315 9.53687 21.9789 9.22108 21.9789H6.44214V23.1157ZM6.44214 25.7684H9.28424C9.66319 25.7684 9.91582 25.5157 9.91582 25.1368C9.91582 24.7578 9.66319 24.5052 9.28424 24.5052H6.44214V25.7684ZM10.9263 23.7473C11.3053 24.1263 11.5579 24.6315 11.5579 25.2C11.5579 26.3368 10.6737 27.221 9.53687 27.221H4.86319V20.5894H9.41056C10.4842 20.5894 11.3685 21.4736 11.3685 22.5473C11.3685 22.9894 11.179 23.4315 10.9263 23.7473ZM27.0316 28.6105V30.0631H22.6106V31.2H26.9053V32.6526H22.6106V33.9157H27.0316V35.3684H21.0316V28.6105H27.0316ZM25.8948 38.9052C25.8948 38.5263 25.6421 38.2736 25.2632 38.2736H22.5474V39.5368H25.2632C25.6421 39.5368 25.8948 39.2842 25.8948 38.9052ZM20.9685 43.5157V36.8842H25.3895C26.5263 36.8842 27.4106 37.8315 27.4106 38.9684C27.4106 39.8526 26.9053 40.5473 26.1474 40.8631L28.1685 43.5157H26.2737L24.379 40.9894H22.5474V43.5157H20.9685V43.5157Z"
        fill="#10384F"
      />
      <path
        d="M47.9368 22.4842C47.1789 9.97895 36.7579 0 24 0C11.2421 0 0.821036 9.97895 0.0631409 22.4842C0.0631409 22.9895 0.126299 23.4947 0.189457 24C0.69472 28.1684 2.27367 32.0211 4.67367 35.2421C9.03156 41.179 16.0421 45.0316 24 45.0316C12.8842 45.0316 3.78946 36.379 3.03156 25.5158C2.9684 25.0105 2.9684 24.5053 2.9684 24C2.9684 23.4947 2.9684 22.9895 3.03156 22.4842C3.78946 11.6211 12.8842 2.96842 24 2.96842C31.9579 2.96842 38.9684 6.82105 43.3263 12.7579C45.7263 15.979 47.3052 19.8316 47.8105 24C47.8737 24.5053 47.9368 25.0105 47.9368 25.4526C47.9368 24.9474 48 24.4421 48 23.9368C48 23.4947 48 22.9895 47.9368 22.4842Z"
        fill="#89D329"
      />
      <path
        d="M0.0631579 25.5158C0.821053 38.021 11.2421 48 24 48C36.7579 48 47.179 38.021 47.9369 25.5158C47.9369 25.0105 47.8737 24.5052 47.8105 24C47.3053 19.8315 45.7263 15.9789 43.3263 12.7579C38.9684 6.82102 31.9579 2.96838 24 2.96838C35.1158 2.96838 44.2105 11.621 44.9684 22.4842C45.0316 22.9894 45.0316 23.4947 45.0316 24C45.0316 24.5052 45.0316 25.0105 44.9684 25.5158C44.2105 36.4421 35.1158 45.0316 24 45.0316C16.0421 45.0316 9.03158 41.1789 4.67368 35.2421C2.27368 32.021 0.694737 28.1684 0.189474 24C0.126316 23.4947 0.0631579 22.9894 0.0631579 22.5473C0.0631579 23.0526 0 23.5579 0 24.0631C0 24.5052 4.70563e-09 25.0105 0.0631579 25.5158Z"
        fill="#00BCFF"
      />
    </svg>
  );
}

/** Default leading content: menu icon, logo, two-line type lockup. Exported for stories and examples. */
export function DefaultLeadingSlot() {
  return (
    <>
      <BayerCircleLogo className="uxl-navigation__logo" />
      <Layout display="flex" flexDirection="column" gap="4px">
        <Typography type="Condensed Alt" text="BAYER FOR PROFESSIONALS" />
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
      <IconButton
        iconName="search"
        aria-label="Search"
        emphasis="low"
        size="small"
      />
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
 *       <BayerCircleLogo className="uxl-navigation__logo" />
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
    ref
  ) => {
    const classNames = ["uxl-navigation", className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        <nav className="uxl-navigation__primary" aria-label="Primary navigation">
          <div className="uxl-navigation__inner">
            <div className="uxl-navigation__leading">
              {leadingSlot ?? <DefaultLeadingSlot />}
            </div>
            <div className="uxl-navigation__center">
              {centerSlot ?? <DefaultCenterSlot />}
            </div>
            <div className="uxl-navigation__trailing">
              {trailingSlot ?? <DefaultTrailingSlot />}
            </div>
          </div>
        </nav>
        {bottomSlot !== null && (
          <nav className="uxl-navigation__secondary" data-color-switcher="secondary" aria-label="Secondary navigation">
            <div className="uxl-navigation__inner uxl-navigation__bottom-inner">
              {bottomSlot !== undefined ? bottomSlot : <DefaultBottomSlot />}
            </div>
          </nav>
        )}
      </div>
    );
  }
);

Navigation.displayName = "Navigation";
