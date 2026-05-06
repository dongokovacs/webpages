import { Icon } from './Icons'

const items = [
  {
    icon: 'flower',
    title: 'Ünnepi csokrok',
    body: 'Születésnap, évforduló, ballagás, anyák napja — minden alkalomra kézzel kötött, szezonális kompozíciók.',
    tone: 'rose',
  },
  {
    icon: 'heart',
    title: 'Esküvői virágdíszítés',
    body: 'Menyasszonyi csokor, autódísz, asztali- és teremdekoráció. Egyeztessünk személyesen, hogy minden részlet illeszkedjen az Önök napjához.',
    tone: 'terra',
  },
  {
    icon: 'leaf',
    title: 'Kegyeleti koszorúk',
    body: 'Gyors, diszkrét rendelés akár telefonon is. Méltó búcsúhoz méltó virág — hagyományos és modern formában egyaránt.',
    tone: 'eucalypt',
  },
]

const tones = {
  rose:     { bg: 'bg-rose-50',     ring: 'ring-rose-100',     icon: 'bg-rose-100 text-rose-400' },
  terra:    { bg: 'bg-cream-50',    ring: 'ring-terra-100',    icon: 'bg-terra-100 text-terra-400' },
  eucalypt: { bg: 'bg-eucalypt-50', ring: 'ring-eucalypt-100', icon: 'bg-eucalypt-100 text-eucalypt-400' },
}

export default function Services({ fontClass }) {
  return (
    <section id="szolgaltatasok" className="py-24 md:py-32 bg-cream-100/60">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <span className="chip mb-5"><Icon name="flower" className="w-3.5 h-3.5"/> Szolgáltatások</span>
          <h2 className={`${fontClass} text-4xl md:text-5xl text-ink-800 leading-[1.1]`}>
            Amit önöknek <span className="italic text-rose-400">megkötünk</span>.
          </h2>
          <p className="mt-5 text-ink-700/80 text-lg leading-relaxed">
            Három fő terület, ahol különösen otthon vagyunk — de bármilyen virágkérdésében
            örömmel segítünk.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-7">
          {items.map((it, idx) => {
            const t = tones[it.tone]
            return (
              <article key={idx} className={`lift relative ${t.bg} ring-1 ${t.ring} rounded-3xl p-7 md:p-8 flex flex-col`}>
                <div className={`w-12 h-12 rounded-2xl ${t.icon} flex items-center justify-center mb-6`}>
                  <Icon name={it.icon} className="w-6 h-6" stroke={1.4}/>
                </div>
                <h3 className="font-serif text-2xl text-ink-800 leading-snug">{it.title}</h3>
                <p className="mt-3 text-ink-700/80 leading-relaxed">{it.body}</p>
                <div className="mt-7 pt-5 border-t border-ink-800/10 flex items-center justify-between text-sm">
                  <span className="font-mono uppercase tracking-widest text-[0.7rem] text-eucalypt-500">{`0${idx + 1}`}</span>
                  <a href="tel:+36706330498" className="inline-flex items-center gap-1.5 text-ink-800/80 hover:text-rose-400 transition-colors">
                    Egyeztetek <Icon name="arrowRight" className="w-4 h-4"/>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
