"use client"
import { useState } from 'react'
import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'

export default function Home() {
  const [lang, setLang] = useState('EN')

  const content = {
    EN: {
      title: 'This is my Personal Profile',
      fullname: 'Full Name: Kiyosumi Sin',
      janame: 'キヨスミ・シン',
      studied: 'University of Transport Ho Chi Minh City',
      birthLabel: 'Birth Date:',
      birthValue: '16/10/2006',
      addressLabel: 'Address:',
      addressValue: 'Ho Chi Minh City',
      contact: 'Contact Me',
    },
    VI: {
      title: 'Đây là Hồ Sơ Cá Nhân của tôi',
      fullname: 'Họ và Tên: Kiyosumi Sin',
      janame: 'キヨスミ・シン',
      studied: 'Đại học Giao thông Vận tải TP. Hồ Chí Minh',
      birthLabel: 'Ngày Sinh:',
      birthValue: '16/10/2006',
      addressLabel: 'Địa Chỉ:',
      addressValue: 'TP. Hồ Chí Minh',
      contact: 'Liên Hệ',
    },
    JP: {
      title: 'これは私のプロフィールです',
      fullname: '氏名：キヨスミ・シン',
      janame: 'キヨスミ・シン',
      studied: 'ホーチミン市交通運輸大学',
      birthLabel: '生年月日：',
      birthValue: '2006年10月16日',
      addressLabel: '住所：',
      addressValue: 'ホーチミン市',
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

  const cardStyle = {
    background: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '24px 16px',
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '8px',
    border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
  }

  const btnStyle = {
    marginTop: '4px', padding: '6px 16px', borderRadius: '20px',
    background: 'rgba(255,255,255,0.2)', color: '#ffffff',
    textDecoration: 'none', fontSize: '13px', border: '1px solid rgba(255,255,255,0.3)'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/sin.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>

      {/* Marquee */}
      <div className="fixed top-0 w-full overflow-hidden py-2 z-20"
        style={{background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#f0e8ff', fontSize: '14px'}}>
        <div className="animate-marquee whitespace-nowrap">
          {getGreeting()}
        </div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-8 z-10 flex gap-4 px-6 py-3 rounded-full shadow"
        style={{background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)'}}>
        <button style={{color: '#ffffff'}} className="font-semibold">About Me</button>
        <button style={{color: '#d8c8ff'}}>Projects</button>
        <button style={{color: '#d8c8ff'}}>Gallery</button>
        <span style={{color: '#d8c8ff', margin: '0 8px'}}>|</span>
        <button onClick={() => setLang('EN')}
          style={{color: lang === 'EN' ? '#ffffff' : '#d8c8ff', fontWeight: lang === 'EN' ? '600' : '400'}}>
          EN
        </button>
        <button onClick={() => setLang('VI')}
          style={{color: lang === 'VI' ? '#ffffff' : '#d8c8ff', fontWeight: lang === 'VI' ? '600' : '400'}}>
          VI
        </button>
        <button onClick={() => setLang('JP')}
          style={{color: lang === 'JP' ? '#ffffff' : '#d8c8ff', fontWeight: lang === 'JP' ? '600' : '400'}}>
          日本語
        </button>
      </nav>

      {/* Title */}
      <h1 className="text-5xl font-bold mt-20 text-center"
        style={{fontFamily: 'cursive', color: '#ffffff', textShadow: '0 0 12px rgba(180,120,255,0.8)'}}>
        {t.title}
      </h1>

      {/* Spotify widget */}
      <div className="mt-4 rounded-2xl shadow-md"
        style={{
          width: '600px', background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)',
          padding: '12px', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
        <img src="/chibi.png"
          style={{width: '60px', objectFit: 'contain', transform: 'scaleX(-1)', flexShrink: 0}}
          alt="chibi" />
        <div style={{flex: 1}}>
          <iframe
            src="https://open.spotify.com/track/7AszT06Rsoj1SQTWmFzdmw?si=4CzkPeLeSDe_1XWs37mFoQ&utm_source=copy-link&rowId=47e1b442c788842d&nd=1&dlsi=abc8758ac53d42e0"
            width="100%" height="152" frameBorder="0"
            style={{borderRadius: '12px', display: 'block'}}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        <img src="/chibi.png"
          style={{width: '60px', objectFit: 'contain', flexShrink: 0}}
          alt="chibi" />
      </div>

      {/* Info card */}
      <div className="mt-6 rounded-2xl p-8 text-center shadow-md"
        style={{
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)', transition: 'all 0.3s ease', width: '600px',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(180,120,255,0.4)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}>
        <p className="text-2xl font-semibold mb-3"
          style={{color: '#ffffff', fontFamily: 'cursive', textShadow: '0 0 8px rgba(180,120,255,0.6)'}}>
          {t.fullname}
        </p>
        <p style={{color: '#ffffff', letterSpacing: '4px', fontSize: '15px', marginBottom: '8px'}}>
          {t.janame}
        </p>
        <p style={{color: '#d8c8ff', marginBottom: '8px', fontSize: '16px'}}>
          --- Studied at: <span style={{color: '#a8d8ff', fontWeight: '500'}}>{t.studied}</span> ---
        </p>
        <p style={{color: '#d8c8ff', marginBottom: '8px'}}>
          {t.birthLabel} <span style={{color: '#ffffff'}}>{t.birthValue}</span>
        </p>
        <p style={{color: '#d8c8ff'}}>
          {t.addressLabel} <span style={{color: '#ffffff'}}>{t.addressValue}</span>
        </p>
      </div>

      {/* Contact card */}
      <div className="mt-6 mb-10 rounded-2xl p-8 text-center shadow-md"
        style={{
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)', width: '600px',
        }}>
        <p className="text-xl font-semibold mb-6"
          style={{color: '#ffffff', fontFamily: 'cursive', textShadow: '0 0 8px rgba(180,120,255,0.6)'}}>
          {t.contact}
        </p>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>

          {/* Discord */}
          <div style={cardStyle}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{background: 'rgba(88,101,242,0.3)', borderRadius: '12px', padding: '12px'}}>
              <FaDiscord size={32} color="#7289da" />
            </div>
            <p style={{color: '#ffffff', fontFamily: 'cursive', fontSize: '18px'}}>Discord</p>
            <p style={{color: '#d8c8ff', fontSize: '13px'}}>_kiyosumisin</p>
            <a href="https://discord.com/users/_kiyosumisin" target="_blank" style={btnStyle}>
              🔗 Open Discord
            </a>
          </div>

          {/* Gmail */}
          <div style={cardStyle}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{background: 'rgba(234,67,53,0.3)', borderRadius: '12px', padding: '12px'}}>
              <SiGmail size={32} color="#ea4335" />
            </div>
            <p style={{color: '#ffffff', fontFamily: 'cursive', fontSize: '18px'}}>Gmail</p>
            <p style={{color: '#d8c8ff', fontSize: '13px'}}>sunaookamishirokoneko@gmail.com</p>
            <a href="mailto:sunaookamishirokoneko@gmail.com" style={btnStyle}>
              🔗 Send Email
            </a>
          </div>

          {/* GitHub */}
          <div style={cardStyle}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px'}}>
              <FaGithub size={32} color="#ffffff" />
            </div>
            <p style={{color: '#ffffff', fontFamily: 'cursive', fontSize: '18px'}}>GitHub</p>
            <p style={{color: '#d8c8ff', fontSize: '13px'}}>kiyosumisin</p>
            <a href="https://github.com/kiyosumisin" target="_blank" style={btnStyle}>
              🔗 View Profile
            </a>
          </div>

          {/* X */}
          <div style={cardStyle}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '12px'}}>
              <FaXTwitter size={32} color="#ffffff" />
            </div>
            <p style={{color: '#ffffff', fontFamily: 'cursive', fontSize: '18px'}}>X</p>
            <p style={{color: '#d8c8ff', fontSize: '13px'}}>@SunaoShiroko</p>
            <a href="https://x.com/SunaoShiroko" target="_blank" style={btnStyle}>
              🔗 Open X
            </a>
          </div>

        </div>
      </div>

    </main>
  )
}