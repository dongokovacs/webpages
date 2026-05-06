import { Icon } from './Icons'
import { MAPS_LINK, GBP_REVIEWS, VIBER_LINK } from '../constants'

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
              Családi virágüzlet Maglód szívében. Élőcsokrok, kegyeleti koszorúk, menyasszonyi
              csokor, esküvői virágkötészet — kézzel, szeretettel.<br/>
              <span className="text-cream-100/50 text-sm">Virágküldés: Maglód · Ecser · Üllő · Vecsés · Gyömrő</span>
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
            <div className="font-mono text-[0.65rem] tracking-widest uppercase text-cream-100/50 mb-4">Kapcsolat &amp; Értékelés</div>
            <div className="flex gap-3">
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" aria-label="Google Maps útvonal"
                 className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-rose-200/25 flex items-center justify-center transition-colors">
                <Icon name="map" className="w-4 h-4"/>
              </a>
              <a href={GBP_REVIEWS} target="_blank" rel="noopener noreferrer" aria-label="Google értékelések – 4.7★"
                 className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-rose-200/25 flex items-center justify-center transition-colors">
                <Icon name="star" className="w-4 h-4"/>
              </a>
              <a href={VIBER_LINK} aria-label="Viber üzenet"
                 className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-rose-200/25 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 2C6.68 2 2.93 5.74 2.93 10.46c0 2.48.99 4.73 2.6 6.37l-.85 3.16 3.26-.85c1.58.94 3.41 1.49 5.37 1.49 4.72 0 8.47-3.74 8.47-8.46 0-4.72-3.75-8.17-8.48-8.17zm0 1.5c3.84 0 6.97 3.03 6.97 6.96 0 3.93-3.13 6.96-6.97 6.96-1.74 0-3.34-.63-4.57-1.66l-2.02.53.52-1.95C4.31 13.9 3.43 12.26 3.43 10.46c0-3.93 3.14-6.96 6.97-6.96zm-2.5 3.2c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.14.2 2.05 3.25 5.03 4.43 2.97 1.18 2.97.79 3.51.74.54-.05 1.74-.71 1.99-1.4.24-.68.24-1.27.17-1.39-.07-.12-.27-.19-.57-.34-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.64-1.6-.9-2.19-.23-.55-.47-.48-.64-.49h-.55z"/></svg>
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
