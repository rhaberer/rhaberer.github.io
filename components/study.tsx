"use client";
import { avatarSvg, cubeCentres } from "@/lib/avatar";
import { useEffect, useRef, useState } from "react";
import { event } from "@/lib/events";
const finishes = [
  { name: "Porcelain", color: "#f5eee7" },
  { name: "Coral", color: "#ff9966" },
  { name: "Chrome", color: "#bcc2c5" },
];
export function Study() {
  const host = useRef<HTMLDivElement>(null);
  const rotating = useRef(true);
  const [paused, setPaused] = useState(false);
  const api = useRef<{
    update: (finish: number, separation: number, wire: boolean) => void;
    rotate: () => void;
    reset: () => void;
  } | null>(null);
  const [finish, setFinish] = useState(0),
    [separation, setSeparation] = useState(12),
    [wire, setWire] = useState(false),
    [status, setStatus] = useState("loading");
  useEffect(() => {
    let destroyed = false;
    let cleanup = () => {};
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(async (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      try {
        const THREE = await import("three");
        const [
          { RoomEnvironment },
          { RoundedBoxGeometry },
          { EffectComposer },
          { RenderPass },
          { OutputPass },
          { ShaderPass },
        ] = await Promise.all([
          import("three/addons/environments/RoomEnvironment.js"),
          import("three/addons/geometries/RoundedBoxGeometry.js"),
          import("three/addons/postprocessing/EffectComposer.js"),
          import("three/addons/postprocessing/RenderPass.js"),
          import("three/addons/postprocessing/OutputPass.js"),
          import("three/addons/postprocessing/ShaderPass.js"),
        ]);
        if (destroyed) return;
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0, 0);
        renderer.toneMapping = THREE.AgXToneMapping;
        renderer.toneMappingExposure = 1.15;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;
        element.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 100);
        camera.position.set(8, 8, 8);
        camera.lookAt(0, 0, 0);
        // Canvas MSAA alone does not antialias offscreen post-processing buffers.
        const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
          type: THREE.HalfFloatType,
          samples: Math.min(4, renderer.capabilities.maxSamples),
        });
        const composer = new EffectComposer(renderer, renderTarget);
        const renderPass = new RenderPass(scene, camera);
        const outputPass = new OutputPass();
        // Static, sub-pixel grain breaks up colour banding without shimmering.
        // Preserve alpha so the page background continues through the canvas.
        const grainPass = new ShaderPass({
          uniforms: { tDiffuse: { value: null } },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tDiffuse;
            varying vec2 vUv;
            void main() {
              vec4 color = texture2D(tDiffuse, vUv);
              float grain = fract(52.9829189 * fract(dot(gl_FragCoord.xy,
                vec2(0.06711056, 0.00583715)))) - 0.5;
              color.rgb = clamp(color.rgb + grain / 255.0, 0.0, 1.0);
              gl_FragColor = color;
            }
          `,
        });
        composer.addPass(renderPass);
        composer.addPass(outputPass);
        composer.addPass(grainPass);
        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        const environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        scene.environmentIntensity = 0.65;
        room.dispose();
        pmrem.dispose();
        const group = new THREE.Group();
        scene.add(group);
        group.rotation.set(0, 0, 0);
        const material = new THREE.MeshPhysicalMaterial({
          color: "#f5eee7",
          metalness: 0,
          roughness: 0.3,
          clearcoat: 0.28,
          clearcoatRoughness: 0.24,
        });
        const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.045);
        const outlineBox = new THREE.BoxGeometry(1, 1, 1);
        const edgeGeometry = new THREE.EdgesGeometry(outlineBox);
        outlineBox.dispose();
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: "#40352f",
          transparent: true,
          opacity: 0.72,
        });
        const right = new THREE.Vector3(1, 0, -1).normalize();
        const isometricUp = new THREE.Vector3(-1, 2, -1).normalize();
        const modules = cubeCentres.map((c) => {
          const module = new THREE.Group();
          const origin = right
            .clone()
            .multiplyScalar((c.x - 200) / 58.78775)
            .add(isometricUp.clone().multiplyScalar((200 - c.y) / 58.78775));
          const surface = new THREE.Mesh(geometry, material);
          surface.castShadow = true;
          surface.receiveShadow = true;
          module.add(surface);
          const outline = new THREE.LineSegments(edgeGeometry, edgeMaterial);
          outline.visible = false;
          module.add(outline);
          module.position.copy(origin);
          group.add(module);
          return { module, origin, surface, outline };
        });
        let viewportWidth = 1,
          viewportHeight = 1;
        const fitCamera = () => {
          group.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          const bounds = new THREE.Box3().setFromObject(group);
          floor.position.y = bounds.min.y - 0.08;
          let extentX = 0,
            extentY = 0;
          for (const x of [bounds.min.x, bounds.max.x])
            for (const y of [bounds.min.y, bounds.max.y])
              for (const z of [bounds.min.z, bounds.max.z]) {
                const p = new THREE.Vector3(x, y, z).applyMatrix4(
                  camera.matrixWorldInverse,
                );
                extentX = Math.max(extentX, Math.abs(p.x));
                extentY = Math.max(extentY, Math.abs(p.y));
              }
          const aspect = viewportWidth / viewportHeight;
          const halfHeight = Math.max(extentY, extentX / aspect) * 1.15;
          camera.left = -halfHeight * aspect;
          camera.right = halfHeight * aspect;
          camera.top = halfHeight;
          camera.bottom = -halfHeight;
          camera.updateProjectionMatrix();
        };
        const floorGeometry = new THREE.PlaneGeometry(200, 200);
        const floorMaterial = new THREE.ShadowMaterial({
          color: "#635449",
          opacity: 0.18,
          depthWrite: false,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -3.1;
        floor.receiveShadow = true;
        scene.add(floor);
        scene.add(new THREE.HemisphereLight(0xfff6ed, 0x777e89, 0.45));
        const fill = new THREE.DirectionalLight(0xdce9ff, 0.6);
        fill.position.set(4, 2, -5);
        scene.add(fill);
        const light = new THREE.DirectionalLight(0xfff1de, 2.6);
        light.position.set(-3, 7, 5);
        light.castShadow = true;
        light.shadow.mapSize.set(2048, 2048);
        light.shadow.camera.left = -7;
        light.shadow.camera.right = 7;
        light.shadow.camera.top = 7;
        light.shadow.camera.bottom = -7;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 30;
        light.shadow.bias = -0.0002;
        light.shadow.normalBias = 0.025;
        light.shadow.radius = 6;
        light.shadow.blurSamples = 12;
        scene.add(light);
        let visible = true,
          frame = 0,
          last = 0,
          pointer = false,
          px = 0,
          py = 0;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        const render = () => composer.render();
        const update = (f: number, t: number, w: boolean) => {
          material.color.set(finishes[f].color);
          material.metalness = f === 2 ? 1 : 0;
          material.roughness = f === 2 ? 0.19 : f === 1 ? 0.34 : 0.3;
          material.clearcoat = f === 2 ? 0 : 0.28;
          floor.visible = !w;
          modules.forEach(({ module, origin, surface, outline }) => {
            module.position.copy(origin).multiplyScalar(1 + (t / 100) * 0.55);
            surface.visible = !w;
            outline.visible = w;
          });
          fitCamera();
          render();
        };
        update(0, 12, false);
        const resize = new ResizeObserver(() => {
          const { width, height } = element.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height);
          composer.setSize(width, height);
          viewportWidth = width;
          viewportHeight = height;
          fitCamera();
          render();
        });
        resize.observe(element);
        const visibility = new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
        });
        visibility.observe(element);
        const down = (e: PointerEvent) => {
          pointer = true;
          rotating.current = false;
          setPaused(true);
          px = e.clientX;
          py = e.clientY;
          renderer.domElement.setPointerCapture(e.pointerId);
        };
        const move = (e: PointerEvent) => {
          if (!pointer) return;
          group.rotation.y += (e.clientX - px) * 0.01;
          group.rotation.x += (e.clientY - py) * 0.008;
          px = e.clientX;
          py = e.clientY;
          fitCamera();
          render();
        };
        const up = () => {
          pointer = false;
        };
        renderer.domElement.addEventListener("pointerdown", down);
        renderer.domElement.addEventListener("pointermove", move);
        renderer.domElement.addEventListener("pointerup", up);
        renderer.domElement.addEventListener("pointercancel", up);
        const lost = (e: Event) => {
          e.preventDefault();
          setStatus("unavailable");
        };
        renderer.domElement.addEventListener("webglcontextlost", lost);
        const animate = (time: number) => {
          frame = requestAnimationFrame(animate);
          if (
            time - last < 40 ||
            !rotating.current ||
            !visible ||
            document.hidden ||
            reduced.matches ||
            pointer
          )
            return;
          last = time;
          group.rotation.y = Math.sin(time * 0.00022) * 0.12;
          fitCamera();
          render();
        };
        frame = requestAnimationFrame(animate);
        api.current = {
          update,
          rotate: () => {
            rotating.current = false;
            setPaused(true);
            group.rotation.y += Math.PI / 6;
            fitCamera();
            render();
          },
          reset: () => {
            group.rotation.set(0, 0, 0);
            fitCamera();
            render();
          },
        };
        setStatus("ready");
        cleanup = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          visibility.disconnect();
          renderer.domElement.removeEventListener("pointerdown", down);
          renderer.domElement.removeEventListener("pointermove", move);
          renderer.domElement.removeEventListener("pointerup", up);
          renderer.domElement.removeEventListener("pointercancel", up);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          renderPass.dispose();
          outputPass.dispose();
          grainPass.dispose();
          composer.dispose();
          geometry.dispose();
          edgeGeometry.dispose();
          edgeMaterial.dispose();
          floorGeometry.dispose();
          floorMaterial.dispose();
          light.shadow.dispose();
          material.dispose();
          environment.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          api.current = null;
        };
      } catch {
        if (!destroyed) setStatus("unavailable");
      }
    });
    observer.observe(element);
    return () => {
      destroyed = true;
      observer.disconnect();
      cleanup();
    };
  }, []);
  useEffect(() => {
    api.current?.update(finish, separation, wire);
  }, [finish, separation, wire, status]);
  function reset() {
    setFinish(0);
    setSeparation(12);
    setWire(false);
    api.current?.reset();
  }
  return (
    <div className="study">
      <div className="study-top mono">
        <span>
          <i className="status-dot" /> Modular study / 01
        </span>
        <span>↗ Live 3D</span>
      </div>
      <div
        ref={host}
        className="study-canvas"
        role="img"
        aria-label="Interactive cube assembly based on the original GitHub avatar. Use the controls below to change finish and form."
      >
        {status !== "ready" && (
          <div className="study-fallback">
            <div
              className="symbol-fallback"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: avatarSvg }}
            />
            <p className="mono">
              {status === "loading"
                ? "Preparing the form…"
                : "Cube identity. 3D preview unavailable on this device."}
            </p>
          </div>
        )}
      </div>
      <span className="drag-hint mono">↔ Drag to rotate</span>
      <div className="study-controls">
        <fieldset>
          <legend className="mono">Finish</legend>
          <div className="swatches">
            {finishes.map((f, i) => (
              <button
                key={f.name}
                aria-label={`${f.name} finish`}
                aria-pressed={finish === i}
                title={f.name}
                onClick={() => {
                  setFinish(i);
                  event("study_finish", { finish: f.name });
                }}
                style={{ "--swatch": f.color } as React.CSSProperties}
                className={finish === i ? "swatch selected" : "swatch"}
              />
            ))}
          </div>
        </fieldset>
        <label className="separation-control">
          <span className="mono">
            Separation <output>{separation}%</output>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={separation}
            onChange={(e) => setSeparation(Number(e.target.value))}
          />
        </label>
        <button
          className="wire-button"
          aria-pressed={wire}
          onClick={() => setWire(!wire)}
        >
          {wire ? "Solid" : "Outline"}
        </button>
      </div>
      <div className="study-bottom mono">
        <span>Identity study / 2026</span>
        <div>
          <button
            onClick={() => api.current?.rotate()}
            aria-label="Rotate sculpture 30 degrees"
          >
            Rotate ↻
          </button>
          <button
            aria-pressed={paused}
            onClick={() => {
              rotating.current = paused;
              setPaused(!paused);
            }}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
