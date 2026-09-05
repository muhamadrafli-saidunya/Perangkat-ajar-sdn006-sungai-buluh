export type ModuleType =
  | 'Modul Ajar'
  | 'Alur Tujuan Pembelajaran (ATP)'
  | 'Capaian Pembelajaran (CP)'
  | 'Program Tahunan (Prota)'
  | 'Program Semester (Promes)'
  | 'Asesmen & Rubrik'
  | 'Bahan Ajar & LKPD';

export type FaseType = 'Fase A' | 'Fase B' | 'Fase C';

export type StatusType = 'Draft' | 'Review' | 'Terverifikasi' | 'Diterbitkan';

export type SubjectType =
  | 'Bahasa Indonesia'
  | 'Matematika'
  | 'IPAS'
  | 'Pendidikan Pancasila'
  | 'Pendidikan Agama Islam'
  | 'PJOK'
  | 'Seni Rupa'
  | 'Bahasa Inggris';

export interface LessonSteps {
  pendahuluan: string[];
  inti: string[];
  penutup: string[];
}

export interface TeachingModule {
  id: string;
  code: string;
  title: string;
  type: ModuleType;
  fase: FaseType;
  grade: number; // 1 - 6
  subject: SubjectType;
  semester: 1 | 2;
  academicYear: string;
  author: string;
  nipAuthor?: string;
  school: string;
  headmaster?: string;
  nipHeadmaster?: string;
  status: StatusType;
  allocatedHours: string;
  targetStudents: string;
  profilPancasila: string[];
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  pemahamanBermakna: string;
  pertanyaanPemantik: string[];
  modelPembelajaran: string;
  saranaPrasarana: string[];
  langkahKegiatan: LessonSteps;
  asesmenDesc: string;
  lampiran: {
    lkpd: string;
    materiSingkat: string;
    rubrikPenilaian: string;
    remedialPengayaan: string;
  };
  downloadsCount: number;
  rating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subtitle: string;
  iconName: string;
}

export interface SubjectStats {
  subject: string;
  count: number;
  percentage: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  created: number;
  downloaded: number;
}

export interface KopConfig {
  showKop: boolean;
  showSignature: boolean;
  leftLogoUrl: string; // Base64 data URL or image path (Logo Kiri: Dinas/Pemda/Tut Wuri)
  rightLogoUrl: string; // Base64 data URL or image path (Logo Kanan: Sekolah)
  leftLogoSize: number; // e.g. 70 (in px)
  rightLogoSize: number; // e.g. 70 (in px)
  governmentHeader: string;
  departmentHeader: string;
  schoolName: string;
  schoolAddress: string;
  schoolContact: string;
  signaturePlace: string;
  signatureDate: string;
  headmasterTitle: string;
  headmasterName: string;
  headmasterNip: string;
  teacherTitle: string;
  teacherName: string;
  teacherNip: string;
  headmasterSignatureUrl?: string;
  teacherSignatureUrl?: string;
  showDigitalSignature: boolean;
}

export interface UserProfile {
  name: string;
  nip: string;
  role: string;
  school: string;
  npsn: string;
  city: string;
  province: string;
  gradeAssigned: number;
  phone: string;
  email: string;
  activeSemester: 1 | 2;
  academicYear: string;
  headmasterName: string;
  headmasterNip: string;
  kopConfig?: KopConfig;
}

export interface SettingsBackupPayload {
  version: string;
  exportedAt: string;
  appName: string;
  type: 'settings_only' | 'full_database';
  userProfile: UserProfile;
  kopConfig: KopConfig;
  modules?: TeachingModule[];
  metadata?: {
    schoolName: string;
    teacherName: string;
    headmasterName: string;
    npsn: string;
    academicYear: string;
    hasLeftLogo: boolean;
    hasRightLogo: boolean;
    modulesCount?: number;
  };
}

export interface BackupSnapshot {
  id: string;
  name: string;
  timestamp: string;
  type: 'settings_only' | 'full_database';
  data: SettingsBackupPayload;
}
