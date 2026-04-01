import React, { forwardRef } from "react";
import { isDevelopment } from "../utils/env";

export type LayoutDisplay =
  | "flex"
  | "grid"
  | "block"
  | "inline"
  | "inline-block"
  | "inline-flex"
  | "inline-grid";
export type FlexDirection =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";
export type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";
export type AlignContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";
export type AlignSelf =
  | "auto"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";
export type GridAutoFlow = "row" | "column" | "row dense" | "column dense";
export type GridTemplateAreas = string;
export type GridLine = string | number;

export type LayoutAs =
  | "div"
  | "section"
  | "main"
  | "article"
  | "aside"
  | "span"
  | "nav";

export interface SpacingProps {
  /** Padding on all sides */
  p?: number | string;
  /** Padding top */
  pt?: number | string;
  /** Padding right */
  pr?: number | string;
  /** Padding bottom */
  pb?: number | string;
  /** Padding left */
  pl?: number | string;
  /** Padding horizontal (left and right) */
  ph?: number | string;
  /** Padding vertical (top and bottom) */
  pv?: number | string;
  /** Margin on all sides */
  m?: number | string;
  /** Margin top */
  mt?: number | string;
  /** Margin right */
  mr?: number | string;
  /** Margin bottom */
  mb?: number | string;
  /** Margin left */
  ml?: number | string;
  /** Margin horizontal (left and right) */
  mh?: number | string;
  /** Margin vertical (top and bottom) */
  mv?: number | string;
}

export interface FlexProps {
  /** Flex direction */
  flexDirection?: FlexDirection;
  /** Flex wrap */
  flexWrap?: FlexWrap;
  /** Justify content */
  justifyContent?: JustifyContent;
  /** Align items */
  alignItems?: AlignItems;
  /** Align content */
  alignContent?: AlignContent;
  /** Align self */
  alignSelf?: AlignSelf;
  /** Flex grow */
  flexGrow?: number;
  /** Flex shrink */
  flexShrink?: number;
  /** Flex basis */
  flexBasis?: string | number;
  /** Flex shorthand */
  flex?: string | number;
  /** Row gap */
  rowGap?: number | string;
  /** Column gap */
  columnGap?: number | string;
}

export interface GridProps {
  /** Grid template columns */
  gridTemplateColumns?: string;
  /** Grid template rows */
  gridTemplateRows?: string;
  /** Grid template areas */
  gridTemplateAreas?: GridTemplateAreas;
  /** Grid column */
  gridColumn?: string;
  /** Grid row */
  gridRow?: string;
  /** Grid area */
  gridArea?: string;
  /** Grid auto columns */
  gridAutoColumns?: string;
  /** Grid auto rows */
  gridAutoRows?: string;
  /** Grid auto flow */
  gridAutoFlow?: GridAutoFlow;
  /** Column gap */
  columnGap?: number | string;
  /** Row gap */
  rowGap?: number | string;
  /** Justify items */
  justifyItems?: "start" | "end" | "center" | "stretch";
  /** Align items (grid) */
  gridAlignItems?: "start" | "end" | "center" | "stretch";
  /** Justify content (grid) */
  gridJustifyContent?: JustifyContent;
  /** Align content (grid) */
  gridAlignContent?: AlignContent;
  /** Justify self */
  justifySelf?: "start" | "end" | "center" | "stretch";
  /** Align self (grid) */
  gridAlignSelf?: AlignSelf;
}

export interface LayoutProps
  extends SpacingProps,
    Partial<FlexProps>,
    Partial<GridProps> {
  /** Display type - 'flex' or 'grid' for layout, or other display values */
  display?: LayoutDisplay;
  /** Gap between items (works for both flex and grid) */
  gap?: number | string;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Min width */
  minWidth?: number | string;
  /** Min height */
  minHeight?: number | string;
  /** Max width */
  maxWidth?: number | string;
  /** Max height */
  maxHeight?: number | string;
  /** Optional inline styles (will be merged with computed styles) */
  style?: React.CSSProperties;
  /** Optional HTML element to render as */
  as?: LayoutAs;
  /** Optional class name (merged with uxl-layout) */
  className?: string;
  /** ARIA role attribute */
  role?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA describedby attribute */
  "aria-describedby"?: string;
  /** ARIA labelledby attribute */
  "aria-labelledby"?: string;
  /** When true, hides the element from screen readers */
  "aria-hidden"?: boolean;
  /** ARIA live region */
  "aria-live"?: "off" | "polite" | "assertive";
  /** ARIA atomic */
  "aria-atomic"?: boolean;
  /** ARIA relevant */
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
  /** Tab index */
  tabIndex?: number;
  /** Children */
  children?: React.ReactNode;
}

