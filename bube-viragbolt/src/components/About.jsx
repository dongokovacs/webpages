import { Icon } from './Icons'
import { ABOUT_IMG } from '../constants'

export default function About({ fontClass }) {
  return (
    <section id="rolunk" className="relative py-24 md:py-32 leaf-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative">
              <div className="oval-mask shadow-petal">
                <img src={ABOUT_IMG} alt="Virágüzlet belső tere kézzel kötött csokrokkal"
                     className="w-full aspect-[4/5] object-cover"
                     loading="lazy" width="900" height="1125"
                     onError={(e) => { e.target.style.display = 'none' }}/>
              </div>
              <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-eucalypt-100 -z-10 hidden md:block"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-rose-100 -z-10 hidden md:block"></div>
            </div>
          </div>

          <div className="md:col-span-7 order-1 md:order-2">
            <span className="chip mb-5"><Icon name="leaf" className="w-3.5 h-3.5"/> Rólunk</span>
            <h2 className={`${fontClass} text-4xl md:text-5xl text-ink-800 leading-[1.1]`}>
              Egy kis maglódi műhely,<br/>
              <span className="italic text-eucalypt-400">ahol minden csokor egyedi.</span>
            </h2>
            <div className="mt-7 space-y-5 text-ink-700/85 text-lg leading-relaxed max-w-xl">
              <p>
                A Bübe Virág egy családias kis virágüzlet a Szent István téren. Évek óta
                kötjük a környékbeli ünnepek, esküvők és csendes búcsúk csokrait — mindig
                kézzel, mindig egyedi módon.
              </p>
              <p>
                Hiszünk abban, hogy egy szál virág is lehet csodás, és hogy egy jó csokor
                több, mint a részei összege. Beszélgessünk: mondja el, kinek és milyen
                alkalomra szól, mi pedig megálmodjuk önnel együtt.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-eucalypt-500 font-mono uppercase tracking-wider">
              <span className="flex items-center gap-2"><Icon name="clover" className="w-4 h-4"/> Szezonális</span>
              <span className="flex items-center gap-2"><Icon name="heart" className="w-4 h-4"/> Kézzel kötve</span>
              <span className="flex items-center gap-2"><Icon name="sparkle" className="w-4 h-4"/> Egyedi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
