/**
 * TravelCargo Interactive Experience Engine
 * Geographically Accurate 3D Doodle Globe, Fluid Continuous Plane Motion,
 * Compact Pill Live Match Card, and Interactive Modals.
 */

// Immediate and event-driven initialization for maximum production reliability
function bootstrap() {
  initNavbar();
  init3DDoodleGlobe();
  initButtonHoverAnimations();
  initLiveMatchTicker();
  initModals();
  initCalculators();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
window.addEventListener('load', () => {
  window.dispatchEvent(new Event('resize'));
});

/* ==========================================================================
   1. Navbar & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      } else {
        drawer.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
      }
    });

    const mobileLinks = drawer.querySelectorAll('a, button');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });
  }
}

/* ==========================================================================
   2. Geographically Accurate 3D Doodle Globe Engine
   ========================================================================== */
function init3DDoodleGlobe() {
  const canvas = document.getElementById('doodle-globe-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 600, height = 600, radius = 300, cx = 390, cy = 370;
  let rotationY = 1.3;
  const tiltX = 0.40; // ~23 degrees axial tilt
  const tiltZ = -0.16;

  // Real-world exact city coordinates (Latitude, Longitude in degrees)
  const cities = [
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Casablanca', lat: 33.5731, lon: -7.5898 },
    { name: 'Lagos', lat: 6.5244, lon: 3.3792 },
    { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
    { name: 'Nairobi', lat: -1.2921, lon: 36.8219 },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
    { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangkok', lat: 13.7563, lon: 100.5018 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 }
  ];

  // Active verified flight routes between real landmass locations
  const flightRoutes = [
    { from: 'Berlin', to: 'Mumbai', progress: 0.12, speed: 0.0016 },
    { from: 'London', to: 'Tokyo', progress: 0.48, speed: 0.0014 },
    { from: 'New York', to: 'Casablanca', progress: 0.76, speed: 0.0015 },
    { from: 'Dubai', to: 'Sydney', progress: 0.30, speed: 0.0013 },
    { from: 'São Paulo', to: 'Lagos', progress: 0.90, speed: 0.0015 }
  ];

  // Geographically accurate continent and major island outlines (Lat, Lon pairs)
  const continentPolygons = [
    // 1. Africa
    [
      [37, 10], [37, 11.5], [34, 11], [32, 13], [32, 20], [32, 24], [31.5, 32], [30, 32.5],
      [27.5, 34], [22, 37], [15.5, 40], [12, 44], [11.8, 51.2], [4, 48], [-0.5, 43], [-4.5, 39.5],
      [-10.5, 40.5], [-15, 40.5], [-26, 33], [-33, 27], [-34.8, 20], [-34, 18.5], [-28, 16],
      [-22, 14], [-15, 12], [-5, 12], [4, 7], [5, 2], [5, -4], [5.5, -9.5], [10, -14],
      [14.5, -17], [21, -17], [28, -13], [31, -10], [34, -6.5], [36, -5.5], [37, 2], [37, 10]
    ],
    // 2. Madagascar
    [
      [-12, 49.3], [-16, 49.8], [-25, 47], [-25.5, 44.5], [-16.5, 44], [-12, 49.3]
    ],
    // 3. Eurasia (Europe & Asia Mainland)
    [
      [36, -5.5], [37, -1.8], [42.5, 3], [43.5, 3.5], [44, -1.3], [46, -1.2], [48.5, -4.7],
      [50, 1.5], [53.5, 7], [55, 8.5], [57.5, 10.5], [55.5, 12.5], [58, 11.5], [63, 21.5],
      [65.5, 24], [70, 28], [71, 28], [68, 44], [67, 50], [68.5, 60], [70, 68], [73, 73],
      [76, 100], [77.5, 105], [74, 135], [72, 142], [70, 160], [66, 170], [60, 162],
      [58, 140], [53, 141], [43, 132], [38, 128], [35, 129], [34.5, 126.5], [37.5, 126],
      [39.5, 124], [38, 118], [32, 121.5], [25, 119], [22, 114], [21.5, 108], [13, 101],
      [1.5, 104], [6, 100], [15, 96], [22, 92], [22, 88], [16, 82], [8, 77.5], [13, 80],
      [19, 72.8], [21, 70], [25, 67], [25, 62], [25, 57], [30, 48], [30, 35], [37, 36],
      [38, 27], [40, 23], [42, 28], [46, 31], [46, 38], [42, 41], [40, 48], [44, 48],
      [47, 47], [45, 36], [44, 29], [41, 29], [40, 20], [45, 13], [44, 8], [43, 4],
      [41, 1], [37, -1.8], [36, -5.5]
    ],
    // 4. Japanese Archipelago (Honshu - Tokyo location, Hokkaido, Kyushu)
    [
      // Honshu
      [34, 131], [34.5, 133], [35, 135.5], [35.2, 139], [35.68, 139.7], [36.5, 140.8],
      [38.5, 141.5], [41.5, 141], [40.8, 140], [39, 139.8], [37.5, 137], [36.5, 136.5],
      [35.5, 133.5], [34.5, 131], [34, 131]
    ],
    [
      // Hokkaido
      [42, 140], [42, 143.5], [43.5, 145.5], [45.5, 142], [43, 141], [42, 140]
    ],
    [
      // Kyushu & Shikoku
      [31, 130.5], [32.5, 131.8], [33.8, 133.5], [34.2, 134.5], [33.5, 132], [33, 130],
      [31.5, 130.5], [31, 130.5]
    ],
    // 5. British Isles (Great Britain & Ireland)
    [
      // Great Britain (London location)
      [50, -5], [50.5, -1.8], [51.5, 1.2], [52.8, 1.7], [53.8, 0.2], [54.5, -0.5],
      [56, -2.5], [58.6, -3], [58.5, -5.2], [56, -5.5], [54.2, -3.2], [53, -4.5],
      [51.5, -4.5], [50, -5]
    ],
    [
      // Ireland
      [51.5, -9.5], [52.2, -6.2], [54, -5.5], [55.3, -7], [54.5, -10], [52.5, -10.5], [51.5, -9.5]
    ],
    // 6. Arabian Peninsula (Dubai location)
    [
      [30, 35], [28, 34.5], [22, 38.5], [16, 42.5], [12.8, 45], [12.2, 51], [17, 54.5],
      [22.5, 59.5], [25.5, 56.5], [25.2, 55.3], [26, 50], [30, 48], [30, 35]
    ],
    // 7. North America (New York location)
    [
      [15, -92], [18, -90], [21, -87], [25.5, -80.2], [30.5, -81.2], [35, -75.5],
      [40.7, -74.0], [44.5, -66.5], [47, -68], [52, -56], [58, -62], [60, -65],
      [62, -75], [55, -82], [51.5, -80], [56, -90], [60, -94], [64, -88], [70, -95],
      [72, -120], [71, -156], [65, -168], [60, -165], [58, -158], [54, -164],
      [57, -153], [60, -140], [55, -132], [48.5, -124.5], [42, -124.5], [34, -120],
      [30, -115], [23, -110], [19, -105], [15, -95], [15, -92]
    ],
    // 8. South America (São Paulo location)
    [
      [12, -72], [10.5, -62], [6, -52], [-2, -44], [-5, -35.2], [-12, -37.5], [-22, -41],
      [-23.55, -46.6], [-32, -52], [-38, -57.5], [-45, -65], [-54, -68], [-52, -75],
      [-45, -75], [-35, -72], [-18, -70], [-10, -78], [-4, -81], [2, -78.5], [8, -77], [12, -72]
    ],
    // 9. Australia & New Zealand (Sydney location)
    [
      // Australia
      [-12, 131], [-12, 136], [-15, 136], [-12, 142], [-16, 145.5], [-24, 153],
      [-32, 153], [-33.87, 151.2], [-37.5, 150], [-39, 146.5], [-38, 141], [-35, 137],
      [-35, 134], [-32, 132], [-32, 125], [-35, 118], [-34.5, 115], [-26, 113.5],
      [-20, 119], [-15, 124], [-14, 129], [-12, 131]
    ],
    [
      // New Zealand (North & South Island)
      [-35, 173.5], [-37, 175.5], [-39, 178], [-41.5, 175], [-39, 174], [-35, 173.5]
    ],
    [
      [-41, 172], [-43.5, 173], [-46.5, 170], [-46.5, 166.5], [-43, 169], [-41, 172]
    ],
    // 10. Southeast Asia & Indonesian Islands
    [
      // Sumatra
      [5.5, 95.5], [2, 98.5], [-3, 103], [-5.8, 105.5], [-4, 102], [0, 98.5], [5.5, 95.5]
    ],
    [
      // Java
      [-6, 106], [-6.5, 108.5], [-7.5, 112.5], [-8.5, 114], [-8, 110], [-7, 106.5], [-6, 106]
    ],
    [
      // Borneo
      [7, 117], [4.5, 118.5], [1, 119], [-3.5, 116], [-3.5, 112], [0.5, 109], [4, 114], [7, 117]
    ],
    [
      // Philippines (Luzon & Mindanao)
      [18.5, 121], [15, 121.5], [13, 124], [14, 120.5], [17, 120.5], [18.5, 121]
    ]
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const parent = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const computedWidth = rect.width || canvas.clientWidth || (parent ? parent.clientWidth : 0) || Math.min(window.innerWidth * 0.9, 1050) || 600;
    const computedHeight = rect.height || canvas.clientHeight || (parent ? parent.clientHeight : 0) || Math.min(window.innerWidth * 0.9, 1050) || 600;

    width = computedWidth;
    height = computedHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    radius = Math.min(width, height) * 0.52;
    cx = width * 0.65;
    cy = height * 0.62;
  }

  window.addEventListener('resize', resize, { passive: true });
  if (window.ResizeObserver && canvas.parentElement) {
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement);
  }
  resize();

  // 3D coordinate spherical projection
  function project(lat, lon, alt = 1.0) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180) + rotationY;

    // 3D Unit sphere
    let x = -alt * Math.sin(phi) * Math.cos(theta);
    let y = alt * Math.cos(phi);
    let z = alt * Math.sin(phi) * Math.sin(theta);

    // Rotate around X (tiltX)
    const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
    let y1 = y * cosX - z * sinX;
    let z1 = y * sinX + z * cosX;

    // Rotate around Z (tiltZ)
    const cosZ = Math.cos(tiltZ), sinZ = Math.sin(tiltZ);
    let x2 = x * cosZ - y1 * sinZ;
    let y2 = x * sinZ + y1 * cosZ;
    let z2 = z1;

    return {
      x: cx + x2 * radius,
      y: cy - y2 * radius,
      z: z2,
      visible: z2 > -0.1
    };
  }

  // Draw 2D Doodle Airplane on Canvas
  function drawDoodlePlane(x, y, angle, scale = 1.0, opacity = 1.0) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Solid Doodle Plane linework
    ctx.strokeStyle = '#200f07';
    ctx.fillStyle = '#FFF9EB';
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([]);

    // Fuselage
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(12, 0);
    ctx.stroke();

    // Wings with soft blue accent fill
    ctx.fillStyle = '#c4dae8';
    ctx.beginPath();
    ctx.moveTo(-3, -11);
    ctx.lineTo(2, -2);
    ctx.lineTo(9, 0);
    ctx.lineTo(2, 2);
    ctx.lineTo(-3, 11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Tail wing
    ctx.beginPath();
    ctx.moveTo(-8, -5);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-8, 5);
    ctx.stroke();

    // Nose dot
    ctx.fillStyle = '#c5e384';
    ctx.beginPath();
    ctx.arc(11, 0, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  // Main 60fps Continuous Render Loop
  let lastTime = performance.now();
  let frameCount = 0;

  function render(now) {
    const delta = Math.min(32, now - lastTime);
    lastTime = now;
    frameCount++;

    // Safety check on first 5 frames to guarantee canvas is sized once fonts/styles settle
    if (frameCount <= 5 && (width <= 10 || height <= 10)) {
      resize();
    }

    // Subtle, continuous, relaxing 3D rotation
    rotationY += 0.00014 * delta;

    ctx.clearRect(0, 0, width, height);

    // 1. Globe Horizon Outer Silhouette — SOLID CONTINUOUS LINE
    ctx.save();
    ctx.setLineDash([]);

    // Atmospheric subtle fill
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(196, 218, 232, 0.06)';
    ctx.fill();

    // Solid outer perimeter silhouette
    ctx.strokeStyle = '#c4dae8';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Secondary subtle atmospheric halo ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 3, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(196, 218, 232, 0.28)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // 2. Latitude Circles (Solid, continuous contour lines)
    const latSteps = [-60, -40, -20, 0, 20, 40, 60];
    latSteps.forEach(lat => {
      ctx.save();
      ctx.setLineDash([]);
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = project(lat, lon, 1.0);
        if (p.z > 0) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.strokeStyle = 'rgba(196, 218, 232, 0.42)';
      ctx.lineWidth = lat === 0 ? 1.8 : 1.1;
      ctx.stroke();
      ctx.restore();
    });

    // 3. Longitude Meridians (Solid, continuous contour lines)
    for (let lon = -180; lon < 180; lon += 30) {
      ctx.save();
      ctx.setLineDash([]);
      ctx.beginPath();
      let first = true;
      for (let lat = -80; lat <= 80; lat += 4) {
        const p = project(lat, lon, 1.0);
        if (p.z > 0) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.strokeStyle = 'rgba(196, 218, 232, 0.32)';
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Continent Outlines — GEOGRAPHICALLY ACCURATE SOLID LINES
    continentPolygons.forEach(polygon => {
      ctx.save();
      ctx.setLineDash([]);
      ctx.beginPath();
      let first = true;
      for (let i = 0; i < polygon.length; i++) {
        const [lat, lon] = polygon[i];
        const p = project(lat, lon, 1.0);
        if (p.z > -0.05) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.strokeStyle = '#c4dae8';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = 'rgba(196, 218, 232, 0.14)';
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    // 5. 3D Flight Arcs & Buttery-Smooth Continuous Gliding Planes between Real Landmasses
    flightRoutes.forEach(route => {
      const cityA = cities.find(c => c.name === route.from);
      const cityB = cities.find(c => c.name === route.to);
      if (!cityA || !cityB) return;

      // Smooth floating-point progress increment
      route.progress = (route.progress + route.speed * (delta / 16.67)) % 1;

      // Great Circle curved trajectory arc (Solid line)
      ctx.save();
      ctx.setLineDash([]);
      ctx.beginPath();
      const samples = 40;
      let prevPoint = null;

      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const lat = cityA.lat + (cityB.lat - cityA.lat) * t;
        const lon = cityA.lon + (cityB.lon - cityA.lon) * t;
        const arcAlt = 1.0 + Math.sin(t * Math.PI) * 0.14;
        const p = project(lat, lon, arcAlt);

        if (p.z > -0.1) {
          if (i === 0 || !prevPoint) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
          prevPoint = p;
        }
      }

      ctx.strokeStyle = 'rgba(196, 218, 232, 0.75)';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.restore();

      // Continuous exact-frame plane position & heading angle interpolation
      const t = route.progress;
      const curLat = cityA.lat + (cityB.lat - cityA.lat) * t;
      const curLon = cityA.lon + (cityB.lon - cityA.lon) * t;
      const curAlt = 1.0 + Math.sin(t * Math.PI) * 0.14;
      const planePos = project(curLat, curLon, curAlt);

      const nextT = Math.min(1.0, t + 0.02);
      const nextLat = cityA.lat + (cityB.lat - cityA.lat) * nextT;
      const nextLon = cityA.lon + (cityB.lon - cityA.lon) * nextT;
      const nextAlt = 1.0 + Math.sin(nextT * Math.PI) * 0.14;
      const nextPos = project(nextLat, nextLon, nextAlt);

      const planeAngle = Math.atan2(nextPos.y - planePos.y, nextPos.x - planePos.x);

      // Smooth fade-in near takeoff & fade-out near landing + back-hemisphere culling
      if (planePos.z > -0.05) {
        let opacity = 1.0;
        if (t < 0.08) opacity = t / 0.08;
        if (t > 0.92) opacity = (1.0 - t) / 0.08;
        if (planePos.z < 0.1) opacity *= Math.max(0, (planePos.z + 0.05) / 0.15);

        const planeScale = 0.8 + Math.max(0, planePos.z) * 0.22;
        drawDoodlePlane(planePos.x, planePos.y, planeAngle, planeScale, opacity);
      }
    });

    // 6. City Location Pins & Labels (Sit Precisely on Real Landmasses)
    cities.forEach(city => {
      const p = project(city.lat, city.lon, 1.0);
      if (p.z > 0.08) {
        const alpha = Math.min(1, (p.z - 0.08) * 3);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.setLineDash([]);

        // Pin Dot
        ctx.fillStyle = '#c5e384';
        ctx.strokeStyle = '#200f07';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // City Label
        ctx.font = '700 11px "Helvetica Neue", Helvetica, Arial, sans-serif';
        ctx.fillStyle = '#200f07';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.shadowColor = '#FFF9EB';
        ctx.shadowBlur = 3;
        ctx.fillText(city.name, p.x, p.y - 6);

        ctx.restore();
      }
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ==========================================================================
   3. Button Hover Animations
   ========================================================================== */
function initButtonHoverAnimations() {
  const btnSend = document.getElementById('btn-send-package');
  const confettiContainer = document.getElementById('parcel-confetti-container');

  if (btnSend && confettiContainer) {
    btnSend.addEventListener('mouseenter', () => {
      triggerConfettiBurst(confettiContainer);
    });
  }

  function triggerConfettiBurst(container) {
    container.innerHTML = '';
    const colors = ['#c5e384', '#c4dae8', '#200f07', '#d6eca5'];
    const particleCount = 14;

    for (let i = 0; i < particleCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'confetti-dot';
      
      const angle = (Math.PI / 180) * (-45 - Math.random() * 90);
      const distance = 20 + Math.random() * 24;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 360;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 3 + Math.random() * 3.5;

      dot.style.setProperty('--tx', `${tx}px`);
      dot.style.setProperty('--ty', `${ty}px`);
      dot.style.setProperty('--rot', `${rot}deg`);
      dot.style.backgroundColor = color;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      if (Math.random() > 0.5) dot.style.borderRadius = '2px';

      container.appendChild(dot);
    }

    setTimeout(() => {
      container.innerHTML = '';
    }, 700);
  }

  const btnRegister = document.getElementById('btn-register-trip');
  const planeSlot = document.getElementById('plane-icon-slot');

  if (btnRegister && planeSlot) {
    btnRegister.addEventListener('mouseenter', () => {
      planeSlot.classList.remove('flying');
      void planeSlot.offsetWidth;
      planeSlot.classList.add('flying');
    });

    planeSlot.addEventListener('animationend', () => {
      planeSlot.classList.remove('flying');
    });
  }
}

/* ==========================================================================
   4. Live Match Ticker (Rotating Route Pairs)
   ========================================================================== */
const activeMatches = [
  { from: 'Berlin', to: 'Mumbai', traveler: 'Elena R.', savings: '74%' },
  { from: 'London', to: 'Tokyo', traveler: 'Marcus T.', savings: '68%' },
  { from: 'New York', to: 'Casablanca', traveler: 'David C.', savings: '72%' },
  { from: 'Dubai', to: 'Nairobi', traveler: 'Aisha K.', savings: '70%' },
  { from: 'São Paulo', to: 'Lagos', traveler: 'Mateo S.', savings: '75%' },
  { from: 'Bangkok', to: 'Sydney', traveler: 'Lin W.', savings: '69%' }
];

function initLiveMatchTicker() {
  const matchRouteText = document.getElementById('match-route-text');
  const matchCard = document.getElementById('live-match-card');
  if (!matchRouteText || !matchCard) return;

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % activeMatches.length;
    const match = activeMatches[currentIndex];

    matchCard.style.transform = 'scale(0.96)';
    setTimeout(() => {
      matchRouteText.innerHTML = `<strong>${match.from}</strong> <span class="route-arrow">→</span> <strong>${match.to}</strong>`;
      matchCard.style.transform = 'scale(1)';
    }, 200);
  }, 4500);

  matchCard.addEventListener('click', () => {
    const current = activeMatches[currentIndex];
    showToast(`⚡ Active match: ${current.traveler} is flying ${current.from} → ${current.to} (${current.savings} cheaper)`);
  });
}

/* ==========================================================================
   5. Interactive Modals Management
   ========================================================================== */
function initModals() {
  const btnSend = document.getElementById('btn-send-package');
  const btnRegister = document.getElementById('btn-register-trip');
  const btnGetStarted = document.getElementById('btn-get-started');
  const btnLoginHeader = document.getElementById('btn-login-header');
  const linkPostRequest = document.getElementById('link-post-request');
  const mobileGetStarted = document.getElementById('mobile-btn-get-started');
  const mobileLogin = document.getElementById('mobile-btn-login');

  const closeSend = document.getElementById('modal-send-close');
  const closeTrip = document.getElementById('modal-trip-close');

  const modalSend = document.getElementById('modal-send-package');
  const modalTrip = document.getElementById('modal-register-trip');

  if (btnSend) btnSend.addEventListener('click', () => openModal('modal-send-package'));
  if (btnRegister) btnRegister.addEventListener('click', () => openModal('modal-register-trip'));
  if (btnGetStarted) btnGetStarted.addEventListener('click', () => openModal('modal-send-package'));
  if (mobileGetStarted) mobileGetStarted.addEventListener('click', () => openModal('modal-send-package'));
  
  if (btnLoginHeader) {
    btnLoginHeader.addEventListener('click', () => {
      showToast('🔑 Login / SSO popup simulated for peer-to-peer network');
    });
  }
  if (mobileLogin) {
    mobileLogin.addEventListener('click', () => {
      showToast('🔑 Login / SSO popup simulated');
    });
  }

  if (linkPostRequest) {
    linkPostRequest.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modal-send-package');
    });
  }

  if (closeSend) closeSend.addEventListener('click', () => closeModal('modal-send-package'));
  if (closeTrip) closeTrip.addEventListener('click', () => closeModal('modal-register-trip'));

  [modalSend, modalTrip].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('modal-send-package');
      closeModal('modal-register-trip');
    }
  });

  const formSend = document.getElementById('form-send-package');
  if (formSend) {
    formSend.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('modal-send-package');
      showToast('✨ Package request posted! 3 verified travelers notified on this route.');
    });
  }

  const formTrip = document.getElementById('form-register-trip');
  if (formTrip) {
    formTrip.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('modal-register-trip');
      showToast('🎉 Trip registered! Senders on your route can now request extra space.');
    });
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

/* ==========================================================================
   6. Dynamic Package & Trip Calculators
   ========================================================================== */
function initCalculators() {
  const weightSelect = document.getElementById('ship-weight');
  const finalCost = document.getElementById('calc-final-cost');

  if (weightSelect && finalCost) {
    const costMap = {
      'small': '$22.00',
      'medium': '$38.00',
      'large': '$74.00'
    };
    weightSelect.addEventListener('change', () => {
      finalCost.textContent = costMap[weightSelect.value] || '$38.00';
    });
  }

  const spaceSelect = document.getElementById('trip-space');
  const travelerEarnings = document.getElementById('calc-traveler-earnings');
  if (spaceSelect && travelerEarnings) {
    const earningMap = {
      '1kg': '$55.00',
      '3kg': '$145.00',
      '5kg': '$260.00'
    };
    spaceSelect.addEventListener('change', () => {
      travelerEarnings.textContent = earningMap[spaceSelect.value] || '$145.00';
    });
  }
}

/* ==========================================================================
   7. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
