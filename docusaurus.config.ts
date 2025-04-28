import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Nimbus',
  tagline: 'An NLP Depolyment Framework',
  favicon: 'img/nimbusMain.png',

  // Set the production url of your site here
  url: 'https://nimbusNLP.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  organizationName: 'nimbusNLP',
  deploymentBranch: 'gh-pages',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'nimbusNLP.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true
    },
    image: 'img/nimbusMain.png',
    navbar: {
      title: 'Nimbus',
      logo: {
        alt: 'Nimbus Logo',
        src: 'img/nimbusMain.png',
      },
      items: [
        {
          to: '/docs/introduction',
          label: 'CASE STUDY',
          position: 'right'
        },
        {
          to: '/docs/walkthrough',
          label: 'WALKTHROUGH',
          position: 'right'
        },
        {
          to: "/#team",
          label: "TEAM",
          position: "right",
          activeBasePath: "never-active",
        },
        {
          href: 'https://github.com/nimbusNLP',
          label: 'GITHUB',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
