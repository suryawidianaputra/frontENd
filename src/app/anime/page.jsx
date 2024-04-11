import Card from "@/components/card/card.jsx";
import Navbar from "@/components/navbar/navbar";

export default function AnimeList() {
  return (
    <>
      <Navbar />;
      <div>
        <Card Edit={true} Header={`Anime`} Res={true} />
      </div>
    </>
  );
}
