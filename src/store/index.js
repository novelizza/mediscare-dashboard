import { atom } from "recoil";

const activePage = atom({
  key: "pageActive",
  default: "Pesanan",
});

const idPesanan = atom({
  key: "id_pesanan",
  default: 1,
});

const idPasien = atom({
  key: "id_pasien",
  default: 1,
});

const idPegawai = atom({
  key: "id_SelectedDetailPegawai",
  default: 1,
});

const idPemeriksaan = atom({
  key: "id_pemeriksaan",
  default: 1,
});

const idProfesi = atom({
  key: "id_profesi",
  default: 1,
});

const refresh = atom({
  key: "refresh",
  default: new Date(),
});

const dataRekamMedisPesanan = atom({
  key: "dataPasienPesanan",
  default: {},
});

const dataRekamMedis = atom({
  key: "dataRekamMedis",
  default: {},
});

export {
  activePage,
  idPesanan,
  idPasien,
  idPegawai,
  idPemeriksaan,
  idProfesi,
  refresh,
  dataRekamMedisPesanan,
  dataRekamMedis,
};
