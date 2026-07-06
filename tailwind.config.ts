import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        header: {
          DEFAULT: "hsl(var(--header))",
          foreground: "hsl(var(--header-foreground))",
        },
        star: "hsl(var(--star))",
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        warning: "hsl(var(--warning))",
        domain: {
          ml: "hsl(var(--domain-ml))",
          dl: "hsl(var(--domain-dl))",
          ai: "hsl(var(--domain-ai))",
          web: "hsl(var(--domain-web))",
          mobile: "hsl(var(--domain-mobile))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "blob-float-1": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "25%": { transform: "translateY(-18px) rotate(6deg) scale(1.05)" },
          "50%": { transform: "translateY(-8px) rotate(-4deg) scale(0.97)" },
          "75%": { transform: "translateY(-24px) rotate(8deg) scale(1.03)" },
        },
        "blob-float-2": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "33%": { transform: "translateY(-22px) rotate(-7deg) scale(1.06)" },
          "66%": { transform: "translateY(-10px) rotate(5deg) scale(0.96)" },
        },
        "blob-float-3": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "40%": { transform: "translateY(-14px) rotate(10deg) scale(1.04)" },
          "70%": { transform: "translateY(-28px) rotate(-6deg) scale(0.98)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(80px, 40px) scale(1.15)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-60px, -30px) scale(1.1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blob-float-1": "blob-float-1 7s ease-in-out infinite",
        "blob-float-2": "blob-float-2 9s ease-in-out infinite",
        "blob-float-3": "blob-float-3 11s ease-in-out infinite",
        "aurora-1": "aurora-1 12s ease-in-out infinite",
        "aurora-2": "aurora-2 10s ease-in-out infinite",
      },
      transitionDuration: {
        '1500': '1500ms',
        '6000': '6000ms',
        '8000': '8000ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;