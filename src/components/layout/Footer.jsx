import WaveDivider from './WaveDivider.jsx'

export default function Footer() {
  return (
    <footer className="bg-cyan text-white">
      <WaveDivider color="#3FBBD9" flip className="-mb-1" />
      <div className="bg-cyan pt-8 pb-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-12 px-8 text-sm">
          <div>
            <h4 className="text-white font-bold tracking-wide mb-4 text-sm">EXPLORER</h4>
            <ul className="space-y-2 text-white/95">
              <li>About us</li>
              <li>Courses</li>
              <li>Corporates</li>
              <li>Get Involved</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-white font-bold tracking-wide mb-4 text-sm">LOCATION</h4>
            <p className="text-white/95">KASMEE Building, 3rd &amp; 4th floor</p>
            <p className="text-white/95">Jackross Sehile Mitmet Road</p>
            <p className="font-semibold">Addis Ababa, Ethiopia</p>
          </div>
          <div className="text-right">
            <h4 className="text-white font-bold tracking-wide mb-4 text-sm">CONVERSATION</h4>
            <p>info@Mekhil.com</p>
            <p>selome@mekhil.com</p>
            <p>0995090909</p>
            <p>0922-521424</p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-8 px-8">
          <div className="border-t border-white/40 pt-3 flex justify-end gap-4 text-white">
            {['in', 'f', 'x', 'ig', 'yt'].map((s) => (
              <span key={s} className="w-5 h-5 border border-white rounded-full flex items-center justify-center text-[10px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}