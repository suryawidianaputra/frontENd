import "./globals.css";
import Card from "@/components/card/card.jsx";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="">
        <Card Edit={false} Limit={false} Header={"Top Anime"} />
      </div>
    </div>
  );
}
