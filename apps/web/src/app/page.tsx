import { landingMetadata } from "@/lib/metadata";
import HomeClient from "./home-client";
import KardNav from "@/components/core/KardNav";

export const metadata = landingMetadata;

export default function HomePage() {
  return (
    <>
      <KardNav />
      <HomeClient />
    </>
  );
}
