import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Layers,
  FileCheck,
  Award,
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';

interface CurriculumItem {
  fase: string;
  grades: string;
  subject: string;
  elements: { name: string; cp: string; tpExamples: string[] }[];
}

export const CurriculumGuideView: React.FC = () => {
  const { setIsFormModalOpen, setEditingModule, setCurrentView } = useApp();
  const [selectedFase, setSelectedFase] = useState<'A' | 'B' | 'C'>('B');
  const [selectedSubject, setSelectedSubject] = useState<string>('IPAS');
  const [expandedElement, setExpandedElement] = useState<string | null>('Pemahaman IPAS (Sains dan Sosial)');

  const curriculumData: CurriculumItem[] = [
    {
      fase: 'Fase A',
      grades: 'Kelas 1 - 2 SD',
      subject: 'Bahasa Indonesia',
      elements: [
        {
          name: 'Menyimak',
          cp: 'Peserta didik mampu bersikap menjadi penyimak yang baik. Peserta didik mampu memahami pesan lisan dan informasi dari media audio, teks aural (teks yang dibacakan dan/atau didengar), dan instruksi lisan.',
          tpExamples: [
            'Menyimak instruksi lisan sederhana dalam kegiatan bermain bersama.',
            'Menanggapi cerita fabel sederhana yang dibacakan oleh guru.',
          ],
        },
        {
          name: 'Membaca dan Memirsa',
          cp: 'Peserta didik mampu bersikap menjadi pembaca dan pemirsa yang menunjukkan minat terhadap teks yang dibaca atau dipirsa. Peserta didik mampu membaca kata-kata yang dikenalinya sehari-hari.',
          tpExamples: [
            'Mengenal dan melafalkan huruf vokal dan konsonan dengan tepat.',
            'Membaca kombinasi suku kata terbuka dan tertutup sederhana.',
          ],
        },
        {
          name: 'Berbicara dan Mempresentasikan',
          cp: 'Peserta didik mampu berbicara dengan santun tentang beragam topik yang dikenali menggunakan volume dan intonasi yang tepat sesuai konteks.',
          tpExamples: [
            'Menceritakan pengalaman pribadi di depan kelas dengan rasa percaya diri.',
            'Menanyakan pertanyaan sederhana untuk meminta penjelasan.',
          ],
        },
        {
          name: 'Menulis',
          cp: 'Peserta didik mampu menunjukkan keterampilan menulis permulaan dengan benar (posisi duduk, memegang pena, dan arah goresan tangan).',
          tpExamples: [
            'Menulis huruf kapital dan huruf kecil tegak bersambung atau lepas.',
            'Menuliskan kata-kata sederhana berdasarkan gambar stimulus.',
          ],
        },
      ],
    },
    {
      fase: 'Fase A',
      grades: 'Kelas 1 - 2 SD',
      subject: 'Matematika',
      elements: [
        {
          name: 'Bilangan (Number Sense)',
          cp: 'Peserta didik menunjukkan pemahaman dan intuisi bilangan pada bilangan cacah sampai 100, membaca, menulis, menentukan nilai tempat, membandingkan, dan mengurutkan.',
          tpExamples: [
            'Membilang banyak benda konkret hingga 50.',
            'Menyelesaikan penjumlahan dan pengurangan bilangan cacah sampai dengan 20.',
          ],
        },
        {
          name: 'Geometri',
          cp: 'Peserta didik dapat mengenal berbagai bangun datar (segitiga, segiempat, segi banyak, lingkaran) dan bangun ruang (balok, kubus, kerucut, bola).',
          tpExamples: [
            'Mengidentifikasi bentuk bangun datar di lingkungan sekitar ruang kelas.',
            'Mengelompokkan benda-benda berdasarkan bentuk geometris dasarnya.',
          ],
        },
      ],
    },
    {
      fase: 'Fase B',
      grades: 'Kelas 3 - 4 SD',
      subject: 'IPAS',
      elements: [
        {
          name: 'Pemahaman IPAS (Sains dan Sosial)',
          cp: 'Peserta didik menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada manusia (pancaindra) dan tumbuhan. Peserta didik dapat membuat simulasi menggunakan bagan/alat bantu sederhana tentang siklus hidup makhluk hidup dan proses fotosintesis.',
          tpExamples: [
            'Mengidentifikasi bagian tubuh tumbuhan beserta fungsinya dalam ekosistem.',
            'Menjelaskan proses fotosintesis dan peran sinar matahari.',
            'Mengidentifikasi wujud zat (padat, cair, gas) dan perubahannya dalam kehidupan nyata.',
            'Menganalisis jenis-jenis gaya (otot, gesek, gravitasi, magnet) dan pengaruhnya terhadap gerak benda.',
          ],
        },
        {
          name: 'Keterampilan Proses',
          cp: 'Mengamati, mempertanyakan dan memprediksi, merencanakan dan melakukan penyelidikan, memproses, menganalisis data dan informasi, mengevaluasi dan refleksi, serta mengomunikasikan hasil penyelidikan.',
          tpExamples: [
            'Merancang praktikum sederhana dengan bimbingan guru dan mencatat data di LKPD.',
            'Mempresentasikan hasil temuan dengan kalimat yang runtut dan logis.',
          ],
        },
      ],
    },
    {
      fase: 'Fase B',
      grades: 'Kelas 3 - 4 SD',
      subject: 'Matematika',
      elements: [
        {
          name: 'Bilangan Cacah & Pecahan',
          cp: 'Peserta didik dapat membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, menggunakan nilai tempat, serta melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 10.000 serta pecahan sederhana.',
          tpExamples: [
            'Menyelesaikan perkalian dan pembagian bilangan cacah sampai 100.',
            'Membandingkan dan menyederhanakan pecahan bernilai sama dengan gambar konkret.',
          ],
        },
        {
          name: 'Pengukuran & Data',
          cp: 'Peserta didik dapat mengukur panjang dan berat benda menggunakan satuan baku, serta menyajikan data dalam bentuk diagram batang.',
          tpExamples: [
            'Menghitung keliling dan luas bangun datar persegi dan persegi panjang.',
            'Membaca dan membuat diagram batang tunggal dari data kelas.',
          ],
        },
      ],
    },
    {
      fase: 'Fase C',
      grades: 'Kelas 5 - 6 SD',
      subject: 'IPAS',
      elements: [
        {
          name: 'Sistem Organ Manusia & Ekosistem',
          cp: 'Peserta didik memahami sistem organ tubuh manusia (pernapasan, pencernaan, dan peredaran darah) yang dikaitkan dengan cara menjaga kesehatan tubuhnya; hubungan antarmakhluk hidup dan lingkungannya dalam bentuk jaring-jaring makanan.',
          tpExamples: [
            'Membuat model tiruan paru-paru atau sistem pencernaan manusia.',
            'Menganalisis dampak kepunahan salah satu populasi dalam jaring-jaring makanan.',
            'Mengidentifikasi lapisan bumi dan fenomena lempeng tektonik serta mitigasi bencana.',
          ],
        },
      ],
    },
    {
      fase: 'Fase C',
      grades: 'Kelas 5 - 6 SD',
      subject: 'Pendidikan Pancasila',
      elements: [
        {
          name: 'Undang-Undang Dasar 1945 & Norma Sosial',
          cp: 'Peserta didik mampu menyajikan hasil identifikasi bentuk-bentuk norma, hak, dan kewajiban dalam kedudukannya sebagai anggota keluarga, warga sekolah, dan warga negara.',
          tpExamples: [
            'Menunjukkan contoh pengamalan musyawarah mufakat di lingkungan sekolah.',
            'Menyusun peta keragaman budaya dan komitmen menjaga persatuan bangsa.',
          ],
        },
      ],
    },
  ];

  const currentMatch = curriculumData.find(
    c => c.fase === `Fase ${selectedFase}` && c.subject === selectedSubject
  ) || curriculumData.find(c => c.fase === `Fase ${selectedFase}`) || curriculumData[2];

  return (
    <div id="curriculum-guide-page" className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#00529B] dark:text-blue-300 font-bold text-xs">
              Keputusan BSKAP No. 032/H/KR/2024
            </span>
            <span className="text-xs text-slate-400">• Standar Nasional</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Panduan Capaian Pembelajaran (CP) & Alur Tujuan (ATP) SD
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Rujukan resmi kompetensi minimum yang harus dicapai peserta didik pada setiap fase Sekolah Dasar
          </p>
        </div>

        <button
          onClick={() => {
            setEditingModule(null);
            setIsFormModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00529B] hover:bg-[#003B7A] text-white text-xs sm:text-sm font-bold shadow-md transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Modul dari CP Ini</span>
        </button>
      </div>

      {/* Fase Selector Tabs */}
      <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        {[
          { key: 'A', title: 'Fase A (Kelas 1 - 2 SD)', desc: 'Literasi & Numerasi Fondasi' },
          { key: 'B', title: 'Fase B (Kelas 3 - 4 SD)', desc: 'Pengembangan Konseptual' },
          { key: 'C', title: 'Fase C (Kelas 5 - 6 SD)', desc: 'Penalaran Analitis Lanjutan' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setSelectedFase(f.key as any)}
            className={`p-3 rounded-xl text-left transition ${
              selectedFase === f.key
                ? 'bg-white dark:bg-slate-900 text-[#00529B] dark:text-white shadow-md border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span className="block font-black text-xs sm:text-sm">{f.title}</span>
            <span className="block text-[11px] text-slate-400 mt-0.5 truncate">{f.desc}</span>
          </button>
        ))}
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2">Pilih Mapel:</span>
        {['IPAS', 'Matematika', 'Bahasa Indonesia', 'Pendidikan Pancasila'].map(subj => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedSubject === subj
                ? 'bg-[#FF7300] text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* CP Breakdown Cards */}
      <div className="space-y-4">
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Capaian Pembelajaran: {currentMatch.subject} ({currentMatch.fase} - {currentMatch.grades})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Terdapat {currentMatch.elements.length} elemen kompetensi utama
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Aktif 2024/2025
          </span>
        </div>

        {/* Elements Accordion */}
        {currentMatch.elements.map(elem => {
          const isExpanded = expandedElement === elem.name;

          return (
            <div
              key={elem.name}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setExpandedElement(isExpanded ? null : elem.name)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-[#00529B] dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Elemen: {elem.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {elem.tpExamples.length} Contoh Alur Tujuan Pembelajaran (ATP)
                    </p>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50/40 dark:bg-slate-800/20 text-xs sm:text-sm">
                  {/* CP Text */}
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                    <p className="text-[11px] font-bold text-[#002D62] dark:text-blue-300 uppercase tracking-wider mb-1">
                      Deskripsi Capaian Pembelajaran Resmi:
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      "{elem.cp}"
                    </p>
                  </div>

                  {/* TP Examples */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Rekomendasi Penjabaran Tujuan Pembelajaran (TP):
                    </p>
                    <ul className="space-y-2">
                      {elem.tpExamples.map((tp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                            {tp}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
