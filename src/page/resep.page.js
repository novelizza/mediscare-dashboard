import React from "react";
import { ResepTemplate, NavBarTemplate } from "../component/template";
import { useRecoilState } from "recoil";
import { refresh, activePage, dataRekamMedis } from "../store";
import axios from "axios";

function ResepPage() {
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getDataRekamMedis, setDataRekamMedis] = useRecoilState(dataRekamMedis);

  const [dataResep, setDataResep] = React.useState([]);

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
        .get(
          "http://localhost:4000/api/resep/all/" +
            getDataRekamMedis.id_pemeriksaan,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              session: localStorage.getItem("session"),
            },
          }
        )
        .then((res) => {
          setDataResep(res.data.result);
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
          page === "Detail Resep"
            ? styleDetailRekamMedis
            : styleMasukkanRekamMedis
        }
      />
      <ResepTemplate
        dataResep={dataResep}
        id_pemeriksaan={getDataRekamMedis.id_pemeriksaan}
      />
    </div>
  );
}

export default ResepPage;
