const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'zUCD Docs',
  tagline: 'Docs on using UrbanCode Deploy for z/OS applications.',
  url: 'https://ronniegeraghty.github.io',
  baseUrl: '/zUCD-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ronniegeraghty', // Usually your GitHub org/user name.
  projectName: 'zUCD-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'zUCD Docs',
      logo: {
        alt: 'zUCD Docs Logo',
        src: 'img/deploy.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ronniegeraghty/zUCD-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'IBM DevOps',
              href: 'https://community.ibm.com/community/user/wasdevops/communities/devops-home',
            },
            {
              label: 'UrbanCode',
              href: 'https://community.ibm.com/community/user/wasdevops/communities/community-home?CommunityKey=9adfe6b6-2e23-4895-8b27-38b93b5e152c',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ronniegeraghty/zUCD-docs',
            },
          ],
        },
      ],
      //copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/ronniegeraghty/zUCD-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/ronniegeraghty/zUCD-docs/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
