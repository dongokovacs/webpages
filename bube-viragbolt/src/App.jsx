import { useEffect } from 'react'
import { useTweaks } from './hooks/useTweaks'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import PartnerBanner from './components/PartnerBanner'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { TweaksPanel, TweakSection, TweakRadio, TweakToggle } from './components/TweaksPanel'

const TWEAK_DEFAULTS = {
  palette: 'rose',
  headingFont: 'playfair',
  heroStyle: 'image',
  showPartnerBanner: true,
  showNav: true,
  ctaStyle: 'filled',
}

const palettes = {
  rose:     { accent: '#D89A9A', accent2: '#8FA785' },
  eucalypt: { accent: '#8FA785', accent2: '#D89A9A' },
  terra:    { accent: '#B98770', accent2: '#8FA785' },
}

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const fontClass = tweaks.headingFont === 'cormorant' ? 'font-serifAlt' : 'font-serif'

  useEffect(() => {
    const p = palettes[tweaks.palette] || palettes.rose
    document.documentElement.style.setProperty('--accent',  p.accent)
    document.documentElement.style.setProperty('--accent2', p.accent2)
  }, [tweaks.palette])

  return (
    <div className="min-h-screen">
      <Nav visible={tweaks.showNav}/>

      <main>
        <Hero heroStyle={tweaks.heroStyle} ctaStyle={tweaks.ctaStyle} fontClass={fontClass}/>
        <About fontClass={fontClass}/>
        <Services fontClass={fontClass}/>
        <Testimonials fontClass={fontClass}/>
        <Contact fontClass={fontClass}/>
        <Faq fontClass={fontClass}/>
        {tweaks.showPartnerBanner && <PartnerBanner fontClass={fontClass}/>}
      </main>

      <Footer fontClass={fontClass}/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio
            label="Hero stílus"
            value={tweaks.heroStyle}
            onChange={(v) => setTweak('heroStyle', v)}
            options={[
              { value: 'image', label: 'Kép' },
              { value: 'paper', label: 'Papír' },
              { value: 'split', label: 'Osztott' },
            ]}
          />
          <TweakRadio
            label="CTA stílus"
            value={tweaks.ctaStyle}
            onChange={(v) => setTweak('ctaStyle', v)}
            options={[
              { value: 'filled',  label: 'Kitöltött' },
              { value: 'outline', label: 'Vonalas' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Tipográfia & szín">
          <TweakRadio
            label="Címbetű"
            value={tweaks.headingFont}
            onChange={(v) => setTweak('headingFont', v)}
            options={[
              { value: 'playfair',  label: 'Playfair' },
              { value: 'cormorant', label: 'Cormorant' },
            ]}
          />
          <TweakRadio
            label="Akcentus"
            value={tweaks.palette}
            onChange={(v) => setTweak('palette', v)}
            options={[
              { value: 'rose',     label: 'Rózsa' },
              { value: 'eucalypt', label: 'Zöld' },
              { value: 'terra',    label: 'Terra' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Szekciók">
          <TweakToggle label="Felső navigáció" value={tweaks.showNav} onChange={(v) => setTweak('showNav', v)}/>
          <TweakToggle label="Partner banner" value={tweaks.showPartnerBanner} onChange={(v) => setTweak('showPartnerBanner', v)}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  )
}
