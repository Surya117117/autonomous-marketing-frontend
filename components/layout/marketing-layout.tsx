import type { ReactNode } from "react";
import { MarketingNav } from "@/components/navigation/marketing-nav";
import { Footer } from "@/components/marketing/footer";

interface MarketingLayoutProps {
  children: ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0716]">
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
