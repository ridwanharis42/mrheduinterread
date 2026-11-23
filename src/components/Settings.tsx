import { useState, useEffect } from 'react'
import { getProgress, resetProgress } from '../lib/progress'

export default function Settings() {
  const [nama, setNama] = useState(() => localStorage.getItem('read-edu-nama') || 'Kawan')
  const [ukuranHuruf, setUkuranHuruf] = useState(() => localStorage.getItem('read-edu-font') || 'Sedang')
  const [suara, setSuara] = useState(() => localStorage.getItem('read-edu-suara') !== 'mati')
  const [progress] = useState(() => getProgress())
  const [tersimpan, setTersimpan] = useState(false)

  useEffect(() => {
    localStorage.setItem('read-edu-nama', nama)
    localStorage.setItem('read-edu-font', ukuranHuruf)
    localStorage.setItem('read-edu-suara', suara ? 'hidup' : 'mati')
  }, [nama, ukuranHuruf, suara])

  const simpan = () => {
    setTersimpan(true)
    setTimeout(() => setTersimpan(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h2 style={{ margin: 0 }}>⚙️ Pengaturan</h2>

      {/* ===== LOGO MRH DI SETTINGS — FULL UTUH ===== */}
      <div className="card" style={{ textAlign: 'center', padding: 20, background: '#FFFFFF' }}>
        <img
          src="/icons/logo-mrh.png"
          alt="MRH - Konsultan | Sertifikasi | DigitalHub"
          style={{ width: '100%', maxWidth: 300, height: 'auto', objectFit: 'contain', borderRadius: 12 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div style={{ fontWeight: 900, fontSize: 16, marginTop: 12 }}>Interactive Read Edu</div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Aplikasi Membaca Interaktif untuk Anak 7-15 Tahun</div>
        <div style={{ fontSize: 12, color: '#888' }}>Dipersembahkan oleh <b style={{ color: '#1B3A8F' }}>MRH</b> • Konsultan | Sertifikasi | DigitalHub</div>
        <div style={{ fontSize: 11, color: '#AAA', marginTop: 6, letterSpacing: 1 }}>BERSINERGY BERTRANSFORMASI INDUSTRI MODERN</div>
        <div style={{ display: 'inline-block', background: '#FFF1F4', color: '#FF4D6D', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20, marginTop: 10 }}>Versi 1.0 • Tahap 1 • 100% Gratis</div>
      </div>

      {/* ===== PENGATURAN ANAK ===== */}
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900, marginBottom: 12 }}>👧 Profil Anak</div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Nama Anak</div>
        <input
          value={nama}
          onChange={e => setNama(e.target.value)}
          placeholder="Contoh: Kawan, Sita, Nara..."
          style={{ width: '100%', padding: 12, borderRadius: 12, border: '2px solid #FFE0E6', fontSize: 15, fontWeight: 700, boxSizing: 'border-box' }}
        />
        <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>Nama ini tampil di sapaan "Halo, {nama}!" di Home.</div>

        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 14, marginBottom: 6 }}>Ukuran Huruf Saat Membaca</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Kecil', 'Sedang', 'Besar'].map(u => (
            <button
              key={u}
              onClick={() => setUkuranHuruf(u)}
              className={ukuranHuruf === u ? 'btn-primary' : 'btn-secondary'}
              style={{ flex: 1, padding: '10px 0', fontSize: u === 'Kecil' ? 12 : u === 'Sedang' ? 14 : 17 }}
            >{u} {ukuranHuruf === u ? '✓' : ''}</button>
          ))}
        </div>
        <div style={{ fontSize: 13, color: '#666', marginTop: 10, lineHeight: 1.6, background: '#FFF9F5', padding: 10, borderRadius: 10 }}>
          Contoh huruf {ukuranHuruf}: <span style={{ fontSize: ukuranHuruf === 'Kecil' ? 13 : ukuranHuruf === 'Sedang' ? 16 : 20, fontWeight: 700 }}>Aladin menemukan lampu ajaib...</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
          <div><div style={{ fontWeight: 700, fontSize: 14 }}>🔊 Suara & Efek Gim</div><div style={{ fontSize: 12, color: '#888' }}>Bunyi saat menang gim / kuis</div></div>
          <button onClick={() => setSuara(!suara)} style={{ width: 56, height: 30, borderRadius: 20, border: 'none', background: suara ? '#2EC4B6' : '#DDD', cursor: 'pointer', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 3, left: suara ? 28 : 3, width: 24, height: 24, borderRadius: '50%', background: 'white', transition: '0.2s' }} />
          </button>
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={simpan}>{tersimpan ? '✅ Tersimpan!' : '💾 Simpan Pengaturan'}</button>
      </div>

      {/* ===== RINGKASAN PROGRES ===== */}
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>📊 Progres Anak Saat Ini</div>
        <div style={{ fontSize: 13, color: '#666', marginTop: 8, lineHeight: 1.8 }}>
          📖 Cerita selesai: <b>{progress.baca}</b><br />
          🧠 Kuis menang: <b>{progress.kuis}</b><br />
          🎮 Gim menang: <b>{progress.gim}</b><br />
          ⭐ Total poin: <b>{progress.poin}</b><br />
          📖 Terakhir dibaca: <b>{progress.judulTerakhir}</b>
        </div>
      </div>

      {/* ===== TENTANG MRH ===== */}
      <div className="card" style={{ padding: 16, background: 'linear-gradient(135deg,#1B3A8F,#2E5BFF)', color: 'white' }}>
        <div style={{ fontWeight: 900 }}>💙 Tentang MRH</div>
        <div style={{ fontSize: 13, marginTop: 6, lineHeight: 1.7, opacity: 0.95 }}>
          MRH adalah Konsultan, Sertifikasi, dan DigitalHub yang berfokus pada transformasi industri modern melalui edukasi digital yang menyenangkan dan bermanfaat untuk anak Indonesia.
        </div>
        <div style={{ fontSize: 12, marginTop: 10, opacity: 0.85 }}>• Konsultan • Sertifikasi • DigitalHub •</div>
      </div>

      {/* ===== BAHAYA / RESET ===== */}
      <div className="card" style={{ padding: 16, border: '1px solid #FFE0E6' }}>
        <div style={{ fontWeight: 900, color: '#FF4D6D' }}>🗑️ Reset Data</div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Hapus semua poin, lencana, dan riwayat anak. Tidak bisa dibatalkan.</div>
        <button className="btn-secondary" style={{ width: '100%', marginTop: 10, color: '#FF4D6D' }} onClick={() => { if (confirm('Yakin reset semua progres anak?')) { resetProgress(); alert('Progres sudah direset. Refresh halaman (F5) untuk lihat hasil.') } }}>Reset Semua Progres</button>
      </div>

      <div style={{ fontSize: 11, color: '#AAA', textAlign: 'center' }}>Interactive Read Edu © 2026 MRH • Dibuat untuk anak Indonesia 🇮🇩</div>
    </div>
  )
}