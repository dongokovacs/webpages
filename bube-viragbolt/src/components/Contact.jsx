import { Icon } from './Icons'
import { MAPS_LINK, MAPS_EMBED, GBP_REVIEWS, VIBER_LINK } from '../constants'

const hours = [
  ['Hétfő – Péntek', '8:00 – 17:00'],
  ['Szombat',        '8:00 – 14:00'],
  ['Vasárnap',       '8:00 – 12:00'],
]

function isOpenNow() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  if (day >= 1 && day <= 5) return hour >= 8 && hour < 17
  if (day === 6)             return hour >= 8 && hour < 14
  return                            hour >= 8 && hour < 12
}

function todayIndex() {
  const day = new Date().getDay()
  if (day >= 1 && day <= 5) return 0
  if (day === 6)             return 1
  return 2
}

export default function Contact({ fontClass }) {
  const openNow = isOpenNow()
  const todayIdx = todayIndex()

  return (
    <section id="kapcsolat" className="py-24 md:py-32 bg-eucalypt-50/60 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5">
            <span className="chip mb-5"><Icon name="clock" className="w-3.5 h-3.5"/> Nyitvatartás</span>
            <h2 className={`${fontClass} text-4xl md:text-5xl text-ink-800 leading-[1.1]`}>
              Mikor <span className="italic text-eucalypt-400">találkozunk?</span>
            </h2>

            <div className="mt-8 bg-cream-50 ring-1 ring-cream-200 rounded-3xl p-2 shadow-card">
              <div className="rounded-[1.2rem] border border-dashed border-eucalypt-200 p-6 md:p-7">
                <div className="flex items-center justify-between mb-5 pb-5 border-b border-cream-200">
                  <div>
                    <div className="font-mono text-[0.65rem] tracking-widest uppercase text-eucalypt-500">Most</div>
                    <div className={`flex items-center gap-2 mt-1 font-serif text-lg ${openNow ? 'text-eucalypt-500' : 'text-rose-400'}`}>
                      <span className={`w-2 h-2 rounded-full ${openNow ? 'bg-eucalypt-400 animate-pulse' : 'bg-rose-300'}`}></span>
                      {openNow ? 'Nyitva vagyunk' : 'Most zárva'}
                    </div>
                  </div>
                  <Icon name="flower" className="w-7 h-7 text-rose-300"/>
                </div>

                <ul className="divide-y divide-cream-200">
                  {hours.map(([d, h], i) => (
                    <li key={i} className={`flex items-center justify-between py-3.5 ${i === todayIdx ? 'text-ink-800 font-medium' : 'text-ink-700/80'}`}>
                      <span className="flex items-center gap-2.5">
                        {i === todayIdx && <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>}
                        {d}
                      </span>
                      <span className="font-mono text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <span className="chip mb-5"><Icon name="mapPin" className="w-3.5 h-3.5"/> Elérhetőség</span>
            <h2 className={`${fontClass} text-4xl md:text-5xl text-ink-800 leading-[1.1]`}>
              Sétáljon be <span className="italic text-rose-400">hozzánk.</span>
            </h2>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                 className="lift bg-cream-50 ring-1 ring-cream-200 rounded-2xl p-5 flex items-start gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-400 flex items-center justify-center flex-shrink-0">
                  <Icon name="mapPin" className="w-5 h-5"/>
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[0.62rem] tracking-widest uppercase text-eucalypt-500">Cím</div>
                  <address className="font-serif text-lg text-ink-800 mt-0.5 leading-tight not-italic">2234 Maglód,<br/>Szent István tér 5.</address>
                  <div className="text-xs text-ink-700/60 mt-2 inline-flex items-center gap-1">Útvonal megnyitása <Icon name="arrowRight" className="w-3 h-3"/></div>
                </div>
              </a>

              <a href="tel:+36706330498"
                 className="lift bg-cream-50 ring-1 ring-cream-200 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-eucalypt-100 text-eucalypt-400 flex items-center justify-center flex-shrink-0">
                  <Icon name="phone" className="w-5 h-5"/>
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[0.62rem] tracking-widest uppercase text-eucalypt-500">Telefon</div>
                  <div className="font-serif text-lg text-ink-800 mt-0.5">+36 70 633 0498</div>
                  <div className="text-xs text-ink-700/60 mt-2">Rendelés telefonon is</div>
                </div>
              </a>

              <a href={VIBER_LINK}
                 className="lift bg-cream-50 ring-1 ring-cream-200 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 2C6.68 2 2.93 5.74 2.93 10.46c0 2.48.99 4.73 2.6 6.37l-.85 3.16 3.26-.85c1.58.94 3.41 1.49 5.37 1.49 4.72 0 8.47-3.74 8.47-8.46 0-4.72-3.75-8.17-8.48-8.17zm0 1.5c3.84 0 6.97 3.03 6.97 6.96 0 3.93-3.13 6.96-6.97 6.96-1.74 0-3.34-.63-4.57-1.66l-2.02.53.52-1.95C4.31 13.9 3.43 12.26 3.43 10.46c0-3.93 3.14-6.96 6.97-6.96zm-2.5 3.2c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.14.2 2.05 3.25 5.03 4.43 2.97 1.18 2.97.79 3.51.74.54-.05 1.74-.71 1.99-1.4.24-.68.24-1.27.17-1.39-.07-.12-.27-.19-.57-.34-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.64-1.6-.9-2.19-.23-.55-.47-.48-.64-.49h-.55z"/></svg>
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[0.62rem] tracking-widest uppercase text-eucalypt-500">Viber</div>
                  <div className="font-serif text-lg text-ink-800 mt-0.5">+36 70 633 0498</div>
                  <div className="text-xs text-ink-700/60 mt-2">Üzenet Viberen</div>
                </div>
              </a>

              <a href={GBP_REVIEWS} target="_blank" rel="noopener noreferrer"
                 className="lift bg-cream-50 ring-1 ring-cream-200 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-eucalypt-100 text-eucalypt-400 flex items-center justify-center flex-shrink-0">
                  <Icon name="star" className="w-5 h-5"/>
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[0.62rem] tracking-widest uppercase text-eucalypt-500">Google értékelések</div>
                  <div className="font-serif text-lg text-ink-800 mt-0.5">4.7 ★ · 21 vélemény</div>
                  <div className="text-xs text-ink-700/60 mt-2 inline-flex items-center gap-1">Értékelés írása <Icon name="arrowRight" className="w-3 h-3"/></div>
                </div>
              </a>
            </div>

            <div className="mt-5 rounded-2xl overflow-hidden ring-1 ring-cream-200 shadow-card aspect-[16/10] bg-cream-100">
              <iframe
                title="Bübe Virág – 2234 Maglód, Szent István tér 5. – Google Maps"
                src={MAPS_EMBED}
                className="w-full h-full border-0"
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
