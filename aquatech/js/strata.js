import * as THREE from 'three';

const clamp = (value) => Math.min(1, Math.max(0, value));

function createStrata(canvas, { mode = 'loop' } = {}) {
  const host = canvas.closest('[data-strata]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const initialProgress = reducedMotion ? 1 : 0;
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
  } catch (error) {
    console.warn('A WebGL nem érhető el. A statikus talajmetszet marad látható.', error);
    return { setProgress: () => {}, dispose: () => {} };
  }

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5.3, 5.3, 3.3, -3.3, 0.1, 80);
  camera.position.set(9.4, 8.6, 11.2);
  camera.lookAt(0, -2.55, 0);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  scene.add(new THREE.AmbientLight(0xffffff, 2.3));
  const sun = new THREE.DirectionalLight(0xffffff, 3.0);
  sun.position.set(-5, 9, 7);
  scene.add(sun);

  const blockGroup = new THREE.Group();
  scene.add(blockGroup);
  const dimensions = { width: 8.4, depth: 4.5 };
  const trench = { left: -1.15, right: 1.15, front: -0.8, back: 0.8, floor: -2.78 };

  function addBlock(x1, x2, z1, z2, top, bottom, color) {
    const width = x2 - x1;
    const depth = z2 - z1;
    const height = top - bottom;
    if (width <= 0 || depth <= 0 || height <= 0) return;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshLambertMaterial({ color });
    const box = new THREE.Mesh(geometry, material);
    box.position.set((x1 + x2) / 2, (top + bottom) / 2, (z1 + z2) / 2);
    blockGroup.add(box);

    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edges = new THREE.LineSegments(edgeGeometry, new THREE.LineBasicMaterial({
      color: 0x494c45,
      transparent: true,
      opacity: 0.27
    }));
    edges.position.copy(box.position);
    blockGroup.add(edges);
  }

  function addLayer(top, bottom, color) {
    const visibleBottom = Math.max(bottom, trench.floor);
    addBlock(-dimensions.width / 2, trench.left, -dimensions.depth / 2, dimensions.depth / 2, top, visibleBottom, color);
    addBlock(trench.right, dimensions.width / 2, -dimensions.depth / 2, dimensions.depth / 2, top, visibleBottom, color);
    addBlock(trench.left, trench.right, -dimensions.depth / 2, trench.front, top, visibleBottom, color);
    addBlock(trench.left, trench.right, trench.back, dimensions.depth / 2, top, visibleBottom, color);

    if (bottom < trench.floor) {
      addBlock(-dimensions.width / 2, dimensions.width / 2, -dimensions.depth / 2, dimensions.depth / 2, trench.floor, bottom, color);
    }
  }

  addLayer(0, -0.72, 0x756149);
  addLayer(-0.72, -2.05, 0xc6a571);
  addLayer(-2.05, -4.02, 0x858982);
  addBlock(-dimensions.width / 2, dimensions.width / 2, -dimensions.depth / 2, dimensions.depth / 2, -4.02, -6.3, 0xa4745b);

  const pitFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(trench.right - trench.left, trench.back - trench.front),
    new THREE.MeshLambertMaterial({ color: 0x77796f, side: THREE.DoubleSide })
  );
  pitFloor.rotation.x = -Math.PI / 2;
  pitFloor.position.set(0, trench.floor + 0.01, 0);
  blockGroup.add(pitFloor);

  const wellMaterial = new THREE.MeshLambertMaterial({
    color: 0xeee7d6,
    transparent: true,
    opacity: 0.78
  });
  const wellPositions = [
    [-2.0, -1.32], [-0.7, -1.32], [0.7, -1.32], [2.0, -1.32],
    [-2.0, 1.32], [-0.7, 1.32], [0.7, 1.32], [2.0, 1.32]
  ];
  const wells = wellPositions.map(([x, z]) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 5.8, 7), wellMaterial.clone());
    mesh.position.set(x, -2.9, z);
    blockGroup.add(mesh);
    return mesh;
  });

  const collectorPoints = [
    new THREE.Vector3(-2, 0.04, -1.32),
    new THREE.Vector3(-0.7, 0.04, -1.32),
    new THREE.Vector3(0.7, 0.04, -1.32),
    new THREE.Vector3(2, 0.04, -1.32),
    new THREE.Vector3(2, 0.04, 1.32),
    new THREE.Vector3(0.7, 0.04, 1.32),
    new THREE.Vector3(-0.7, 0.04, 1.32),
    new THREE.Vector3(-2, 0.04, 1.32),
    new THREE.Vector3(-2, 0.04, -1.32)
  ];
  const collectorCurve = new THREE.CatmullRomCurve3(collectorPoints, true, 'centripetal');
  const collector = new THREE.Mesh(
    new THREE.TubeGeometry(collectorCurve, 64, 0.035, 6, true),
    new THREE.MeshLambertMaterial({ color: 0x51564f, transparent: true, opacity: 0.9 })
  );
  blockGroup.add(collector);

  const waterGeometry = new THREE.PlaneGeometry(dimensions.width, dimensions.depth, 42, 24);
  waterGeometry.rotateX(-Math.PI / 2);
  const waterMaterial = new THREE.MeshBasicMaterial({
    color: 0x2d8996,
    transparent: true,
    opacity: 0.69,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  scene.add(water);
  const waterBase = -1.2;
  const waterDepth = 4.6;
  waterGeometry.boundingSphere = new THREE.Sphere(
    new THREE.Vector3(0, waterBase - waterDepth / 2, 0),
    Math.hypot(dimensions.width / 2, dimensions.depth / 2, waterDepth / 2)
  );
  const waterVertices = waterGeometry.attributes.position;
  const waterBaseHeights = [];
  for (let index = 0; index < waterVertices.count; index += 1) {
    const x = waterVertices.getX(index);
    const z = waterVertices.getZ(index);
    const outsideX = Math.max(Math.abs(x) - 1.05, 0);
    const outsideZ = Math.max(Math.abs(z) - 0.68, 0);
    const distance = Math.hypot(outsideX, outsideZ);
    const influence = Math.exp(-((distance / 1.45) ** 2));
    waterBaseHeights.push({ y: waterBase, influence });
  }

  const labelPositions = {
    surface: new THREE.Vector3(-3.15, 0.12, 1.9),
    water: new THREE.Vector3(0.45, waterBase, 0.92),
    drawdown: new THREE.Vector3(-1.85, -1.23, 1.2)
  };
  const labels = host ? [...host.querySelectorAll('[data-strata-label]')] : [];
  let progress = initialProgress;
  let visible = false;
  let timer = 0;
  let frame = initialProgress === 1 ? 60 : 0;
  let direction = initialProgress === 1 ? -1 : 1;
  let disposed = false;
  let ready = false;

  function updateLabels() {
    if (!host) return;
    const width = host.clientWidth;
    const height = host.clientHeight;
    labels.forEach((label) => {
      const position = labelPositions[label.getAttribute('data-strata-label')];
      if (!position) return;
      const point = position.clone();
      if (label.getAttribute('data-strata-label') === 'water') point.y = waterBase - progress * waterDepth;
      point.project(camera);
      label.style.left = `${((point.x + 1) / 2) * width}px`;
      label.style.top = `${((1 - point.y) / 2) * height}px`;
      if (label.getAttribute('data-strata-label') === 'water') {
        label.textContent = progress > 0.55 ? 'TVSZ −5,8 m' : 'TVSZ −1,2 m';
      }
    });
  }

  function render() {
    if (disposed || !visible || !ready) return;
    renderer.render(scene, camera);
    updateLabels();
  }

  function setProgress(value) {
    progress = reducedMotion ? 1 : clamp(value);
    for (let index = 0; index < waterVertices.count; index += 1) {
      const base = waterBaseHeights[index];
      waterVertices.setY(index, base.y - waterDepth * progress * base.influence);
    }
    waterVertices.needsUpdate = true;
    wells.forEach((well) => {
      well.material.opacity = 0.24 + progress * 0.68;
    });
    render();
  }

  function resize() {
    if (!host || disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const viewHeight = 12;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.left = -viewHeight * camera.aspect / 2;
    camera.right = viewHeight * camera.aspect / 2;
    camera.updateProjectionMatrix();
    updateLabels();
    render();
  }

  function stopLoop() {
    window.clearTimeout(timer);
    timer = 0;
  }

  function advanceLoop() {
    if (disposed || !visible || mode !== 'loop' || reducedMotion) return;
    frame += direction;
    setProgress(frame / 60);
    if (frame >= 60 || frame <= 0) {
      direction *= -1;
      timer = window.setTimeout(advanceLoop, 1400);
      return;
    }
    timer = window.setTimeout(advanceLoop, 65);
  }

  const resizeObserver = new ResizeObserver(resize);
  if (host) resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) stopLoop();
    else if (ready) {
      render();
      if (mode === 'loop' && !reducedMotion && !timer) timer = window.setTimeout(advanceLoop, 800);
    }
  }, { threshold: 0.01 });
  if (host) visibilityObserver.observe(host);
  resize();
  setProgress(initialProgress);
  renderer.compileAsync(scene, camera).then(() => {
    if (disposed) return;
    ready = true;
    host?.setAttribute('data-webgl-ready', 'true');
    resize();
    setProgress(progress);
    if (visible && mode === 'loop' && !reducedMotion && !timer) timer = window.setTimeout(advanceLoop, 800);
  }).catch((error) => {
    console.error('A talajmetszet shaderei nem fordíthatók le. A statikus metszet marad látható.', error);
    host?.removeAttribute('data-webgl-ready');
    renderer.dispose();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
  });

  return {
    setProgress,
    dispose() {
      disposed = true;
      stopLoop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    }
  };
}

export { createStrata };
