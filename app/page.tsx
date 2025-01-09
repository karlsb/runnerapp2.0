
import dynamic from "next/dynamic";
import { LazyMap } from "../components/LazyMap";


import Map from "../components/Map"
export default function Home() {
  return (
    <main>
      <LazyMap />
    </main>
  );
}

