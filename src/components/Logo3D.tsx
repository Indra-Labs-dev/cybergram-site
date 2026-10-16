"use client";
import { useEffect, useRef } from "react";
import shapes from "./logo-shape.json";

// Logo CyberGram en relief : les contours vectorisés du logo (logo-shape.json, coordonnées
// de logo-icon.png) sont extrudés et biseautés. Il suit doucement le pointeur.
// Chargé à la demande, absent sous prefers-reduced-motion ou sans WebGL.
export function Logo3D() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      // Formes : y inversé (image → repère 3D), centrées sur le logo 280×170.
      const geoShapes = (shapes as number[][][]).map((poly) => new THREE.Shape(poly.map(([x, y]) => new THREE.Vector2((x! - 140) / 60, -(y! - 85) / 60))));
      const geo = new THREE.ExtrudeGeometry(geoShapes, { depth: 0.45, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 3, curveSegments: 1 });
      geo.center();

      const face = new THREE.MeshStandardMaterial({ color: "#2FE6B8", metalness: 0.55, roughness: 0.28, emissive: "#0b3d31", emissiveIntensity: 0.6 });
      const side = new THREE.MeshStandardMaterial({ color: "#0f5a48", metalness: 0.7, roughness: 0.35 });
      const logo = new THREE.Mesh(geo, [face, side]);
      scene.add(logo);

      // Contour filaire décalé, en écho « blueprint ».
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), new THREE.LineBasicMaterial({ color: "#6FF0CE", transparent: true, opacity: 0.18 }));
      edges.position.z = -0.35;
      edges.scale.setScalar(1.04);
      scene.add(edges);

      scene.add(new THREE.AmbientLight("#ffffff", 0.35));
      const key = new THREE.DirectionalLight("#ffffff", 2.4);
      key.position.set(-3, 4, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight("#2FE6B8", 3);
      rim.position.set(4, -2, -3);
      scene.add(rim);
      const warm = new THREE.PointLight("#FF9F2E", 6, 12);
      warm.position.set(3, -2, 3);
      scene.add(warm);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const target = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => { target.x = e.clientX / window.innerWidth - 0.5; target.y = e.clientY / window.innerHeight - 0.5; };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true, raf = 0;
      const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; if (visible) loop(); });
      io.observe(el);

      const clock = new THREE.Clock();
      const loop = () => {
        cancelAnimationFrame(raf);
        if (!visible || disposed) return;
        const t = clock.getElapsedTime();
        const intro = Math.min(t / 1.6, 1);
        const ease = 1 - Math.pow(1 - intro, 3);
        const ry = (1 - ease) * -Math.PI * 0.9 + Math.sin(t * 0.5) * 0.18 + target.x * 0.6;
        const rx = Math.cos(t * 0.4) * 0.08 + target.y * 0.4;
        logo.rotation.y += (ry - logo.rotation.y) * 0.08;
        logo.rotation.x += (rx - logo.rotation.x) * 0.08;
        logo.position.y = Math.sin(t * 0.8) * 0.06;
        edges.rotation.copy(logo.rotation);
        edges.position.y = logo.position.y;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      loop();
      el.classList.add("is-ready");

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        geo.dispose(); face.dispose(); side.dispose();
        edges.geometry.dispose(); (edges.material as InstanceType<typeof THREE.Material>).dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} className="logo3d" aria-hidden="true" />;
}
