import "./globals.css";
import Card from "@/components/card/card.jsx";

export default function Home() {
  return (
    <div>
      <div className="">
        <Card Edit={false} Limit={false} Header={"Top Anime"} />
      </div>
    </div>
  );
}
