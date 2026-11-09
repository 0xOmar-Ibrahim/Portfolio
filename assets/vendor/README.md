# Vendored libraries

Self-hosted so the site has no third-party script dependencies at runtime (`script-src 'self'`).

| File | Package | Version |
| --- | --- | --- |
| `gsap.min.js`, `ScrollTrigger.min.js`, `SplitText.min.js` | gsap | 3.15.1 |
| `lenis.min.js` | lenis | 1.3.27 |
| `three.subset.min.js` | three | 0.187.0 (tree-shaken) |
| `motion.subset.min.js` | motion | 14.11.1 (`animate`, `stagger`) |

The two subset files were bundled with esbuild, from an entry file that re-exports only the
names the site imports:

```
npx esbuild entry.js --bundle --minify --format=esm --outfile=three.subset.min.js
```

If `js/hero-scene.js` starts using a new three.js class, add it to the entry file and rebuild.
