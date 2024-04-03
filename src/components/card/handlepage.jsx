export default function HandlePage({ Page, setPage }) {
  const scrollTop = scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <div className="flex w-full justify-center my-5">
      <button
        className="hover:underline text-xl"
        onClick={() => {
          if (Page !== 1) {
            setPage(Page - 1);
            scrollTop;
          }
        }}
      >
        Prev
      </button>
      <h1 className="px-5 text-2xl">{Page}</h1>
      <button
        className="hover:underline text-xl"
        onClick={() => {
          setPage(Page + 1);
          scrollTop;
        }}
      >
        Next
      </button>
    </div>
  );
}
