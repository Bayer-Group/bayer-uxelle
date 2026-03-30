import React, { forwardRef, useState, useCallback, useRef, type ReactNode, type HTMLAttributes } from "react";
import { Icon } from "../Icon";
import { Divider } from "../Divider";
import { Typography } from "../Typography";
import type { MaterialSymbolIconName } from "../Icon";
import "./Accordion.css";

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Main content (center slot) — header title. */
  children?: React.ReactNode;
  /** Content for the trailing slot (e.g. chevron). Defaults to keyboard_arrow_down when closed, keyboard_arrow_up when open. */
  trailing?: React.ReactNode;
  /** Content for the expandable panel when open. */
  panel?: React.ReactNode;
  /** Whether to show a divider below the accordion. Ignored (treated as false) when `disabled`. */
  divider?: boolean;
  /** Whether the accordion is expanded. */
  open?: boolean;
  /** Whether the accordion is disabled. */
  disabled?: boolean;
  /** Whether to show the trailing slot. */
  trailingSlot?: boolean;
  /** Material Symbol name for default trailing icon when trailing slot is empty. */
  trailingIconName?: MaterialSymbolIconName;
  /** Icon variant for trailing icon. */
  trailingIconVariant?: "sharpFilled" | "sharpUnfilled";
  /** Callback when the header is clicked (for controlled usage). */
  onToggle?: () => void;
}

/** Default prop values */
export const ACCORDION_DEFAULTS = {
  open: false,
  disabled: false,
  divider: false,
  trailingSlot: true,
  trailingIconName: "keyboard_arrow_down" as MaterialSymbolIconName,
  trailingIconVariant: "sharpUnfilled" as const,
} as const;

export const ACCORDION_PROP_CONTROLS = {
  open: {
    type: "boolean" as const,
    description: "Whether the accordion is expanded.",
    defaultValue: ACCORDION_DEFAULTS.open,
  },
  disabled: {
    type: "boolean" as const,
    description: "Whether the accordion is disabled.",
    defaultValue: ACCORDION_DEFAULTS.disabled,
  },
  divider: {
    type: "boolean" as const,
    description: "Whether to show a divider below the accordion. Never shown when disabled.",
    defaultValue: ACCORDION_DEFAULTS.divider,
  },
  trailingSlot: {
    type: "boolean" as const,
    description: "Whether to show the trailing slot.",
    defaultValue: ACCORDION_DEFAULTS.trailingSlot,
  },
  trailingIconName: {
    type: "text" as const,
    description: "Material Symbol name for default trailing icon.",
    defaultValue: ACCORDION_DEFAULTS.trailingIconName,
  },
  trailingIconVariant: {
    type: "select" as const,
    description: "Icon variant for trailing icon.",
    options: [
      { value: "sharpUnfilled", label: "sharpUnfilled" },
      { value: "sharpFilled", label: "sharpFilled" },
    ],
    defaultValue: ACCORDION_DEFAULTS.trailingIconVariant,
  },
} as const;

