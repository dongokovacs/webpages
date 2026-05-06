import { Icon, Stars } from './Icons'
import { HERO_IMG, MAPS_LINK } from '../constants'

const titleParts = ['Bübe Virág', 'virágüzlet Maglódon']

export default function Hero({ heroStyle, ctaStyle, fontClass }) {
  const isImage = heroStyle === 'image'
  const isPaper = heroStyle === 'paper'
  const isSplit = heroStyle === 'split'

  const cta1Cls = ctaStyle === 'filled'
    ? 'bg-rose-300 text-ink-800 hover:bg-rose-400 hover:text-cream-50'
    : 'bg-cream-50 text-ink-800 ring-1 ring-rose-200 hover:bg-rose-50'
  const cta2Cls = ctaStyle === 'filled'
    ? 'bg-cream-50/90 text-ink-800 ring-1 ring-cream-200 hover:bg-cream-50'
    : 'bg-transparent text-ink-800 ring-1 ring-eucalypt-300 hover:bg-eucalypt-50'

  return (
    <section id="top" className="relative">
      {isImage && (
        <div className="relative h-[88vh] min-h-[640px] overflow-hidden">
          <img src={HERO_IMG} alt="Friss vágott virágokból kötött csokor"
               className="hero-img absolute inset-0 w-full h-full object-cover"
               fetchPriority="high" width="1600" height="900"
               onError={(e) => { e.target.style.display = 'none' }}/>
          <div className="absolute inset-0 photo-ph -z-10"></div>
          <div className="absolute inset-0 hero-vignette"></div>

          <div className="relative z-10 h-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-16 md:pb-24">
            <span className="chip self-start mb-6 bg-cream-50/80">
              <Icon name="sparkle" className="w-3.5 h-3.5"/> Családi virágüzlet · 2234 Maglód
            </span>
            <h1 className={`${fontClass} text-cream-50 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-4xl drop-shadow-[0_2px_20px_rgba(42,31,27,0.45)]`}>
              {titleParts[0]}<br/>
              <span className="italic font-medium text-rose-100">{titleParts[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-cream-50/95 text-lg md:text-xl font-light leading-relaxed">
              Csokrok, koszorúk, ünnepi és alkalmi virágkötészet — kézzel, szeretettel.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="tel:+36706330498" className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-colors ${cta1Cls}`}>
                <Icon name="phone" className="w-4 h-4"/> Hívjon minket
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-colors ${cta2Cls}`}>
                <Icon name="mapPin" className="w-4 h-4"/> Útvonal
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4 text-cream-50/90">
              <Stars/>
              <div className="text-sm"><span className="font-medium">4.7</span> · <span className="opacity-80">21 Google vélemény alapján</span></div>
            </div>
          </div>
        </div>
      )}

      {isPaper && (
        <div className="relative paper">
          <div className="max-w-6xl mx-auto px-5 md:px-8 pt-32 md:pt-40 pb-20 md:pb-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className="md:col-span-7">
                <span className="chip mb-6"><Icon name="sparkle" className="w-3.5 h-3.5"/> 2234 Maglód · Szent István tér 5.</span>
                <h1 className={`${fontClass} text-ink-800 text-5xl md:text-7xl leading-[1.02]`}>
                  Bübe Virág —<br/>
                  <span className="italic ink-underline text-rose-400">virágüzlet Maglódon</span>
                </h1>
                <p className="mt-6 text-lg text-ink-700/80 max-w-xl leading-relaxed">
                  Csokrok, koszorúk, ünnepi és alkalmi virágkötészet kézzel, szeretettel.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="tel:+36706330498" className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-colors ${cta1Cls}`}>
                    <Icon name="phone" className="w-4 h-4"/> Hívjon minket
                  </a>
                  <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-colors ${cta2Cls}`}>
                    <Icon name="mapPin" className="w-4 h-4"/> Útvonal
                  </a>
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <Stars/>
                  <div className="text-sm text-ink-700/80"><span className="font-medium text-ink-800">4.7</span> · 21 Google vélemény</div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="relative">
                  <div className="oval-mask shadow-petal">
                    <img src={HERO_IMG} alt="Csokor" className="w-full aspect-[4/5] object-cover"
                         loading="lazy" width="800" height="1000"/>
                  </div>
                  <div className="absolute -bottom-5 -left-5 bg-cream-50 px-4 py-3 rounded-2xl shadow-card border border-cream-200 hidden md:flex items-center gap-3">
                    <Icon name="heart" className="w-4 h-4 text-rose-400"/>
                    <div className="text-xs">
                      <div className="font-mono text-[0.65rem] tracking-widest uppercase text-eucalypt-400">Kézzel kötve</div>
                      <div className="font-serif text-ink-800">minden egyes csokor</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSplit && (
        <div className="grid md:grid-cols-2 min-h-[620px]">
          <div className="bg-cream-50 paper px-5 md:px-12 lg:px-20 py-24 md:py-32 flex flex-col justify-center">
            <span className="chip mb-6 self-start"><Icon name="sparkle" className="w-3.5 h-3.5"/> Bübe Virág</span>
            <h1 className={`${fontClass} text-ink-800 text-5xl md:text-6xl leading-[1.05]`}>
              Maglód<br/><span className="italic text-rose-400">virágüzlete</span> nyílik<br/>minden reggel.
            </h1>
            <p className="mt-6 text-ink-700/80 text-lg leading-relaxed max-w-md">
              Csokrok, koszorúk, ünnepi és alkalmi virágkötészet — kézzel, szeretettel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+36706330498" className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-colors ${cta1Cls}`}>
                <Icon name="phone" className="w-4 h-4"/> Hívjon minket
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-colors ${cta2Cls}`}>
                <Icon name="mapPin" className="w-4 h-4"/> Útvonal
              </a>
            </div>
          </div>
          <div className="relative min-h-[400px]">
            <img src={HERO_IMG} alt="Friss virágok" className="absolute inset-0 w-full h-full object-cover"
                 loading="lazy" width="1600" height="900"/>
            <div className="absolute inset-0 photo-ph -z-10"></div>
            <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-cream-50/95 backdrop-blur px-5 py-4 rounded-2xl shadow-card flex items-center gap-4">
              <Stars/>
              <div className="text-sm text-ink-700"><span className="font-medium">4.7</span> · 21 vélemény</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
