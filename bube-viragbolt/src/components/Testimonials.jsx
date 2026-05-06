import { Icon, Stars } from './Icons'
import { GOOGLE_MAPS_FULL } from '../constants'

const reviews = [
  {
    text: 'Sokszor rendeltünk csokrot és koszorút, mindig gyönyörű munkát kaptunk. Maximálisan elégedettek voltunk.',
    author: 'Google vélemény',
    tone: 'rose',
  },
  {
    text: 'Olyan gyönyörű csokrot kötöttek három szál virágból, hogy kétszer ennyit is megért volna!',
    author: 'Google vélemény',
    tone: 'cream',
  },
  {
    text: 'Telefonon rendeltem koszorút, a tulaj hölgy nagyon kedves és segítőkész volt, gyönyörű koszorút készített és kiszállította. Szívből ajánlom!',
    author: 'Google vélemény',
    tone: 'eucalypt',
  },
]

const tones = {
  rose:     'bg-rose-50 ring-rose-100',
  cream:    'bg-cream-50 ring-cream-200',
  eucalypt: 'bg-eucalypt-50 ring-eucalypt-100',
}

export default function Testimonials({ fontClass }) {
  return (
    <section id="velemenyek" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="chip mb-5"><Icon name="quote" className="w-3.5 h-3.5"/> Vélemények</span>
            <h2 className={`${fontClass} text-4xl md:text-5xl text-ink-800 leading-[1.1]`}>
              <span className="italic text-rose-400">21 vendég</span> mondta el<br/>
              nekünk a magáét.
            </h2>
          </div>
          <a href={GOOGLE_MAPS_FULL} target="_blank" rel="noopener noreferrer"
             className="lift flex items-center gap-5 bg-cream-50 ring-1 ring-cream-200 rounded-2xl px-5 py-4 self-start md:self-end shadow-card hover:ring-rose-200 transition-colors">
            <div className="text-center">
              <div className="font-serif text-3xl text-ink-800 leading-none">4.7</div>
              <div className="font-mono text-[0.62rem] tracking-widest uppercase text-eucalypt-500 mt-1">Google</div>
            </div>
            <div className="h-10 w-px bg-cream-200"></div>
            <div>
              <Stars/>
              <div className="text-xs text-ink-700/70 mt-1.5 inline-flex items-center gap-1">
                21 értékelés <Icon name="arrowRight" className="w-3 h-3"/>
              </div>
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <figure key={i} className={`lift ${tones[r.tone]} ring-1 rounded-3xl p-7 md:p-8 flex flex-col`}>
              <div className="text-rose-300 mb-4">
                <svg viewBox="0 0 32 28" className="w-10 h-8" fill="currentColor" aria-hidden="true">
                  <path d="M0 28V16C0 7 5 2 14 0v6c-5 1-7 4-7 8h7v14H0Zm18 0V16c0-9 5-14 14-16v6c-5 1-7 4-7 8h7v14H18Z"/>
                </svg>
              </div>
              <blockquote className="font-serifAlt text-xl md:text-[1.4rem] text-ink-800 leading-relaxed flex-1">
                {r.text}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-ink-800/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-ink-800">{r.author}</div>
                  <div className="text-xs text-ink-700/60 mt-0.5">Maglód</div>
                </div>
                <Stars size="w-3.5 h-3.5"/>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
