/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.

const siteConfig = {
  title: "4 Forms", // Title for your website.
  tagline:
    "A declarative, efficient, and flexible JavaScript validation library for Humans",
  url: "https://v4f.js.org", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "v4f",
  organizationName: "web-pyjs",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { label: "Getting Started", doc: "introduction/get-started" },
    { label: "API", doc: "api-reference/api" },
    {
      href: "https://github.com/web-pyjs/v4f",
      label: "Github",
      icon: "img/logo.png"
    },
    { page: "help", label: "Help" }
  ],

  // If you have users set above, you add it here:

  /* path to images for header/footer */
  headerIcon: "img/mini-logo.png",
  footerIcon: "img/mini-logo.png",
  favicon: "img/favicon.png",

  /* Colors for website */
  colors: {
    primaryColor: "#1565c0",
    secondaryColor: "#003c8f"
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Soufiane Nassih`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "monokai"
  },
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-block-buttons.js"
  ],
  // Add custom scripts here that would be placed in <script> tags.

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  scrollToTop: true,
  // No .html extensions for paths.
  cleanUrl: true,
  docsSideNavCollapsible: true,
  usePrism: ["javascript"],

  // Open Graph and Twitter card images.
  ogImage: "img/mini-logo.png",
  twitterImage: "img/mini-logo.png"

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
