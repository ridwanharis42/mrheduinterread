import { useState } from 'react';
import { STORIES as stories } from '../data/stories';
import { addBaca } from '../lib/progress';
import { STORY_PAGES } from '../data/storyPages';

export default function Reader({ story, storyId, onBack }: { story?: any; storyId?: any; onBack: () => void }) {
  const incoming: any = story ?? storyId;
  const s: any = (typeof incoming === 'object' && incoming !== null) ? incoming : (stories.find((x: any) => x.id === incoming || x.t === incoming || x.title === incoming || x.judul === incoming) || stories[0]);
  const pages: string[] = STORY_PAGES[s.t] || STORY_PAGES[s.title] || (s.pages && s.pages.length > 0 ? s.pages : [s.desc || 'Cerita belum tersedia.']);
  const [page, setPage] = useState(0);

  function goPage(n: number) {
    if (n < 0 || n >= pages.length) return;
    setPage(n);
    if (n === pages.length - 1) addBaca(s.t);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <button className="btn-secondary" onClick={onBack} style={{ alignSelf: 'flex-start' }}>← Kembali</button>

      <div style={{ width: '100%', overflow: 'hidden', borderRadius: 16, background: s.bg }}>
        <img src={s.cover} alt={s.t} style={{ width: '100%', height: 'auto', objectFit: 'contain', background: s.bg, display: 'block' }} />
      </div>

      <h2 style={{ margin: 0 }}>{s.t}</h2>
      <div style={{ fontSize: 13, color: '#888' }}>{s.age} • ★★★★★ 4.9 • Halaman {page + 1} dari {pages.length}</div>

      <div className="progress-track"><div className="progress-fill" style={{ width: `${((page + 1) / pages.length) * 100}%` }}></div></div>

      <div className="card" style={{ fontSize: 16, lineHeight: 1.8, color: '#333', minHeight: 180 }}>{pages[page]}</div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn-secondary" style={{ flex: 1, opacity: page === 0 ? 0.4 : 1 }} disabled={page === 0} onClick={() => goPage(page - 1)}>← Sebelumnya</button>
        <button className="btn-primary" style={{ flex: 1 }} onClick={() => goPage(page + 1)}>{page === pages.length - 1 ? 'Selesai ✓' : 'Berikutnya →'}</button>
      </div>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
        {pages.map((_: any, i: number) => (
          <span key={i} onClick={() => goPage(i)} style={{ width: 10, height: 10, borderRadius: '50%', background: i === page ? '#FF4D6D' : '#DDD', cursor: 'pointer' }}></span>
        ))}
      </div>

      <div style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>Baca sampai halaman {pages.length} untuk dapat +50 Poin otomatis!</div>
    </div>
  );
}