import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionGroup,
  Button,
  Divider,
  HelperText,
  Icon,
  IconButton,
  Label,
  Layout,
  Link,
  List,
  ListItem,
  Switch,
  Textfield,
  Typography,
} from "@uxelle/components";

/**
 * An example "Information" page composed entirely from UXElle components.
 *
 * Content is sourced from the **uxElle Design System MCP** —
 * color guidance, typography scale, and component descriptions — to
 * demonstrate how UXElle primitives combine into a realistic page layout.
 */
function InformationDemo() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => setFaqOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const colorTokens = [
    { name: "Primary", icon: "palette", desc: "Brand primary — buttons, links, key actions" },
    { name: "Secondary", icon: "contrast", desc: "Brand secondary — supporting accents, chips" },
    { name: "Danger", icon: "warning", desc: "Destructive actions, error states, validation" },
    { name: "Success", icon: "check_circle", desc: "Positive outcomes, confirmations, badges" },
    { name: "Surface", icon: "layers", desc: "Card & container backgrounds, elevation" },
    { name: "On-Surface", icon: "text_fields", desc: "Text & icons on surface backgrounds" },
  ];

  const typeScale = [
    {
      type: "Display Large" as const,
      sample: "Display Large",
      desc: "Hero headings, landing pages",
    },
    {
      type: "Display Medium" as const,
      sample: "Display Medium",
      desc: "Section headers, feature callouts",
    },
    {
      type: "Display Small" as const,
      sample: "Display Small",
      desc: "Card titles, dialog headers",
    },
    {
      type: "Body Medium" as const,
      sample: "Body text for readable content",
      desc: "Default body copy",
    },
    {
      type: "Body Small" as const,
      sample: "Smaller body for compact layouts",
      desc: "Secondary body text",
    },
    { type: "Overline" as const, sample: "Overline label", desc: "Category labels, section tags" },
  ];

  const filteredTokens = colorTokens.filter(
    (t) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase()),
  );

  const faqs = [
    {
      q: "What are semantic color tokens?",
      a: "uxElle uses a semantic color token system. Never hardcode hex values — always use CSS classes or custom properties. Pick the right on-color based on the background you're placing content on.",
    },
    {
      q: "How do on-surface colors work?",
      a: "Use on-surface tokens when the background is a standard surface (background, surface, or surface-variant). States include base, active, inactive, disabled, and stroke.",
    },
    {
      q: "When should I use utility colors?",
      a: "Utility colors are theme-independent — they stay the same across all themes. Use them for status badges, category indicators, color-coded data labels, and icon backgrounds.",
    },
    {
      q: "What typography scale does uxElle use?",
      a: "uxElle provides display (96–20px), subtitle (16–14px), body (16–14px), caption (12px), button (14px), and overline (12px) styles — each with optional bold variants.",
    },
  ];

  return (
    <Layout display="flex" flexDirection="column" gap={32} style={{ maxWidth: 720 }}>
      {/* Header */}
      <Layout display="flex" flexDirection="column" gap={8}>
        <Layout display="flex" alignItems="center" gap={12}>
          <Icon iconName="design_services" size={32} variant="sharpFilled" />
          <Typography type="Display Medium" as="h1" text="uxElle Design System" />
        </Layout>
        <Typography
          type="Body Medium"
          text="A comprehensive guide to color tokens, typography, and component patterns."
        />
      </Layout>

      <Divider hierarchy="high" />

      {/* Toolbar row */}
      <Layout display="flex" alignItems="center" gap={16} flexWrap="wrap">
        <div style={{ flex: 1, minWidth: 240 }}>
          <Textfield
            labelText="Filter tokens"
            placeholder="e.g. primary, danger…"
            leadingIcon
            leadingIconName="search"
            value={search}
            onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          />
        </div>
        <Switch label embedded={false} onChange={() => setDarkMode((d) => !d)}>
          <Typography type="Body Medium" width text={darkMode ? "Dark mode" : "Light mode"} />
        </Switch>
      </Layout>

      {/* Color Tokens */}
      <Layout display="flex" flexDirection="column" gap={12}>
        <Layout display="flex" alignItems="center" gap={8}>
          <Icon iconName="palette" size={24} variant="sharpFilled" />
          <Typography type="Display Small" as="h2" text="Color Tokens" />
        </Layout>
        <Typography
          type="Body Small"
          text="uxElle uses a semantic token system. Never hardcode hex values — always use CSS classes or custom properties."
        />
        <List verticalPadding>
          {filteredTokens.map((token) => (
            <ListItem
              key={token.name}
              leadingSlot
              leadingIconName={token.icon}
              leadingIconVariant="sharpFilled"
              trailingSlot
              trailingIconName="chevron_right"
              divider
              interactive
            >
              <Layout display="flex" flexDirection="column" gap={2}>
                <Typography type="Component Medium Alt" text={token.name} />
                <Typography type="Body Small" text={token.desc} />
              </Layout>
            </ListItem>
          ))}
          {filteredTokens.length === 0 && (
            <Layout
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={8}
              style={{ padding: "24px 0" }}
            >
              <Icon iconName="search_off" size={32} variant="sharpFilled" />
              <Typography type="Body Medium" text="No tokens match your filter." />
            </Layout>
          )}
        </List>
      </Layout>

      <Divider />

      {/* Typography Scale */}
      <Layout display="flex" flexDirection="column" gap={12}>
        <Layout display="flex" alignItems="center" gap={8}>
          <Icon iconName="text_fields" size={24} variant="sharpFilled" />
          <Typography type="Display Small" as="h2" text="Typography Scale" />
        </Layout>
        <Typography
          type="Body Small"
          text="The type scale ranges from Display (largest) down to Overline (smallest). Each style maps to a specific size, weight, and line-height."
        />
        <Layout display="flex" flexDirection="column" gap={16}>
          {typeScale.map((entry) => (
            <Layout key={entry.type} display="flex" flexDirection="column" gap={4}>
              <Label>
                <Typography type="Body Medium Alt" text={entry.type} truncation />
              </Label>
              <Typography type={entry.type} text={entry.sample} />
              <HelperText helperType="Info">{entry.desc}</HelperText>
            </Layout>
          ))}
        </Layout>
      </Layout>

      <Divider />

      {/* FAQ Accordion */}
      <Layout display="flex" flexDirection="column" gap={12}>
        <Layout display="flex" alignItems="center" gap={8}>
          <Icon iconName="help" size={24} variant="sharpFilled" />
          <Typography type="Display Small" as="h2" text="Frequently Asked Questions" />
        </Layout>
        <AccordionGroup divider>
          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              open={!!faqOpen[idx]}
              onToggle={() => toggleFaq(idx)}
              panel={<Typography type="Body Small" text={faq.a} data-color-switcher="neutral" />}
            >
              <Typography type="Component Medium Alt" text={faq.q} />
            </Accordion>
          ))}
        </AccordionGroup>
      </Layout>

      <Divider />

      {/* Actions footer */}
      <Layout display="flex" alignItems="center" gap={12} flexWrap="wrap">
        <Button emphasis="high">
          <Typography type="Button" width text="Get Started" />
        </Button>
        <Button emphasis="medium">
          <Typography type="Button" width text="View Storybook" />
        </Button>
        <div style={{ marginLeft: "auto" }}>
          <IconButton emphasis="low" iconName="share" aria-label="Share" />
        </div>
      </Layout>
    </Layout>
  );
}

const meta = {
  title: "Examples/Information Demo",
  component: InformationDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A rich information page demonstrating how UXElle components compose together. " +
          "Content sourced from the uxElle Design System — covering color tokens, " +
          "typography scale, and FAQ patterns.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InformationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
