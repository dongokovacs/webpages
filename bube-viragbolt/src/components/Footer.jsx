import { Icon } from './Icons'
import { MAPS_LINK } from '../constants'

export default function Footer({ fontClass }) {
  return (
    <footer className="bg-ink-800 text-cream-100">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-rose-200/15 text-rose-200 flex items-center justify-center">
                <Icon name="flower" className="w-5 h-5"/>
              </span>
              <div className={`${fontClass} text-2xl text-cream-50`}>Bübe Virág</div>
            </div>
            <p className="mt-5 text-cream-100/70 leading-relaxed max-w-sm">
              Családi virágüzlet Maglód szívében. Csokrok, koszorúk, alkalmi virágkötészet —
              kézzel, szeretettel.
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[0.65rem] tracking-widest uppercase text-cream-100/50 mb-4">Elérhetőség</div>
            <ul className="space-y-3 text-cream-100/90">
              <li>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-3 hover:text-rose-200 transition-colors">
                  <Icon name="mapPin" className="w-4 h-4 mt-1 flex-shrink-0"/>
                  <span>2234 Maglód, Szent István tér 5.</span>
                </a>
              </li>
              <li>
                <a href="tel:+36706330498" className="inline-flex items-center gap-3 hover:text-rose-200 transition-colors">
                  <Icon name="phone" className="w-4 h-4"/>
                  +36 70 633 0498
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[0.65rem] tracking-widest uppercase text-cream-100/50 mb-4">Kövessen minket</div>
            <div className="flex gap-3">
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" aria-label="Google Maps"
                 className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-rose-200/25 flex items-center justify-center transition-colors">
                <Icon name="map" className="w-4 h-4"/>
              </a>
              <a href="https://www.facebook.com/search/top/?q=B%C3%BCbe+Vir%C3%A1g+Magl%C3%B3d"
                 target="_blank" rel="noopener noreferrer" aria-label="Facebook – Bübe Virág"
                 className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-rose-200/25 flex items-center justify-center transition-colors">
                <Icon name="facebook" className="w-4 h-4"/>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream-100/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-cream-100/60">
          <div>© 2026 Bübe Virág · Minden jog fenntartva.</div>
          <div className="font-mono text-[0.7rem] tracking-widest uppercase">
            Kézzel kötve · Maglódon
          </div>
        </div>
      </div>
    </footer>
  )
}
