import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52, 211, 153, 0.25), 0 18px 60px rgba(4, 120, 87, 0.25)"
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "Menlo", "Monaco", "monospace"]
      },
      backgroundImage: {
        "emerald-radial": "radial-gradient(circle at top, rgba(16, 185, 129, 0.18), transparent 38%)",
        "surface-grid": "linear-gradient(rgba(110, 231, 183, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(110, 231, 183, 0.08) 1px, transparent 1px)"
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 8s ease-in-out infinite alternate",
        pulseLine: "pulseLine 1.8s ease-in-out infinite",
        ticker: "ticker 30s linear infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-18px)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" }
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
