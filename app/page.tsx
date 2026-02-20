the error :Creating an optimized production build ...
✓ Compiled successfully in 7.9s
  Running TypeScript ...
  Collecting page data using 1 worker ...
  Generating static pages using 1 worker (0/10) ...
  Generating static pages using 1 worker (2/10) 
  Generating static pages using 1 worker (4/10) 
  Generating static pages using 1 worker (7/10) 
Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
Error [FirebaseError]: Firebase: Error (auth/invalid-api-key).
    at module evaluation (.next/server/chunks/ssr/[root-of-the-server]__4f66eea1._.js:1:1232)
    at instantiateModule (.next/server/chunks/ssr/[turbopack]_runtime.js:740:9)
    at getOrInstantiateModuleFromParent (.next/server/chunks/ssr/[turbopack]_runtime.js:763:12) {
  code: 'auth/invalid-api-key',
  customData: [Object],
  digest: '662322477'
}
Export encountered an error on /page: /, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
Error: Command "npm run build" exited with 1

page.tsx:import Header from "./components/Header";
import Hero from "./components/Hero";
import Localities from "./components/Localities";
import WhyUs from "./components/Whyus";
import Highlights from "./components/Highlights";
import Blogs from "./components/Blogs";
import CompareCTA from "./components/CompareCTA";
import StatsStrip from "./components/StatsStrip";
import Process from "./components/Process";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Listings from "./components/Listings";
import WhatsAppWidget from "./components/WhatsappWidget";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <StatsStrip />
      <Listings />
      
      <Categories />
      
      <Process />
      <CompareCTA />
      <Localities />
      
      <WhyUs />
      <Blogs />
      <Footer />
      <WhatsAppWidget/>
    </>
    
  );
  
}
