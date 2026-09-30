"use client"
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'

// Change the song here; the cover art is fetched from Spotify.
const TRACK = '7AszT06Rsoj1SQTWmFzdmw'

type SpotifyController = {
  addListener: (event: 'playback_update', fn: (e: { data: { isPaused: boolean } }) => void) => void
  destroy: () => void
}
type SpotifyApi = {
  createController: (el: HTMLElement, options: object, ready: (c: SpotifyController) => void) => void
}

// Load Spotify's iFrame API once per page; it tells us when the track plays or pauses.
let spotifyApi: Promise<SpotifyApi> | undefined
const loadSpotifyApi = () => spotifyApi ??= new Promise((resolve) => {
  (window as unknown as { onSpotifyIframeApiReady: (api: SpotifyApi) => void }).onSpotifyIframeApiReady = resolve
  const s = document.createElement('script')
  s.src = 'https://open.spotify.com/embed/iframe-api/v1'
  s.async = true
  document.body.appendChild(s)
})

export default function Home() {
  const [lang, setLang] = useState('EN')
  const [menuOpen, setMenuOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [cover, setCover] = useState<string>()
  const playerWrap = useRef<HTMLDivElement>(null)

  const content = {
    EN: {
      title: 'This is my Personal Profile',
      janame: 'キヨスミ・シン',
      about: 'About Me',
      nowPlaying: 'Now Playing',
      lead: "Hi, I'm Kiyosumi Sin — キヨスミ・シン.",
      body: "I live in Ho Chi Minh City and I'm currently studying data science and AI. In my free time I love playing games and listening to J-pop and Western pop. I speak Vietnamese and English, and I'm learning Japanese.",
      contact: 'Contact Me',
    },
    VI: {
      title: 'Đây là Hồ Sơ Cá Nhân của mình',
      janame: 'キヨスミ・シン',
      about: 'Giới Thiệu',
      nowPlaying: 'Đang Nghe',
      lead: 'Xin chào, mình là Kiyosumi Sin — キヨスミ・シン.',
      body: 'Mình hiện đang sống tại TP. Hồ Chí Minh và đang theo học về khoa học dữ liệu và AI. Lúc rảnh, mình thích chơi game và nghe nhạc J-pop lẫn US-UK. Mình nói được tiếng Việt, tiếng Anh và đang học tiếng Nhật.',
      contact: 'Liên Hệ',
    },
    JP: {
      title: 'これは私のプロフィールです',
      janame: 'キヨスミ・シン',
      about: '自己紹介',
      nowPlaying: '再生中',
      lead: 'はじめまして、キヨスミ・シンです。',
      body: 'ホーチミン市に住んでいて、今はデータサイエンスとAIを勉強しています。ゲームをするのが好きで、J-POPや洋楽をよく聴きます。ベトナム語と英語が話せて、日本語を勉強中です。',
      contact: 'お問い合わせ',
    },
  }

  const t = content[lang as keyof typeof content]

  const getGreeting = () => {
    const tz = lang === 'VI' ? 'Asia/Ho_Chi_Minh' : lang === 'JP' ? 'Asia/Tokyo' : 'Europe/London'
    const hour = parseInt(new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: false, timeZone: tz }).format(new Date()))

    if (hour >= 22 || hour < 5) {
      return lang === 'VI' ? '😴 Chúc ngủ ngon! · 😴 おやすみなさい！· 😴 Good Night! · 😴 Chúc ngủ ngon! · 😴 おやすみなさい！'
           : lang === 'JP' ? '😴 おやすみなさい！· 😴 Chúc ngủ ngon! · 😴 Good Night! · 😴 おやすみなさい！· 😴 Chúc ngủ ngon!'
           : '😴 Good Night! · 😴 Chúc ngủ ngon! · 😴 おやすみなさい！· 😴 Good Night! · 😴 Chúc ngủ ngon!'
    } else if (hour >= 5 && hour < 12) {
      return lang === 'VI' ? '☀️ Chào buổi sáng! · ☀️ おはようございます！· ☀️ Good Morning! · ☀️ Chào buổi sáng! · ☀️ おはようございます！'
           : lang === 'JP' ? '☀️ おはようございます！· ☀️ Chào buổi sáng! · ☀️ Good Morning! · ☀️ おはようございます！· ☀️ Chào buổi sáng!'
           : '☀️ Good Morning! · ☀️ Chào buổi sáng! · ☀️ おはようございます！· ☀️ Good Morning! · ☀️ Chào buổi sáng!'
    } else if (hour >= 12 && hour < 18) {
      return lang === 'VI' ? '🌤️ Chào buổi trưa! · 🌤️ こんにちは！· 🌤️ Good Afternoon! · 🌤️ Chào buổi trưa! · 🌤️ こんにちは！'
           : lang === 'JP' ? '🌤️ こんにちは！· 🌤️ Chào buổi trưa! · 🌤️ Good Afternoon! · 🌤️ こんにちは！· 🌤️ Chào buổi trưa!'
           : '🌤️ Good Afternoon! · 🌤️ Chào buổi trưa! · 🌤️ こんにちは！· 🌤️ Good Afternoon! · 🌤️ Chào buổi trưa!'
    } else {
      return lang === 'VI' ? '🌙 Chào buổi tối! · 🌙 こんばんは！· 🌙 Good Evening! · 🌙 Chào buổi tối! · 🌙 こんばんは！'
           : lang === 'JP' ? '🌙 こんばんは！· 🌙 Chào buổi tối! · 🌙 Good Evening! · 🌙 こんばんは！· 🌙 Chào buổi tối!'
           : '🌙 Good Evening! · 🌙 Chào buổi tối! · 🌙 こんばんは！· 🌙 Good Evening! · 🌙 Chào buổi tối!'
    }
  }

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle('dark')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }

  const stalker = useRef<HTMLDivElement>(null)

  // Cursor ring + ✦ on click. Plain DOM, no animation lib.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      const s = stalker.current
      if (!s) return
      s.style.opacity = '1'
      s.style.translate = `${e.clientX}px ${e.clientY}px`
    }
    const click = (e: MouseEvent) => {
      const star = document.createElement('span')
      star.className = 'click-star'
      star.textContent = '✦'
      star.style.left = `${e.clientX}px`
      star.style.top = `${e.clientY}px`
      star.onanimationend = () => star.remove()
      document.body.appendChild(star)
    }
    addEventListener('pointermove', move, { passive: true })
    addEventListener('click', click)
    return () => {
      removeEventListener('pointermove', move)
      removeEventListener('click', click)
    }
  }, [])

  // Spotify player + cover art. The API swaps a target node for its iframe, so give it
  // a node React doesn't own.
  useEffect(() => {
    let cancelled = false
    let controller: SpotifyController | undefined
    loadSpotifyApi().then((api) => {
      const wrap = playerWrap.current
      if (cancelled || !wrap) return
      const target = document.createElement('div')
      wrap.replaceChildren(target)
      api.createController(target, { uri: `spotify:track:${TRACK}`, width: '100%', height: 152, theme: 'dark' }, (c) => {
        controller = c
        c.addListener('playback_update', (e) => setPlaying(!e.data.isPaused))
      })
    })
    fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${TRACK}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setCover(d.thumbnail_url) })
      .catch(() => {})
    return () => {
      cancelled = true
      controller?.destroy()
    }
  }, [])

  const fx = (i: number) => ({ 'data-fx': true, style: { '--i': i } as CSSProperties })

  const contacts = [
    { name: 'Discord', handle: '_kiyosumisin', href: 'https://discord.com/users/_kiyosumisin', Icon: FaDiscord, brand: '#5865F2' },
    { name: 'Gmail', handle: 'sunaookamishirokoneko@gmail.com', href: 'mailto:sunaookamishirokoneko@gmail.com', Icon: SiGmail, brand: '#EA4335' },
    { name: 'GitHub', handle: 'kiyosumisin', href: 'https://github.com/kiyosumisin', Icon: FaGithub, brand: 'var(--foreground)' },
    { name: 'X', handle: '@SunaoShiroko', href: 'https://x.com/SunaoShiroko', Icon: FaXTwitter, brand: 'var(--foreground)' },
  ]

  const socials = (
    <ul className="flex items-center gap-1">
      {contacts.map(({ name, handle, href, Icon, brand }) => (
        <li key={name}>
          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
            aria-label={`${name}: ${handle}`} title={`${name} · ${handle}`}
            style={{ '--brand': brand } as CSSProperties}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:text-[var(--brand)]">
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  )

  const navItems = ['About Me', 'Projects', 'Gallery'].map((item, i) => (
    <button key={item} type="button" aria-current={i === 0 || undefined}
      className="navlink text-sm tracking-[0.06em] text-muted transition-colors hover:text-foreground aria-[current]:text-foreground">
      <span className="mr-1.5 font-mono text-[10px] text-accent">0{i + 1}</span>{item}
    </button>
  ))

  const themeButton = (show: string) => (
    <button type="button" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme"
      className={`${show} h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:text-accent`}>
      <FiMoon size={17} className="dark:hidden" />
      <FiSun size={17} className="hidden dark:block" />
    </button>
  )

  const label = 'font-mono text-xs uppercase tracking-[0.5em] text-accent'
  const glass = 'rounded-2xl border border-border bg-card/60 backdrop-blur-sm'

  return (
    <>
      <div ref={stalker} className="stalker" aria-hidden="true" />

      <header className={`fixed inset-x-0 top-0 z-40 backdrop-blur-md transition-colors ${menuOpen ? 'bg-background/95' : 'bg-background/40'}`}>
        {/* Marquee */}
        <div className="overflow-hidden border-b border-border py-1.5 font-mono text-xs tracking-[0.15em] text-muted">
          <div className="animate-marquee whitespace-nowrap">{getGreeting()}</div>
        </div>

        {/* Navbar */}
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-6 md:gap-10">
          <a href="#about" className="whitespace-nowrap font-serif text-lg tracking-[0.08em] md:text-xl">
            KiyosumiSin<span className="text-accent">.</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">{navItems}</div>
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="hidden lg:block">{socials}</div>
            <div role="group" aria-label="Language" className="flex items-center rounded-full border border-border text-xs">
              {([['EN', 'EN'], ['VI', 'VI'], ['JP', '日本語']] as const).map(([code, name]) => (
                <button key={code} type="button" onClick={() => setLang(code)} aria-pressed={lang === code}
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 font-mono uppercase tracking-[0.08em] transition-colors ${
                    lang === code ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                  }`}>
                  {name}
                </button>
              ))}
            </div>
            {themeButton('hidden md:flex')}
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
              aria-expanded={menuOpen} aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center lg:hidden">
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu: nav + socials + theme (header has no room for them) */}
        {menuOpen && (
          <div id="mobile-menu" className="border-t border-border lg:hidden">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-5">
              <div className="flex flex-col items-start gap-4 md:hidden">{navItems}</div>
              <div className="flex items-center justify-between">
                {socials}
                {themeButton('flex md:hidden')}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="about" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-36 md:pt-40">
            <p {...fx(0)} className={label}>{t.janame}</p>
            <h1 {...fx(1)} className="mt-5 font-serif text-4xl leading-tight tracking-[0.02em] md:text-5xl">
              {t.title}
            </h1>

            <div {...fx(2)} className={`mt-10 overflow-hidden ${glass}`}>
              <Image src="/sin.png" alt="Kiyosumi Sin" width={2560} height={1440} preload
                sizes="(min-width: 896px) 848px, 100vw" className="aspect-video w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="hairlines border-t border-border">
          <div className="mx-auto grid w-full max-w-4xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_2fr] md:py-16">
            <div className="relative mx-auto w-full max-w-[220px]">
              <div className="absolute inset-6 rounded-full bg-accent/15 blur-2xl" aria-hidden="true" />
              <Image src="/chibi.png" alt="chibi" width={360} height={360} className="relative h-auto w-full" />
            </div>
            <div>
              <p className={label}>{t.about}</p>
              <p className="mt-6 font-serif text-2xl italic leading-10 md:text-[1.7rem]">{t.lead}</p>
              <p className="mt-4 max-w-prose leading-8 text-muted">{t.body}</p>

              {/* Record slides out of the Spotify "sleeve" and spins while the track plays */}
              <p className={`mt-10 ${label}`}>{t.nowPlaying}</p>
              <div className="vinyl-deck mt-4">
                <div className="vinyl" data-playing={playing} aria-hidden="true">
                  <div className="vinyl-disc">
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt="" className="vinyl-label" />
                    )}
                  </div>
                </div>
                <div ref={playerWrap} className="relative h-[152px] overflow-hidden rounded-xl bg-card" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-28 border-t border-border">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-6 py-14 text-center md:py-16">
            <p className={label}>{t.contact}</p>
            <a href="mailto:sunaookamishirokoneko@gmail.com"
              className="navlink break-all font-mono text-base tracking-[0.04em] text-accent sm:text-xl md:text-2xl">
              sunaookamishirokoneko@gmail.com
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-12 text-center">
          <p className="font-serif text-lg tracking-[0.08em]">KiyosumiSin<span className="text-accent">.</span></p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted">© 2026 Kiyosumi Sin</p>
        </div>
      </footer>
    </>
  )
}
