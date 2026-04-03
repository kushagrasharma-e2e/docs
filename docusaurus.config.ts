import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "E2E Networks",
  tagline: "Official Documentation for E2E Networks",
  favicon: "svg/favicon.svg",

  scripts: [
    {
      src: "https://plausible.io/js/pa-KkjSwLGOHK6zahVnqmzSZ.js",
      defer: true,
    },
  ],

  headTags: [
    {
      tagName: "script",
      attributes: {
        type: "text/javascript",
      },
      innerHTML:
        "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
    },
    {
      tagName: "meta",
      attributes: {
        name: "algolia-site-verification",
        content: "CB5D421CF1D4C87E",
      },
    },
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: "https://kushagrasharma-e2e.github.io/",
  baseUrl: "/docs/",

  organizationName: "E2E-Networks",
  projectName: "docs",

  onBrokenLinks: "warn",

  markdown: {
    format: "detect",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Mount docs directly under the site baseUrl so links resolve to
          // /docs/... instead of /docs/docs/...
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: ["./src/css/custom.css"],
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function disableNodePathFallback() {
      return {
        name: "disable-node-path-fallback",
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                path: false,
              },
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    algolia: {
      appId: "D6MVVM2390",
      apiKey: "4fb1d596c750f2c6b448cbef38609a10",
      indexName: "e2e-docs-crawler",
      contextualSearch: true,
      // Ask AI visibility also depends on Algolia dashboard setup:
      // the assistant must exist and the site domain must be whitelisted there.
      askAi: "UlKCYCNf39zp",
    },
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: "E2E Networks Logo",
        src: "svg/light/logo-e2e-networks.svg",
        srcDark: "svg/dark/logo-e2e-networks.svg",
      },
      items: [
        {
          type: "doc",
          docId: "myaccount/index",
          position: "left",
          label: "MyAccount",
          activeBaseRegex: "^/docs/myaccount(?:/.*)?$",
        },
        {
          type: "doc",
          docId: "tir/index",
          position: "left",
          label: "TIR",
          activeBaseRegex: "^/docs/tir(?:/.*)?$",
        },
        {
          position: "left",
          label: "API",
          className: "navbar-api-dropdown",
          activeBaseRegex: "^/api(?:/.*)?$",
          items: [
            {
              label: "MyAccount API",
              to: "/api/myaccount",
            },
            {
              label: "TIR API",
              to: "/api/tir",
            },
          ],
        },
        {
          to: "/release-notes",
          position: "left",
          label: "Release Notes",
        },
        {
          type: "doc",
          docId: "help/index",
          position: "left",
          label: "Support",
          activeBasePath: "/docs/help",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Platforms",
          items: [
            {
              label: "MyAccount",
              to: "https://myaccount.e2enetworks.com",
            },
            {
              label: "TIR",
              to: "https://tir.e2enetworks.com",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "X",
              href: "https://x.com/e2enetworks",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "https://www.e2enetworks.com/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/kushagrasharma-e2e/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} E2E Networks.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
