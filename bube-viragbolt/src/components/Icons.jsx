export function Icon({ name, className = 'w-5 h-5', stroke = 1.6 }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round', className,
  }
  const paths = {
    flower: (<><circle cx="12" cy="12" r="3"/><path d="M12 9V3M12 21v-6M9 12H3M21 12h-6M7.05 7.05 4.93 4.93M19.07 19.07l-2.12-2.12M7.05 16.95l-2.12 2.12M19.07 4.93l-2.12 2.12"/></>),
    heart:  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>,
    leaf:   (<><path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 14 4c4 0 6 2 6 6 0 6-4 10-9 10Z"/><path d="M2 22c4-6 7-9 12-12"/></>),
    phone:  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>,
    mapPin: (<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>),
    clock:  (<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
    mail:   (<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>),
    star:   <path d="M12 2.5 14.95 8.5l6.55.95-4.75 4.62 1.12 6.53L12 17.77l-5.87 2.83 1.12-6.53L2.5 9.45l6.55-.95L12 2.5Z"/>,
    arrowRight: <path d="M5 12h14M13 5l7 7-7 7"/>,
    facebook:   <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/>,
    map:    (<><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>),
    quote:  <path d="M3 21c3-2 5-5 5-9V5H3v8h3c0 3-1 5-3 6Zm12 0c3-2 5-5 5-9V5h-5v8h3c0 3-1 5-3 6Z"/>,
    sparkle:<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>,
    clover: (<>
      <path d="M12 12c-3-3-6-1-6 2s3 4 6 1"/>
      <path d="M12 12c3-3 6-1 6 2s-3 4-6 1"/>
      <path d="M12 12c-3 3-1 6 2 6s4-3 1-6"/>
      <path d="M12 12c3 3 1 6-2 6s-4-3-1-6"/>
      <path d="M12 18v3"/>
    </>),
  }
  return <svg {...common}>{paths[name]}</svg>
}

export function Stars({ count = 5, size = 'w-4 h-4' }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} csillag`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className={`${size} star`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5 14.95 8.5l6.55.95-4.75 4.62 1.12 6.53L12 17.77l-5.87 2.83 1.12-6.53L2.5 9.45l6.55-.95L12 2.5Z"/>
        </svg>
      ))}
    </div>
  )
}

export function Photo({ label, className = '', aspect = 'aspect-[4/5]', round = 'rounded-3xl' }) {
  return (
    <div className={`photo-ph ${aspect} ${round} ${className} relative flex items-end justify-start p-4 shadow-card overflow-hidden`}>
      <div className="absolute inset-0 opacity-60 mix-blend-multiply"
           style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)' }}/>
      <span className="ph-label relative">{label}</span>
    </div>
  )
}
