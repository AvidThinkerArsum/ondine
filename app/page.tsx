import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Maison } from "@/components/Maison";
import { Inner } from "@/components/Inner";
import { Collection } from "@/components/Collection";
import { Enquiry } from "@/components/Enquiry";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Maison />
      <Inner />
      <Collection />
      <Enquiry />
    </main>
  );
}
