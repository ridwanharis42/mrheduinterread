import { useState, useEffect } from 'react'
import { getProgress, resetProgress, type Progress } from '../lib/progress'

export default function ParentDashboard() {
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState<Progress>(() => getProgress())

  useEffect(() => {
    const refresh = () => setProgress(getProgress())
    window.addEventListener('progress-updated', refresh)
    return () => window.removeEventListener('progress-updated', refresh)
  }, [])
  if (!unlocked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center' }}>
        <img src="/icons/ortu-keluarga.png" alt="Dashboard Ortu" style={{ width: 180, height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
        <h2 style={{ margin: 0 }}>Dashboard Orang Tua</h2>
        <p style={{ color: '#888', fontSize: 13, margin: 0 }}>Khusus orang tua. Masukkan PIN untuk melihat progres anak.</p>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Masukkan PIN (Demo: 1234)</div>
          <input value={pin} onChange={e => setPin(e.target.value)} placeholder="• • • •" maxLength={4} inputMode="numeric" style={{ width: '100%', padding: 14, borderRadius: 12, border: '2px solid #FFE0E6', textAlign: 'center', fontSize: 22, fontWeight: 900, letterSpacing: 8 }} />
          {error && <div style={{ color: '#FF4D6D', fontSize: 13, marginTop: 8 }}>{error}</div>}
          <button className="btn-primary" style={{ width: '100%', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => { if (pin === '1234') { setUnlocked(true); } else { setError('PIN salah. Coba 1234 (demo)') } }}>
          <img src="/icons/ortu-gembok.png" alt="Buka" style={{ width: 22, height: 22, objectFit: 'contain' }} />
          Buka Dashboard
          </button>
        </div>
        <div style={{ fontSize: 12, color: '#AAA' }}>Anak tidak bisa membuka halaman ini tanpa PIN orang tua.</div>
      </div>
    )
  }
  const level = Math.floor(progress.poin / 100) + 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 4 }}>
    <img src="/icons/ortu-keluarga.png" alt="Dashboard Ortu" style={{ width: 180, height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
    </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Dashboard Ortu</h2>
        <button className="btn-secondary" onClick={() => { setUnlocked(false); setPin('') }} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <img src="/icons/ortu-gembok.png" alt="Kunci" style={{ width: 20, height: 20, objectFit: 'contain' }} />
        Kunci
      </button>
      </div>
      <div className="card" style={{ background: 'linear-gradient(135deg,#7C5CFF,#B07CFF)', color: 'white', padding: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.9 }}>RINGKASAN ANAK • KAWAN</div>
        <div style={{ fontSize: 22, fontWeight: 900, marginTop: 4 }}>Level {level} • {progress.poin} Poin Total</div>
        <div style={{ fontSize: 13, marginTop: 6 }}>Terakhir dibaca: <b>{progress.judulTerakhir}</b></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { src:'/icons/buku-terbuka.png', n: `${progress.baca}`, l: 'Cerita Selesai' },
          { src:'/icons/prestasi-legenda.png', n: `${progress.kuis}`, l: 'Kuis Menang' },
          { src:'/icons/prestasi-juara-gim.png', n: `${progress.gim}`, l: 'Gim Menang' },
        ].map(s => (
          <div key={s.l} className="card" style={{ textAlign: 'center', padding: 14 }}>
            <img src={s.src} alt={s.l} style={{ width: 100, height: 80, objectFit: 'contain', display: 'block', margin: '0 auto' }} />
            <div style={{ fontWeight: 900, fontSize: 18 }}>{s.n}</div>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 700 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src="/icons/ortu-baca.png" alt="Aktivitas Anak" style={{ width: 36,height: 36, objectFit: 'contain' }} />
      Aktivitas Anak
      </div>
        <div style={{ fontSize: 13, color: '#666', marginTop: 6, lineHeight: 1.6 }}>
          • Total cerita dibaca: <b>{progress.baca}</b> cerita (tiap cerita = 12 halaman)<br />
          • Estimasi waktu baca: <b>{progress.baca * 12} menit</b> (1 cerita ≈ 12 menit)<br />
          • Rata-rata poin per aktivitas: <b>{progress.baca + progress.kuis + progress.gim > 0 ? Math.round(progress.poin / (progress.baca + progress.kuis + progress.gim)) : 0}</b> poin<br />
          • Status: {progress.baca === 0 ? 'Belum mulai membaca — ajak anak baca 1 cerita ya!' : progress.baca < 3 ? 'Baru mulai — semangat!' : progress.baca < 7 ? 'Sudah rajin membaca!' : 'Luar biasa! Anak sangat rajin!'}
        </div>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src="/icons/ortu-jam.png" alt="Riwayat" style={{ width: 32, height: 32, objectFit: 'contain' }} />
      Riwayat Terbaru Anak
      </div>
        {progress.riwayat.length === 0
          ? <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Belum ada aktivitas. Minta anak baca 1 cerita sampai selesai.</div>
          : progress.riwayat.map((r, i) => <div key={i} style={{ fontSize: 13, color: '#555', marginTop: 6, paddingBottom: 6, borderBottom: i < progress.riwayat.length - 1 ? '1px solid #F0F0F0' : 'none' }}>{r}</div>)}
      </div>
      <div className="card" style={{ padding: 16, background: '#FFF7E6' }}>
        <div style={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src="/icons/ortu-bimbing.png" alt="Saran" style={{ width: 44, height: 36, objectFit: 'contain' }} />
      Saran untuk Orang Tua
      </div>
        <div style={{ fontSize: 13, color: '#666', marginTop: 6, lineHeight: 1.6 }}>
          {progress.baca === 0
            ? 'Ajak anak baca 1 cerita sebelum tidur. Mulai dari yang pendek seperti Kiki Si Kucing Penjelajah.'
            : 'Puji anak setiap selesai 1 cerita. Tanyakan: "Apa pelajaran dari cerita tadi?" — itu melatih pemahaman, bukan sekadar baca cepat.'}
        </div>
      </div>

      <button className="btn-secondary" style={{ width: '100%', color: '#FF4D6D' }} onClick={() => { if (confirm('Yakin reset semua progres anak?')) { resetProgress(); setProgress(getProgress()) } }}>🗑️ Reset Semua Progres Anak</button>
    </div>
  )
}