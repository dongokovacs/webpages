import { useState } from 'react'
import { Icon } from './Icons'

const links = [
  ['#rolunk', 'Rólunk'],
  ['#szolgaltatasok', 'Szolgáltatások'],
  ['#velemenyek', 'Vélemények'],
  ['#kapcsolat', 'Nyitvatartás'],
]

export default function Nav({ visible }) {
  const [open, setOpen] = useState(false)
  if (!visible) return null

  return (
    <header className="fixed top-0 inset-x-0 z-30 nav-blur border-b border-cream-200/70">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-full bg-rose-100 text-rose-400 flex items-center justify-center shadow-card">
            <Icon name="flower" className="w-5 h-5"/>
          </span>
          <div className="leading-tight">
            <div className="font-serif text-[1.05rem] text-ink-800">Bübe Virág</div>
            <div className="font-mono text-[0.62rem] tracking-[0.18em] text-eucalypt-400 uppercase">Maglód · est.</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-700">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="hover:text-rose-400 transition-colors">{l}</a>
          ))}
        </nav>

        <a href="tel:+36706330498"
           className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eucalypt-400 text-cream-50 text-sm hover:bg-eucalypt-500 transition-colors">
          <Icon name="phone" className="w-4 h-4"/>
          +36 70 633 0498
        </a>

        <button className="md:hidden p-2 -mr-2 text-ink-700" onClick={() => setOpen(!open)} aria-label="Menü">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open
              ? <path d="M6 6l12 12M18 6L6 18"/>
              : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cream-200 bg-cream-50/95">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="py-1 text-ink-700">{l}</a>
            ))}
            <a href="tel:+36706330498" className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-eucalypt-400 text-cream-50 text-sm justify-center">
              <Icon name="phone" className="w-4 h-4"/> +36 70 633 0498
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
