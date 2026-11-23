import { useState } from 'react'
import { addGim } from '../lib/progress'

type GameId = string | null

export default function Games() {
  const [game, setGame] = useState<GameId>(null)
  const [score, setScore] = useState(0)

  // Poin lokal + Poin global (Prestasi/Ortu) — dua-duanya nambah
  const win = (judul: string, poin: number) => {
    setScore(s => s + poin)
    addGim(judul, poin)
  }

  const list: { id: string, title: string, desc: string, emoji: string, icon?: string, color: string, poin: number }[] = [
    { id: 'tebak-kata', title: 'Tebak Kata', desc: 'Tebak kata dari petunjuk', emoji: '🔤', icon: '/icons/gim-tebak-kata.png', color: 'linear-gradient(135deg,#FF4D6D,#FF8A5C)', poin: 20 },
    { id: 'susun-huruf', title: 'Susun Huruf', desc: 'Susun huruf jadi kata', emoji: '🧩', icon: '/icons/gim-susun-huruf.png', color: 'linear-gradient(135deg,#8338EC,#FF006E)', poin: 20 },
    { id: 'memory', title: 'Memory Hewan', desc: 'Cari pasangan yang sama', emoji: '🧠', icon: '/icons/gim-memory.png', color: 'linear-gradient(135deg,#00B4D8,#48CAE4)', poin: 30 },
    { id: 'tebak-hewan', title: 'Tebak Hewan', desc: 'Siapa aku?', emoji: '🦁', icon: '/icons/gim-tebak-hewan.png',color: 'linear-gradient(135deg,#FFB800,#FFD166)', poin: 20 },
    { id: 'matematika', title: 'Matematika Cepat', desc: 'Hitung cepat dapat poin', emoji: '🔢', icon: '/icons/gim-matematika.png', color: 'linear-gradient(135deg,#2EC4B6,#7BDFF2)', poin: 10 },
    { id: 'tebak-warna', title: 'Tebak Warna', desc: 'Warna apa ini?', emoji: '🎨', icon: '/icons/gim-tebak-warna.png',color: 'linear-gradient(135deg,#FF6B9D,#FFA8C5)', poin: 20 },
    { id: 'tebak-angka', title: 'Tebak Angka', desc: 'Angka 1-10, tebak!', emoji: '🎲', icon: '/icons/gim-tebak-angka.png', color: 'linear-gradient(135deg,#FF7B00,#FFB700)', poin: 20 },
    { id: 'pasangan', title: 'Pasangan Kata', desc: 'Kucing - Meong?', emoji: '🔗', icon: '/icons/gim-pasangan-kata.png', color: 'linear-gradient(135deg,#4361EE,#4CC9F0)', poin: 20 },
    { id: 'urut-angka', title: 'Urut Angka', desc: 'Urutkan 1-2-3-4', emoji: '🔢', icon: '/icons/gim-urut-kata.png',color: 'linear-gradient(135deg,#06D6A0,#118AB2)', poin: 20 },
    { id: 'tebak-bentuk', title: 'Tebak Bentuk', desc: 'Segitiga? Lingkaran?', emoji: '🔺', icon: '/icons/gim-tebak-bentuk.png',color: 'linear-gradient(135deg,#7209B7,#B5179E)', poin: 20 },
    { id: 'tebak-buah', title: 'Tebak Buah', desc: 'Kuning, manis, apa?', emoji: '🍌', icon: '/icons/gim-tebak-buah.png', color: 'linear-gradient(135deg,#F77F00,#FCBF49)', poin: 20 },
    { id: 'tebak-profesi', title: 'Tebak Profesi', desc: 'Siapa yang mengajar?', emoji: '👩‍🏫', icon: '/icons/gim-tebak-profesi.png',color: 'linear-gradient(135deg,#386641,#6A994E)', poin: 20 },
    { id: 'kurang', title: 'Hitung Kurang', desc: '10 - 4 = ?', emoji: '➖', icon: '/icons/gim-hitung-kurang.png',color: 'linear-gradient(135deg,#D00000,#FFBA08)', poin: 10 },
    { id: 'lawan-kata', title: 'Lawan Kata', desc: 'Lawan dari Panas?', emoji: '🔄', icon: '/icons/gim-lawan-kata.png',color: 'linear-gradient(135deg,#03045E,#0077B6)', poin: 20 },
    { id: 'huruf-awal', title: 'Huruf Awal', desc: '🍎 dimulai huruf?', emoji: '🔡', icon: '/icons/gim-huruf-awal.png', color: 'linear-gradient(135deg,#FF006E,#FFBE0B)', poin: 20 },
  ]

  if (game) {
    const g = list.find(x => x.id === game)!
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <button className="btn-secondary" onClick={() => setGame(null)} style={{ alignSelf: 'flex-start' }}>← Semua Gim</button>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#888' }}>⭐ Poin di Gim ini: <b style={{ color: '#FF4D6D' }}>{score}</b> • Menang = +{g.poin} ke Prestasi & Ortu</div>
        {game === 'tebak-kata' && <TebakKata onWin={() => win('Tebak Kata', 20)} />}
        {game === 'susun-kata' && <SusunKata onWin={() => win('Susun Huruf', 20)} />}
        {game === 'memory' && <Memory onWin={() => win('Memory Hewan', 30)} />}
        {game === 'tebak-hewan' && <TebakHewan onWin={() => win('Tebak Hewan', 20)} />}
        {game === 'matematika' && <Matematika onWin={() => win('Matematika Cepat', 10)} />}
        {game === 'tebak-warna' && <TebakWarna onWin={() => win('Tebak Warna', 20)} />}
        {game === 'tebak-angka' && <TebakAngka onWin={() => win('Tebak Angka', 20)} />}
        {game === 'pasangan' && <Pasangan onWin={() => win('Pasangan Kata', 20)} />}
        {game === 'urut-angka' && <UrutAngka onWin={() => win('Urut Angka', 20)} />}
        {game === 'tebak-bentuk' && <TebakBentuk onWin={() => win('Tebak Bentuk', 20)} />}
        {game === 'tebak-buah' && <TebakBuah onWin={() => win('Tebak Buah', 20)} />}
        {game === 'tebak-profesi' && <TebakProfesi onWin={() => win('Tebak Profesi', 20)} />}
        {game === 'kurang' && <HitungKurang onWin={() => win('Hitung Kurang', 10)} />}
        {game === 'lawan-kata' && <LawanKata onWin={() => win('Lawan Kata', 20)} />}
        {game === 'huruf-awal' && <HurufAwal onWin={() => win('Huruf Awal', 20)} />}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h2 style={{ margin: 0 }}>🎮 Pusat Gim</h2>
      <p style={{ color: '#888', fontSize: 13, margin: 0 }}>{list.length} gim seru • Main sambil belajar • Menang langsung +Poin ke Prestasi!</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {list.map(g => (
          <div key={g.id} className="card" style={{ cursor: 'pointer', textAlign: 'center', padding: 16 }} onClick={() => setGame(g.id)}>
            <div style={{ background: g.color, height: 80, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {g.icon ? <img src={g.icon} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <span style={{ fontSize: 42 }}>{g.emoji}</span>}
            </div>
            <div style={{ fontWeight: 900, marginTop: 10 }}>{g.title}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{g.desc}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FF4D6D', marginTop: 6 }}>+{g.poin} Poin kalau menang</div>
            <div className="btn-secondary" style={{ marginTop: 8, display: 'inline-block' }}>Main ▶</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== KOMPONEN BANTU =====
function Card({ emoji, title, children }: { emoji: string, title: string, children: React.ReactNode }) {
  return <div className="card" style={{ textAlign: 'center', padding: 20 }}><div style={{ fontSize: 40 }}>{emoji}</div><h3>{title}</h3>{children}</div>
}
function Pilihan({ options, benar, onWin, msg, setMsg }: { options: string[], benar: string, onWin: () => void, msg: string, setMsg: (s: string) => void }) {
  return <><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{options.map(o => (
    <button key={o} className="btn-secondary" style={{ width: '100%', padding: 12 }} onClick={() => { if (o === benar) { setMsg('🎉 BENAR! Poin masuk ke Prestasi!'); onWin() } else setMsg('❌ Belum tepat, coba lagi!') }}>{o}</button>
  ))}</div><div style={{ marginTop: 10, fontWeight: 800 }}>{msg}</div></>
}
function Isian({ onWin, benar, poinMsg }: { onWin: () => void, benar: string, poinMsg?: string }) {
  const [ans, setAns] = useState(''); const [msg, setMsg] = useState('')
  return <><input value={ans} onChange={e => setAns(e.target.value.toUpperCase())} placeholder="Ketik jawaban..." style={{ width: '100%', padding: 12, borderRadius: 12, border: '2px solid #FFE0E6', textAlign: 'center', fontSize: 16, fontWeight: 800 }} />
    <button className="btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={() => { if (ans.trim() === benar) { setMsg('🎉 BENAR! Poin masuk ke Prestasi!'); onWin() } else setMsg('❌ Coba lagi ya!') }}>Cek Jawaban</button>
    <div style={{ marginTop: 10, fontWeight: 800 }}>{msg}</div>{poinMsg}</>
}

// ===== 15 GIM =====
function TebakKata({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🔤" title="Tebak Kata"><p style={{ color: '#666' }}>Hewan yang suka mengeong, berbulu, suka tidur. 6 huruf, dimulai K.</p><Pilihan options={['KUCING', 'ANJING', 'SINGA']} benar="KUCING" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function SusunKata({ onWin }: { onWin: () => void }) {
  return <Card emoji="🧩" title="Susun Huruf"><p>Susun huruf ini jadi kata:</p><div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0' }}>{['U', 'K', 'B', 'U'].map((h, i) => <span key={i} style={{ width: 44, height: 44, background: '#FFF1F4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: '#FF4D6D' }}>{h}</span>)}</div><p style={{ fontSize: 13, color: '#888' }}>Petunjuk: Benda untuk membaca 📖</p><Isian onWin={onWin} benar="BUKU" /></Card>
}
function Memory({ onWin }: { onWin: () => void }) {
  const [open, setOpen] = useState<number[]>([]); const [matched, setMatched] = useState<number[]>([])
  const cards = ['🐱', '🐶', '🦁', '🐘', '🐱', '🐶', '🦁', '🐘']
  const click = (i: number) => {
    if (open.includes(i) || matched.includes(i) || open.length === 2) return
    const n = [...open, i]; setOpen(n)
    if (n.length === 2) {
      if (cards[n[0]] === cards[n[1]]) { const m = [...matched, ...n]; setMatched(m); setOpen([]); if (m.length === 8) { onWin(); alert('🎉 Kamu menang! +30 Poin masuk ke Prestasi!') } }
      else setTimeout(() => setOpen([]), 700)
    }
  }
  return <Card emoji="🧠" title="Memory Hewan"><p style={{ fontSize: 13, color: '#888' }}>Klik 2 kartu, cari yang sama!</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginTop: 12 }}>{cards.map((c, i) => (<div key={i} onClick={() => click(i)} style={{ height: 56, background: matched.includes(i) ? '#D4F8E8' : '#FFF1F4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, cursor: 'pointer' }}>{open.includes(i) || matched.includes(i) ? c : '❓'}</div>))}</div><div style={{ marginTop: 10, fontSize: 13 }}>Pasangan ketemu: {matched.length / 2} dari 4</div></Card>
}
function TebakHewan({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🦁" title="Tebak Hewan"><p>Aku raja hutan, suaraku mengaum, rambutku lebat. Aku adalah...?</p><Pilihan options={['Singa 🦁', 'Kucing 🐱', 'Gajah 🐘']} benar="Singa 🦁" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function Matematika({ onWin }: { onWin: () => void }) {
  return <Card emoji="🔢" title="Matematika Cepat"><div style={{ fontSize: 32, fontWeight: 900, margin: '12px 0' }}>7 + 5 = ?</div><Isian onWin={onWin} benar="12" /></Card>
}
function TebakWarna({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🎨" title="Tebak Warna"><div style={{ width: 100, height: 100, background: '#FF4D6D', borderRadius: 20, margin: '14px auto' }} /><p>Kotak di atas berwarna apa?</p><Pilihan options={['Merah Muda', 'Biru', 'Hijau']} benar="Merah Muda" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function TebakAngka({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🎲" title="Tebak Angka"><p>Aku angka setelah 6 dan sebelum 8. Aku adalah...?</p><Pilihan options={['7', '9', '5']} benar="7" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function Pasangan({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🔗" title="Pasangan Kata"><p>Kucing bersuara...?</p><Pilihan options={['Meong 🐱', 'Guk Guk 🐶', 'Mooo 🐮']} benar="Meong 🐱" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function UrutAngka({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🔢" title="Urut Angka"><p>Urutkan dari yang paling kecil: 3, 1, 2</p><Pilihan options={['1 - 2 - 3', '3 - 2 - 1', '2 - 3 - 1']} benar="1 - 2 - 3" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function TebakBentuk({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🔺" title="Tebak Bentuk"><div style={{ fontSize: 64 }}>🔺</div><p>Bentuk di atas namanya...?</p><Pilihan options={['Segitiga', 'Lingkaran', 'Persegi']} benar="Segitiga" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function TebakBuah({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🍌" title="Tebak Buah"><p>Aku berwarna kuning, panjang, manis, disukai monyet. Aku adalah...?</p><Pilihan options={['Pisang 🍌', 'Apel 🍎', 'Anggur 🍇']} benar="Pisang 🍌" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function TebakProfesi({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="👩‍🏫" title="Tebak Profesi"><p>Siapa yang mengajar kita di sekolah?</p><Pilihan options={['Guru 👩‍🏫', 'Dokter 👩‍⚕️', 'Pilot 👨‍✈️']} benar="Guru 👩‍🏫" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function HitungKurang({ onWin }: { onWin: () => void }) {
  return <Card emoji="➖" title="Hitung Kurang"><div style={{ fontSize: 32, fontWeight: 900, margin: '12px 0' }}>10 - 4 = ?</div><Isian onWin={onWin} benar="6" /></Card>
}
function LawanKata({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🔄" title="Lawan Kata"><p>Lawan kata dari PANAS adalah...?</p><Pilihan options={['Dingin ❄️', 'Hangat', 'Terang']} benar="Dingin ❄️" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}
function HurufAwal({ onWin }: { onWin: () => void }) {
  const [msg, setMsg] = useState('')
  return <Card emoji="🔡" title="Huruf Awal"><div style={{ fontSize: 56 }}>🍎</div><p>Buah Apel dimulai dengan huruf...?</p><Pilihan options={['A', 'B', 'C']} benar="A" onWin={onWin} msg={msg} setMsg={setMsg} /></Card>
}