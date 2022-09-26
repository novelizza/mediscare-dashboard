import React from "react";
import { RujukanTemplate, NavBarTemplate } from "../component/template";
import { useRecoilState } from "recoil";
import { refresh, activePage, dataRekamMedis } from "../store";
import axios from "axios";

function RujukanPage() {
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getDataRekamMedis, setDataRekamMedis] = useRecoilState(dataRekamMedis);

  const [dataRujuk, setDataRujuk] = React.useState({
    dataPegawai: {},
    dataRujuk: {},
  });

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
          "http://localhost:4000/api/rujuk/" + getDataRekamMedis.id_pemeriksaan,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              session: localStorage.getItem("session"),
            },
          }
        )
        .then((res) => {
          setDataRujuk(res.data.result);
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
          page === "Detail Rujukan"
            ? styleDetailRekamMedis
            : styleMasukkanRekamMedis
        }
      />
      <RujukanTemplate
        dataRujuk={dataRujuk}
        id_pemeriksaan={getDataRekamMedis.id_pemeriksaan}
        diagnosis={getDataRekamMedis.diagnosis}
      />
    </div>
  );
}

export default RujukanPage;
