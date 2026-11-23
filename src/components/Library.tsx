import { useState } from 'react'
import { STORIES } from '../data/stories'
import type { Story } from '../data/stories'

export default function Library({ onOpenStory }: { onOpenStory: (s: Story) => void }) {
  const [cat, setCat] = useState('Semua')
  const cats = ['Semua', 'Dongeng', 'Hewan', 'Sains', 'Petualangan']
  const filtered = cat === 'Semua' ? STORIES : STORIES.filter(s => s.c === cat)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <h2 style={{ margin: 0 }}>Perpustakaan</h2>
        <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>Daftar {STORIES.length} cerita • Klik cerita untuk membaca</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 4 }}>
        {cats.map(c => (
          <span key={c} className={cat === c ? 'chip active' : 'chip'} onClick={() => setCat(c)}>{c}</span>
        ))}
      </div>
      <div style={{ fontSize: 12, color: '#888' }}>Menampilkan: <b style={{ color: '#FF4D6D' }}>{cat}</b> • {filtered.length} cerita</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtered.map((s) => (
          <div key={s.t} className="card" style={{ padding: 12, cursor: 'pointer' }} onClick={() => onOpenStory(s)}>
            <div className="story-cover" style={{ background: s.bg, overflow: 'hidden', padding: 0 }}>
            <img src={s.cover} alt={s.t} style={{ width: '100%', height: 'auto', objectFit: 'contain', background: s.bg, borderRadius: 12, display: 'block' }} />
            </div>
            <div style={{ fontWeight: 900, fontSize: 14, marginTop: 10, lineHeight: 1.3 }}>{s.t}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{s.c} • {s.age.split('• ')[1] || s.age}</div>
            <div style={{ fontSize: 12, color: '#FFB800', marginTop: 4 }}>★★★★★ 4.9</div>
          </div>
        ))}
      </div>
    </div>
  )
}