"use client";

import { useState } from "react";

export function CopyAnchor({ anchorId, label }: { anchorId: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      className="anchor-copy-btn"
      onClick={handleCopy}
      title={label || "Copier le lien direct vers cette section"}
      aria-label={label || "Copier le lien direct vers cette section"}
    >
      {copied ? (
        <span className="anchor-copy-btn__copied">✓ Copié</span>
      ) : (
        <span className="anchor-copy-btn__icon">#</span>
      )}
    </button>
  );
}
