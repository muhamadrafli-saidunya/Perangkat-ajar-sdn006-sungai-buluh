import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubjectType, FaseType, TeachingModule } from '../../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Layers,
  FileCheck,
  Check,
  Zap,
  Printer,
  Eye
} from 'lucide-react';

export const ModuleGeneratorWizard: React.FC = () => {
  const { addModule, userProfile, setSelectedModule, setIsDetailOpen, setCurrentView } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<TeachingModule | null>(null);

  // Step 1 states
  const [grade, setGrade] = useState<number>(4);
  const [subject, setSubject] = useState<SubjectType>('IPAS');
  const [fase, setFase] = useState<FaseType>('Fase B');
  const [topic, setTopic] = useState('Sistem Pencernaan Makanan dan Pola Hidup Sehat');
  const [allocatedHours, setAllocatedHours] = useState('5 JP (5 x 35 Menit)');
  const [modelPembelajaran, setModelPembelajaran] = useState('Inquiry & Project Based Learning');

  // Step 2 states: Profil Pelajar Pancasila & Pendekatan
  const allProfil = [
    'Beriman & Bertakwa kepada Tuhan YME',
    'Berkebinekaan Global',
    'Bergotong Royong',
    'Mandiri',
    'Bernalar Kritis',
    'Kreatif',
  ];
  const [selectedProfil, setSelectedProfil] = useState<string[]>(['Bernalar Kritis', 'Bergotong Royong', 'Mandiri']);
  const [pedagogyStyle, setPedagogyStyle] = useState('Praktikum & Diskusi Kelompok Aktif');

  const handleGradeChange = (g: number) => {
    setGrade(g);
    if (g === 1 || g === 2) setFase('Fase A');
    else if (g === 3 || g === 4) setFase('Fase B');
    else setFase('Fase C');
  };

  const toggleProfil = (p: string) => {
    setSelectedProfil(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  // Quick Preset Topics based on Mapel
  const getPresetTopics = () => {
    switch (subject) {
      case 'IPAS':
        return [
          'Sistem Pencernaan Makanan dan Pola Hidup Sehat',
          'Tumbuhan Sumber Kehidupan di Bumi & Fotosintesis',
          'Wujud Zat dan Perubahannya dalam Kehidupan Sehari-hari',
          'Gaya di Sekitar Kita: Gaya Otot, Gesek, dan Gravitasi',
        ];
      case 'Matematika':
        return [
          'Operasi Hitung Penjumlahan dan Pengurangan Pecahan Biasa',
          'Nilai Tempat Bilangan Cacah Sampai 10.000 dan Uang Rupiah',
          'Keliling dan Luas Bangun Datar Segitiga dan Persegi',
          'Penyajian Data dalam Bentuk Diagram Batang Sederhana',
        ];
      case 'Bahasa Indonesia':
        return [
          'Menulis Teks Narasi Pengalaman Liburan dengan Tanda Baca Benar',
          'Menemukan Ide Pokok dan Informasi Penting dalam Teks Eksplanasi',
          'Menyimak Dongeng Fabel Nusantara dan Nilai Moral Karakter',
        ];
      case 'Pendidikan Pancasila':
        return [
          'Makna Simbol Sila-Sila Pancasila dalam Kehidupan di Sekolah',
          'Hak dan Kewajiban sebagai Warga Sekolah dan Anggota Keluarga',
          'Keragaman Budaya, Suku Bangsa, dan Toleransi Bhinneka Tunggal Ika',
        ];
      case 'PJOK':
        return [
          'Kombinasi Pola Gerak Dasar Lokomotor dan Manipulatif Bola Kasti',
          'Aktivitas Kebugaran Jasmani dan Ketahanan Daya Tahan Jantung',
        ];
      default:
        return [
          'Eksplorasi Konsep Dasar dan Praktik Pembelajaran Terbimbing',
          'Pemecahan Masalah Kontekstual Sesuai Lingkungan Sekolah',
        ];
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generated = addModule({
        title: `Modul Ajar ${subject}: ${topic}`,
        type: 'Modul Ajar',
        fase,
        grade,
        subject,
        status: 'Diterbitkan',
        allocatedHours,
        targetStudents: `Reguler / Heterogen Kelas ${grade} SD (28 Siswa)`,
        modelPembelajaran,
        profilPancasila: selectedProfil,
        capaianPembelajaran: `Peserta didik mampu memahami konsep esensial ${topic}, mengaitkan dengan kehidupan sehari-hari, serta menunjukkan keterampilan bernalar kritis dan kerja sama melalui ${pedagogyStyle}.`,
        tujuanPembelajaran: [
          `Mengidentifikasi dan mendeskripsikan konsep utama mengenai ${topic}.`,
          `Menganalisis hubungan sebab-akibat dan menyelesaikan studi kasus sederhana secara kolaboratif.`,
          `Mempresentasikan kesimpulan hasil pengamatan atau karya dengan percaya diri di depan kelas.`,
        ],
        pemahamanBermakna: `Pemahaman mendalam tentang ${topic} membentuk kemandirian dan kepekaan sosial peserta didik dalam lingkungan keluarga dan masyarakat.`,
        pertanyaanPemantik: [
          `Mengapa kita perlu mempelajari ${topic}?`,
          `Bagaimana cara kita menerapkan hal ini saat berada di rumah atau bersama teman?`,
        ],
        saranaPrasarana: ['Buku Siswa Kemendikbud', 'Lembar Kerja Eksplorasi', 'Media Audio-Visual / Proyektor'],
        langkahKegiatan: {
          pendahuluan: [
            'Guru mengawali pembelajaran dengan salam ceria, presensi, dan memimpin doa bersama.',
            'Apersepsi: Guru mengaitkan materi sebelumnya dengan topik baru melalui tayangan video singkat.',
            'Penyampaian tujuan pembelajaran dan kontrak kerja kelompok yang menyenangkan.',
          ],
          inti: [
            `Orientasi peserta didik pada masalah nyata terkait ${topic}.`,
            'Peserta didik berdiskusi dalam kelompok kooperatif untuk membedah lembar penugasan eksplorasi.',
            'Guru memfasilitasi bimbingan diferensiasi proses bagi kelompok yang memerlukan bantuan.',
            'Setiap kelompok mendemonstrasikan atau mempresentasikan hasil karyanya di galeri kelas.',
          ],
          penutup: [
            'Peserta didik bersama guru merangkum kesimpulan poin-poin penting yang telah dipelajari.',
            'Refleksi diri peserta didik: hal apa yang paling menarik dan apa yang masih perlu ditingkatkan.',
            'Penugasan mandiri ringan dan doa penutup pembelajaran.',
          ],
        },
        asesmenDesc: 'Asesmen Formatif (Observasi sikap Profil Pelajar Pancasila, Penilaian Kinerja Diskusi, Lembar LKPD) dan Asesmen Sumatif (Kuis akhir materi 10 butir soal).',
        lampiran: {
          lkpd: `LKPD Terstruktur: Lembar Kerja Eksplorasi ${topic} dilengkapi panduan investigasi kelompok dan tabel simpulan.`,
          materiSingkat: `Rangkuman materi pokok ${topic} dengan infografis pendukung sesuai taraf berpikir operasional konkret siswa SD.`,
          rubrikPenilaian: 'Rubrik Penilaian: Kriteria Sangat Mahir (4), Cakap (3), Mulai Berkembang (2), Perlu Bimbingan (1) untuk aspek pemahaman materi, keterampilan kolaborasi, dan presentasi.',
          remedialPengayaan: 'Remedial: Bimbingan individual terfokus pada indikator yang belum tuntas. Pengayaan: Proyek tantangan kreatif pemecahan masalah lingkungan sekitar.',
        },
        tags: ['Generator AI', subject, `Kelas ${grade}`, 'Kurikulum Merdeka', 'Siap Ajar'],
      });

      setGeneratedResult(generated);
      setIsGenerating(false);
      setStep(3);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1200);
  };

  return (
    <div id="module-generator-wizard" className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Title & Badge */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-xs font-bold text-[#FF7300]">
          <Sparkles className="w-4 h-4" />
          <span>Generator Perangkat Ajar Otomatis Berstandar Kurikulum Merdeka</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Susun Modul Ajar Lengkap dalam 3 Langkah
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Pilih mata pelajaran, topik materi, dan dimensi Profil Pelajar Pancasila. Sistem menyusun rumusan CP, TP, langkah pembelajaran diferensiasi, hingga instrumen asesmen dan LKPD secara otomatis.
        </p>
      </div>

      {/* Step Indicator Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        {[
          { num: 1, title: 'Topik & Jenjang' },
          { num: 2, title: 'Profil Pancasila & Model' },
          { num: 3, title: 'Hasil Modul Siap Cetak' },
        ].map(item => (
          <div key={item.num} className="flex items-center gap-2 sm:gap-3 flex-1 justify-center">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step === item.num
                  ? 'bg-gradient-to-r from-[#FF7300] to-[#E65100] text-white shadow-md'
                  : step > item.num
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {step > item.num ? <Check className="w-4 h-4" /> : item.num}
            </div>
            <span
              className={`text-xs font-bold hidden sm:inline ${
                step === item.num
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* WIZARD CONTAINER */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* STEP 1: Topik & Jenjang */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00529B] dark:text-blue-400" />
                <span>Langkah 1: Tentukan Identitas Modul & Topik Pembelajaran</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pilih jenjang kelas SD dan mata pelajaran yang akan diajarkan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Kelas */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tingkat Kelas SD
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleGradeChange(g)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        grade === g
                          ? 'bg-[#00529B] text-white border-[#00529B] shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Kelas {g}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1.5 font-semibold">
                  Tergolong dalam: {fase}
                </p>
              </div>

              {/* Mapel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mata Pelajaran
                </label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value as SubjectType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
                >
                  <option value="IPAS">IPAS</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                  <option value="PJOK">PJOK</option>
                  <option value="Pendidikan Agama Islam">Pendidikan Agama Islam</option>
                  <option value="Seni Rupa">Seni Rupa</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                </select>
              </div>

              {/* Alokasi Waktu */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Alokasi Waktu Jam Pelajaran
                </label>
                <input
                  type="text"
                  value={allocatedHours}
                  onChange={e => setAllocatedHours(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Topik Materi Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Topik Materi / Lingkup Pembelajaran <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Tulis topik atau pilih rekomendasi di bawah..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-[#FF7300]"
              />

              {/* Preset Topic Pills */}
              <div className="mt-3">
                <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                  Rekomendasi Topik Kurikulum Merdeka {subject} Kelas {grade}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {getPresetTopics().map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border text-left transition ${
                        topic === t
                          ? 'bg-orange-50 dark:bg-orange-950 border-[#FF7300] text-[#FF7300]'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Next Step Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!topic.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7300] to-[#E65100] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-orange-500/20 active:scale-95 transition disabled:opacity-50"
              >
                <span>Lanjut: Profil Pancasila & Model</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Profil Pelajar Pancasila & Model Pembelajaran */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF7300]" />
                <span>Langkah 2: Karakter Profil Pancasila & Model Pembelajaran</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tentukan dimensi karakter yang diperkuat dan strategi belajar aktif.
              </p>
            </div>

            {/* Profil Pelajar Pancasila Badges */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Pilih Dimensi Profil Pelajar Pancasila yang Diintegrasikan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {allProfil.map(p => {
                  const active = selectedProfil.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleProfil(p)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-semibold transition ${
                        active
                          ? 'bg-orange-50 dark:bg-orange-950/60 border-[#FF7300] text-[#FF7300] dark:text-orange-300'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                          active ? 'bg-[#FF7300] text-white' : 'border border-slate-300'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Model & Pendekatan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Model Pembelajaran Utama
                </label>
                <select
                  value={modelPembelajaran}
                  onChange={e => setModelPembelajaran(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
                >
                  <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                  <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                  <option value="Inquiry-Based Learning">Inquiry-Based Learning</option>
                  <option value="Discovery Learning">Discovery Learning</option>
                  <option value="Direct Instruction Multisensori">Direct Instruction Multisensori</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pendekatan Aktivitas Siswa
                </label>
                <input
                  type="text"
                  value={pedagogyStyle}
                  onChange={e => setPedagogyStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Preview of Generation Summary */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-[#002D62] dark:text-blue-300 block mb-1">
                Ringkasan Penyusunan:
              </span>
              <p>• Mata Pelajaran: <strong>{subject}</strong> (Kelas {grade} - {fase})</p>
              <p>• Topik: <strong>{topic}</strong></p>
              <p>• Profil Pelajar Pancasila: <strong>{selectedProfil.join(', ') || 'Belum dipilih'}</strong></p>
              <p>• Satuan Pendidikan: <strong>{userProfile.school}</strong></p>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7300] to-[#E65100] hover:from-[#f56f00] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-500/30 active:scale-95 transition"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyusun Perangkat Ajar...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Generate Modul Lengkap Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Sukses & Modul Siap Digunakan */}
        {step === 3 && generatedResult && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                100% Selesai & Terverifikasi
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                Modul Ajar Berhasil Disusun!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-1">
                Perangkat ajar telah disimpan ke database lokal dan siap dicetak dengan kop resmi sekolah atau diintegrasikan langsung ke kelas.
              </p>
            </div>

            {/* Generated Card Preview */}
            <div className="max-w-xl mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono font-bold text-[#00529B] dark:text-blue-400">{generatedResult.code}</span>
                <span>{generatedResult.allocatedHours}</span>
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {generatedResult.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {generatedResult.capaianPembelajaran}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {generatedResult.profilPancasila.map(p => (
                  <span key={p} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-[#FF7300]">
                    ★ {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedModule(generatedResult);
                  setIsDetailOpen(true);
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-[#00529B] dark:text-blue-300 font-bold text-xs sm:text-sm hover:bg-blue-100 transition"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Detail Modul</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentView('modules');
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7300] to-[#E65100] text-white font-extrabold text-xs sm:text-sm shadow-md transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka di Bank Perangkat Ajar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setGeneratedResult(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-xs hover:bg-slate-100"
              >
                Buat Modul Lainnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
