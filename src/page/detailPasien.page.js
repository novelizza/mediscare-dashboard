import React from "react";
import { DetailPasienTemplate, NavBarTemplate } from "../component/template";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idPasien, refresh } from "../store";

function DetailPasienPage() {
  const [dataDetailPasien, setDataDetailPasien] = React.useState({});
  const [id_pasien, setId_pasien] = useRecoilState(idPasien);
  const [getRefresh, setRefresh] = useRecoilState(refresh);

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
        .get("http://localhost:4000/api/pasien/" + id_pasien, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataDetailPasien(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataPesanan();
  }, [getRefresh]);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate styles={style} />
      <DetailPasienTemplate data={dataDetailPasien} />
    </div>
  );
}

export default DetailPasienPage;
