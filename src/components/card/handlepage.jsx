export default function HandlePage({ Page, setPage, visiblePage }) {
  return (
    <div className="flex w-full justify-center my-5">
      <button
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => {
          if (Page !== 1) {
            setPage(Page - 1);
          }
        }}
      >
        Prev
      </button>
      <h1 className="px-5 text-2xl">
        {Page} / {visiblePage}
      </h1>
      <button
        className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 transition duration-300 ease-in-out"
        onClick={() => setPage(Page + 1)}
      >
        Next
      </button>
    </div>
  );
}
