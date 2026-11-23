// Otak penyimpanan progres — dipakai Reader, Gim, Kuis, Prestasi, Ortu
export type Progress = { baca: number, kuis: number, gim: number, poin: number, judulTerakhir: string, riwayat: string[] }

const KEY = 'read-edu-progress-v1'

const DEFAULT: Progress = { baca: 0, kuis: 0, gim: 0, poin: 0, judulTerakhir: '-', riwayat: [] }

export function getProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT }
    return { ...DEFAULT, ...JSON.parse(raw) }
  } catch { return { ...DEFAULT } }
}

function save(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p))
  // Kasih tahu semua halaman: "Progres berubah!"
  window.dispatchEvent(new Event('progress-updated'))
}

export function addBaca(judul: string) {
  const p = getProgress()
  p.baca += 1
  p.poin += 50
  p.judulTerakhir = judul
  p.riwayat = [`📖 Selesai baca: ${judul} (+50)`, ...p.riwayat].slice(0, 20)
  save(p)
  return p
}

export function addKuis(judul: string, poin: number) {
  const p = getProgress()
  p.kuis += 1
  p.poin += poin
  p.riwayat = [`🧠 Menang Kuis: ${judul} (+${poin})`, ...p.riwayat].slice(0, 20)
  save(p)
  return p
}

export function addGim(judul: string, poin: number) {
  const p = getProgress()
  p.gim += 1
  p.poin += poin
  p.riwayat = [`🎮 Menang Gim: ${judul} (+${poin})`, ...p.riwayat].slice(0, 20)
  save(p)
  return p
}

export function resetProgress() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new Event('progress-updated'))
}