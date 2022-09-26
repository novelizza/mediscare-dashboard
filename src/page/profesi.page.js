import React from "react";
import { ProfesiTemplate, NavBarTemplate } from "../component/template";
import axios from "axios";

function ProfesiPage() {
  const style = {
    dasarAtas: "bg-THEME_COLOR py-7",
    dasarPesanan:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarRekamMedis:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarPegawai:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR",
    dasarPasien:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-br-full",
    dasarPekerjaan:
      "flex flex-row w-full bg-GROUND_COLOR py-4 pl-4 text-THEME_COLOR rounded-l-full font-bold",
    dasarBawah:
      "flex flex-row w-full bg-THEME_COLOR py-4 pl-4 text-GROUND_COLOR rounded-tr-full",
  };

  const [dataProfesi, setDataProfesi] = React.useState([]);

  React.useEffect(() => {
    async function fetchDataAccount() {
      const request = await axios
        .get("http://localhost:4000/api/kerjaan/all", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataProfesi(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataAccount();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate styles={style} />
      <ProfesiTemplate data={dataProfesi} />
    </div>
  );
}

export default ProfesiPage;
