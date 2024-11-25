import localFont from "next/font/local";
import { Great_Vibes } from "next/font/google";

export const ephesis = Great_Vibes({
    subsets: ["latin"],
    family: "Great Vibes",
    weight: ["400"]
});

export const gendy = localFont({
    src: [
        {
            path: '../Font/red-hat/red-hat-display-variable.woff2',
        }
    ],
    variable: '--font-gendy',
});