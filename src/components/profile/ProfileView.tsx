import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  School,
  Save,
  CheckCircle2,
  Calendar,
  MapPin,
  Award,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  AlertCircle,
  Clock,
  Sparkles,
  Building2,
  BookOpen
} from 'lucide-react';
import { KopSignatureSettings } from '../modules/KopSignatureSettings';
import { KopConfig } from '../../types';
import { initialKopConfig } from '../../data/mockData';

export const ProfileView: React.FC = () => {
  const { userProfile, updateProfile, updateKopConfig, showToast } = useApp();

  // Primary School & Profile States (NO DUPLICATES)
  const [school, setSchool] = useState(userProfile.school || '');
  const [npsn, setNpsn] = useState(userProfile.npsn || '');
  const [city, setCity] = useState(userProfile.city || '');
  const [province, setProvince] = useState(userProfile.province || '');
  const [schoolAddress, setSchoolAddress] = useState(
    userProfile.kopConfig?.schoolAddress || 'Jl. Menteng Raya No. 10, RT.01/RW.02, Kec. Menteng, Jakarta Pusat 10340'
  );
  const [schoolContact, setSchoolContact] = useState(
    userProfile.kopConfig?.schoolContact || 'Telp: (021) 3192849 • Posel: sdn01menteng@sekolah.belajar.id'
  );

  // Headmaster States
  const [headmasterName, setHeadmasterName] = useState(userProfile.headmasterName || '');
  const [headmasterNip, setHeadmasterNip] = useState(userProfile.headmasterNip || '');
  const [headmasterTitle, setHeadmasterTitle] = useState(
    userProfile.kopConfig?.headmasterTitle || 'Kepala Sekolah'
  );

  // Teacher / Author States
  const [name, setName] = useState(userProfile.name || '');
  const [nip, setNip] = useState(userProfile.nip || '');
  const [role, setRole] = useState(userProfile.role || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [email, setEmail] = useState(userProfile.email || '');

  // Academic Period States
  const [academicYear, setAcademicYear] = useState(userProfile.academicYear || '2024/2025');
  const [activeSemester, setActiveSemester] = useState<1 | 2>(userProfile.activeSemester || 1);

  // KOP Configuration (Logos and Government Headers)
  const [kopConfig, setKopConfig] = useState<KopConfig>(() => {
    return userProfile.kopConfig || initialKopConfig;
  });

  // Track save status and timestamps
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<string | null>(() => {
    const saved = localStorage.getItem('PROFILE_LAST_SAVED_TIME');
    return saved || null;
  });
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  // Mark form as dirty when any field changes
  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  // Sync derived values into kopConfig preview continuously
  const currentMergedKop: KopConfig = {
    ...kopConfig,
    schoolName: school,
    schoolAddress: schoolAddress,
    schoolContact: `NPSN: ${npsn || '-'} • ${schoolContact}`,
    signaturePlace: city,
    headmasterName: headmasterName,
    headmasterNip: headmasterNip,
    headmasterTitle: headmasterTitle,
    teacherName: name,
    teacherNip: nip,
    teacherTitle: role || 'Guru Kelas / Penyusun Modul',
  };

  const handleKopChange = (updated: Partial<KopConfig>) => {
    markDirty();
    setKopConfig(prev => ({ ...prev, ...updated }));
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const formattedTime = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }).format(new Date());

    const finalKop: KopConfig = {
      ...kopConfig,
      schoolName: school,
      schoolAddress: schoolAddress,
      schoolContact: `NPSN: ${npsn || '-'} • ${schoolContact}`,
      signaturePlace: city,
      headmasterName: headmasterName,
      headmasterNip: headmasterNip,
      headmasterTitle: headmasterTitle,
      teacherName: name,
      teacherNip: nip,
      teacherTitle: role || 'Guru Kelas / Penyusun Modul',
    };

    updateProfile({
      name,
      nip,
      role,
      phone,
      email,
      school,
      npsn,
      city,
      province,
      headmasterName,
      headmasterNip,
      academicYear,
      activeSemester,
      kopConfig: finalKop,
    });

    updateKopConfig(finalKop);

    // Save timestamp
    localStorage.setItem('PROFILE_LAST_SAVED_TIME', formattedTime);
    setLastSavedTimestamp(formattedTime);
    setIsDirty(false);
    setJustSaved(true);

    showToast('Seluruh Pengaturan Profil Sekolah, Guru & KOP berhasil disimpan!', 'success');

    setTimeout(() => {
      setJustSaved(false);
    }, 5000);
  };

  return (
    <div id="profile-settings-page" className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#00529C] dark:text-blue-300 font-bold text-xs flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-[#FF7300]" />
              Profil Satuan Pendidikan
            </span>
            {lastSavedTimestamp && !isDirty && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tersimpan
              </span>
            )}
            {isDirty && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                Ada perubahan belum disimpan
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Pengaturan Profil & KOP Surat Cetak
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Data disederhanakan tanpa pengulangan dan otomatis diterapkan pada KOP naskah dinas, lembar pengesahan, dan dokumen PDF.
          </p>
        </div>

        {/* Quick Top Save Button */}
        <div className="shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => handleSaveAll()}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 ${
              justSaved
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-[#00529C] to-[#002D62] hover:opacity-95 text-white shadow-blue-900/25'
            }`}
          >
            {justSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                <span>Pengaturan Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Seluruh Pengaturan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* TANDA STATUS SUDAH TERSIMPAN (BANNER NOTIFIKASI BESAR) */}
      {justSaved && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500 dark:border-emerald-600 shadow-lg shadow-emerald-500/10 flex items-start gap-3.5 text-emerald-900 dark:text-emerald-100 animate-in zoom-in-95 duration-300">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
                Pengaturan Berhasil Disimpan Permanen!
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/70 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
                Aktif
              </span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
              Waktu simpan: <strong>{lastSavedTimestamp}</strong>. Profil sekolah, logo kiri/kanan, dan format tanda tangan telah diperbarui pada seluruh modul dan pratinjau cetak.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* BAGIAN 1: PROFIL SATUAN PENDIDIKAN (HANYA DIISI SEKALI) */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FF7300]" />
              <span>1. Identitas Satuan Pendidikan (Sekolah Dasar)</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              Otomatis terhubung ke KOP Surat
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Sekolah Dasar (Huruf Resmi)
              </label>
              <input
                type="text"
                value={school}
                onChange={e => {
                  setSchool(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: SD Negeri 01 Menteng Jaya"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NPSN Sekolah
              </label>
              <input
                type="text"
                value={npsn}
                onChange={e => {
                  setNpsn(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: 20108392"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kota / Kabupaten
              </label>
              <input
                type="text"
                value={city}
                onChange={e => {
                  setCity(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Jakarta Pusat"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Provinsi
              </label>
              <input
                type="text"
                value={province}
                onChange={e => {
                  setProvince(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: DKI Jakarta"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kontak & Email Resmi Sekolah
              </label>
              <input
                type="text"
                value={schoolContact}
                onChange={e => {
                  setSchoolContact(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Telp: (021) 3192849 • sdn01menteng@sekolah.belajar.id"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Alamat Lengkap Sekolah & Kode Pos (Baris Alamat KOP)
              </label>
              <input
                type="text"
                value={schoolAddress}
                onChange={e => {
                  setSchoolAddress(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Jl. Menteng Raya No. 10, RT.01/RW.02, Kebon Sirih, Kec. Menteng, Kota Jakarta Pusat 10340"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: PEJABAT PENGESAHAN (KEPALA SEKOLAH) & PERIODE PEMBELAJARAN */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF7300]" />
              <span>2. Pengesahan Kepala Sekolah & Tahun Ajaran</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              Otomatis tercantum pada lembar pengesahan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap & Gelar Kepala Sekolah
              </label>
              <input
                type="text"
                value={headmasterName}
                onChange={e => {
                  setHeadmasterName(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Dra. Hj. Siti Rohmah, M.Pd."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NIP / NUPTK Kepala Sekolah
              </label>
              <input
                type="text"
                value={headmasterNip}
                onChange={e => {
                  setHeadmasterNip(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: 19720315 199603 2 003"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Sebutan Jabatan
              </label>
              <input
                type="text"
                value={headmasterTitle}
                onChange={e => {
                  setHeadmasterTitle(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Kepala Sekolah"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tahun Ajaran Aktif
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={e => {
                  setAcademicYear(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: 2024/2025"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Semester Aktif
              </label>
              <select
                value={activeSemester}
                onChange={e => {
                  setActiveSemester(Number(e.target.value) as 1 | 2);
                  markDirty();
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              >
                <option value={1}>Semester 1 (Ganjil)</option>
                <option value={2}>Semester 2 (Genap)</option>
              </select>
            </div>
          </div>
        </div>

        {/* BAGIAN 3: IDENTITAS GURU / PENYUSUN PERANGKAT AJAR */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2">
              <User className="w-4 h-4 text-[#FF7300]" />
              <span>3. Identitas Guru / Penyusun Perangkat Ajar</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              Penandatangan penyusun naskah
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap & Gelar Guru
              </label>
              <input
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Budi Santoso, S.Pd.SD"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NIP Guru Penyusun
              </label>
              <input
                type="text"
                value={nip}
                onChange={e => {
                  setNip(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: 19850412 201001 1 014"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Jabatan / Penugasan Kelas
              </label>
              <input
                type="text"
                value={role}
                onChange={e => {
                  setRole(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Guru Kelas IV (Fase B)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nomor Handphone / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => {
                  setPhone(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: 0812-3456-7890"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email / Akun Belajar.id
              </label>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: budi.santoso@guru.sd.belajar.id"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 4: KOP SURAT RESMI & UPLOAD LOGO (KIRI & KANAN) */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border-2 border-[#00529C]/30 dark:border-blue-900/50 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF7300]" />
              <span>4. KOP Surat Resmi & Upload Logo (Kiri & Kanan)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Unggah lambang resmi Pemda/Kemendikbud (kiri) dan lambang sekolah (kanan). Isian naskah dinas otomatis memanfaatkan profil sekolah di atas tanpa perlu diulang.
            </p>
          </div>

          <KopSignatureSettings
            config={currentMergedKop}
            onChange={handleKopChange}
            simplified={true}
          />
        </div>

        {/* BOTTOM ACTION BAR DENGAN STATUS PENYIMPANAN TERJAMIN */}
        <div className="sticky bottom-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isDirty
                  ? 'bg-amber-500 animate-ping'
                  : 'bg-emerald-500 animate-pulse'
              }`}
            />
            <div>
              <p className="text-xs font-black text-slate-800 dark:text-white">
                {isDirty ? 'Ada Perubahan Belum Disimpan' : 'Semua Pengaturan Tersimpan'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {lastSavedTimestamp
                  ? `Terakhir disimpan: ${lastSavedTimestamp}`
                  : 'Klik tombol simpan untuk mengaktifkan pengaturan baku'}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={`flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg active:scale-95 transition-all w-full sm:w-auto ${
              justSaved
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-[#00529C] via-[#003e75] to-[#002D62] hover:opacity-95 text-white shadow-blue-900/25'
            }`}
          >
            {justSaved ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>Pengaturan Berhasil Disimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 text-[#FF7300]" />
                <span>Simpan Seluruh Pengaturan & KOP</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
