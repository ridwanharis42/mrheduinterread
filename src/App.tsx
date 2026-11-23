import { useState } from 'react'
import Home from './components/Home'
import Library from './components/Library'
import Reader from './components/Reader'
import Games from './components/Games'
import Quiz from './components/Quiz'
import Achievements from './components/Achievements'
import ParentDashboard from './components/ParentDashboard'
import Settings from './components/Settings'
import type { Story } from './data/stories'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)

  // INI KUNCINYA: simpan cerita yang diklik, lalu pindah ke Reader
  const openStory = (story: Story) => {
    setSelectedStory(story)
    setPage('reader')
  }

  const nav = [
  { id: 'home', label: 'Home', icon: '/icons/home.png' },
  { id: 'library', label: 'Library', icon: '/icons/library.png' },
  { id: 'reader', label: 'Baca', icon: '/icons/baca.png' },
  { id: 'games', label: 'Gim', icon: '/icons/gim.png' },
  { id: 'quiz', label: 'Kuis', icon: '/icons/kuis.png' },
  { id: 'achievements', label: 'Prestasi', icon: '/icons/prestasi.png' },
  { id: 'parent', label: 'Ortu', icon: '/icons/ortu.png' },
  { id: 'settings', label: 'Atur', icon: '/icons/atur.png' },
]

  return (
    <div className="app-shell">
{/* ===== HEADER PROFESIONAL - MRH ===== */}
<div style={{
  background: '#FFFFFF',
  margin: '-8px -8px 14px -8px',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #FFE4E8',
  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  position: 'sticky',
  top: 0,
  zIndex: 10
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{
      background: '#FFFFFF', border: '1px solid #F1F1F1', borderRadius: 14,
      width: 56, height: 56, display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden', flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <img src="/icons/logo-mrh.png" alt="MRH" style={{ width: '92%', height: '92%', objectFit: 'contain', objectPosition: 'center' }} />
    </div>
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ fontSize: 15, fontWeight: 900, color: '#1A1A1A', letterSpacing: 0.5 }}>
        INTERACTIVE <span style={{ color: '#E91E63' }}>READ EDU</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#8A8A8A', marginTop: 3 }}>
        Baca • Main • Belajar — by MRH
      </div>
    </div>
  </div>
  <div style={{
  width: 65, height: 65, borderRadius: '50%', background: '#FFF1F3',
  border: '2px solid #FFD6DE', display: 'flex', alignItems: 'center',
  justifyContent: 'center', flexShrink: 0, overflow: 'hidden', padding: 0
}}>
  <img src="/icons/header-anak-baca.png" alt="Anak Baca" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} />
</div>
      </div>
      <div className="app-content">
        {page === 'home' && <Home onNavigate={setPage} onOpenStory={openStory} />}
        {page === 'library' && <Library onOpenStory={openStory} />}
        {page === 'reader' && <Reader story={selectedStory} onBack={() => setPage('home')} />}
        {page === 'games' && <Games />}
        {page === 'quiz' && <Quiz />}
        {page === 'achievements' && <Achievements />}
        {page === 'parent' && <ParentDashboard />}
        {page === 'settings' && <Settings />}
      </div>

<div className="bottom-nav">
  {nav.map(n => (
    <button key={n.id} className={page === n.id ? 'nav-item active' : 'nav-item'} onClick={() => setPage(n.id)}>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={n.icon} alt={n.label} style={{ width: 30, height: 30, objectFit: 'contain' }} />
      </span>
      <span>{n.label}</span>
    </button>
  ))}
</div>
</div>
  )
}