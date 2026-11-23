import { useState, useEffect } from 'react'
import { getProgress, type Progress } from '../lib/progress'

type Badge = { id: string, title: string, desc: string, emoji: string, icon?: string, color: string, target: number, type: 'baca' | 'kuis' | 'gim' | 'poin' }
const BADGES: Badge[] = [
  { id: 'pemula', title: 'Pembaca Pemula', desc: 'Baca 1 cerita sampai selesai', emoji: '📖', icon: '/icons/prestasi-pemula.png', color: 'linear-gradient(135deg,#FF4D6D,#FF8A5C)', target: 1, type: 'baca' }, 
  { id: 'hebat', title: 'Pembaca Hebat', desc: 'Baca 5 cerita sampai selesai', emoji: '📚', icon: '/icons/prestasi-hebat.png',color: 'linear-gradient(135deg,#8338EC,#FF006E)', target: 5, type: 'baca' },
  { id: 'master', title: 'Master Cerita', desc: 'Baca 10 cerita sampai selesai', emoji: '👑', icon: '/icons/prestasi-master-cerita.png',color: 'linear-gradient(135deg,#FFB800,#FFD166)', target: 10, type: 'baca' },
  { id: 'bintang-kuis', title: 'Bintang Kuis', desc: 'Menangkan 3 kuis', emoji: '🧠', icon: '/icons/prestasi-bintang-kuis.png', color: 'linear-gradient(135deg,#00B4D8,#48CAE4)', target: 3, type: 'kuis' },
  { id: 'juara-gim', title: 'Juara Gim', desc: 'Menangkan 5 gim', emoji: '🎮', color: 'linear-gradient(135deg,#2EC4B6,#7BDFF2)', target: 5, type: 'gim' },
  { id: 'kolektor', title: 'Kolektor Poin', desc: 'Kumpulkan 500 poin', emoji: '⭐', icon: '/icons/prestasi-juara-gim.png',color: 'linear-gradient(135deg,#FFD166,#FF8A5C)', target: 500, type: 'poin' },
  { id: 'rajin', title: 'Rajin Membaca', desc: 'Baca 5 cerita (rajin!)', emoji: '🔥', icon: '/icons/prestasi-rajin.png',color: 'linear-gradient(135deg,#FF4D6D,#FF006E)', target: 5, type: 'baca' },
  { id: 'legenda', title: 'Legenda Baca', desc: 'Kumpulkan 1000 poin', emoji: '🏆', icon: '/icons/prestasi-legenda.png',color: 'linear-gradient(135deg,#FFD700,#FF8A00)', target: 1000, type: 'poin' },
]

export default function Achievements() {
  const [progress, setProgress] = useState<Progress>(() => getProgress())
  const [claimed, setClaimed] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('read-edu-claimed') || '[]') } catch { return [] }
  })

  // INI KUNCINYA: Prestasi mendengarkan perubahan dari Reader/Gim/Kuis
  useEffect(() => {
    const refresh = () => setProgress(getProgress())
    window.addEventListener('progress-updated', refresh)
    window.addEventListener('storage', refresh)
    return () => { window.removeEventListener('progress-updated', refresh); window.removeEventListener('storage', refresh) }
  }, [])

  const getValue = (b: Badge) => b.type === 'poin' ? progress.poin : progress[b.type]
  const unlocked = BADGES.filter(b => getValue(b) >= b.target)

  const claim = (id: string) => {
    const next = [...claimed, id]
    setClaimed(next)
    localStorage.setItem('read-edu-claimed', JSON.stringify(next))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg,#FF4D6D,#FF8A5C)', color: 'white', textAlign: 'center', padding: 20 }}>
        <img src="/icons/prestasi.png" alt="Piala" style={{ width: 72, height: 72, objectFit: 'contain' }} />
        <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.9 }}>LEVEL KAMU • OTOMATIS DARI BACA / GIM / KUIS</div>
        <div style={{ fontSize: 24, fontWeight: 900 }}>Pembaca Level {Math.floor(progress.poin / 100) + 1}</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>⭐ {progress.poin} Poin • 📖 {progress.baca} Cerita • 🧠 {progress.kuis} Kuis • 🎮 {progress.gim} Gim</div>
        <div style={{ fontSize: 12, marginTop: 6 }}>Terakhir dibaca: {progress.judulTerakhir}</div>
        <div style={{ background: 'rgba(255,255,255,0.3)', height: 10, borderRadius: 10, marginTop: 12, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, (unlocked.length / BADGES.length) * 100)}%`, height: '100%', background: 'white' }} />
        </div>
        <div style={{ fontSize: 12, marginTop: 6 }}>{unlocked.length} dari {BADGES.length} Lencana Terbuka</div>
      </div>

      <div className="card" style={{ padding: 14 }}>
        <div style={{ fontWeight: 900 }}>🕒 Riwayat Terbaru</div>
        {progress.riwayat.length === 0
          ? <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Belum ada aktivitas. Baca 1 cerita sampai halaman 12 untuk dapat poin pertama!</div>
          : progress.riwayat.slice(0, 5).map((r, i) => <div key={i} style={{ fontSize: 13, color: '#555', marginTop: 6 }}>{r}</div>)}
      </div>

      <h3 style={{ margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 8 }}><img src="/icons/prestasi-legenda.png" alt="Lencana" style={{ width: 36, height: 42, objectFit: 'contain' }} /> Koleksi Lencanamu</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {BADGES.map(b => {
          const val = getValue(b)
          const isUnlocked = val >= b.target
          const isClaimed = claimed.includes(b.id)
          const pct = Math.min(100, Math.round((val / b.target) * 100))
          return (
            <div key={b.id} className="card" style={{ padding: 14, textAlign: 'center', border: isClaimed ? '2px solid #2EC4B6' : '1px solid #FFE0E6' }}>
              <div style={{ background: isUnlocked ? b.color : '#E8E8E8', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', filter: isUnlocked ? 'none' : 'grayscale(1)', overflow: 'hidden' }}>{isUnlocked ? (<img src={b.icon} alt={b.title} style={{ width: 56, height: 56, objectFit: 'contain' }} />) : (<img src="/icons/prestasi-gembok.png" alt="Terkunci" style={{ width: 40, height: 40, objectFit: 'contain' }} />)}</div>
              <div style={{ fontWeight: 900, fontSize: 14, marginTop: 8 }}>{b.title}</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{b.desc}</div>
              <div style={{ background: '#F0F0F0', height: 8, borderRadius: 10, marginTop: 8, overflow: 'hidden' }}><div style={{ width: `${pct}%`, height: '100%', background: isUnlocked ? '#2EC4B6' : '#FF4D6D' }} /></div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{val} / {b.target} • {pct}%</div>
              {isUnlocked && !isClaimed && <button className="btn-primary" style={{ width: '100%', marginTop: 8, padding: '8px 0', fontSize: 13 }} onClick={() => claim(b.id)}>🎉 Klaim</button>}
              {isClaimed && <div style={{ fontSize: 12, fontWeight: 800, color: '#2EC4B6', marginTop: 8 }}>✅ Sudah Diklaim!</div>}
              {!isUnlocked && <div style={{ fontSize: 12, color: '#AAA', marginTop: 8 }}>🔒 Terkunci</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}