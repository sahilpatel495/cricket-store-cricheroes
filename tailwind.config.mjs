export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};


// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           50: "#f8f9fa",
//           100: "#f1f3f5",
//           200: "#e9ecef",
//           300: "#dee2e6",
//           400: "#ced4da",
//           500: "#adb5bd",
//           600: "#868e96",
//           700: "#495057",
//           800: "#343a40",
//           900: "#212529",
//         },
//         primary: {
//           50: "#eff6ff",
//           100: "#dbeafe",
//           200: "#bfdbfe",
//           300: "#93c5fd",
//           400: "#60a5fa",
//           500: "#3b82f6",
//           600: "#2563eb",
//           700: "#1d4ed8",
//           800: "#1e40af",
//           900: "#1e3a8a",
//         },
//         accent: {
//           50: "#f5f3ff",
//           100: "#ede9fe",
//           200: "#ddd6fe",
//           300: "#c4b5fd",
//           400: "#a78bfa",
//           500: "#8b5cf6",
//           600: "#7c3aed",
//           700: "#6d28d9",
//           800: "#5b21b6",
//           900: "#4c1d95",
//         },
//         gray: {
//           50: "#f9fafb",
//           100: "#f3f4f6",
//           200: "#e5e7eb",
//           300: "#d1d5db",
//           400: "#9ca3af",
//           500: "#6b7280",
//           600: "#4b5563",
//           700: "#374151",
//           800: "#1f2937",
//           900: "#111827", // Dark gray/black shade
//         },
//       },
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//         display: ['Montserrat', 'sans-serif'],
//       },
//       boxShadow: {
//         soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
//         card: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05)',
//       },
//       borderRadius: {
//         xl: '1rem',
//         '2xl': '1.5rem',
//       },
//     },
//   },
//   plugins: [],
// };
// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           50: "#f8f9fa",
//           100: "#f1f3f5",
//           200: "#e9ecef",
//           300: "#dee2e6",
//           400: "#ced4da",
//           500: "#adb5bd",
//           600: "#868e96",
//           700: "#495057",
//           800: "#343a40",
//           900: "#212529",
//         },
//         primary: {
//           50: "#eff6ff",
//           100: "#dbeafe",
//           200: "#bfdbfe",
//           300: "#93c5fd",
//           400: "#60a5fa",
//           500: "#3b82f6",
//           600: "#2563eb",
//           700: "#1d4ed8",
//           800: "#1e40af",
//           900: "#1e3a8a",
//         },
//         accent: {
//           50: "#f5f3ff",
//           100: "#ede9fe",
//           200: "#ddd6fe",
//           300: "#c4b5fd",
//           400: "#a78bfa",
//           500: "#8b5cf6",
//           600: "#7c3aed",
//           700: "#6d28d9",
//           800: "#5b21b6",
//           900: "#4c1d95",
//         },
//       },
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//         display: ['Montserrat', 'sans-serif'],
//       },
//       boxShadow: {
//         soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
//         card: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05)',
//       },
//       borderRadius: {
//         xl: '1rem',
//         '2xl': '1.5rem',
//       },
//     },
//   },
//   plugins: [],
// };

