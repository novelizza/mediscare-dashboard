import React from "react";
import { PegawaiTemplate, NavBarTemplate } from "../component/template";
import axios from "axios";
import { useRecoilState } from "recoil";
import { urlBase } from "../store";

function PegawaiPage() {
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);

  const [dataPegawai, setDataPegawai] = React.useState([]);
  const [dataProfesi, setDataProfesi] = React.useState("");
  const style = {
    dasarAtas: "bg-THEME_COLOR py-7",
    dasarPesanan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarRekamMedis:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-br-full",
    dasarPegawai:
      "flex flex-row w-full bg-GROUND_COLOR py-4 pl-4 text-THEME_COLOR rounded-l-full font-bold",
    dasarPasien:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-tr-full",
    dasarPekerjaan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarBawah:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
  };

  React.useEffect(() => {
    async function fetchDataPesanan() {
      const request = await axios
        .get(getUrlBase + "pegawai/all", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataPegawai(res.data.result.dataAllPegawai);
          setDataProfesi(res.data.result.profesi);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataPesanan();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate styles={style} />
      <PegawaiTemplate data={dataPegawai} profesi={dataProfesi} />
    </div>
  );
}

export default PegawaiPage;
