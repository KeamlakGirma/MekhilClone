// Reusable wavy divider matching Mekhil's teal waves.
// variant: 'wave' (single curve) | 'wave-double' (stacked bands)
export default function WaveDivider({ variant = 'wave', flip = false, color = '#3FBBD9', className = '' }) {
  const transform = flip ? 'scale(-1,1) translate(-100%,0)' : undefined

  if (variant === 'wave-double') {
    return (
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className={`w-full h-[120px] ${className}`}>
        <path d="M0,60 C300,140 600,-20 900,60 C1100,120 1300,80 1440,40 L1440,0 L0,0 Z" fill={color} opacity="0.85" />
        <path d="M0,100 C300,180 600,20 900,100 C1100,160 1300,120 1440,80 L1440,180 L0,180 Z" fill={color} />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={`w-full h-[80px] ${className}`}
      style={{ transform }}
    >
      <path d="M0,50 C300,100 600,0 900,50 C1100,85 1300,65 1440,30 L1440,0 L0,0 Z" fill={color} />
    </svg>
  )
}