import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Tao Sun",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Press Start 2P",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // neutrals (dark UI background)
          light: "#111519",        // page background
          lightgray: "#1a1f24",    // cards / subtle panels
          gray: "#2a313a",         // borders / muted text
          darkgray: "#c7ccd1",     // secondary text on dark bg
          dark: "#ebebec",         // main text on dark bg

          // brand accents
          secondary: "#0624db",    // electric blue
          tertiary:  "#3bcffe",    // bright cyan

          // highlights
          highlight:    "rgba(204, 255, 2, 0.12)", // soft neon-yellow wash
          textHighlight:"#ccff0288",               // text selection / mark
        },
        darkMode: {
          // keep identical for both modes (requested)
          light: "#111519",
          lightgray: "#1a1f24",
          gray: "#2a313a",
          darkgray: "#c7ccd1",
          dark: "#ebebec",

          secondary: "#0624db",
          tertiary:  "#3bcffe",

          highlight:    "rgba(204, 255, 2, 0.12)",
          textHighlight:"#ccff0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
