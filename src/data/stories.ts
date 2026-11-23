export type Story = { t: string; c: 'Dongeng' | 'Hewan' | 'Sains' | 'Petualangan'; age: string; bg: string; e: string; desc: string; cover: string }

export const STORIES: Story[] = [
  // DONGENG - 7
  { t: 'Aladin dan Lampu Ajaib', c: 'Dongeng', age: 'Dongeng • 7-9 thn', bg: 'linear-gradient(135deg,#FF4D6D,#FF8A5C)', e: '🧞', desc: 'Aladin menemukan lampu ajaib dan belajar bahwa berbagi lebih bahagia daripada harta.', cover: '/covers/aladin.jpg' },
  { t: 'Singa dan Tikus', c: 'Dongeng', age: 'Dongeng • 7-9 thn', bg: 'linear-gradient(135deg,#FFB800,#FFD166)', e: '🦁', desc: 'Singa besar ditolong tikus kecil. Kebaikan sekecil apa pun sangat berarti.', cover: '/covers/singa.jpg' },
  { t: 'Putri Bintang', c: 'Dongeng', age: 'Dongeng • 8-11 thn', bg: 'linear-gradient(135deg,#8338EC,#FF006E)', e: '⭐', desc: 'Putri Bintang turun dari langit untuk membantu desa yang kekeringan.', cover: '/covers/putri.jpg' },
  { t: 'Bawang Merah Bawang Putih', c: 'Dongeng', age: 'Dongeng • 7-10 thn', bg: 'linear-gradient(135deg,#FF6B9D,#FFA8C5)', e: '🧅', desc: 'Bawang Putih yang baik hati akhirnya mendapatkan kebahagiaan karena kejujurannya.', cover: '/covers/bawang.jpg' },
  { t: 'Malin Kundang', c: 'Dongeng', age: 'Dongeng • 8-11 thn', bg: 'linear-gradient(135deg,#118AB2,#06D6A0)', e: '🚢', desc: 'Malin Kundang yang durhaka pada ibunya belajar pentingnya berbakti pada orang tua.', cover: '/covers/malin.jpg' },
  { t: 'Timun Mas', c: 'Dongeng', age: 'Dongeng • 7-10 thn', bg: 'linear-gradient(135deg,#2EC4B6,#7BDFF2)', e: '🥒', desc: 'Timun Mas yang cerdas berhasil lolos dari raksasa dengan bantuan benda ajaib.', cover: '/covers/timun.jpg' },
  { t: 'Keong Mas', c: 'Dongeng', age: 'Dongeng • 7-10 thn', bg: 'linear-gradient(135deg,#FF8A5C,#FFB347)', e: '🐚', desc: 'Putri yang berubah menjadi keong emas menunggu pangeran baik hati yang membebaskannya.', cover: '/covers/putri.jpg' },

  // HEWAN - 7
  { t: 'Kiki Si Kucing Penjelajah', c: 'Hewan', age: 'Hewan • 7-10 thn', bg: 'linear-gradient(135deg,#7C5CFF,#B07CFF)', e: '🐱', desc: 'Kiki si kucing oranye suka menjelajah hutan dan menolong teman-temannya.', cover: '/covers/kucing.jpg' },
  { t: 'Hutan Ajaib Pak Tani', c: 'Hewan', age: 'Hewan • 7-9 thn', bg: 'linear-gradient(135deg,#2EC4B6,#7BDFF2)', e: '🌳', desc: 'Pak Tani menanam pohon ajaib yang bisa berbicara dan memberi buah emas.', cover: '/covers/hutan.jpg' },
  { t: 'Kancil dan Buaya', c: 'Hewan', age: 'Hewan • 7-9 thn', bg: 'linear-gradient(135deg,#FF9F1C,#FFBF69)', e: '🦌', desc: 'Kancil yang cerdik berhasil menyeberangi sungai dengan menipu buaya-buaya yang lapar.', cover: '/covers/kancil.jpg' },
  { t: 'Gajah dan Semut', c: 'Hewan', age: 'Hewan • 7-9 thn', bg: 'linear-gradient(135deg,#6A4C93,#9B5DE5)', e: '🐘', desc: 'Gajah yang sombong belajar bahwa teman kecil pun bisa menolong di saat sulit.', cover: '/covers/gajah.jpg' },
  { t: 'Bebek yang Suka Bernyanyi', c: 'Hewan', age: 'Hewan • 7-8 thn', bg: 'linear-gradient(135deg,#00B4D8,#90E0EF)', e: '🦆', desc: 'Bebek Dodo yang suaranya sumbang akhirnya percaya diri tampil di festival danau.', cover: '/covers/bebek.jpg' },
  { t: 'Burung Pipit Pemberani', c: 'Hewan', age: 'Hewan • 7-10 thn', bg: 'linear-gradient(135deg,#EF476F,#FFD166)', e: '🐦', desc: 'Pipit kecil yang takut terbang akhirnya berani terbang tinggi untuk menyelamatkan adiknya.', cover: '/covers/beo.jpg' },
  { t: 'Anjing Setia Bimo', c: 'Hewan', age: 'Hewan • 8-11 thn', bg: 'linear-gradient(135deg,#073B4C,#118AB2)', e: '🐶', desc: 'Bimo si anjing setia selalu menjaga rumah dan menemani tuannya yang kesepian.', cover: '/covers/anjing.jpg' },

  // SAINS - 7
  { t: 'Misi ke Planet Mars', c: 'Sains', age: 'Sains • 10-12 thn', bg: 'linear-gradient(135deg,#00B4D8,#48CAE4)', e: '🚀', desc: 'Tim astronot cilik berangkat ke Mars untuk mencari tanda kehidupan.', cover: '/covers/angkasa.jpg' },
  { t: 'Robot Riko Belajar Membaca', c: 'Sains', age: 'Sains • 7-10 thn', bg: 'linear-gradient(135deg,#FF6B9D,#FFA8C5)', e: '🤖', desc: 'Riko robot yang awalnya tidak bisa membaca, akhirnya jatuh cinta pada buku.', cover: '/covers/robot.jpg' },
  { t: 'Kenapa Bulan Bersinar?', c: 'Sains', age: 'Sains • 8-11 thn', bg: 'linear-gradient(135deg,#3A0CA3,#4361EE)', e: '🌙', desc: 'Sita penasaran kenapa Bulan bersinar padahal Bulan tidak punya lampu sendiri.', cover: '/covers/bulan.jpg' },
  { t: 'Bagaimana Hujan Terjadi?', c: 'Sains', age: 'Sains • 7-10 thn', bg: 'linear-gradient(135deg,#0077B6,#00B4D8)', e: '🌧️', desc: 'Tetes air kecil bernama Titi melakukan perjalanan dari laut ke awan lalu jadi hujan.', cover: '/covers/hujan.jpg' },
  { t: 'Petualangan Sel Darah', c: 'Sains', age: 'Sains • 10-13 thn', bg: 'linear-gradient(135deg,#D00000,#FFBA08)', e: '🩸', desc: 'Sel darah merah Oksi berkeliling tubuh mengantar oksigen ke semua organ.', cover: '/covers/darah.jpg' },
  { t: 'Dunia Bawah Laut', c: 'Sains', age: 'Sains • 7-11 thn', bg: 'linear-gradient(135deg,#03045E,#0077B6)', e: '🐠', desc: 'Nara menyelam dan bertemu terumbu karang, ikan badut, dan penyu raksasa yang ramah.', cover: '/covers/laut.jpg' },
  { t: 'Kenapa Kita Makan?', c: 'Sains', age: 'Sains • 7-10 thn', bg: 'linear-gradient(135deg,#80B918,#AACC00)', e: '🥦', desc: 'Makanan berubah jadi energi di dalam tubuh supaya kita bisa lari, belajar, dan bermain.', cover: '/covers/makanan.jpg' },

  // PETUALANGAN - 7
  { t: 'Penjaga Laut Nusantara', c: 'Petualangan', age: 'Petualangan • 10-13 thn', bg: 'linear-gradient(135deg,#06D6A0,#118AB2)', e: '🌊', desc: 'Nara dan teman-teman menjaga laut Indonesia dari sampah plastik.', cover: '/covers/kapal.jpg' },
  { t: 'Petualangan di Gunung Pelangi', c: 'Petualangan', age: 'Petualangan • 8-11 thn', bg: 'linear-gradient(135deg,#FF7B00,#FFB700)', e: '🌈', desc: 'Dua sahabat mendaki Gunung Pelangi untuk menemukan bunga yang hanya mekar 10 tahun sekali.', cover: '/covers/gunung-api.jpg' },
  { t: 'Harta Karun Pulau Kosong', c: 'Petualangan', age: 'Petualangan • 9-12 thn', bg: 'linear-gradient(135deg,#F77F00,#FCBF49)', e: '🗺️', desc: 'Tim penjelajah cilik mengikuti peta tua untuk menemukan harta karun yang ternyata bukan emas.', cover: '/covers/harta.jpg' },
  { t: 'Penjelajah Gua Kristal', c: 'Petualangan', age: 'Petualangan • 9-12 thn', bg: 'linear-gradient(135deg,#7209B7,#B5179E)', e: '💎', desc: 'Senter, helm, dan keberanian — itulah bekal Sasa masuk ke gua kristal yang berkilauan.', cover: '/covers/goa.jpg' },
  { t: 'Misi Penyelamatan Hutan', c: 'Petualangan', age: 'Petualangan • 10-13 thn', bg: 'linear-gradient(135deg,#386641,#6A994E)', e: '🌲', desc: 'Ranger cilik harus menyelamatkan hutan dari kebakaran sebelum hewan-hewan kehilangan rumahnya.', cover: '/covers/hutan.jpg' },
  { t: 'Kapal Terbang Nara', c: 'Petualangan', age: 'Petualangan • 8-11 thn', bg: 'linear-gradient(135deg,#4361EE,#4CC9F0)', e: '✈️', desc: 'Nara membuat kapal terbang dari barang bekas dan terbang keliling kota bersama sahabatnya.', cover: '/covers/terbang.jpg' },
  { t: 'Jembatan Pelangi Hilang', c: 'Petualangan', age: 'Petualangan • 7-10 thn', bg: 'linear-gradient(135deg,#FF006E,#FFBE0B)', e: '🌉', desc: 'Jembatan pelangi yang menghubungkan dua desa tiba-tiba hilang. Siapa yang mengambilnya?', cover: '/covers/pelangi.jpg' },
]