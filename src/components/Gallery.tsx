"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "@/content/objects";

export function Gallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [failed, setFailed] = useState<number[]>([]);

  const photoOf = (image: GalleryImage, i: number) =>
    image.src && !failed.includes(i) ? image.src : undefined;
  const canZoom = images.some((image, i) => photoOf(image, i));

  const go = (next: number) => setIndex((next + images.length) % images.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const frame = requestAnimationFrame(() => setLightboxVisible(true));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") stepPhoto(-1);
      if (event.key === "ArrowRight") stepPhoto(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, index]);

  function close() {
    setLightboxVisible(false);
    setTimeout(() => setLightboxOpen(false), 350);
  }

  /** Moves to the next slide that actually has a photo, skipping empty slots. */
  function stepPhoto(direction: number) {
    for (let step = 1; step <= images.length; step += 1) {
      const candidate = (index + direction * step + images.length * images.length) % images.length;
      if (photoOf(images[candidate], candidate)) {
        setIndex(candidate);
        return;
      }
    }
  }

  const current = images[index];
  const currentSrc = photoOf(current, index);

  return (
    <>
      <div
        className="gal"
        style={canZoom ? undefined : { cursor: "default" }}
        onClick={() => {
          if (currentSrc) setLightboxOpen(true);
        }}
      >
        <div className="gal__t" style={{ transform: `translateX(${-index * 100}%)` }}>
          {images.map((image, i) => {
            const src = photoOf(image, i);
            return (
              <div className="gal__f" key={i}>
                {src ? (
                  <img
                    src={src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    onError={() => setFailed((prev) => (prev.includes(i) ? prev : [...prev, i]))}
                  />
                ) : (
                  <div className="slot" role="img" aria-label={image.alt}>
                    <p className="slot__caption">{image.placeholder ?? image.alt}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {images.length > 1 ? (
          <>
            <button
              className="gal__b gal__b--prev"
              type="button"
              aria-label="Предыдущее фото"
              onClick={(event) => {
                event.stopPropagation();
                go(index - 1);
              }}
            />
            <button
              className="gal__b gal__b--next"
              type="button"
              aria-label="Следующее фото"
              onClick={(event) => {
                event.stopPropagation();
                go(index + 1);
              }}
            />
            <div className="gal__d">
              {images.map((_, i) => (
                <i key={i} className={i === index ? "on" : undefined} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {lightboxOpen && currentSrc ? (
        <div
          className={`lightbox${lightboxVisible ? " show" : ""}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button className="lb__x" type="button" aria-label="Закрыть" onClick={close} />
          <button
            className="gal__b gal__b--prev lb__nav"
            type="button"
            aria-label="Предыдущее фото"
            onClick={() => stepPhoto(-1)}
          />
          <figure className="lb__fig">
            <img src={currentSrc} alt={current.alt} />
            <figcaption>{`${title} — фото ${index + 1} из ${images.length}`}</figcaption>
          </figure>
          <button
            className="gal__b gal__b--next lb__nav"
            type="button"
            aria-label="Следующее фото"
            onClick={() => stepPhoto(1)}
          />
        </div>
      ) : null}
    </>
  );
}
