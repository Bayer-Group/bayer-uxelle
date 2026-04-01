import {
  forwardRef,
  useState,
  useCallback,
  cloneElement,
  isValidElement,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import type { HTMLAttributes } from "react";
import "./Menu.css";

export type MenuDirection =
  | "Top Left"
  | "Top Center"
  | "Top Right"
  | "Bottom Left"
  | "Bottom Center"
  | "Bottom Right";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Preferred placement of the menu panel. Flips and shifts to stay in view when it would overflow. */
  direction?: MenuDirection;
  /** When true, disables flip/shift and uses strict placement (may overflow viewport). */
  disableFlip?: boolean;
  /** Whether the menu panel is visible (controlled). */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called when open state changes (e.g. toggle). */
  onOpenChange?: (open: boolean) => void;
  /** Button that triggers the menu. Required for open/close behavior. */
  trigger?: React.ReactElement;
  /** Menu content (List with ListItems, or custom content). */
  children?: React.ReactNode;
}

/** Default prop values */
export const MENU_DEFAULTS = {
  direction: "Top Right" as MenuDirection,
  defaultOpen: false,
} as const;

export const MENU_PROP_CONTROLS = {
  direction: {
    type: "select" as const,
    description: "Preferred placement. Flips and shifts to stay in view when it would overflow.",
    options: [
      { value: "Top Left", label: "Top Left" },
      { value: "Top Center", label: "Top Center" },
      { value: "Top Right", label: "Top Right" },
      { value: "Bottom Left", label: "Bottom Left" },
      { value: "Bottom Center", label: "Bottom Center" },
      { value: "Bottom Right", label: "Bottom Right" },
    ],
    defaultValue: MENU_DEFAULTS.direction,
  },
  defaultOpen: {
    type: "boolean" as const,
    description: "Initial open state when uncontrolled.",
    defaultValue: MENU_DEFAULTS.defaultOpen,
  },
} as const;

/** Flip vertical: Top <-> Bottom */
function flipVertical(d: MenuDirection): MenuDirection {
  return d.startsWith("Top")
    ? (d.replace("Top", "Bottom") as MenuDirection)
    : (d.replace("Bottom", "Top") as MenuDirection);
}

/** Compute placement with flip and shift. Returns effective direction and CSS style. */
function computePlacement(
  preferred: MenuDirection,
  triggerRect: DOMRect,
  panelWidth: number,
  panelHeight: number,
  gap: number,
  disableFlip: boolean
): { direction: MenuDirection; style: React.CSSProperties } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const style: React.CSSProperties = { zIndex: 9999, minWidth: 160 };

  let direction = preferred;

  if (!disableFlip) {
    const spaceBelow = vh - triggerRect.bottom - gap;
    const spaceAbove = triggerRect.top - gap;
    const preferBottom = direction.startsWith("Bottom");
    const wouldOverflowBottom = preferBottom && spaceBelow < panelHeight;
    const wouldOverflowTop = !preferBottom && spaceAbove < panelHeight;
    if (wouldOverflowBottom || wouldOverflowTop) {
      direction = flipVertical(direction);
    }
  }

  const isBottom = direction.startsWith("Bottom");
  const isLeft = direction.includes("Left");
  const isRight = direction.includes("Right");

  if (isBottom) {
    style.top = triggerRect.bottom + gap;
  } else {
    style.bottom = vh - triggerRect.top + gap;
  }

  if (isLeft) {
    let left = triggerRect.left;
    if (!disableFlip && left + panelWidth > vw) {
      left = Math.max(0, vw - panelWidth);
    }
    style.left = left;
  } else if (isRight) {
    if (!disableFlip && triggerRect.right - panelWidth < 0) {
      style.left = 0;
    } else {
      style.right = vw - triggerRect.right;
    }
  } else {
    const centerX = triggerRect.left + triggerRect.width / 2;
    let left = centerX;
    if (!disableFlip) {
      left = Math.max(panelWidth / 2, Math.min(left, vw - panelWidth / 2));
    }
    style.left = left;
    style.transform = "translateX(-50%)";
  }

  return { direction, style };
}

