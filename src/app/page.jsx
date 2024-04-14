import "./globals.css";
import Card from "@/components/card/card.jsx";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="bg-grey-500">
      <Navbar />
      <div className="">
        <Card Edit={true} Limit={false} Header={"Top Anime"} />
      </div>
    </div>
  );
}
