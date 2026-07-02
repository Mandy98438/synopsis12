import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Kard - See how it works",
  description: "See a live example of a Kard - your digital identity card for everywhere.",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
