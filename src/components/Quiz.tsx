import { useState, useEffect, useRef } from 'react'
import { addKuis } from '../lib/progress'

// Format soal: [pertanyaan, pilihan1, pilihan2, pilihan3, indexJawabanBenar(0/1/2)]
type QuizData = { title: string, emoji: string, icon?: string, color: string, qs: [string, string, string, string, number][] }

const QUIZZES: QuizData[] = [
  { title: 'Kuis: Aladin', emoji: '🧞', icon: '/icons/kuis-aladin.png', color: 'linear-gradient(135deg,#FF4D6D,#FF8A5C)', qs: [
    ['Siapa yang keluar dari lampu ajaib Aladin?', 'Naga', 'Jin', 'Penyihir', 1],
    ['Apa yang ditemukan Aladin di gua?', 'Lampu ajaib', 'Pedang emas', 'Mahkota', 0],
    ['Aladin tinggal di kota apa?', 'Bagdad', 'Jakarta', 'London', 0],
    ['Berapa permintaan yang dikabulkan 【entity-Jin¦canonical_name=Jin】?', '1', '2', '3', 2],
    ['Apa sifat Aladin?', 'Sombong', 'Baik dan jujur', 'Pemalas', 1],
    ['Apa yang harus dilakukan sebelum meminta?', 'Menggosok lampu', 'Menari', 'Tidur', 0],
    ['【entity-Jin¦canonical_name=Jin】 bisa keluar jika lampu...?', 'Digosok', 'Dibuang', 'Dicuci', 0],
    ['Pelajaran dari cerita Aladin?', 'Berbagi itu bahagia', 'Harus kaya', 'Jangan berteman', 0],
    ['Aladin adalah seorang...?', 'Pangeran kaya', 'Pemuda miskin yang baik', 'Penyihir', 1],
    ['Apa warna lampu ajaib?', 'Merah', 'Emas', 'Hijau', 1],
  ]},
  { title: 'Kuis: Singa dan Tikus', emoji: '🦁', icon: '/icons/kuis-singa-tikus.png', color: 'linear-gradient(135deg,#FFB800,#FFD166)', qs: [
    ['Siapa yang membangunkan Singa?', 'Tikus', 'Gajah', 'Kancil', 0],
    ['Apa yang dilakukan Singa pada Tikus?', 'Dimaafkan dan dilepas', 'Dimakan', 'Dikurung', 0],
    ['Siapa yang menolong Singa saat terjerat jaring?', 'Tikus', 'Harimau', 'Burung', 0],
    ['Bagaimana Tikus menolong Singa?', 'Menggigit jaring', 'Memanggil polisi', 'Membawa pedang', 0],
    ['Pelajaran ceritanya?', 'Kebaikan kecil sangat berarti', 'Yang besar selalu menang', 'Jangan menolong', 0],
    ['Singa tinggal di mana?', 'Hutan', 'Laut', 'Gurun es', 0],
    ['Tikus itu berukuran...?', 'Kecil', 'Raksasa', 'Sedang', 0],
    ['Kenapa Singa tertawa saat Tikus bilang akan membalas budi?', 'Karena Tikus kecil', 'Karena Tikus lucu', 'Karena Tikus bau', 0],
    ['Singa terjerat apa?', 'Jaring pemburu', 'Tali sepatu', 'Jaring ikan', 0],
    ['Sifat Singa di akhir cerita?', 'Sombong', 'Bersyukur dan rendah hati', 'Marah', 1],
  ]},
  { title: 'Kuis: Hewan Seru', emoji: '🐱', icon: '/icons/kuis-hewan-seru.png',color: 'linear-gradient(135deg,#7C5CFF,#B07CFF)', qs: [
    ['Hewan yang suka mengeong?', 'Kucing', 'Anjing', 'Sapi', 0],
    ['Hewan yang mengaum dan raja hutan?', 'Singa', 'Ayam', 'Bebek', 0],
    ['Kancil terkenal karena...?', 'Cerdik', 'Pemalas', 'Lambat', 0],
    ['Gajah punya belalai untuk...?', 'Mengambil makanan', 'Terbang', 'Berenang cepat', 0],
    ['Bebek bisa...?', 'Berenang', 'Memanjat pohon', 'Terbang ke bulan', 0],
    ['Burung Pipit bisa...?', 'Terbang', 'Menggali tanah', 'Menyelam 1 jam', 0],
    ['Anjing Bimo terkenal...?', 'Setia', 'Nakal', 'Pemarah', 0],
    ['Kucing Kiki suka...?', 'Menjelajah hutan', 'Tidur di laut', 'Main salju', 0],
    ['Buaya tinggal di...?', 'Sungai', 'Gurun', 'Puncak gunung', 0],
    ['Semut itu hewan yang...?', 'Kecil dan rajin', 'Besar dan malas', 'Bisa terbang tinggi', 0],
  ]},
  { title: 'Kuis: Misi ke Mars', emoji: '🚀', icon: '/icons/kuis-mars.png',color: 'linear-gradient(135deg,#00B4D8,#48CAE4)', qs: [
    ['Mars disebut planet...?', 'Merah', 'Biru', 'Hijau', 0],
    ['Kendaraan untuk ke luar angkasa?', 'Roket', 'Mobil', 'Perahu', 0],
    ['Astronot memakai...?', 'Baju astronot', 'Baju renang', 'Baju tidur', 0],
    ['Di luar angkasa tidak ada...?', 'Gravitasi seperti di Bumi', 'Bintang', 'Planet', 0],
    ['Bumi adalah planet ke berapa dari Matahari?', 'Ke-3', 'Ke-1', 'Ke-7', 0],
    ['Robot Riko suka...?', 'Membaca buku', 'Makan bakso', 'Tidur siang', 0],
    ['Bulan bersinar karena...?', 'Memantulkan cahaya Matahari', 'Punya lampu sendiri', 'Ada api', 0],
    ['Hujan berasal dari...?', 'Uap air yang jadi awan', 'Laut yang meluap', 'Pipa bocor', 0],
    ['Sel darah merah bertugas mengantar...?', 'Oksigen', 'Makanan', 'Air', 0],
    ['Terumbu karang ada di...?', 'Bawah laut', 'Atas gunung', 'Di gurun', 0],
  ]},
  { title: 'Kuis: Kancil Cerdik', emoji: '🦌', icon: '/icons/kuis-kancil.png',color: 'linear-gradient(135deg,#FF9F1C,#FFBF69)', qs: [
    ['Kancil menyeberangi sungai dengan menipu...?', 'Buaya', 'Singa', 'Gajah', 0],
    ['Kancil dikenal...?', 'Cerdik', 'Lambat', 'Pemalu', 0],
    ['Berapa banyak buaya yang ditipu Kancil?', 'Banyak', 'Satu', 'Tidak ada', 0],
    ['Kancil berhitung buaya untuk...?', 'Menyeberang', 'Bermain', 'Tidur', 0],
    ['Sifat yang harus ditiru dari Kancil?', 'Cerdas menyelesaikan masalah', 'Menipu untuk jahat', 'Sombong', 0],
    ['Buaya tinggal di...?', 'Sungai', 'Hutan pinus', 'Langit', 0],
    ['Kancil makan...?', 'Rumput dan buah', 'Daging', 'Batu', 0],
    ['Kancil berukuran...?', 'Kecil', 'Raksasa', 'Sedang besar', 0],
    ['Kenapa buaya mau berbaris?', 'Karena ditipu Kancil', 'Karena mau lomba', 'Karena mau tidur', 0],
    ['Akhirnya Kancil...?', 'Berhasil menyeberang', 'Tenggelam', 'Dimakan', 0],
  ]},
  { title: 'Kuis: Penjaga Laut', emoji: '🌊', icon: '/icons/kuis-laut.png',color: 'linear-gradient(135deg,#06D6A0,#118AB2)', qs: [
    ['Musuh laut Indonesia adalah...?', 'Sampah plastik', 'Ikan', 'Ombak', 0],
    ['Sampah plastik harus...?', 'Dibuang ke tempat sampah', 'Dibuang ke laut', 'Dibakar di hutan', 0],
    ['Hewan yang hidup di laut?', 'Penyu', 'Sapi', 'Ayam', 0],
    ['Nara menjaga laut bersama...?', 'Teman-temannya', 'Sendirian', 'Musuh', 0],
    ['Terumbu karang adalah rumah...?', 'Ikan', 'Burung', 'Monyet', 0],
    ['Kalau laut kotor, ikan akan...?', 'Sakit', 'Senang', 'Bisa terbang', 0],
    ['Kita bisa menjaga laut dengan...?', 'Tidak buang sampah ke laut', 'Buang sampah ke laut', 'Tidak mandi', 0],
    ['Warna laut yang bersih?', 'Biru jernih', 'Hitam pekat', 'Coklat lumpur', 0],
    ['Penyu makan...?', 'Rumput laut', 'Permen', 'Kayu', 0],
    ['Pelajaran cerita ini?', 'Jaga laut untuk semua', 'Laut tidak penting', 'Sampah tidak apa-apa', 0],
  ]},
  { title: 'Kuis: Dongeng Nusantara', emoji: '🐉', icon: '/icons/kuis-nusantara.png',color: 'linear-gradient(135deg,#FF6B9D,#FFA8C5)', qs: [
    ['Bawang Putih terkenal...?', 'Baik dan jujur', 'Jahat', 'Pemalas', 0],
    ['Malin Kundang durhaka kepada...?', 'Ibunya', 'Gurunya', 'Temannya', 0],
    ['Malin Kundang berubah menjadi...?', 'Batu', 'Burung', 'Ikan', 0],
    ['Timun Mas lolos dari raksasa dengan...?', 'Benda ajaib', 'Pedang', 'Doa saja', 0],
    ['Keong Mas awalnya adalah...?', 'Putri', 'Nenek', 'Raksasa', 0],
    ['Putri Bintang turun dari...?', 'Langit', 'Laut', 'Gua', 0],
    ['Siapa yang menanam Timun Mas?', 'Mbok Sirni', 'Raksasa', 'Raja', 0],
    ['Bawang Merah sifatnya...?', 'Jahat dan iri', 'Baik', 'Jujur', 0],
    ['Pelajaran Malin Kundang?', 'Berbakti pada orang tua', 'Boleh durhaka', 'Jangan pulang', 0],
    ['Dongeng berasal dari...?', 'Cerita rakyat turun-temurun', 'Koran', 'TV', 0],
  ]},
  { title: 'Kuis: Sains Seru', emoji: '🔬', icon: '/icons/kuis-sains.png',color: 'linear-gradient(135deg,#3A0CA3,#4361EE)', qs: [
    ['Kenapa kita makan?', 'Untuk energi', 'Supaya ngantuk', 'Supaya bosan', 0],
    ['Tetes air Titi berasal dari...?', 'Laut', 'Gunung', 'Kulkas', 0],
    ['Awan terbuat dari...?', 'Uap air', 'Kapas', 'Asap rokok', 0],
    ['Bulan mengelilingi...?', 'Bumi', 'Mars', 'Matahari langsung', 0],
    ['Matahari terbit dari...?', 'Timur', 'Barat', 'Utara', 0],
    ['Sel darah merah warnanya...?', 'Merah', 'Biru', 'Hijau', 0],
    ['Ikan badut tinggal di...?', 'Terumbu karang', 'Pohon', 'Gurun', 0],
    ['Robot terbuat dari...?', 'Logam dan mesin', 'Kayu saja', 'Kertas', 0],
    ['Manusia butuh oksigen untuk...?', 'Bernapas', 'Tidur saja', 'Main game', 0],
    ['Sayur membuat tubuh...?', 'Sehat dan kuat', 'Lemah', 'Mengantuk', 0],
  ]},
  { title: 'Kuis: Petualangan', emoji: '🌍', icon: '/icons/kuis-petualangan.png', color: 'linear-gradient(135deg,#FF7B00,#FFB700)', qs: [
    ['Harta karun di Pulau Kosong ternyata...?', 'Bukan emas, tapi persahabatan', 'Emas asli', 'Kosong', 0],
    ['Sasa masuk gua membawa...?', 'Senter dan helm', 'Payung', 'Bantal', 0],
    ['Gua Kristal berkilauan karena...?', 'Kristal', 'Lampu disco', 'Emas', 0],
    ['Ranger cilik menyelamatkan hutan dari...?', 'Kebakaran', 'Banjir', 'Gempa', 0],
    ['Kapal Terbang Nara terbuat dari...?', 'Barang bekas', 'Emas', 'Kaca', 0],
    ['Jembatan Pelangi menghubungkan...?', 'Dua desa', 'Dua negara', 'Dua planet', 0],
    ['Bunga di Gunung Pelangi mekar...?', '10 tahun sekali', 'Setiap hari', 'Setiap jam', 0],
    ['Bekal penjelajah yang penting?', 'Air minum dan keberanian', 'Permen saja', 'Bantal', 0],
    ['Petualang harus...?', 'Berani dan hati-hati', 'Takut terus', 'Sombong', 0],
    ['Pelajaran dari petualangan?', 'Jangan mudah menyerah', 'Menyerah saja', 'Jangan berteman', 0],
  ]},
  { title: 'Kuis: Matematika & Logika', emoji: '🔢', icon: '/icons/kuis-matematika.png',color: 'linear-gradient(135deg,#80B918,#AACC00)', qs: [
    ['7 + 5 = ?', '12', '10', '11', 0],
    ['10 - 3 = ?', '7', '6', '8', 0],
    ['3 x 4 = ?', '12', '10', '9', 0],
    ['20 : 2 = ?', '10', '5', '20', 0],
    ['Urutan yang benar: 2, 4, 6, ...?', '8', '7', '5', 0],
    ['100 + 100 = ?', '200', '150', '300', 0],
    ['Bentuk yang punya 3 sisi?', 'Segitiga', 'Persegi', 'Lingkaran', 0],
    ['1 jam = berapa menit?', '60', '30', '100', 0],
    ['Uang Rp 5.000 + Rp 5.000 = ?', 'Rp 10.000', 'Rp 5.000', 'Rp 15.000', 0],
    ['Mana yang paling besar: 9, 15, 7?', '15', '9', '7', 1],
  ]},
]

