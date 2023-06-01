import Link from "next/link";

function notFound() {
  return (
    <main>
      <h2>404</h2>
      <p>
        Il semblerait qu&apos;en voulant prendre ton raccourcis, tu es tombé
        dans le vide.
      </p>
      <p>
        Pour que Lakitu te ramène en lieu sûr, tu peux cliquer{" "}
        <Link href="/">ici</Link>.
      </p>
    </main>
  );
}

export default notFound;
