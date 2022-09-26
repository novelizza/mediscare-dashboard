import React from "react";
import { useRecoilState } from "recoil";
import { activePage, refresh, dataRekamMedisPesanan } from "../../store";
import axios from "axios";
import moment from "moment";

function RujukanTemplate(props) {
  const [stateUbah, setStateUbah] = React.useState(false);
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getDataRekamMedisPesanan, setDataRekamMedisPesanan] = useRecoilState(
    dataRekamMedisPesanan
  );

  const [dataRujuk, setDataRujuk] = React.useState({
    nomor_rujukan: "",
    tindakan: "",
    alasan: "",
  });

  const onChanged = (type, value) => {
    setDataRujuk({
      ...dataRujuk,
      [type]: value,
    });
  };

  React.useEffect(() => {
    if (props.dataRujuk.dataRujuk[0] !== undefined) {
      setDataRujuk({
        nomor_rujukan: props.dataRujuk.dataRujuk[0].nomor_rujukan,
        tindakan: props.dataRujuk.dataRujuk[0].tindakan,
        alasan: props.dataRujuk.dataRujuk[0].alasan,
      });
      if (
        props.dataRujuk.dataRujuk[0].nomor_rujukan !== "" &&
        props.dataRujuk.dataRujuk[0].tindakan !== "" &&
        props.dataRujuk.dataRujuk[0].alasan !== ""
      ) {
        setStateUbah(true);
      }
    }
  }, [props.dataRujuk]);

  async function tambahRujukan() {
    const newData = new URLSearchParams();
    newData.append("nomor_rujukan", dataRujuk.nomor_rujukan);
    newData.append("tindakan", dataRujuk.tindakan);
    newData.append("alasan", dataRujuk.alasan);

    const request = await axios
      .put("http://localhost:4000/api/rujuk/" + props.id_pemeriksaan, newData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          session: localStorage.getItem("session"),
        },
      })
      .then((res) => {
        alert(res.data.result);
        setStateUbah(true);
        setRefresh(new Date());
      })
      .catch((er) => console.log("Error: ", er));
    return request;
  }
  return (
    <div className="flex flex-col w-screen h-screen py-5 px-5">
      <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
      <div className="flex flex-col w-full h-screen flex-wrap border text-THEME_COLOR border-THEME_COLOR mt-5 text-lg justify-between">
        <div className="flex flex-col w-full px-3">
          <span className="font-medium text-base">Nomor Rujukan</span>
          <input
            type="text"
            name="nomor_rujukan"
            value={
              dataRujuk.nomor_rujukan === null ? "" : dataRujuk.nomor_rujukan
            }
            onChange={(e) => onChanged("nomor_rujukan", e.target.value)}
            className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
            placeholder="Contoh: RJK/01/001/2022"
            readOnly={stateUbah}
          />
        </div>
        <div className="flex flex-col w-full px-3">
          <span className="font-medium text-base">Dokter</span>
          <span className="font-semibold text-2xl">
            {props.dataRujuk.dataPegawai === undefined
              ? ""
              : props.dataRujuk.dataPegawai.nama}
          </span>
        </div>
        <div className="flex flex-col w-full px-3">
          <span className="font-medium text-base">Data Pasien</span>
          <span className="font-semibold text-2xl">
            {getDataRekamMedisPesanan.dataPasien.nama},{" "}
            {moment
              .utc(getDataRekamMedisPesanan.dataPasien.tgl_lahir, "YYYY-MM-DD")
              .format("DD-MM-YYYY")}
            ,{" "}
            {getDataRekamMedisPesanan.dataPasien.jenis_kelamin
              ? "Pria"
              : "Wanita"}
            , {getDataRekamMedisPesanan.dataPasien.alamat},{" "}
            {getDataRekamMedisPesanan.dataPasien.pekerjaan}
          </span>
        </div>
        <div className="flex flex-col w-full px-3">
          <span className="font-medium text-base">Diagnosis</span>
          <span className="font-semibold text-2xl">{props.diagnosis}</span>
        </div>
        <div className="flex flex-col w-full h-1/4 px-3">
          <span className="font-medium text-base">
            Tindakan yang Telah Diberikan
          </span>
          <textarea
            className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
            rows="4"
            cols="45"
            value={dataRujuk.tindakan === null ? "" : dataRujuk.tindakan}
            onChange={(e) => onChanged("tindakan", e.target.value)}
            placeholder="Contoh: Jahit pada luka"
            readOnly={stateUbah}
          />
        </div>
        <div className="flex flex-col w-full h-1/4 px-3">
          <span className="font-medium text-base">Alasan Rujuk</span>
          <textarea
            className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
            rows="4"
            cols="45"
            value={dataRujuk.alasan === null ? "" : dataRujuk.alasan}
            onChange={(e) => onChanged("alasan", e.target.value)}
            placeholder="Contoh: Dibutuhkan alat yang lebih canggih"
            readOnly={stateUbah}
          />
        </div>

        <div className="w-full flex flex-row items-end justify-end">
          <div className="flex flex-row my-1 px-3 w-1/2 justify-between">
            <button
              disabled={!stateUbah || page === "Detail Rujukan" ? true : false}
              onClick={() => {
                setStateUbah(false);
              }}
              className={`w-1/2 font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
                !stateUbah || page === "Detail Rujukan"
                  ? "bg-gray-500"
                  : "bg-THEME_COLOR"
              }`}
            >
              Ubah
            </button>
            <button
              disabled={stateUbah || page === "Detail Rujukan" ? true : false}
              onClick={() => {
                tambahRujukan();
              }}
              className={`w-1/2 font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
                stateUbah || page === "Detail Rujukan"
                  ? "bg-gray-500"
                  : "bg-THEME_COLOR"
              }`}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RujukanTemplate;
