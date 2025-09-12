import React, { useState, useEffect } from 'react'
import { FaInstagram, FaYoutube, FaTiktok, FaTelegramPlane, FaTwitch, FaApple, FaSpotify } from 'react-icons/fa'
import { SiYoutubemusic } from 'react-icons/si'
import AnimatedBackground from './components/AnimatedBackground'

const TABS = [
  { key: 'social', label: 'Social Media' },
  { key: 'music', label: 'Music' },
]

const LINKS = {
  social: [
    { icon: <FaInstagram />, title: 'Instagram', url: 'https://www.instagram.com/kirtsoy_official' },
    { icon: <FaYoutube />,   title: 'YouTube',   url: 'https://www.youtube.com/@kirtsoy_official' },
    { icon: <FaTiktok />,    title: 'TikTok',    url: 'https://www.tiktok.com/@kirtsoy_official' },
    { icon: <FaTelegramPlane />, title: 'Telegram', url: 'https://t.me/kirtsoy_official' },
    { icon: <FaTwitch />,    title: 'Twitch',    url: 'https://www.twitch.tv/kirtsoy_official' },
  ],
  music: [
    { icon: <SiYoutubemusic />, title: 'Latest Single', url: 'https://www.youtube.com/watch?v=yXiunR8TSu0&list=OLAK5uy_nh1EVNpcfpmU6umm5EuYNIA30o6emSCJs&ab_channel=kirtsoy-Topic' },
    { icon: <SiYoutubemusic />, title: 'Latest Album', url: 'https://www.youtube.com/playlist?list=OLAK5uy_mDTZU2QK14qKqCAshxJbJiw3iFdr6mJlk' },
    { icon: <FaApple />,        title: 'Apple Music',  url: 'https://music.apple.com/us/artist/kirtsoy/1794251361' },
    { icon: <FaSpotify />,      title: 'Spotify',      url: 'https://open.spotify.com/artist/3yFMC9nDGATXOAz8HsvKVG' },
    { icon: <SiYoutubemusic />, title: 'YouTube Music',url: 'https://music.youtube.com/channel/UCm241CE93k5deapyTbN5EqA' },
  ]
}

const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

export default function App() {
  const [active, setActive] = useState('social')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayedLinks, setDisplayedLinks] = useState(LINKS[active])

  const handleTabChange = (newTab: string) => {
    if (newTab === active) return
    
    setIsTransitioning(true)
    
    // Start fade out
    setTimeout(() => {
      setActive(newTab)
      setDisplayedLinks(LINKS[newTab as keyof typeof LINKS])
      setIsTransitioning(false)
    }, 150) // Half of the transition time
  }

  useEffect(() => {
    setDisplayedLinks(LINKS[active as keyof typeof LINKS])
  }, [active])

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-2 sm:px-4 py-6 sm:py-10">
        <div className="frame p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src="/avatar.jpg"
                alt="kirtsoy avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border avatar-glow"
                style={{ borderColor: 'rgba(255,255,255,0.18)' }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-white/5 animate-pulse"></div>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold leading-tight mt-3 text-glow">kirtsoy</h1>
            <p className="text-xs opacity-80 mt-0.5">artist</p>
          </div>

          <div className="header-line" />

          {/* Tabs with smooth underline */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base relative">
            {TABS.map((t, index) => (
              <button
                key={t.key}
                className={`tab ${active === t.key ? 'tab-active' : 'tab-inactive'}`}
                onClick={() => handleTabChange(t.key)}
                style={{ position: 'relative' }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Links with smooth transition */}
          <div className="content-container mt-5">
            <div 
              className={`space-y-2 sm:space-y-3 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              style={{ 
                transition: 'opacity 0.3s ease-in-out',
                transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
              }}
            >
              {displayedLinks.map((item, idx) => (
                <a
                  key={`${active}-${idx}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card text-sm sm:text-base"
                  style={{ 
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <div className="text-xl sm:text-2xl pt-0.5 opacity-90 icon-glow">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="link-title">{item.title}</div>
                    {active === 'social' && (
                      <div className="link-sub">{prettyUrl(item.url)}</div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}