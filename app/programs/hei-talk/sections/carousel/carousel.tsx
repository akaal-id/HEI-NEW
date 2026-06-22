'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointerClick } from 'lucide-react';
import styles from './carousel.module.css';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop',
];

const CARD_WIDTH = 2.6;
const CARD_HEIGHT = 1.65;
const AUTO_SPEED = 0.12; // radians per second

export default function CarouselSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // ─── Scene setup ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      stage.clientWidth / stage.clientHeight,
      0.1,
      100,
    );

    const radius = (IMAGES.length * CARD_WIDTH * 1.3) / (Math.PI * 2);
    camera.position.set(0, 0.55, radius + 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    stage.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const geometry = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT);
    const backMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#0d4a4a'),
      side: THREE.FrontSide,
    });
    const disposables: { dispose: () => void }[] = [geometry, backMaterial];

    IMAGES.forEach((url, i) => {
      const angle = (i / IMAGES.length) * Math.PI * 2;

      const texture = loader.load(url);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
        transparent: true,
        opacity: 0,
      });
      disposables.push(texture, material);

      const card = new THREE.Group();
      card.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
      card.rotation.y = angle;

      const front = new THREE.Mesh(geometry, material);
      const back = new THREE.Mesh(geometry, backMaterial);
      back.rotation.y = Math.PI;
      back.position.z = -0.012;
      card.add(front, back);
      group.add(card);

      // Stagger the cards in once textures stream over the network
      gsap.to(material, { opacity: 1, duration: 1.2, delay: 0.15 + i * 0.08 });
    });

    // ─── Interaction: drag to spin, with inertia back to auto-rotate ───
    let dragging = false;
    let prevX = 0;
    let dragVelocity = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      stage.setPointerCapture(e.pointerId);
      stage.style.cursor = 'grabbing';
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - prevX;
      prevX = e.clientX;
      const delta = dx * 0.005;
      group.rotation.y += delta;
      dragVelocity = delta;
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
      stage.style.cursor = 'grab';
    };

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);

    // ─── Render loop (paused while offscreen) ───
    let rafId = 0;
    let lastTime = performance.now();
    let running = false;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!dragging) {
        group.rotation.y += AUTO_SPEED * dt + dragVelocity;
        dragVelocity *= 0.95;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visibility.observe(stage);

    const onResize = () => {
      camera.aspect = stage.clientWidth / stage.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(stage.clientWidth, stage.clientHeight);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(stage);

    // ─── Section entrance animation ───
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.header} > *`,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      );

      gsap.fromTo(
        stage,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: stage, start: 'top 80%' },
        },
      );
    }, rootRef);

    return () => {
      ctx.revert();
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', onPointerUp);
      stage.removeEventListener('pointercancel', onPointerUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      stage.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Atmosphere</span>
          <h3 className={styles.title}>
            Step Inside <em>the Forum</em>
          </h3>
          <p className={styles.lead}>
            Keynote stages, packed panels, and the conversations in between—a glimpse
            of the energy waiting at D-8 HEI Talk.
          </p>
        </div>

        <div ref={stageRef} className={styles.stage} role="img" aria-label="Rotating gallery of conference moments" />

        <div className={styles.hint} aria-hidden="true">
          <MousePointerClick size={16} strokeWidth={1.75} />
          Drag to explore
        </div>
      </div>
    </section>
  );
}
