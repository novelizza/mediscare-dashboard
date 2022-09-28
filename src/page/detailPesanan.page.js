import React from "react";
import { DetailPesananTemplate, NavBarTemplate } from "../component/template";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idPesanan, refresh, dataRekamMedisPesanan, urlBase } from "../store";

function DetailPesananPage() {
  const [dataDetailPesanan, setDataDetailPesanan] = React.useState({
    dataPesanan: {},
    dataPasien: {},
    dataNakes: {},
  });
  const [dataPegawai, setDataPegawai] = React.useState([]);
  const [id_pesanan, setId_pesanan] = useRecoilState(idPesanan);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getDataRekamMedisPesanan, setDataRekamMedisPesanan] = useRecoilState(
    dataRekamMedisPesanan
  );
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);

  const style = {
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

  React.useEffect(() => {
    async function fetchDataPegawai() {
      const request = await axios
        .get(getUrlBase + "pegawai/all", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataPegawai(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    async function fetchDataPesanan() {
      const request = await axios
        .get(getUrlBase + "pesanan/" + id_pesanan, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataDetailPesanan(res.data.result);
          setDataRekamMedisPesanan(res.data.result);
          fetchDataPegawai();
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataPesanan();
  }, [getRefresh]);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate styles={style} />
      <DetailPesananTemplate
        data={dataDetailPesanan}
        dataPegawai={dataPegawai}
      />
    </div>
  );
}

export default DetailPesananPage;
