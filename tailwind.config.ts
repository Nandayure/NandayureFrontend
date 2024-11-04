import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        'apple': {
        '50': '#f3faf3',
        '100': '#e3f5e3',
        '200': '#c8eac9',
        '300': '#9dd89f',
        '400': '#6bbd6e',
        '500': '#4caf50',
        '600': '#358438',
        '700': '#2d6830',
        '800': '#275429',
        '900': '#224525',
        '950': '#0e2510',
    },
    'dodger-blue': {
        '50': '#eefaff',
        '100': '#daf3ff',
        '200': '#bdebff',
        '300': '#8fe0ff',
        '400': '#5accff',
        '500': '#34b1fd',
        '600': '#2196f3',
        '700': '#167bdf',
        '800': '#1863b5',
        '900': '#1a548e',
        '950': '#153456',
    },
    'golden-dream': {
        '50': '#fdfced',
        '100': '#f9f5cc',
        '200': '#f3ea94',
        '300': '#edda5c',
        '400': '#eacd48',
        '500': '#e0ac20',
        '600': '#c68719',
        '700': '#a56318',
        '800': '#864e1a',
        '900': '#6f4118',
        '950': '#3f2109',
    },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config