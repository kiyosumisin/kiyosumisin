import type { Metadata } from "next";
import { Be_Vietnam_Pro, EB_Garamond, Inconsolata } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const display = EB_Garamond({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
});

const code = Inconsolata({
  variable: "--font-code",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "KiyosumiSin",
  description: "Personal Profile of Kiyosumi Sin",
};

// Set the theme class before first paint to avoid a light/dark flash.
const themeInit = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${code.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <div className="sky" aria-hidden="true">
          <span className="nebula" style={{ top: "6%", left: "10%", width: "46vw", "--nebula-color": "var(--nebula-1)" } as React.CSSProperties} />
          <span className="nebula" style={{ top: "38%", left: "58%", width: "42vw", "--nebula-color": "var(--nebula-2)" } as React.CSSProperties} />
          <span className="nebula" style={{ top: "68%", left: "6%", width: "36vw", "--nebula-color": "var(--nebula-3)" } as React.CSSProperties} />
          <span className="sky-stars sky-stars-far" />
          <span className="sky-stars sky-stars-mid" />
          <div className="moon right-[6%] top-[12%]" />
          <span className="feather" style={{ top: "18%", left: "5%", "--dur": "17s" } as React.CSSProperties} />
          <span className="feather" style={{ top: "64%", left: "3%", scale: "0.7", animationDelay: "-6s", "--dur": "21s" } as React.CSSProperties} />
          <span className="feather" style={{ top: "30%", left: "93%", scale: "1.1", animationDelay: "-11s", "--dur": "19s" } as React.CSSProperties} />
          <span className="sky-stars sky-stars-near" />
        </div>
        {children}
      </body>
    </html>
  );
}
