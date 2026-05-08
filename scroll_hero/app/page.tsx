import { ScrollHeroClient } from "@/components/ScrollHeroClient";
import { FilmGrain } from "@/components/FilmGrain";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <FilmGrain />
      <ScrollHeroClient />
      <SpecsSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
