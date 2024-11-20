import Navbar from "../components/misc/navbar.jsx"
import Hero from "../components/home/hero.jsx"
import Catalog from "../components/home/catalog.jsx"
import Footer from "../components/home/footer.jsx"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white montserrat w-full no-scrollbar">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <main className="w-full min-h-screen flex flex-col">
        <Hero />
        <Catalog />
        <Footer />
        </main>
      </div>
    </div>
  );
}
