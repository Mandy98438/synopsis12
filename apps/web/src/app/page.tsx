import { landingMetadata } from "@/lib/metadata";
import HomeClient from "./home-client";

export const metadata = landingMetadata;

export default function HomePage() {
  return <HomeClient />;
}