/** Default prop values */
export const LAYOUT_DEFAULTS = {
  display: "block" as const,
  as: "div" as LayoutAs,
} as const;

/** Curated subset of props for Storybook controls */
export const LAYOUT_PROP_CONTROLS = {
  display: {
    type: "select" as const,
    description: "Display type: flex, grid, block, or other display values",
    options: [
      { value: "block", label: "block" },
      { value: "flex", label: "flex" },
      { value: "grid", label: "grid" },
      { value: "inline", label: "inline" },
      { value: "inline-block", label: "inline-block" },
      { value: "inline-flex", label: "inline-flex" },
      { value: "inline-grid", label: "inline-grid" },
    ],
    defaultValue: LAYOUT_DEFAULTS.display,
  },
  gap: {
    type: "number" as const,
    description: "Gap between items (flex and grid)",
    min: 0,
    max: 144,
    step: 4,
    defaultValue: undefined,
  },
  flexDirection: {
    type: "select" as const,
    description: "Flex direction",
    options: [
      { value: "row", label: "row" },
      { value: "row-reverse", label: "row-reverse" },
      { value: "column", label: "column" },
      { value: "column-reverse", label: "column-reverse" },
    ],
    defaultValue: "row",
  },
  flexWrap: {
    type: "select" as const,
    description: "Flex wrap",
    options: [
      { value: "nowrap", label: "nowrap" },
      { value: "wrap", label: "wrap" },
      { value: "wrap-reverse", label: "wrap-reverse" },
    ],
    defaultValue: "nowrap",
  },
  justifyContent: {
    type: "select" as const,
    description: "Justify content",
    options: [
      { value: "flex-start", label: "flex-start" },
      { value: "flex-end", label: "flex-end" },
      { value: "center", label: "center" },
      { value: "space-between", label: "space-between" },
      { value: "space-around", label: "space-around" },
      { value: "space-evenly", label: "space-evenly" },
      { value: "stretch", label: "stretch" },
    ],
    defaultValue: "flex-start",
  },
  alignItems: {
    type: "select" as const,
    description: "Align items",
    options: [
      { value: "flex-start", label: "flex-start" },
      { value: "flex-end", label: "flex-end" },
      { value: "center", label: "center" },
      { value: "baseline", label: "baseline" },
      { value: "stretch", label: "stretch" },
    ],
    defaultValue: "stretch",
  },
  p: {
    type: "number" as const,
    description: "Padding on all sides (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  pt: {
    type: "number" as const,
    description: "Padding top (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  pr: {
    type: "number" as const,
    description: "Padding right (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  pb: {
    type: "number" as const,
    description: "Padding bottom (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  pl: {
    type: "number" as const,
    description: "Padding left (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  ph: {
    type: "number" as const,
    description: "Padding horizontal — left and right (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  pv: {
    type: "number" as const,
    description: "Padding vertical — top and bottom (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  m: {
    type: "number" as const,
    description: "Margin on all sides (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  mt: {
    type: "number" as const,
    description: "Margin top (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  mr: {
    type: "number" as const,
    description: "Margin right (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  mb: {
    type: "number" as const,
    description: "Margin bottom (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  ml: {
    type: "number" as const,
    description: "Margin left (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  mh: {
    type: "number" as const,
    description: "Margin horizontal — left and right (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  mv: {
    type: "number" as const,
    description: "Margin vertical — top and bottom (px)",
    min: 0,
    max: 64,
    step: 4,
    defaultValue: undefined,
  },
  width: {
    type: "text" as const,
    description: "Width (number for px, or string e.g. 100%, 1rem)",
    defaultValue: "",
  },
  height: {
    type: "text" as const,
    description: "Height (number for px, or string e.g. 100%, 1rem)",
    defaultValue: "",
  },
  as: {
    type: "select" as const,
    description: "HTML element to render as",
    options: [
      { value: "div", label: "div" },
      { value: "section", label: "section" },
      { value: "main", label: "main" },
      { value: "article", label: "article" },
      { value: "aside", label: "aside" },
      { value: "span", label: "span" },
      { value: "nav", label: "nav" },
    ],
    defaultValue: LAYOUT_DEFAULTS.as,
  },
} as const;

/**
 * Convert spacing value to CSS value
 * Numbers are treated as pixels (no multiplication)
 * Strings with units, CSS variables, or other values are used as-is
 * Supports: numbers (16), units ("16px", "1rem", "50%"), CSS variables ("var(--spacing-md)"), etc.
 */
