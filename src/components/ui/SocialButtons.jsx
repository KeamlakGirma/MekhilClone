const socials = [
  { name: 'Google', bg: '#fff', border: '#e5e7eb', glyph: 'G', color: '#EA4335' },
  { name: 'Facebook', bg: '#1877F2', border: '#1877F2', glyph: 'f', color: '#fff' },
  { name: 'LinkedIn', bg: '#0A66C2', border: '#0A66C2', glyph: 'in', color: '#fff' },
  { name: 'Apple', bg: '#000', border: '#000', glyph: '', color: '#fff' },
]

export default function SocialButtons() {
  return (
    <div className="flex justify-center gap-4">
      {socials.map((s) => (
        <button
          key={s.name}
          aria-label={s.name}
          className="w-10 h-10 rounded-full flex items-center justify-center border font-bold"
          style={{ background: s.bg, borderColor: s.border, color: s.color }}
        >
          {s.glyph}
        </button>
      ))}
    </div>
  )
}