/**
 * Menu component with trigger and content slots.
 *
 * - **Trigger**: Pass a Button (required). Clicking toggles the menu open/close.
 * - **Children**: Pass List with ListItems or custom content for the menu panel.
 * - **Direction**: Controls placement of the menu (above/below, left/center/right).
 *
 * @example
 * ```tsx
 * <Menu
 *   direction="Top Right"
 *   trigger={<Button emphasis="low" size="large" trailingIcon trailingIconName="keyboard_arrow_down"><Typography type="Button" width text="Open Menu" /></Button>}
 * >
 *   <List verticalPadding={false}>
 *     <ListItem divider><Typography type="Component Medium" text="Header" /></ListItem>
 *     <ListItem interactive trailingSlot trailingIconName="call_made">Item</ListItem>
 *   </List>
 * </Menu>
 * ```
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      direction = MENU_DEFAULTS.direction,
      disableFlip = false,
      open: controlledOpen,
      defaultOpen = MENU_DEFAULTS.defaultOpen,
      onOpenChange,
      trigger,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
    const [resolvedDirection, setResolvedDirection] = useState<MenuDirection | null>(null);
    const [measureTrigger, setMeasureTrigger] = useState(0);

    useLayoutEffect(() => {
      if (!isOpen || !wrapperRef.current) {
        if (!isOpen) setResolvedDirection(null);
        return;
      }
      const rect = wrapperRef.current.getBoundingClientRect();
      const gap = 8;

      if (!panelRef.current) {
        setPanelStyle({
          zIndex: 9999,
          minWidth: 160,
          left: -9999,
          top: 0,
          visibility: "hidden",
        });
        setMeasureTrigger((t) => t + 1);
        return;
      }

      const panelRect = panelRef.current.getBoundingClientRect();
      const { direction: effectiveDirection, style } = computePlacement(
        direction,
        rect,
        panelRect.width,
        panelRect.height,
        gap,
        disableFlip
      );
      setResolvedDirection(effectiveDirection);
      setPanelStyle(style);
    }, [isOpen, direction, disableFlip, measureTrigger]);

    // Close menu when user scrolls (standard dropdown UX)
    useLayoutEffect(() => {
      if (!isOpen) return;
      const handleScroll = () => {
        if (!isControlled) setInternalOpen(false);
        onOpenChange?.(false);
      };
      window.addEventListener("scroll", handleScroll, { capture: true });
      return () => window.removeEventListener("scroll", handleScroll, { capture: true });
    }, [isOpen, isControlled, onOpenChange]);

    // Close menu when clicking outside (trigger or panel)
    useLayoutEffect(() => {
      if (!isOpen) return;
      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node;
        const wrapper = wrapperRef.current;
        const panel = panelRef.current;
        if (
          wrapper?.contains(target) ||
          panel?.contains(target)
        ) return;
        if (!isControlled) setInternalOpen(false);
        onOpenChange?.(false);
      };
      document.addEventListener("mousedown", handleMouseDown);
      return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [isOpen, isControlled, onOpenChange]);

    const closeMenu = useCallback(() => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, [isControlled, onOpenChange]);

    // Keyboard: Arrow Up/Down navigate menu items; Escape closes
    useEffect(() => {
      if (!isOpen || !panelRef.current) return;
      const panel = panelRef.current;
      const getMenuitems = () =>
        Array.from(panel.querySelectorAll<HTMLElement>("[role='menuitem']"));
      const focusMenuitem = (index: number) => {
        const items = getMenuitems();
        const item = items[index];
        if (item) item.focus();
      };
      const handleKeyDown = (e: KeyboardEvent) => {
        const items = getMenuitems();
        if (items.length === 0) return;
        const current = document.activeElement as HTMLElement | null;
        const currentIndex = current ? items.indexOf(current) : -1;
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            if (currentIndex < 0) focusMenuitem(0);
            else focusMenuitem((currentIndex + 1) % items.length);
            break;
          case "ArrowUp":
            e.preventDefault();
            if (currentIndex <= 0) focusMenuitem(items.length - 1);
            else focusMenuitem(currentIndex - 1);
            break;
          case "Escape":
            e.preventDefault();
            closeMenu();
            (wrapperRef.current?.querySelector("button, [role='button']") as HTMLElement)?.focus();
            break;
          default:
            break;
        }
      };
      panel.addEventListener("keydown", handleKeyDown, true);
      return () => panel.removeEventListener("keydown", handleKeyDown, true);
    }, [isOpen, closeMenu]);

    const handleToggle = useCallback(() => {
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    }, [isOpen, isControlled, onOpenChange]);

    const directionForClass = resolvedDirection ?? direction;
    const classNames = [
      "uxl-menu",
      `uxl-menu--${directionForClass.replace(/\s+/g, "-").toLowerCase()}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleTriggerKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          const first = panelRef.current?.querySelector<HTMLElement>("[role='menuitem']");
          if (first) first.focus();
        }
      },
      [isOpen]
    );

    const triggerElement =
      trigger && isValidElement(trigger)
        ? cloneElement(trigger as React.ReactElement<{ onClick?: React.MouseEventHandler; onKeyDown?: React.KeyboardEventHandler; "aria-expanded"?: boolean; "aria-haspopup"?: "menu"; trailingIconName?: string }>, {
            onClick: (e: React.MouseEvent) => {
              (trigger as React.ReactElement<{ onClick?: React.MouseEventHandler }>).props.onClick?.(e);
              handleToggle();
            },
            onKeyDown: (e: React.KeyboardEvent) => {
              (trigger as React.ReactElement<{ onKeyDown?: React.KeyboardEventHandler }>).props.onKeyDown?.(e);
              handleTriggerKeyDown(e);
            },
            "aria-expanded": isOpen,
            "aria-haspopup": "menu" as const,
            trailingIconName: isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down",
          })
        : trigger;

    const panelContent =
      isOpen &&
      typeof document !== "undefined" ? (
        <div
          ref={panelRef}
          className="uxl-menu__panel"
          style={panelStyle}
          role="menu"
        >
          <div className="uxl-menu__slot">{children}</div>
        </div>
      ) : null;

    return (
      <div ref={ref} className={classNames} {...props}>
        <div ref={wrapperRef} className="uxl-menu__wrapper">
          {triggerElement || (
            <span className="uxl-menu__trigger-placeholder">Open Menu</span>
          )}
        </div>
        {panelContent && createPortal(panelContent, document.body)}
      </div>
    );
  }
);

Menu.displayName = "Menu";