const toSpacing = (value?: number | string): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}px`;
  const stringValue = String(value).trim();
  if (/^\d+(\.\d+)?$/.test(stringValue)) {
    return `${stringValue}px`;
  }
  return stringValue;
};

/**
 * Flexible container component with Flex and Grid layout support.
 * Similar to MUI's Box component.
 *
 * @example
 * // Flex layout with spacing
 * <Layout display="flex" gap={16} alignItems="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Layout>
 *
 * @example
 * // Grid layout
 * <Layout
 *   display="grid"
 *   gridTemplateColumns="1fr 1fr 1fr"
 *   gap={24}
 * >
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 *   <div>Column 3</div>
 * </Layout>
 *
 * @example
 * // Spacing shortcuts
 * <Layout p={16} ph={24} pt={8}>
 *   Padding: 8px top, 24px left/right, 16px bottom
 * </Layout>
 */
export const Layout = forwardRef<HTMLElement, LayoutProps>(
  (
    {
      display = LAYOUT_DEFAULTS.display,
      // Spacing
      p,
      pt,
      pr,
      pb,
      pl,
      ph,
      pv,
      m,
      mt,
      mr,
      mb,
      ml,
      mh,
      mv,
      // Flex props
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems: flexAlignItems,
      alignContent: flexAlignContent,
      alignSelf: flexAlignSelf,
      flexGrow,
      flexShrink,
      flexBasis,
      flex,
      rowGap: flexRowGap,
      columnGap: flexColumnGap,
      // Grid props
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
      gridColumn,
      gridRow,
      gridArea,
      gridAutoColumns,
      gridAutoRows,
      gridAutoFlow,
      columnGap: gridColumnGap,
      rowGap: gridRowGap,
      justifyItems,
      gridAlignItems,
      gridJustifyContent,
      gridAlignContent,
      justifySelf,
      gridAlignSelf,
      // Shared gap prop
      gap,
      // Size props
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      style: externalStyle,
      as = LAYOUT_DEFAULTS.as,
      className = "",
      role,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      "aria-hidden": ariaHidden,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
      "aria-relevant": ariaRelevant,
      tabIndex,
      children,
      ...rest
    },
    ref
  ) => {
    if (isDevelopment) {
      const validDisplays: LayoutDisplay[] = [
        "flex",
        "grid",
        "block",
        "inline",
        "inline-block",
        "inline-flex",
        "inline-grid",
      ];
      if (display && !validDisplays.includes(display)) {
        console.warn(
          `Layout: Invalid display value "${display}". Valid options are: ${validDisplays.join(", ")}. ` +
            `Using default "block".`
        );
      }
    }

    const Component = as;

    const style: React.CSSProperties = {
      display,
    };

    // Spacing - Apply in order of specificity
    if (p !== undefined) {
      style.padding = toSpacing(p);
    }
    if (ph !== undefined) {
      if (pl === undefined) style.paddingLeft = toSpacing(ph);
      if (pr === undefined) style.paddingRight = toSpacing(ph);
    }
    if (pv !== undefined) {
      if (pt === undefined) style.paddingTop = toSpacing(pv);
      if (pb === undefined) style.paddingBottom = toSpacing(pv);
    }
    if (pt !== undefined) style.paddingTop = toSpacing(pt);
    if (pr !== undefined) style.paddingRight = toSpacing(pr);
    if (pb !== undefined) style.paddingBottom = toSpacing(pb);
    if (pl !== undefined) style.paddingLeft = toSpacing(pl);

    if (m !== undefined) {
      style.margin = toSpacing(m);
    }
    if (mh !== undefined) {
      if (ml === undefined) style.marginLeft = toSpacing(mh);
      if (mr === undefined) style.marginRight = toSpacing(mh);
    }
    if (mv !== undefined) {
      if (mt === undefined) style.marginTop = toSpacing(mv);
      if (mb === undefined) style.marginBottom = toSpacing(mv);
    }
    if (mt !== undefined) style.marginTop = toSpacing(mt);
    if (mr !== undefined) style.marginRight = toSpacing(mr);
    if (mb !== undefined) style.marginBottom = toSpacing(mb);
    if (ml !== undefined) style.marginLeft = toSpacing(ml);

    // Size
    if (width !== undefined)
      style.width = typeof width === "number" ? `${width}px` : width;
    if (height !== undefined)
      style.height = typeof height === "number" ? `${height}px` : height;
    if (minWidth !== undefined)
      style.minWidth =
        typeof minWidth === "number" ? `${minWidth}px` : minWidth;
    if (minHeight !== undefined)
      style.minHeight =
        typeof minHeight === "number" ? `${minHeight}px` : minHeight;
    if (maxWidth !== undefined)
      style.maxWidth =
        typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
    if (maxHeight !== undefined)
      style.maxHeight =
        typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

    // Flex properties
    if (display === "flex" || display === "inline-flex") {
      if (flexDirection) style.flexDirection = flexDirection;
      if (flexWrap) style.flexWrap = flexWrap;
      if (justifyContent) style.justifyContent = justifyContent;
      if (flexAlignItems) style.alignItems = flexAlignItems;
      if (flexAlignContent) style.alignContent = flexAlignContent;
      if (flexAlignSelf) style.alignSelf = flexAlignSelf;
      if (flexGrow !== undefined) style.flexGrow = flexGrow;
      if (flexShrink !== undefined) style.flexShrink = flexShrink;
      if (flexBasis !== undefined)
        style.flexBasis =
          typeof flexBasis === "number" ? `${flexBasis}px` : flexBasis;
      if (flex !== undefined)
        style.flex = typeof flex === "number" ? flex.toString() : flex;
      if (gap !== undefined) style.gap = toSpacing(gap);
      if (flexRowGap !== undefined) style.rowGap = toSpacing(flexRowGap);
      if (flexColumnGap !== undefined)
        style.columnGap = toSpacing(flexColumnGap);
    }

    // Grid properties
    if (display === "grid" || display === "inline-grid") {
      if (gridTemplateColumns)
        style.gridTemplateColumns = gridTemplateColumns;
      if (gridTemplateRows) style.gridTemplateRows = gridTemplateRows;
      if (gridTemplateAreas) style.gridTemplateAreas = gridTemplateAreas;
      if (gridColumn) style.gridColumn = gridColumn;
      if (gridRow) style.gridRow = gridRow;
      if (gridArea) style.gridArea = gridArea;
      if (gridAutoColumns) style.gridAutoColumns = gridAutoColumns;
      if (gridAutoRows) style.gridAutoRows = gridAutoRows;
      if (gridAutoFlow) style.gridAutoFlow = gridAutoFlow;
      if (gap !== undefined) style.gap = toSpacing(gap);
      if (gridRowGap !== undefined) style.rowGap = toSpacing(gridRowGap);
      if (gridColumnGap !== undefined)
        style.columnGap = toSpacing(gridColumnGap);
      if (justifyItems) style.justifyItems = justifyItems;
      if (gridAlignItems) style.alignItems = gridAlignItems;
      if (gridJustifyContent) style.justifyContent = gridJustifyContent;
      if (gridAlignContent) style.alignContent = gridAlignContent;
      if (justifySelf) style.justifySelf = justifySelf;
      if (gridAlignSelf) style.alignSelf = gridAlignSelf;
    }

    const finalStyle: React.CSSProperties = externalStyle
      ? { ...style, ...externalStyle }
      : { ...style };

    const ariaProps: {
      role?: string;
      "aria-label"?: string;
      "aria-describedby"?: string;
      "aria-labelledby"?: string;
      "aria-hidden"?: boolean;
      "aria-live"?: "off" | "polite" | "assertive";
      "aria-atomic"?: boolean;
      "aria-relevant"?: "additions" | "removals" | "text" | "all";
      tabIndex?: number;
    } = {};

    if (role) ariaProps.role = role;
    if (ariaLabel) ariaProps["aria-label"] = ariaLabel;
    if (ariaDescribedBy) ariaProps["aria-describedby"] = ariaDescribedBy;
    if (ariaLabelledBy) ariaProps["aria-labelledby"] = ariaLabelledBy;
    if (ariaHidden !== undefined) ariaProps["aria-hidden"] = ariaHidden;
    if (ariaLive) ariaProps["aria-live"] = ariaLive;
    if (ariaAtomic !== undefined) ariaProps["aria-atomic"] = ariaAtomic;
    if (ariaRelevant) ariaProps["aria-relevant"] = ariaRelevant;
    if (tabIndex !== undefined) ariaProps.tabIndex = tabIndex;

    const classNames = ["uxl-layout", className].filter(Boolean).join(" ");

    return React.createElement(
      Component,
      {
        ref,
        className: classNames,
        style: finalStyle,
        ...ariaProps,
        ...rest,
      },
      children
    );
  }
);

Layout.displayName = "Layout";
