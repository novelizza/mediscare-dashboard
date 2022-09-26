import React from "react";
import { DetailProfesiTemplate, NavBarTemplate } from "../component/template";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idProfesi, refresh } from "../store";

function DetailProfesiPage() {
  const [dataDetailProfesi, setDataDetailProfesi] = React.useState({});
  const [id_profesi, setId_profesi] = useRecoilState(idProfesi);
  const [getRefresh, setRefresh] = useRecoilState(refresh);

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

  console.log(id_profesi);
  React.useEffect(() => {
    async function fetchDataPesanan() {
      const request = await axios
        .get("http://localhost:4000/api/kerjaan/" + id_profesi, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataDetailProfesi(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataPesanan();
  }, [getRefresh]);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate styles={style} />
      <DetailProfesiTemplate data={dataDetailProfesi} />
    </div>
  );
}

export default DetailProfesiPage;
