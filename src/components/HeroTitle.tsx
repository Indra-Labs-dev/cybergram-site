import { Fragment, type CSSProperties } from "react";

// Titre révélé mot par mot (chaque mot monte derrière un masque). Le texte complet est
// porté par aria-label ; les fragments animés sont masqués aux lecteurs d'écran.
export function HeroTitle({ id, plain, accent }: { id: string; plain: string; accent: string }) {
  const words = [...plain.split(" ").map((w) => ({ w, a: false })), ...accent.split(" ").map((w) => ({ w, a: true }))];
  const plainCount = plain.split(" ").length;
  return (
    <h1 id={id} className="h1 hero-title" aria-label={`${plain} ${accent}`} style={{ marginTop: 28 }}>
      {words.map(({ w, a }, i) => (
        <Fragment key={i}>
          <span className="hero-title__mask" aria-hidden="true">
            <span className={`hero-title__w${a ? " accent" : ""}`} style={{ "--w": i } as CSSProperties}>{w}</span>
          </span>
          {i === plainCount - 1 ? <br /> : " "}
        </Fragment>
      ))}
    </h1>
  );
}
