import React, { useState } from 'react';
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
  Sliders
} from 'lucide-react';
import { KopSignatureSettings } from '../modules/KopSignatureSettings';
import { KopConfig } from '../../types';
import { initialKopConfig } from '../../data/mockData';

export const ProfileView: React.FC = () => {
  const { userProfile, updateProfile, updateKopConfig, showToast } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [nip, setNip] = useState(userProfile.nip);
  const [role, setRole] = useState(userProfile.role);
  const [school, setSchool] = useState(userProfile.school);
  const [npsn, setNpsn] = useState(userProfile.npsn);
  const [city, setCity] = useState(userProfile.city);
  const [province, setProvince] = useState(userProfile.province);
  const [headmasterName, setHeadmasterName] = useState(userProfile.headmasterName);
  const [headmasterNip, setHeadmasterNip] = useState(userProfile.headmasterNip);
  const [academicYear, setAcademicYear] = useState(userProfile.academicYear);
  const [activeSemester, setActiveSemester] = useState<1 | 2>(userProfile.activeSemester);

  // KOP and Signature configuration state
  const [kopConfig, setKopConfig] = useState<KopConfig>(() => {
    return userProfile.kopConfig || initialKopConfig;
  });

  const handleKopChange = (updated: Partial<KopConfig>) => {
    setKopConfig(prev => ({ ...prev, ...updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      nip,
      role,
      school,
      npsn,
      city,
      province,
      headmasterName,
      headmasterNip,
      academicYear,
      activeSemester,
      kopConfig,
    });
    updateKopConfig(kopConfig);
    showToast('Profil dan Pengaturan KOP & Tanda Tangan berhasil disimpan!', 'success');
  };

  return (
    <div id="profile-settings-page" className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#00529C] dark:text-blue-300 font-bold text-xs">
            Konfigurasi Dokumen Resmi
          </span>
          <span className="text-xs text-slate-400">• KOP & Tanda Tangan Sekolah</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Identitas Tenaga Pendidik & Satuan Pendidikan
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Data ini otomatis dicantumkan pada naskah KOP surat perangkat ajar, lembar pengesahan kepala sekolah, dan dokumen cetak PDF
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Profil Pendidik */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <User className="w-4 h-4" />
            <span>A. Identitas Guru / Penyusun Perangkat Ajar</span>
          </h3>

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
                  setKopConfig(prev => ({ ...prev, teacherName: e.target.value }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
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
                  setKopConfig(prev => ({ ...prev, teacherNip: e.target.value }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Jabatan / Peran
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Satuan Pendidikan */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <School className="w-4 h-4" />
            <span>B. Identitas Satuan Pendidikan (Sekolah Dasar)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Sekolah Dasar
              </label>
              <input
                type="text"
                value={school}
                onChange={e => {
                  setSchool(e.target.value);
                  setKopConfig(prev => ({ ...prev, schoolName: e.target.value }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NPSN Sekolah
              </label>
              <input
                type="text"
                value={npsn}
                onChange={e => setNpsn(e.target.value)}
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
                  setKopConfig(prev => ({ ...prev, signaturePlace: e.target.value }));
                }}
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
                onChange={e => setProvince(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Kepala Sekolah Dasar
              </label>
              <input
                type="text"
                value={headmasterName}
                onChange={e => {
                  setHeadmasterName(e.target.value);
                  setKopConfig(prev => ({ ...prev, headmasterName: e.target.value }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NIP Kepala Sekolah
              </label>
              <input
                type="text"
                value={headmasterNip}
                onChange={e => {
                  setHeadmasterNip(e.target.value);
                  setKopConfig(prev => ({ ...prev, headmasterNip: e.target.value }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Tahun Ajaran */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4" />
            <span>C. Periode Pembelajaran Aktif</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tahun Ajaran
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Semester Aktif
              </label>
              <select
                value={activeSemester}
                onChange={e => setActiveSemester(Number(e.target.value) as 1 | 2)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm"
              >
                <option value={1}>Semester 1 (Ganjil)</option>
                <option value={2}>Semester 2 (Genap)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: KOP Surat & Tanda Tangan Cetak (Upload Logo Kanan & Kiri) */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border-2 border-[#00529C]/30 dark:border-blue-900/50 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00529C] dark:text-blue-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF7300]" />
                <span>D. KOP Surat Resmi & Tanda Tangan (Upload Logo Sekolah)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Unggah logo untuk sebelah kiri (Kemendikbud/Dinas/Pemda) dan sebelah kanan (Sekolah Dasar/Yayasan) yang dicetak pada setiap perangkat ajar.
              </p>
            </div>
          </div>

          <KopSignatureSettings
            config={kopConfig}
            onChange={handleKopChange}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00529C] via-[#003e75] to-[#002D62] hover:opacity-95 text-white font-black text-sm shadow-lg shadow-blue-900/25 active:scale-95 transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Seluruh Pengaturan & Logo KOP</span>
          </button>
        </div>
      </form>
    </div>
  );
};
