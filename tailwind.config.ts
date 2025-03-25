/* eslint-disable @typescript-eslint/no-require-imports */

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        love: {
          100: "#FFF5F7",
          200: "#FEE6EB",
          300: "#FDD1DB",
          400: "#FCACBF",
          500: "#FB8CA9",
          600: "#F9608B",
          700: "#F43F75",
          800: "#E9175F",
          900: "#CB0D50",
        },
        gold: {
          100: "#FFF9E6",
          200: "#FFF0BF",
          300: "#FFE799",
          400: "#FFDD73",
          500: "#FFD34D",
          600: "#FFC926",
          700: "#FFBF00",
          800: "#D9A300",
          900: "#B38600",
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
        player: {
          light: "#f8f9fa",
          dark: "#1a1a1a",
          accent: "#0070f3",
          text: "#333333",
          "text-light": "#666666",
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        flame: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1) translateY(-2px)", opacity: "0.8" },
        },
        blow: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
        "photo-float": {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
          "100%": { transform: "translateY(0) rotate(0deg)" },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(200px) rotate(720deg)",
            opacity: "0",
          },
        },
        "pulse-light": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.9" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        waveform: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "16px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-out": "fade-out 0.6s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "slide-down": "slide-down 0.8s ease-out",
        float: "float 6s ease-in-out infinite",
        "scale-in": "scale-in 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite",
        flame: "flame 1.5s ease-in-out infinite",
        blow: "blow 0.5s ease-out forwards",
        "photo-float": "photo-float 8s ease-in-out infinite",
        confetti: "confetti 3s ease-out forwards",
        "pulse-light": "pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin-slow 15s linear infinite",
        waveform: "waveform 1.2s ease-in-out infinite",
      },
      backgroundImage: {
        "love-gradient": "linear-gradient(135deg, #F9CEEE 0%, #FCB9E9 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
        glass:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
