import React from "react";
import { DetailPegawaiTemplate, NavBarTemplate } from "../component/template";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idPegawai, refresh, activePage } from "../store";

function DetailPegawaiPage() {
  const [dataDetailPegawai, setDataDetailPegawai] = React.useState({
    listKerjaan: [],
  });
  const [id_pegawai, setId_pegawai] = useRecoilState(idPegawai);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [page, setPage] = useRecoilState(activePage);

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
    async function fetchDataPesanan(url) {
      const request = await axios
        .get(url, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          res.data.result.dataPegawai === undefined
            ? setDataDetailPegawai({
                listKerjaan: res.data.result,
              })
            : setDataDetailPegawai(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    if (page !== "Tambah Pegawai") {
      fetchDataPesanan("http://localhost:4000/api/pegawai/" + id_pegawai);
    } else {
      fetchDataPesanan("http://localhost:4000/api/kerjaan/all");
    }
  }, [getRefresh]);

  return (
    <div className="h-screen w-screen flex flex-row bg-GROUND_COLOR">
      <NavBarTemplate styles={style} />
      <DetailPegawaiTemplate data={dataDetailPegawai} />
    </div>
  );
}

export default DetailPegawaiPage;