/**
 * Accordion component with center and trailing slots.
 *
 * - **Children**: Main content (center slot) for the header. Strings are wrapped in Typography (Component Medium Alt).
 * - **Trailing**: Trailing slot content (default chevron).
 * - **Panel**: Content shown when expanded. Strings are wrapped in Typography (Body Small).
 * - **States**: open, disabled; interactive header toggles expansion
 *
 * @example
 * ```tsx
 * <Accordion>
 *   Title
 *   <Accordion.Panel>Panel content...</Accordion.Panel>
 * </Accordion>
 * ```
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <Typography type="Component Medium Alt" text="Custom title" />
 *   <Accordion.Panel>
 *     <Typography type="Body Small" text="Custom panel..." />
 *   </Accordion.Panel>
 * </Accordion>
 * ```
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      trailing,
      panel: panelProp,
      divider = ACCORDION_DEFAULTS.divider,
      open: controlledOpen,
      disabled = ACCORDION_DEFAULTS.disabled,
      trailingSlot = ACCORDION_DEFAULTS.trailingSlot,
      trailingIconName = ACCORDION_DEFAULTS.trailingIconName,
      trailingIconVariant = ACCORDION_DEFAULTS.trailingIconVariant,
      onToggle,
      className = "",
      ...props
    },
    ref
  ) => {
    const { center, panel: panelFromChildren } = extractSlotsFromChildren(children);
    let centerContent: ReactNode = panelProp != null ? children : center;
    let panel: ReactNode = panelProp ?? panelFromChildren;

    if (centerContent == null) {
      centerContent = <Typography type="Component Medium Alt" text="Typography" />;
    } else if (typeof centerContent === "string") {
      centerContent = <Typography type="Component Medium Alt" text={centerContent} />;
    }

    if (typeof panel === "string") {
      panel = <Typography type="Body Small" text={panel} data-color-switcher="neutral"/>;
    }

    const [internalOpen, setInternalOpen] = useState<boolean>(ACCORDION_DEFAULTS.open);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const summaryId = useRef(`uxl-accordion-summary-${Math.random().toString(36).slice(2, 9)}`).current;
    const panelId = useRef(`uxl-accordion-panel-${Math.random().toString(36).slice(2, 9)}`).current;

    const handleToggle = useCallback(
      (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (disabled) return;
        if (isControlled) {
          onToggle?.();
        } else {
          setInternalOpen((prev) => !prev);
        }
      },
      [disabled, isControlled, onToggle]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (isControlled) {
            onToggle?.();
          } else {
            setInternalOpen((prev) => !prev);
          }
        }
      },
      [disabled, isControlled, onToggle]
    );

    /* Single icon + CSS rotation for smooth animation (keyboard_arrow_down → rotate 180° when open) */
    const trailingIcon: MaterialSymbolIconName = trailingIconName;

    const summaryContent = (
      <>
        <span className="uxl-accordion__slot uxl-accordion__slot--center">
          {centerContent}
        </span>
        {trailingSlot && (
          <span className="uxl-accordion__slot uxl-accordion__slot--trailing">
            {trailing ?? (
              <span className="uxl-accordion__icon">
                <Icon iconName={trailingIcon} variant={trailingIconVariant} />
              </span>
            )}
          </span>
        )}
      </>
    );

    const classNames = [
      "uxl-accordion",
      isOpen && "uxl-accordion--open",
      disabled && "uxl-accordion--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const rootClassNames = ["uxl-accordion__root", className].filter(Boolean).join(" ");
    const showDivider = divider && !disabled;

    return (
      <div ref={ref} className={rootClassNames} {...props}>
        <div
          className={classNames}
          data-open={isOpen}
          {...(disabled && { inert: true })}
        >
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            className="uxl-accordion__summary"
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            aria-controls={panel != null ? panelId : undefined}
            aria-disabled={disabled ? true : undefined}
            id={summaryId}
          >
            {summaryContent}
          </div>
          {panel != null && (
            <div
              id={panelId}
              className="uxl-accordion__panel-wrapper"
              aria-labelledby={summaryId}
              aria-hidden={!isOpen}
              role="region"
            >
              <div className="uxl-accordion__panel-inner">
                <div className="uxl-accordion__panel">
                  {panel}
                </div>
              </div>
            </div>
          )}
        </div>
        {showDivider && (
          <Divider
            orientation="horizontal"
            hierarchy="low"
            decorative
            className="uxl-accordion__divider"
          />
        )}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

/** Slot for accordion panel content. Use as child of Accordion. */
export function AccordionPanel({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

AccordionPanel.displayName = "Accordion.Panel";

function extractSlotsFromChildren(children: ReactNode): {
  center: ReactNode;
  panel: ReactNode;
} {
  const center: ReactNode[] = [];
  let panel: ReactNode = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === AccordionPanel) {
      panel = child.props.children;
    } else {
      center.push(child);
    }
  });
  return { center: center.length === 1 ? center[0] : center, panel };
}

(Accordion as typeof Accordion & { Panel: typeof AccordionPanel }).Panel =
  AccordionPanel;
