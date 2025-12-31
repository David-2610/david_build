import localFont from "next/font/local";

/* LUFGA – for headings */

export const lufga = localFont({
  src: [
    { path: "../../public/fonts/LUFGA/LufgaThin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaLight.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaRegular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaMedium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaSemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaBold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/LUFGA/LufgaBlack.ttf", weight: "900", style: "normal" },

    // Italics (optional but recommended)
    { path: "../../public/fonts/LUFGA/LufgaItalic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/LUFGA/LufgaMediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../../public/fonts/LUFGA/LufgaBoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-lufga",
  display: "swap",
});


/* URBANIST – for body (variable font) */
export const urbanist = localFont({
  src: [
    {
      path: "../../public/fonts/Urbanist/Urbanist-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist/Urbanist-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-urbanist",
  display: "swap",
});
