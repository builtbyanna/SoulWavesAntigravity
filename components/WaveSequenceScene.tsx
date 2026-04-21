'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useSpring, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'

const FRAME_COUNT = 192

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, '0')
  return `/assets/frames/frame_${padded}_delay-0.041s.jpg`
}

export default function WaveSequenceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: FRAME_COUNT }, () => null)
  )
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Track full-page scroll progress (0 → 1)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // ── Draw a single frame onto the canvas ──────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = framesRef.current[index]
    if (!img || !img.complete || !img.naturalWidth) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // Cover: fill canvas while preserving aspect ratio (centre-crop)
    const canvasRatio = cw / ch
    const imgRatio = iw / ih

    let sx = 0, sy = 0, sw = iw, sh = ih

    if (canvasRatio > imgRatio) {
      // Canvas is wider → letterbox vertically
      sh = iw / canvasRatio
      sy = (ih - sh) / 2
    } else {
      // Canvas is taller → pillarbox horizontally
      sw = ih * canvasRatio
      sx = (iw - sw) / 2
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
  }, [])

  // ── Preload all frames ────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0

    const onLoad = (i: number) => () => {
      loadedCount++
      const pct = Math.round((loadedCount / FRAME_COUNT) * 100)
      setLoadProgress(pct)

      // Draw frame 0 as soon as it's ready — shows image immediately
      if (i === 0) drawFrame(0)

      if (loadedCount === FRAME_COUNT) setIsLoaded(true)
    }

    const onError = () => {
      loadedCount++
      if (loadedCount === FRAME_COUNT) setIsLoaded(true)
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image()
      img.src = getFrameSrc(i)
      img.onload = onLoad(i)
      img.onerror = onError
      framesRef.current[i] = img
    }
  }, [drawFrame])

  // ── Resize handler — re-size canvas & redraw current frame ───
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      // Use device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      drawFrame(currentFrameRef.current)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // ── Map scroll progress → frame index ───────────────────────
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * (FRAME_COUNT - 1)),
      FRAME_COUNT - 1
    )
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
    }
  })

  // ── Cleanup RAF on unmount ────────────────────────────────────
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* ── Loading screen ───────────────────────────────────── */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ background: '#FFF8EC' }}
          >
            {/* Logo */}
            <motion.img
              src="/assets/NewLogoTransparent.png"
              alt="Soul Waves"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-16 w-auto mb-12 object-contain"
            />

            {/* Progress bar */}
            <div className="w-52 h-px bg-[#E6CCB2] overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[#44140D] origin-left"
                style={{ scaleX: loadProgress / 100, transformOrigin: 'left' }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="mt-5 font-body font-light tracking-[0.25em] text-xs"
              style={{ color: 'var(--deep-brown)' }}
            >
              {loadProgress}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Canvas — fixed full-screen background ─────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
        }}
      />
    </>
  )
}
