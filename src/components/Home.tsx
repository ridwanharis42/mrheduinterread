import { useState } from 'react'
import { STORIES } from '../data/stories'
import type { Story } from '../data/stories'

const CATS = [
  { label: 'Semua', icon: '/icons/cat-semua.png' },
  { label: 'Dongeng', icon: '/icons/cat-dongeng.png' },
  { label: 'Sains', icon: '/icons/cat-sains.png' },
  { label: 'Hewan', icon: '/icons/cat-hewan.png' },
  { label: 'Petualang', icon: '/icons/cat-petualang.png' },
]

export default function Home({ onNavigate, onOpenStory }: { onNavigate: (p: string) => void, onOpenStory: (s: Story) => void }) {
  const [cat, setCat] = useState('Semua')
  const filtered = cat === 'Semua' ? STORIES.slice(0, 3) : STORIES.filter(s => s.c === cat)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #FFF1F4, #FFF7E6)', display: 'flex', gap: 14, alignItems: 'center' }}>
        <img src="/icons/buku-terbuka.png" alt="Buku" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 14, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#FF4D6D' }}>LANJUT MEMBACA</div>
          <div style={{ fontWeight: 900, fontSize: 17, margin: '4px 0 2px' }}>Aladin dan Lampu Ajaib</div>
          <div style={{ fontSize: 13, color: '#777' }}>Bab 3 dari 5 • 4 menit lagi</div>
          <div className="progress-track" style={{ marginTop: 10 }}><div className="progress-fill" style={{ width: '60%' }} /></div>
        </div>
        <button className="btn-secondary" onClick={() => onOpenStory(STORIES[0])}>Lanjut →</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { e: '/icons/stat-api.png', n: '5 Hari', l: 'Rangkaian' },
          { e: '/icons/stat-bintang.png', n: '120', l: 'Poin' },
          { e: '/icons/stat-buku.png', n: '28 Cerita', l: 'Di Library' },
            ].map((s) => (
          <div key={s.l} className="card" style={{ textAlign: 'center', padding: '12px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={s.e} alt={s.l} style={{ width: 38, height: 38, objectFit: 'contain' }} />
          </div>
          <div style={{ fontWeight: 900, fontSize: 15, marginTop: 6 }}>{s.n}</div>
          <div style={{ fontSize: 11, color: '#888', fontWeight: 700 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ margin: 0, fontSize: 17 }}>Pilih Kategori</h3>
          <span style={{ fontSize: 13, color: '#FF4D6D', fontWeight: 800, cursor: 'pointer' }} onClick={() => onNavigate('library')}>Lihat Semua →</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 4 }}>
          {CATS.map((c) => (
          <span key={c.label} className={cat === c.label ? 'chip active' : 'chip'} onClick={() => setCat(c.label)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <img src={c.icon} alt={c.label} style={{ width: 22, height: 22, objectFit: 'cover', borderRadius: 6 }} /> {c.label}
        </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Menampilkan: <b style={{ color: '#FF4D6D' }}>{cat}</b> • {filtered.length} cerita</div>
      </div>

      <div>
        <h3 style={{ margin: '4px 0 12px', fontSize: 17 }}>{cat === 'Semua' ? 'Cerita Populer Hari Ini' : `Cerita ${cat}`}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((s) => (
            <div key={s.t} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }} onClick={() => onOpenStory(s)}>
        <div className="story-cover" style={{ background: '#fff', width: 100, flexShrink: 0, overflow: 'hidden', padding: 4, borderRadius: 12 }}>
        <img src={s.cover} alt={s.t} style={{ width: '100%', height: 112, objectFit: 'contain', display: 'block' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: 15 }}>{s.t}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>{s.age}</div>
                <div style={{ fontSize: 12, color: '#FFB800', marginTop: 4 }}>★★★★★ <span style={{ color: '#999' }}>(4.9)</span></div>
              </div>
              <button className="btn-secondary">Baca</button>
            </div>
          ))}
        </div>
      </div>
      <button className="btn-primary" onClick={() => onNavigate('games')}>🎮 Main Gim Membaca Sekarang</button>
    </div>
  )
}