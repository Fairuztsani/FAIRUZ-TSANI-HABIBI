import React from 'react';
import { HelpCircle, FileText, Phone, Mail, ChevronRight, ShieldCheck, Download } from 'lucide-react';

export const SbBantuanPage: React.FC = () => {
  const faqs = [
    {
      q: 'Kapan menu perpanjangan lisensi mulai dibuka untuk diajukan?',
      a: 'Berdasarkan Permen ATR/BPN No. 9/2026, menu perpanjangan lisensi dibuka secara otomatis oleh sistem tepat pada H-3 bulan (90 hari kalender) sebelum tanggal masa berlaku lisensi berakhir.'
    },
    {
      q: 'Berapa batas waktu maksimal pengajuan perpanjangan lisensi?',
      a: 'Permohonan perpanjangan lisensi wajib diajukan paling lambat 30 hari kalender sebelum masa berlaku lisensi berakhir untuk menjaga keberlanjutan legalitas pengukuran kadaster Anda.'
    },
    {
      q: 'Format dan ukuran berkas apa saja yang diperbolehkan saat upload persyaratan?',
      a: 'Seluruh berkas persyaratan (KTP, SKK Kadaster, SK Lisensi Lama, dan Surat Rekomendasi) wajib menggunakan format PDF dengan ukuran maksimal 5 MB per berkas.'
    },
    {
      q: 'Apa yang harus dilakukan jika permohonan berstatus "PERLU_PERBAIKAN"?',
      a: 'Buka menu Riwayat Pengajuan, pilih tombol "Detail", lalu tinjau catatan verifikator pada dokumen yang diberi label "TIDAK SESUAI". Klik tombol "Perbaiki Dokumen" untuk mengunggah berkas revisi dan mengajukan ulang permohonan Anda (Putaran ke-2).'
    },
    {
      q: 'Bagaimana cara mendapatkan salinan digital Surat Keputusan (SK) setelah terbit?',
      a: 'Setelah status pengajuan berubah menjadi "SK_TERBIT", Anda dapat mengunduh file PDF SK resmi melalui halaman Detail Pengajuan atau mengakses tautan pengumuman resmi Ditjen SPPR.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Pusat Bantuan & Panduan Teknis Perpanjangan Lisensi
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Informasi ketentuan umum, regulasi Permen ATR/BPN No. 9/2026, dan tata cara penggunaan Aplikasi Mitra.
        </p>
      </div>

      {/* Grid: Hotline & Regulasi Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/70 space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-950 text-sm">
            <ShieldCheck size={18} className="text-blue-700" />
            <span>Dasar Hukum: Permen ATR/BPN No. 9/2026</span>
          </div>
          <p className="text-blue-900 leading-relaxed text-[11px]">
            Tentang Surveyor Berlisensi dan Kantor Jasa Surveyor Berlisensi di Lingkungan Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional.
          </p>
          <div className="pt-2">
            <button
              onClick={() => alert('Mengunduh Salinan Permen ATR/BPN No. 9/2026 (PDF)...')}
              className="px-3.5 py-1.5 rounded-lg bg-[#0f2e59] text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Unduh Salinan Regulasi (PDF)</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Phone size={18} className="text-amber-500" />
            <span>Layanan Bantuan Teknis Ditjen SPPR</span>
          </div>
          <p className="text-slate-600 text-[11px]">
            Jika mengalami kendala teknis dalam proses verifikasi atau pengunggahan berkas persyaratan, hubungi:
          </p>
          <div className="space-y-1 text-slate-700 font-medium text-[11px]">
            <div>• Helpdesk: (021) 7228901 ext. 412</div>
            <div>• Email: helpdesk.sppr@atrbpn.go.id</div>
            <div>• Jam Layanan: Senin - Jumat (08.00 - 16.00 WIB)</div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <HelpCircle size={16} className="text-[#0f2e59]" />
          <span>Pertanyaan yang Sering Diajukan (FAQ)</span>
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3.5 space-y-1">
              <h4 className="font-bold text-slate-900 text-xs flex items-start gap-2">
                <span className="text-[#0f2e59] font-mono font-bold">Q{idx + 1}.</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-slate-600 text-[11px] leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