export default function Quiz() {
  const [selected, setSelected] = useState<number | null>(null)
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const sudahKirim = useRef(false)

  // Reset pengaman tiap ganti kuis, biar tidak double kirim
  useEffect(() => { sudahKirim.current = false }, [selected])

  // INI KUNCINYA: kalau kuis selesai, kirim poin ke Prestasi & Ortu — cuma 1x
  useEffect(() => {
    if (finished && selected !== null && !sudahKirim.current) {
      sudahKirim.current = true
      addKuis(QUIZZES[selected].title, score)
    }
  }, [finished, selected, score])

  const start = (i: number) => { setSelected(i); setIdx(0); setScore(0); setPicked(null); setFinished(false) }

  if (selected === null) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ margin: 0 }}>🧠 Pusat Kuis</h2>
        <p style={{ color: '#888', fontSize: 13, margin: 0 }}>{QUIZZES.length} kuis • Masing-masing 10 soal • Total {QUIZZES.length * 10} soal • Jawab benar dapat +10 poin</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {QUIZZES.map((q, i) => (
            <div key={q.title} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }} onClick={() => start(i)}>
              <div style={{ background: '#fff', width: 100, height: 100, overflow: 'hidden', borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
              {q.icon ? <img src={q.icon} alt={q.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} /> : <span style={{ fontSize: 28 }}>{q.emoji}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900 }}>{q.title}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>10 Soal • +100 Poin kalau semua benar</div>
              </div>
              <button className="btn-secondary">Main ▶</button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const quiz = QUIZZES[selected]
  const [qText, a1, a2, a3, correct] = quiz.qs[idx]
  const options = [a1, a2, a3]

  if (finished) {
    const total = quiz.qs.length * 10
    const persen = Math.round((score / total) * 100)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center' }}>
        <button className="btn-secondary" onClick={() => setSelected(null)} style={{ alignSelf: 'flex-start' }}>← Semua Kuis</button>
        <div style={{ fontSize: 64 }}>{persen >= 80 ? '🏆' : persen >= 50 ? '👍' : '💪'}</div>
        <h2 style={{ margin: 0 }}>Selesai! {quiz.title}</h2>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#FF4D6D' }}>{score} / {total} Poin</div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 6 }}>Kamu benar {score / 10} dari {quiz.qs.length} soal • {persen}% Benar</div>
          <div style={{ marginTop: 10, fontWeight: 800 }}>{persen >= 80 ? 'Luar biasa! Kamu master cerita! 🎉' : persen >= 50 ? 'Bagus! Sedikit lagi sempurna!' : 'Semangat! Baca lagi ceritanya lalu coba lagi ya!'}</div>
        </div>
        <button className="btn-primary" onClick={() => start(selected)}>🔄 Ulangi Kuis Ini</button>
        <button className="btn-secondary" onClick={() => setSelected(null)}>Pilih Kuis Lain →</button>
      </div>
    )
  }

  const answer = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === correct) setScore(s => s + 10)
    setTimeout(() => {
      if (idx + 1 >= quiz.qs.length) setFinished(true)
      else setIdx(idx + 1)
      setPicked(null)
    }, 900)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <button className="btn-secondary" onClick={() => setSelected(null)} style={{ alignSelf: 'flex-start' }}>← Semua Kuis</button>
      <div>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>{quiz.icon ? <img src={quiz.icon} alt={quiz.title} style={{ width: 100, height: 100,objectFit: 'contain', background: '#fff', borderRadius: 12, padding: 4, display: 'block', flexShrink: 0 }}/> : <span>{quiz.emoji}</span>}<span>{quiz.title}</span></h2>
        <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Soal {idx + 1} dari {quiz.qs.length} • Skor: {score}</div>
        <div className="progress-track" style={{ marginTop: 8 }}><div className="progress-fill" style={{ width: `${((idx + 1) / quiz.qs.length) * 100}%` }} /></div>
      </div>
      <div className="card" style={{ fontWeight: 900, fontSize: 17, lineHeight: 1.5 }}>{qText}</div>
      {options.map((o, i) => {
        let bg = '#FFF'
        if (picked !== null) {
          if (i === correct) bg = '#D4F8E8'
          else if (i === picked) bg = '#FFE0E0'
        }
        return (
          <button key={o} className="card" onClick={() => answer(i)} style={{ textAlign: 'left', fontWeight: 800, fontSize: 15, padding: 16, cursor: 'pointer', background: bg, border: picked === i ? '2px solid #FF4D6D' : '1px solid #FFE0E6' }}>
            {o} {picked !== null && i === correct ? ' ✅' : picked === i && i !== correct ? ' ❌' : ''}
          </button>
        )
      })}
      <div style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>{picked === null ? 'Pilih satu jawaban...' : picked === correct ? '🎉 Benar! +10 Poin!' : '❌ Belum tepat, jawaban benar berwarna hijau'}</div>
    </div>
  )
}