/** @type {import('tailwindcss').Config} */
export default {
  "content": [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "on-primary-fixed": "#100069",
        "on-secondary-container": "#006f64",
        "secondary-fixed": "#71f8e4",
        "on-tertiary": "#ffffff",
        "surface-tint": "#5148d7",
        "on-tertiary-fixed-variant": "#003ea8",
        "on-secondary": "#ffffff",
        "surface-container-high": "#dce9ff",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#c1beff",
        "background": "#f8f9ff",
        "on-error": "#ffffff",
        "outline-variant": "#c7c4d7",
        "error": "#ba1a1a",
        "primary-fixed-dim": "#c3c0ff",
        "surface-bright": "#f8f9ff",
        "on-primary": "#ffffff",
        "surface-container-low": "#eff4ff",
        "on-tertiary-fixed": "#00174b",
        "inverse-primary": "#c3c0ff",
        "primary": "#2a14b4",
        "surface-variant": "#d3e4fe",
        "on-error-container": "#93000a",
        "on-surface-variant": "#464554",
        "tertiary-container": "#0047be",
        "inverse-on-surface": "#eaf1ff",
        "secondary-container": "#6df5e1",
        "surface-container-highest": "#d3e4fe",
        "on-secondary-fixed": "#00201c",
        "outline": "#777586",
        "on-surface": "#0b1c30",
        "primary-container": "#4338ca",
        "surface-container": "#e5eeff",
        "secondary": "#006b5f",
        "tertiary": "#00338d",
        "inverse-surface": "#213145",
        "tertiary-fixed-dim": "#b4c5ff",
        "secondary-fixed-dim": "#4fdbc8",
        "primary-fixed": "#e3dfff",
        "surface-dim": "#cbdbf5",
        "on-secondary-fixed-variant": "#005048",
        "surface": "#f8f9ff",
        "tertiary-fixed": "#dbe1ff",
        "on-background": "#0b1c30",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#b1c3ff",
        "on-primary-fixed-variant": "#372abf"
      },
      "spacing": {
        "space-sm": "0.5rem",
        "gutter-mobile": "1rem",
        "space-xl": "2rem",
        "space-2xl": "3rem",
        "margin-mobile": "1rem",
        "margin": "2rem",
        "space-xs": "0.25rem",
        "space-md": "1rem",
        "gutter": "1.5rem",
        "space-lg": "1.5rem"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "fontFamily": {
        "body-sm": [
          "Inter"
        ],
        "label-md": [
          "JetBrains Mono"
        ],
        "headline-sm": [
          "Inter"
        ],
        "headline-lg-mobile": [
          "Inter"
        ],
        "title-md": [
          "Inter"
        ],
        "headline-md": [
          "Inter"
        ],
        "label-sm": [
          "JetBrains Mono"
        ],
        "headline-xl": [
          "Inter"
        ],
        "body-lg": [
          "Inter"
        ],
        "headline-xl-mobile": [
          "Inter"
        ],
        "headline-lg": [
          "Inter"
        ],
        "code-block": [
          "JetBrains Mono"
        ],
        "body-md": [
          "Inter"
        ]
      },
      "fontSize": {
        // The type scale. Every text element maps to one of these steps.
        "t-title": ["2rem", { "lineHeight": "2.5rem", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "t-section": ["1.25rem", { "lineHeight": "1.75rem", "fontWeight": "600" }],
        "t-card": ["1rem", { "lineHeight": "1.5rem", "fontWeight": "600" }],
        "t-body": ["0.875rem", { "lineHeight": "1.375rem", "fontWeight": "400" }],
        "t-caption": ["0.75rem", { "lineHeight": "1rem", "fontWeight": "400" }],
        "t-mono": ["0.8125rem", { "lineHeight": "1.25rem", "fontWeight": "400" }],
        "t-status": ["0.75rem", { "lineHeight": "1rem", "letterSpacing": "0.04em", "fontWeight": "600" }],
        "t-button": ["0.875rem", { "lineHeight": "1.25rem", "fontWeight": "600" }],
        "t-nav": ["0.875rem", { "lineHeight": "1.25rem", "fontWeight": "500" }]
      }
    }
  },
  "plugins": []
};
