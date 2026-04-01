import React, { forwardRef, type HTMLAttributes } from "react";
import { Accordion } from "../Accordion";
import "./AccordionGroup.css";

export interface AccordionGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Accordion components or other content for the slot. */
  children?: React.ReactNode;
  /** Whether to show dividers between accordion items. Default true. Passes divider to Accordion children. */
  divider?: boolean;
}

/** Default prop values */
export const ACCORDION_GROUP_DEFAULTS = {
  divider: true,
} as const;

/**
 * Accordion container for Accordion components.
 *
 * - **Slot**: Accepts Accordion children
 * - **Layout**: Vertical stack
 * - **Dividers**: When divider is true (default), passes divider to each Accordion except the last
 *
 * @example
 * ```tsx
 * <AccordionGroup>
 *   <Accordion>
 *     <Typography type="Component Medium Alt" text="Section 1" />
 *     <Accordion.Panel>
 *       <Typography type="Body Small" text="Content..." />
 *     </Accordion.Panel>
 *   </Accordion>
 *   <Accordion>
 *     <Typography type="Component Medium Alt" text="Section 2" />
 *   </Accordion>
 * </AccordionGroup>
 * ```
 */
export const AccordionGroup = forwardRef<HTMLDivElement, AccordionGroupProps>(
  (
    {
      children,
      divider = ACCORDION_GROUP_DEFAULTS.divider,
      className = "",
      ...props
    },
    ref
  ) => {
    const classNames = ["uxl-accordion-group", className].filter(Boolean).join(" ");

    const content = React.Children.toArray(children).filter(Boolean);
    const processed = content.map((child, i) => {
      if (React.isValidElement(child) && child.type === Accordion) {
        const isLast = i === content.length - 1;
        const showDivider = divider && !isLast;
        return React.cloneElement(child, { key: child.key ?? i, divider: showDivider });
      }
      return child;
    });

    return (
      <div ref={ref} className={classNames} {...props}>
        {processed}
      </div>
    );
  }
);

AccordionGroup.displayName = "AccordionGroup";
