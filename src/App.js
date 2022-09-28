import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  PegawaiPage,
  PasienPage,
  ProfesiPage,
  DetailPesananPage,
  MasukanRekamMedisPage,
  RekamMedisPage,
  RekamMedisPasienPage,
  RujukanPage,
  ResepPage,
  DetailPegawaiPage,
  DetailPasienPage,
  DetailProfesiPage,
  KebijakanPrivasiPage,
} from "./page";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/pegawai" exact element={<PegawaiPage />} />
        <Route path="/pasien" exact element={<PasienPage />} />
        <Route path="/profesi" exact element={<ProfesiPage />} />
        <Route path="/detailPesanan" exact element={<DetailPesananPage />} />
        <Route
          path="/masukanrekammedis"
          exact
          element={<MasukanRekamMedisPage />}
        />
        <Route path="/rekammedis" exact element={<RekamMedisPage />} />
        <Route
          path="/rekammedispasien"
          exact
          element={<RekamMedisPasienPage />}
        />
        <Route
          path="/detailrekammedis"
          exact
          element={<MasukanRekamMedisPage />}
        />
        <Route path="/rujukan" exact element={<RujukanPage />} />
        <Route path="/resep" exact element={<ResepPage />} />
        <Route path="/detailpegawai" exact element={<DetailPegawaiPage />} />
        <Route path="/tambahpegawai" exact element={<DetailPegawaiPage />} />
        <Route path="/detailpasien" exact element={<DetailPasienPage />} />
        <Route path="/detailprofesi" exact element={<DetailProfesiPage />} />
        <Route path="/tambahprofesi" exact element={<DetailProfesiPage />} />
      </Route>
      <Route
        path="/kebijakanprivasi"
        exact
        element={<KebijakanPrivasiPage />}
      />
      <Route
        path="*"
        element={
          <span className="items-center flex flex-col">404 Not Found</span>
        }
      />
    </Routes>
  );
}

export default App;
