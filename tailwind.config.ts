import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Georgia", "Times New Roman", "serif"],
        mono: ["JetBrains Mono", "Consolas", "Menlo", "Monaco", "monospace"]
      },
      colors: {
        sage: { DEFAULT: "#b8d4b0", lt: "#d4ead0", pale: "#eef5ec" },
        teal: { DEFAULT: "#4dc8bd", lt: "#7dd9d2", pale: "#e0f5f3" },
        wheat: { DEFAULT: "#ddc89a", lt: "#ede2c2" },
        coral: { DEFAULT: "#e8714a", lt: "#f4a98a", pale: "#fce8e0" },
        mint: { DEFAULT: "#b8e8e0", lt: "#daf3ef" },
        cream: { DEFAULT: "#f0ece0", dk: "#e5dfc9" },
        green: { dk: "#5a9e7a", md: "#7bbf96" },
        ink: { DEFAULT: "#2a2d24", md: "#4a5042", lt: "#7a8270" },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem"
      },
      boxShadow: {
        sm: "0 1px 4px rgba(42,45,36,.05), 0 2px 8px rgba(42,45,36,.04)",
        md: "0 4px 16px rgba(42,45,36,.08), 0 8px 24px rgba(42,45,36,.05)",
        lg: "0 8px 32px rgba(42,45,36,.10), 0 16px 48px rgba(42,45,36,.06)",
        glow: "0 0 0 3px rgba(77,200,189,.15), 0 4px 16px rgba(77,200,189,.2)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        floatBlob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-15px) scale(1.04)" },
          "66%": { transform: "translate(-10px,12px) scale(.97)" }
        },
        pulseLine: {
          "0%,100%": { opacity: ".4" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        ticker: "ticker 24s linear infinite",
        fadeUp: "fadeUp .5s ease both",
        floatBlob: "floatBlob 14s ease-in-out infinite",
        pulseLine: "pulseLine 1.8s ease-in-out infinite"
      },
      backgroundImage: {
        "pastel-radial":
          "radial-gradient(ellipse at 10% 0%, rgba(77,200,189,.09) 0%, transparent 40%), radial-gradient(ellipse at 90% 100%, rgba(184,212,176,.1) 0%, transparent 40%)"
      }
    }
  },
  plugins: []
};

export default config;
