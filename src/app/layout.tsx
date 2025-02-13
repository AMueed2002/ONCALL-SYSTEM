// "use client";

// import NavigationMenu from "@/components/NavigationMenu";
// import React from "react";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const [userRole, setUserRole] = React.useState("manager");

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <NavigationMenu
//           userRole={userRole}
//           isMenuOpen={isMenuOpen}
//           setIsMenuOpen={setIsMenuOpen}
//         />
//         <div className="lg:ml-64">{children}</div>
//       </body>
//     </html>
//   );
// }

"use client";

import NavigationMenu from "@/components/NavigationMenu";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [userRole, setUserRole] = React.useState("manager");

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex`}>
        <NavigationMenu
          userRole={userRole}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <main className="flex-1 lg:ml-64 pt-16 p-4 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
