// login/layout.tsx
import React, { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className=" items-center justify-center px-4 max-w-7xl mx-auto  h-screen w-screen overflow-hidden flex flex-col">
      {children}
    </main>
  );
};

export default LoginLayout;
