import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function SteelDecorStory() {
  return (
    <FlowArt aria-label="SteelDecor – Hogyan lettünk azzá, akik vagyunk">

      {/* 01 – Kezdetek */}
      <FlowSection
        aria-label="Kezdetek – Egy ember, egy garázs"
        style={{ backgroundColor: '#18181B', color: '#F4EFE4' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
          01 — Kezdetek
        </p>
        <hr className="my-[2vw] border-t border-[#F4EFE4]/20" />
        <div>
          <h1 className="text-[clamp(3.5rem,12vw,14rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Egy<br />Ember,<br />Egy<br />Garázs
          </h1>
        </div>
        <hr className="my-[2vw] border-t border-[#F4EFE4]/20" />
        <p className="mt-auto max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-80">
          2015-ben minden egy kis műhellyel kezdődött. Egyetlen ember, egyetlen
          hegesztő, és egy makacs kérdés: miért néznek ki az éremtartók olyan
          unalmasan? Onnan indult a SteelDecor – nem befektetőkkel, nem üzleti
          tervvel, hanem kézzel, acéllal és szenvedéllyel.
        </p>
      </FlowSection>

      {/* 02 – Az első éremtartó */}
      <FlowSection
        aria-label="Az első éremtartó"
        style={{ backgroundColor: '#7C4E1E', color: '#FDF6EC' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
          02 — Az első éremtartó
        </p>
        <hr className="my-[2vw] border-t border-[#FDF6EC]/25" />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Az<br />Első<br />Darab
          </h2>
        </div>
        <hr className="my-[2vw] border-t border-[#FDF6EC]/25" />
        <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-85">
          Az első éremtartó még saját rajz alapján, kézzel hajlított acélból
          készült – semmi sablon, semmi kompromisszum. Amikor a futó megkapta
          és meglátta a saját nevét acélba gravírozva, a visszajelzés egyértelmű
          volt: ezt másoknak is meg kell kapniuk.
        </p>
        <hr className="my-[2vw] border-t border-[#FDF6EC]/25" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Anyag</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Hidegen hengerelt acéllemez – tartós, formázható, és idővel csak
              szebbé válik.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Forma</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Minden darab az ügyfél igényeire szabva – méret, alak, gravírozás
              mind egyedi.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Minőség</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Nem sorozat, nem sablon – minden darabot ugyanolyan figyelemmel
              készítünk, mint az elsőt.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 03 – Hogyan készül */}
      <FlowSection
        aria-label="Hogyan készül – A műhely titkai"
        style={{ backgroundColor: '#F0E8D4', color: '#1A1A1A' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">
          03 — Hogyan készül
        </p>
        <hr className="my-[2vw] border-t border-black/20" />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Vas<br />És<br />Tűz
          </h2>
        </div>
        <hr className="my-[2vw] border-t border-black/20" />
        <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-75">
          Minden SteelDecor termék ugyanazon az úton megy keresztül – tervezőasztaltól
          a műhelyig, csiszolótól a csomagolásig. Nem gyártósor, hanem
          kézművesség.
        </p>
        <hr className="my-[2vw] border-t border-black/20" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">01 — Tervezés</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Az ügyfél elképzelése alapján egyedi terv készül – méretarányosan,
              gyárthatóan, szépre tervezve.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">02 — Vágás & Formázás</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Lézervágás és kézi hajlítás – a nyers acélból kialakul a végleges
              forma, tized milliméteres pontossággal.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">03 — Hegesztés</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Az alkatrészek összekerülnek – MIG hegesztéssel, kézi
              igazítással, hogy minden illeszkedés tökéletes legyen.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-t border-black/20" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">04 — Csiszolás</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Minden varratot, élt, felületet kézzel simítunk – az acél
              tapintása ugyanolyan fontos, mint a kinézete.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">05 — Felületkezelés</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Porcelánzománc vagy olaj-viasz befejezés – az időjárásálló
              felület évekig védi az acélt.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">06 — Csomagolás</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Minden termék ajándékdobozban, kézzel csomagolva érkezik – hogy
              a megérkezés pillanata is különleges legyen.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* 04 – Família lesz */}
      <FlowSection
        aria-label="Família – Együtt erősebbek"
        style={{ backgroundColor: '#1C2B1C', color: '#E8F0E0' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
          04 — Família lesz
        </p>
        <hr className="my-[2vw] border-t border-[#E8F0E0]/20" />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Együtt<br />Erő-<br />sebbek
          </h2>
        </div>
        <hr className="my-[2vw] border-t border-[#E8F0E0]/20" />
        <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-85">
          Ahogy a rendelések szaporodtak, valami szebb történt: a familia
          csatlakozott. Ma már nem egyetlen ember viszi a terhet – közösen
          tervezzük, készítjük, csomagoljuk és adjuk postára azt, ami az
          ügyfelekhez kerül.
        </p>
        <hr className="my-[2vw] border-t border-[#E8F0E0]/20" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Alapító</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Hegesztés, tervezés, gyártásvezetés – a műhely és az ötletek
              motorja.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Felesége</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Ügyfélkapcsolat, webshop, rendelések – ő az a hang, amivel az
              ügyfelek először találkoznak.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">A familia többi tagja</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Csomagolás, festés, minőségellenőrzés – a kis dolgok, amiktől
              minden kerek lesz.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-t border-[#E8F0E0]/20" />
        <p className="mt-auto ml-auto max-w-[55ch] text-right text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-80">
          Egy família alkotja – és ebből fakad az a gondosság, amit egyetlen
          gyártósor soha nem tudna visszaadni.
        </p>
      </FlowSection>

      {/* 05 – Ma és holnap */}
      <FlowSection
        aria-label="Ma és holnap – Veletek tervezzük"
        style={{ backgroundColor: '#B5722A', color: '#FDF6EC' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
          05 — Ma és holnap
        </p>
        <hr className="my-[2vw] border-t border-[#FDF6EC]/25" />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-extrabold leading-[0.85] uppercase tracking-tight">
            Veletek<br />Terve-<br />zzük
          </h2>
        </div>
        <hr className="my-[2vw] border-t border-[#FDF6EC]/25" />
        <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-90">
          Nem akarunk nagyipari gyártó lenni. Egyedi maradunk – mert az
          egyediség az, amiért az ügyfelek visszajönnek. Ha van egy ötleted,
          egy versenysorozatod, egy ajándékötleted – mi megvalósítjuk acélban.
        </p>
        <hr className="my-[2vw] border-t border-[#FDF6EC]/25" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Éremtartók</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-80">
              Futáshoz, triatlonhoz, kerékpározáshoz, úszáshoz – bármilyen
              sporttevékenységhez egyedi kivitelben.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Fémdekortáció</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-80">
              Falra kerülő acéltáblák, névszemlélők, dísz-elemek – egyedi
              tervek alapján, sorozatban vagy darabonként.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Ajándék megrendelés</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-80">
              Névnap, évforduló, nyugdíjazás – a gravírozott acél olyan ajándék,
              amit nem dobnak el.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-t border-[#FDF6EC]/25" />
        <div className="mt-auto flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-[45ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-90">
            Egy garázs, egy familia, és rengeteg acél – így néz ki a SteelDecor
            ma. Köszönjük, hogy itt vagy.
          </p>
          <a
            href="https://steeldecor.hu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[#FDF6EC] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#7C4E1E] transition-opacity hover:opacity-80"
          >
            Megrendelem →
          </a>
        </div>
      </FlowSection>

    </FlowArt>
  );
}
