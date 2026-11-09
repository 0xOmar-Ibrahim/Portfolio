// Hero: a procedurally routed circuit board. Signals travel out of a central IC along 45-degree
// traces; a few of them run vermilion. Merged into one geometry, so the board is one draw call.
import * as THREE from '../assets/vendor/three.subset.min.js';

const GOLD = new THREE.Color('#ecbc4e');
const SIGNAL = new THREE.Color('#ff5c38');
const MASK = new THREE.Color('#40264b');

function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fan traces out of each side of the chip. The stagger in `out` keeps neighbours parallel through
// the 45-degree bend, so traces never cross, the way a bus is really routed.
function routeTraces(chip, halfW, halfH, pinsPerSide, rand) {
  const traces = [];
  const pitch = (chip.size * 2 - 0.5) / (pinsPerSide - 1);
  const sides = [
    { n: [1, 0], t: [0, 1], reach: halfW * 1.25 - chip.x },
    { n: [-1, 0], t: [0, 1], reach: halfW * 1.25 + chip.x },
    { n: [0, 1], t: [1, 0], reach: halfH * 1.25 - chip.y },
    { n: [0, -1], t: [1, 0], reach: halfH * 1.25 + chip.y },
  ];
  for (const side of sides) {
    const mid = (pinsPerSide - 1) / 2;
    for (let i = 0; i < pinsPerSide; i++) {
      const offset = (i - mid) * pitch;
      const dir = Math.sign(i - mid) || 1;
      const spread = Math.abs(i - mid);
      const start = [
        chip.x + side.n[0] * chip.size + side.t[0] * offset,
        chip.y + side.n[1] * chip.size + side.t[1] * offset,
      ];
      const out = 0.5 + (mid - spread) * 0.24;
      const diag = 0.35 + spread * (0.42 + rand() * 0.02);
      const p = [start];
      const push = (dn, dt) => {
        const [x, y] = p[p.length - 1];
        p.push([x + side.n[0] * dn + side.t[0] * dt * dir, y + side.n[1] * dn + side.t[1] * dt * dir]);
      };
      push(out, 0);
      push(diag, diag);
      let left = side.reach - out - diag;
      // Occasional second jog so long runs do not read as ruled lines.
      if (rand() < 0.42 && left > 4) {
        const run = 1.4 + spread * 0.2;
        push(run, 0);
        push(0.55, 0.55);
        left -= run + 0.55;
      }
      push(Math.max(left, 0.5), 0);
      traces.push({ pts: p, hot: rand() < 0.12, seed: rand(), via: rand() < 0.12 });
    }
  }
  return traces;
}

function buildRibbons(traces, width) {
  const pos = [], along = [], seed = [], hot = [], idx = [];
  let maxLen = 0;
  const hw = width / 2;
  for (const tr of traces) {
    const pts = tr.pts;
    const base = pos.length / 3;
    let len = 0;
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(i - 1, 0)];
      const cur = pts[i];
      const next = pts[Math.min(i + 1, pts.length - 1)];
      let d1x = cur[0] - prev[0], d1y = cur[1] - prev[1];
      let d2x = next[0] - cur[0], d2y = next[1] - cur[1];
      const l1 = Math.hypot(d1x, d1y) || 1, l2 = Math.hypot(d2x, d2y) || 1;
      if (i > 0) len += l1;
      d1x /= l1; d1y /= l1; d2x /= l2; d2y /= l2;
      if (i === 0) { d1x = d2x; d1y = d2y; }
      if (i === pts.length - 1) { d2x = d1x; d2y = d1y; }
      // Mitred join: push along the bisector normal so bends keep a constant width.
      let nx = -(d1y + d2y), ny = d1x + d2x;
      const nl = Math.hypot(nx, ny) || 1;
      nx /= nl; ny /= nl;
      const m = hw / Math.max(0.5, nx * -d2y + ny * d2x);
      pos.push(cur[0] + nx * m, cur[1] + ny * m, 0, cur[0] - nx * m, cur[1] - ny * m, 0);
      along.push(len, len);
      seed.push(tr.seed, tr.seed);
      hot.push(tr.hot ? 1 : 0, tr.hot ? 1 : 0);
      if (i < pts.length - 1) {
        const a = base + i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    tr.len = len;
    maxLen = Math.max(maxLen, len);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute('aAlong', new THREE.BufferAttribute(new Float32Array(along), 1));
  g.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(seed), 1));
  g.setAttribute('aHot', new THREE.BufferAttribute(new Float32Array(hot), 1));
  g.setIndex(idx);
  return { geometry: g, maxLen };
}

function chipTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = '#1b0d20';
  x.fillRect(0, 0, 512, 512);
  x.strokeStyle = 'rgba(236,188,78,.55)';
  x.lineWidth = 3;
  x.strokeRect(22, 22, 468, 468);
  x.fillStyle = '#ecbc4e';
  x.beginPath();
  x.arc(62, 62, 12, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = '#ebe6f3';
  x.font = '800 92px Anybody, Impact, sans-serif';
  x.textAlign = 'center';
  x.fillText('0x4FMR', 256, 268);
  x.fillStyle = '#ad9fbd';
  x.font = '400 25px "Martian Mono", monospace';
  x.fillText('OFFSEC / SILICON', 256, 326);
  x.fillText('GIZA EG  REV 3', 256, 366);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export async function startBoard(canvas, { reduced = false } = {}) {
  try { await document.fonts.ready; } catch (e) { /* fall back to system fonts */ }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 21);

  const rig = new THREE.Group();    // pointer parallax + scroll
  const board = new THREE.Group();  // AnimationMixer clips
  rig.add(board);
  scene.add(rig);

  const rand = seeded(0x4f4d4152); // "OMAR": the same board on every visit
  const portrait = () => innerWidth / innerHeight < 0.95;
  const chip = { x: 4.6, y: 3.4, size: 1.6 };
  const traces = routeTraces(chip, 18, 11, 15, rand);
  const { geometry, maxLen } = buildRibbons(traces, 0.042);

  const uniforms = {
    uTime: { value: 0 },
    uReveal: { value: reduced ? 1 : 0 },
    uMaxLen: { value: maxLen },
    uPointer: { value: new THREE.Vector2(99, 99) },
    uChip: { value: new THREE.Vector2(chip.x, chip.y) },
    uGold: { value: GOLD },
    uSignal: { value: SIGNAL },
    uMask: { value: MASK },
  };

  const traceMat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */`
      attribute float aAlong; attribute float aSeed; attribute float aHot;
      varying float vAlong; varying float vSeed; varying float vHot; varying vec2 vXY;
      void main(){
        vAlong = aAlong; vSeed = aSeed; vHot = aHot; vXY = position.xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime, uReveal, uMaxLen;
      uniform vec2 uPointer, uChip;
      uniform vec3 uGold, uSignal, uMask;
      varying float vAlong; varying float vSeed; varying float vHot; varying vec2 vXY;
      void main(){
        if (vAlong > uReveal * uMaxLen) discard;
        float speed = 1.6 + vSeed * 2.4;
        float gap = 13.0 + vSeed * 16.0;
        float head = mod(vAlong - uTime * speed + vSeed * 40.0, gap);
        float pulse = smoothstep(gap - 2.2, gap, head);
        vec3 lit = mix(uGold, uSignal, vHot);
        float near = smoothstep(4.5, 0.0, distance(vXY, uPointer));
        vec3 col = mix(uMask * 1.5, uGold * 0.72, 0.34 + near * 0.66);
        col = mix(col, lit * 1.3, pulse);
        float fade = smoothstep(19.0, 6.0, distance(vXY, uChip));
        gl_FragColor = vec4(col, (0.5 + 0.5 * max(pulse, near)) * mix(0.3, 1.0, fade));
      }`,
  });
  board.add(new THREE.Mesh(geometry, traceMat));

  // Plated rings at trace ends and vias, instanced.
  const ends = [];
  for (const tr of traces) {
    ends.push(tr.pts[tr.pts.length - 1]);
    if (tr.via) ends.push(tr.pts[Math.max(tr.pts.length - 2, 1)]);
  }
  const ringMat = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: reduced ? 0.45 : 0 });
  const rings = new THREE.InstancedMesh(new THREE.RingGeometry(0.055, 0.115, 18), ringMat, ends.length);
  const m = new THREE.Matrix4();
  ends.forEach((e, i) => { m.makeTranslation(e[0], e[1], 0.002); rings.setMatrixAt(i, m); });
  board.add(rings);

  // The package.
  const chipSize = chip.size * 2;
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(chipSize, chipSize, 0.32),
    [0, 1, 2, 3].map(() => new THREE.MeshBasicMaterial({ color: '#0c040e' }))
      .concat([new THREE.MeshBasicMaterial({ map: chipTexture() }), new THREE.MeshBasicMaterial({ color: '#0c040e' })]),
  );
  body.position.set(chip.x, chip.y, 0.17);
  board.add(body);

  // Keyframed motion: a one-shot power-on that crossfades into a slow idle.
  const mixer = new THREE.AnimationMixer(board);
  const qa = new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.08, 0.22, 0.2));
  const qb = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.42, 0.1, 0.03));
  const qc = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.46, 0.05, 0.05));
  const intro = new THREE.AnimationClip('powerOn', 2.6, [
    new THREE.VectorKeyframeTrack('.position', [0, 2.6], [0, -2, -9, 0, 0, 0]),
    new THREE.QuaternionKeyframeTrack('.quaternion', [0, 2.6], [...qa.toArray(), ...qb.toArray()]),
  ]);
  const idle = new THREE.AnimationClip('idle', 16, [
    new THREE.VectorKeyframeTrack('.position', [0, 8, 16], [0, 0, 0, 0, 0.14, 0.2, 0, 0, 0]),
    new THREE.QuaternionKeyframeTrack('.quaternion', [0, 8, 16], [...qb.toArray(), ...qc.toArray(), ...qb.toArray()]),
  ]);
  const introAction = mixer.clipAction(intro);
  introAction.setLoop(THREE.LoopOnce, 1);
  introAction.clampWhenFinished = true;
  const idleAction = mixer.clipAction(idle);
  idleAction.setLoop(THREE.LoopRepeat, Infinity);

  const state = { scroll: 0, px: 0, py: 0, tx: 0, ty: 0, visible: true, base: { x: 0, y: 0, s: 1 } };

  function fit() {
    const w = canvas.clientWidth || innerWidth;
    const h = canvas.clientHeight || innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 800 ? 1.5 : 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // On tall screens, shrink the board and park the chip in the clear space above the name.
    const tall = portrait();
    state.base = tall ? { x: -0.5, y: 0.9, s: 0.6 } : { x: 0, y: 0, s: 1 };
    rig.scale.setScalar(state.base.s);
    rig.position.x = state.base.x;
    camera.position.z = tall ? 27 : 21;
  }

  function draw() {
    rig.rotation.x = state.py * 0.05 + state.scroll * 0.55;
    rig.rotation.y = state.px * 0.07;
    rig.position.z = state.scroll * 7;
    rig.position.y = state.base.y + state.scroll * 2.2;
    renderer.render(scene, camera);
  }

  fit();
  addEventListener('resize', fit, { passive: true });

  if (reduced) {
    board.quaternion.copy(qb);
    uniforms.uTime.value = 7.3;
    draw();
    addEventListener('resize', draw, { passive: true });
    return { setScroll() {}, begin() {} };
  }

  const timer = new THREE.Timer();
  timer.connect(document); // keeps deltas small after the tab has been hidden

  const onPointer = (e) => {
    state.tx = (e.clientX / innerWidth) * 2 - 1;
    state.ty = (e.clientY / innerHeight) * 2 - 1;
    // Project the pointer onto the board plane so nearby traces light up under it.
    const v = new THREE.Vector3(state.tx, -state.ty, 0.5).unproject(camera).sub(camera.position).normalize();
    const t = -camera.position.z / v.z;
    uniforms.uPointer.value.set(camera.position.x + v.x * t, camera.position.y + v.y * t + 0.8);
  };
  if (matchMedia('(hover: hover)').matches) addEventListener('pointermove', onPointer, { passive: true });

  const loop = () => {
    timer.update();
    const dt = timer.getDelta();
    uniforms.uTime.value = timer.getElapsed();
    mixer.update(dt);
    state.px += (state.tx - state.px) * 0.05;
    state.py += (state.ty - state.py) * 0.05;
    draw();
  };

  const setRunning = (on) => renderer.setAnimationLoop(on ? loop : null);
  new IntersectionObserver(([e]) => { state.visible = e.isIntersecting; setRunning(state.visible); }).observe(canvas);

  return {
    setScroll(p) { state.scroll = p; },
    begin(gsap) {
      introAction.play();
      setTimeout(() => {
        idleAction.reset().play();
        introAction.crossFadeTo(idleAction, 1.6, false);
      }, 2300);
      gsap.to(uniforms.uReveal, { value: 1, duration: 3.1, ease: 'power2.inOut' });
      gsap.to(ringMat, { opacity: 0.45, duration: 1.2, delay: 1.9 });
    },
  };
}
