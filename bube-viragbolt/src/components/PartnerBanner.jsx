import { Icon } from './Icons'

export default function PartnerBanner({ fontClass }) {
  return (
    <section className="py-20 md:py-24" aria-label="Partner ajánlat">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center mb-8">
          <span className="petal-rule font-mono text-[0.7rem] tracking-[0.25em] uppercase">
            Partnerünk ajánlásával
          </span>
        </div>

        <a href="https://steeldecor.hu" target="_blank" rel="noopener noreferrer"
           className="lift block bg-gradient-to-br from-cream-50 via-cream-50 to-rose-50/60 ring-1 ring-rose-100 rounded-3xl p-6 md:p-8 shadow-card group">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
            <div className="md:col-span-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-800/90">
                <div className="absolute inset-0"
                     style={{
                       background: 'radial-gradient(circle at 30% 30%, rgba(214,180,160,0.25), transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 8px)',
                     }}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-cream-100/80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                    <path d="M20 80 Q 30 50 50 50 T 80 80"/>
                    <path d="M50 50 Q 50 35 40 30"/>
                    <path d="M50 50 Q 50 35 60 30"/>
                    <circle cx="40" cy="28" r="3"/>
                    <circle cx="60" cy="28" r="3"/>
                    <path d="M30 80 L 70 80"/>
                    <path d="M50 20 L 50 50"/>
                  </svg>
                </div>
                <div className="absolute bottom-2 left-2 font-mono text-[0.6rem] uppercase tracking-widest text-cream-100/70 bg-ink-800/40 px-2 py-1 rounded">
                  steeldecor · termékfotó
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-terra-400 mb-2">
                Ajánljuk figyelmébe
              </div>
              <h3 className={`${fontClass} text-2xl md:text-3xl text-ink-800 leading-tight`}>
                Steeldecor — <span className="italic">egyedi fém dekorációk otthonába</span>
              </h3>
              <p className="mt-3 text-ink-700/80 leading-relaxed max-w-xl">
                Kovácsoltvas hatású fali dekorok, monogramok, ajándéktárgyak kézzel készítve.
                Tökéletes kiegészítő egy szál virág mellé.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-800 text-cream-50 text-sm group-hover:bg-terra-400 transition-colors">
                Megnézem a webshopot
                <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-0.5"/>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
