import LandingScreen from "@/components/LandingScreen";
import content from "@/lib/content";
import { datesToStrings } from "@/lib/dateToStrings";
import { Metadata } from "next";

export async function generateMetadata() {
  return {
    title: "Ferugi El Heri",
    description: "Full Stack Developer",
  } as Metadata;
}

export default async function Home() {
  const entry = datesToStrings(await content.getLandingScreen());

  return (
    <main className="min-h-screen relative">
      <LandingScreen entry={entry} />
    </main>
  );
}
