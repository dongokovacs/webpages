import { useState } from 'react'
import { Icon } from './Icons'

const faqs = [
  {
    q: 'Lehet telefonon rendelni csokrot vagy koszorút?',
    a: 'Igen, telefonon is szívesen fogadunk rendeléseket a +36 70 633 0498 számon. Kegyeleti koszorúknál különösen ajánljuk a telefonos egyeztetést a gyors kiszolgálás érdekében.',
  },
  {
    q: 'Mikor nyit a virágüzlet Maglódon?',
    a: 'Hétfőtől péntekig 8:00–17:00, szombaton 8:00–14:00, vasárnap 8:00–12:00 között várjuk vendégeinket a 2234 Maglód, Szent István tér 5. szám alatt.',
  },
  {
    q: 'Vállalnak esküvői virágdíszítést?',
    a: 'Igen, esküvői virágkötészettel is foglalkozunk: menyasszonyi csokor, autódísz, asztali- és teremdekoráció. Javasoljuk az előzetes személyes egyeztetést, hogy minden részlet az Önök elképzeléseihez igazodjon.',
  },
  {
    q: 'Milyen alkalmi csokrokat lehet rendelni?',
    a: 'Születésnap, évforduló, ballagás, anyák napja és minden egyéb ünnepi alkalom — szezonális virágokból, kézzel kötve. Mondja el, kinek és milyen alkalomra szól, mi megálmodjuk Önnel együtt.',
  },
  {
    q: 'Hol található a Bübe Virág virágüzlet?',
    a: 'A Bübe Virág a 2234 Maglód, Szent István tér 5. szám alatt található, Maglód belvárosában.',
  },
]

export default function Faq({ fontClass }) {
  const [open, setOpen] = useState(null)

  return (
    <section id="gyik" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <span className="chip mb-5"><Icon name="sparkle" className="w-3.5 h-3.5"/> Gyakori kérdések</span>
        <h2 className={`${fontClass} text-4xl md:text-5xl text-ink-800 leading-[1.1] mb-10`}>
          Amit <span className="italic text-rose-400">kérdeznek</span> tőlünk.
        </h2>

        <dl className="divide-y divide-cream-200">
          {faqs.map((item, i) => (
            <div key={i} className="py-5">
              <dt>
                <button
                  className="w-full flex items-center justify-between gap-4 text-left font-serif text-lg text-ink-800"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-400 flex items-center justify-center transition-transform ${open === i ? 'rotate-45' : ''}`}>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </button>
              </dt>
              {open === i && (
                <dd className="mt-3 text-ink-700/80 leading-relaxed pl-0 pr-10">
                  {item.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
