// Simple SVG approximation of the Mekhil logo (stylized swoosh + wordmark).
// Replace with real asset when available.
export default function Logo() {
  return (
    <div className="flex flex-col items-center w-[120px]">
      <svg viewBox="0 0 120 50" className="w-full">
        <defs>
          <linearGradient id="mekhilGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3FBBD9" />
            <stop offset="100%" stopColor="#1B3A6B" />
          </linearGradient>
        </defs>
        <path
          d="M10,40 C20,15 40,8 60,12 C80,16 100,28 110,40 C95,32 75,26 60,26 C45,26 25,32 10,40 Z"
          fill="url(#mekhilGrad)"
        />
        <path
          d="M15,42 C30,30 50,24 65,26 C80,28 95,36 108,44"
          stroke="#1B3A6B"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <div className="text-navy font-bold text-[18px] leading-none -mt-1">መክህል</div>
      <div className="text-cyan text-[8px] tracking-[0.3em] font-semibold">MEKHIL</div>
    </div>
  )
}