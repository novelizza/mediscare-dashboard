import React from "react";
import {
  MasukanRekamMedisTemplate,
  NavBarTemplate,
} from "../component/template";
import { useRecoilState } from "recoil";
import { idPesanan, refresh, activePage, urlBase } from "../store";
import axios from "axios";

function MasukanRekamMedisPage() {
  const [id_pesanan, setId_pesanan] = useRecoilState(idPesanan);
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);

  const [dataPemeriksaan, setDataPemeriksaan] = React.useState({});

  const styleMasukkanRekamMedis = {
    dasarAtas: "bg-THEME_COLOR py-7 rounded-br-full",
    dasarPesanan:
      "flex flex-row w-full bg-GROUND_COLOR py-4 pl-4 text-THEME_COLOR rounded-l-full font-bold",
    dasarRekamMedis:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-tr-full",
    dasarPegawai:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarPasien:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarPekerjaan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarBawah:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
  };

  const styleDetailRekamMedis = {
    dasarAtas: "bg-THEME_COLOR py-7",
    dasarPesanan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-br-full",
    dasarRekamMedis:
      "flex flex-row w-full bg-GROUND_COLOR py-4 pl-4 text-THEME_COLOR rounded-l-full font-bold",
    dasarPegawai:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-tr-full",
    dasarPasien:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarPekerjaan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarBawah:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
  };

  React.useEffect(() => {
    async function fetchDataPesanan() {
      const request = await axios
        .get(getUrlBase + "pemeriksaan/" + id_pesanan, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataPemeriksaan(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataPesanan();
  }, [getRefresh]);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate
        styles={
          page === "Detail Rekam Medis"
            ? styleDetailRekamMedis
            : styleMasukkanRekamMedis
        }
      />
      <MasukanRekamMedisTemplate
        id_pesanan={id_pesanan}
        dataPemeriksaan={dataPemeriksaan}
      />
    </div>
  );
}

export default MasukanRekamMedisPage;
