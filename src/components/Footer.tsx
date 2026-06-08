export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="label text-muted">
          MiniModding — BeamNG.drive mods
        </p>
        <p className="label text-muted">
          Static build · {year}
        </p>
      </div>
    </footer>
  );
}
