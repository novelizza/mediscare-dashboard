import React from "react";
import { PasienTemplate, NavBarTemplate } from "../component/template";
import axios from "axios";
import { useRecoilState } from "recoil";
import { urlBase } from "../store";

function PasienPage() {
  const [dataPasien, setDataPasien] = React.useState([]);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);

  const style = {
    dasarAtas: "bg-THEME_COLOR py-7",
    dasarPesanan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarRekamMedis:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarPegawai:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-br-full",
    dasarPasien:
      "flex flex-row w-full bg-GROUND_COLOR py-4 pl-4 text-THEME_COLOR rounded-l-full font-bold",
    dasarPekerjaan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-tr-full",
    dasarBawah:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
  };

  React.useEffect(() => {
    async function fetchDataPesanan() {
      const request = await axios
        .get(getUrlBase + "pasien/all", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataPasien(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataPesanan();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate styles={style} />
      <PasienTemplate data={dataPasien} />
    </div>
  );
}

export default PasienPage;
