"use client";
import { useRef } from "react";

const SRC = "/video/cybergram-launch.mp4";
const POSTER = "/video/cybergram-launch-poster.jpg";

// Lecteur intégré (page Lancement) : rien ne se charge avant le clic, pas de lecture automatique.
export function VideoPlayer() {
  return (
    <figure className="vplayer">
      <video controls preload="none" poster={POSTER} playsInline width={1280} height={720}>
        <source src={SRC} type="video/mp4" />
      </video>
      <figcaption className="shot__cap"><span>Teaser de lancement · 30 s</span><span>Interfaces : données de démonstration</span></figcaption>
    </figure>
  );
}

// Bouton du hero : ouvre le teaser dans une boîte de dialogue native (Échap pour fermer).
export function VideoTeaserButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialog.current?.showModal();
    video.current?.play().catch(() => {});
  };
  const close = () => {
    video.current?.pause();
    dialog.current?.close();
  };

  return (
    <>
      <button type="button" className="btn btn--ghost vteaser-btn" onClick={open}>
        <span className="vteaser-btn__icon" aria-hidden="true" />Voir le teaser · 30 s
      </button>
      <dialog ref={dialog} className="vdialog" aria-label="Teaser de lancement CyberGram" onClose={() => video.current?.pause()} onClick={(e) => e.target === dialog.current && close()}>
        <div className="vdialog__inner">
          <button type="button" className="vdialog__close" onClick={close} aria-label="Fermer la vidéo">Fermer ✕</button>
          <video ref={video} controls preload="none" poster={POSTER} playsInline width={1280} height={720}>
            <source src={SRC} type="video/mp4" />
          </video>
        </div>
      </dialog>
    </>
  );
}
