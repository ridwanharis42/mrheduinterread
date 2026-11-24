import { useState } from "react";

// KODE AKSES SUDAH DIBUAT SAMPAI +100
// Kode pertama: MRH-EDU-2255
// Kode terakhir: MRH-EDU-2355
// Total 101 kode. Tidak perlu edit file ini lagi tiap ada pembeli.
// Penjual cukup mencatat di buku: pembeli ke-1 = 2255, ke-2 = 2256, ke-3 = 2257, dst.

const KODE_AWAL = 2255;
const KODE_AKHIR = 2355; // 2255 + 100

function kodeValid(input: string) {
  // Harus format MRH-EDU-XXXX
  if (!input.startsWith("MRH-EDU-")) return false;
  const angka = Number(input.replace("MRH-EDU-", ""));
  if (!Number.isInteger(angka)) return false;
  return angka >= KODE_AWAL && angka <= KODE_AKHIR;
}

export default function GerbangKode({ children }: { children: React.ReactNode }) {
  const [kode, setKode] = useState("");
  const [salah, setSalah] = useState(false);

  const sudahBuka = localStorage.getItem("mrh_akses") === "terbuka";

  if (sudahBuka) {
    return <>{children}</>;
  }

  const bukaAplikasi = () => {
    const input = kode.trim().toUpperCase();
    if (kodeValid(input)) {
      localStorage.setItem("mrh_akses", "terbuka");
      localStorage.setItem("mrh_kode", input);
      window.location.reload();
    } else {
      setSalah(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1E1B4B", padding: 20 }}>
      <div style={{ background: "white", borderRadius: 20, padding: 24, maxWidth: 380, width: "100%", textAlign: "center" }}>
        <h2 style={{ marginBottom: 8 }}>🔒 Masukkan Kode Akses</h2>
        <p style={{ color: "#555", fontSize: 14 }}>
          Masukkan kode yang diberikan penjual setelah pembayaran.
          <br />Contoh: MRH-EDU-2255
        </p>
        <input
          value={kode}
          onChange={(e) => { setKode(e.target.value); setSalah(false); }}
          placeholder="MRH-EDU-2255"
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ccc", textAlign: "center", fontSize: 16, textTransform: "uppercase", marginTop: 12 }}
        />
        {salah && (
          <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>
            Kode salah / belum dibuat. Cek lagi atau hubungi penjual.
          </p>
        )}
        <button
          onClick={bukaAplikasi}
          style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 10, background: "#6D28D9", color: "white", fontWeight: "bold", border: "none", fontSize: 16 }}
        >
          Buka Aplikasi
        </button>
        <p style={{ fontSize: 12, color: "#777", marginTop: 12 }}>
          Belum punya kode? Hubungi WA 0817-7022-0059
        </p>
      </div>
    </div>
  );
}