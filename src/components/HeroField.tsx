"use client";
import { useEffect, useRef } from "react";

// Fond WebGL du hero : une grille de points en perspective, ondulée, qui réagit au
// pointeur et au défilement. Three.js est chargé à la demande, uniquement ici.
// Coupé sous prefers-reduced-motion, sans WebGL, et mis en pause hors écran.
export function HeroField() {
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
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.set(0, 1.6, 6);
      camera.lookAt(0, 1.9, -8);

      const COLS = 120, ROWS = 60, W = 26, D = 18;
      const pos = new Float32Array(COLS * ROWS * 3);
      let k = 0;
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        pos[k++] = (c / (COLS - 1) - 0.5) * W;
        pos[k++] = 0;
        pos[k++] = -(r / (ROWS - 1)) * D + 3;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
        uColor: { value: new THREE.Color("#2FE6B8") },
        uPx: { value: renderer.getPixelRatio() },
      };
      const mat = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader: `
          uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform float uPx;
          varying float vA;
          void main() {
            vec3 p = position;
            float w = sin(p.x * .35 + uTime * .6) * .35 + cos(p.z * .45 - uTime * .4) * .3;
            vec2 m = vec2(uMouse.x * 11., -uMouse.y * 6. - 4.);
            float d = distance(p.xz, m);
            w += exp(-d * d * .08) * .9;
            p.y = w - uScroll * 1.6;
            vec4 mv = modelViewMatrix * vec4(p, 1.);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uPx * (2.2 + w * 1.2) * (6. / -mv.z);
            vA = smoothstep(-15., -3., p.z) * (.5 + w * .55);
          }`,
        fragmentShader: `
          uniform vec3 uColor; varying float vA;
          void main() {
            float d = length(gl_PointCoord - .5);
            if (d > .5) discard;
            gl_FragColor = vec4(uColor, vA * smoothstep(.5, .1, d));
          }`,
      });
      scene.add(new THREE.Points(geo, mat));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const target = new THREE.Vector2();
      const onMove = (e: PointerEvent) => target.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true, raf = 0;
      const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; if (visible) loop(); });
      io.observe(el);

      const clock = new THREE.Clock();
      const loop = () => {
        cancelAnimationFrame(raf);
        if (!visible || disposed) return;
        uniforms.uTime.value = clock.getElapsedTime();
        uniforms.uMouse.value.lerp(target, 0.05);
        uniforms.uScroll.value = Math.min(window.scrollY / window.innerHeight, 1.5);
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
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} className="hero-field" aria-hidden="true" />;
}
