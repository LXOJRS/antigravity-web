/**
 * shaderGradientBackground (vanilla, no deps)
 * ------------------------------------------------------------------
 * Animated WebGL gradient background. Hand-written GLSL recreation of a
 * shadergradient.org "plane" shader, tuned to the Lens AI palette
 * (filmic near-black dissolving into icy-blue and white).
 *
 *   const stop = shaderGradientBackground(canvasEl, {
 *     color1: '#121212', color2: '#bfe8f8', color3: '#fafafa'
 *   });
 *   // later: stop();   // cancels the loop + releases the GL context
 *
 * The canvas should fill a positioned parent (position:absolute; inset:0).
 * Respects prefers-reduced-motion (freezes on a representative frame).
 * No-ops if WebGL is unavailable, so give the parent a CSS fallback bg.
 */
(function (global) {
  const VERT = `
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2  uRes;
    uniform float uTime;
    uniform vec3  c1;
    uniform vec3  c2;
    uniform vec3  c3;

    const float uSpeed     = 0.2;
    const float uFrequency = 5.5;
    const float uDensity   = 1.3;
    const float uStrength  = 4.0;
    const float uAmplitude = 1.0;
    const float positionX  = -1.4;
    const float rotZ       = 0.8726646; // 50deg
    const float brightness = 1.2;

    vec2 hash2(vec2 p){
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }
    float gnoise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
            dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
        mix(dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
            dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x),
        u.y);
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.55;
      mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
      for(int i = 0; i < 5; i++){ v += a * gnoise(p); p = m * p; a *= 0.5; }
      return v;
    }
    void main(){
      vec2 uv = gl_FragCoord.xy / uRes.xy;
      vec2 q = uv - 0.5;
      q.x *= uRes.x / uRes.y;
      q.x += positionX * 0.18;
      float s = sin(rotZ), co = cos(rotZ);
      q = mat2(co, -s, s, co) * q;
      float t = uTime * uSpeed;
      vec2 fp = q * (uFrequency * 0.5 * uDensity);
      float flow = fbm(fp + vec2(t * 0.6, t * 0.35));
      vec2 wp = fp * 0.55 + vec2(-t * 0.4, t * 0.5) + flow * 1.4;
      float warp = fbm(wp);
      float sweep = -(q.x * 0.6 + q.y * 0.6) * 0.85 + 0.6;
      float field = sweep + (flow * 0.55 + warp * 0.45) * (uStrength * 0.15) * uAmplitude;
      float n = clamp(field, 0.0, 1.0);
      vec3 col = mix(c1, c2, smoothstep(0.0, 0.5, n));
      col = mix(col, c3, smoothstep(0.55, 0.98, n));
      float bloom = smoothstep(1.2, 0.0, length(q + vec2(0.45, 0.35)));
      col = mix(col, c2, bloom * 0.22);
      col *= brightness;
      float g = fract(sin(dot(gl_FragCoord.xy + t, vec2(12.9898, 78.233))) * 43758.5453);
      col += (g - 0.5) * 0.045;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  const hexToRGB = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  };

  function shaderGradientBackground(canvas, opts) {
    opts = opts || {};
    const c1 = hexToRGB(opts.color1 || '#121212');
    const c2 = hexToRGB(opts.color2 || '#bfe8f8');
    const c3 = hexToRGB(opts.color3 || '#fafafa');

    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false });
    if (!gl) return function () {};

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(sh));
      return sh;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    gl.uniform3fv(gl.getUniformLocation(prog, 'c1'), c1);
    gl.uniform3fv(gl.getUniformLocation(prog, 'c2'), c2);
    gl.uniform3fv(gl.getUniformLocation(prog, 'c3'), c3);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    window.addEventListener('resize', resize);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let raf;
    const loop = (now) => {
      resize();
      gl.uniform1f(uTime, reduce ? 6.0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return function stop() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = shaderGradientBackground;
  else global.shaderGradientBackground = shaderGradientBackground;
})(typeof window !== 'undefined' ? window : this);
