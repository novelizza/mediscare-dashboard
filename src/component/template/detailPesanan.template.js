import React from "react";
import { useRecoilState } from "recoil";
import { activePage, refresh } from "../../store";
import moment from "moment";
import WhatsappFillIcon from "remixicon-react/WhatsappFillIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DetailPesananTemplate(props) {
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    id_pegawai: "",
    jam: "",
  });
  const [pembayaran, setPembayaran] = React.useState("-");
  const [stateUbah, setStateUbah] = React.useState("Menunggu");
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);

  const date = props.data.dataPesanan.createdAt;
  var now = moment.utc(date, "YYYY-MM-DDTHH:mm:ssZ").format("DD-MM-YYYY");
  const jam = [
    "07.00",
    "08.00",
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
    "16.00",
    "17.00",
    "18.00",
    "19.00",
    "20.00",
    "21.00",
  ];

  const onChange = (type, value) => {
    setData({
      ...data,
      [type]: value,
    });
  };

  async function penjadwalan() {
    const newData = new URLSearchParams();
    newData.append("id_pegawai", data.id_pegawai);
    newData.append("jam", data.jam);
    newData.append("status_pesanan", "Terjadwalkan");
    const request = await axios
      .put(
        "http://localhost:4000/api/pesanan/" +
          props.data.dataPesanan.id_pesanan,
        newData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        }
      )
      .then((res) => {
        alert(res.data.result);
        setRefresh(new Date());
      })
      .catch((er) => {
        alert(er.response.data.result);
        console.log("Error: ", er);
      });
    return request;
  }

  async function pembatalanSelesai(state) {
    const stateBatal = new URLSearchParams();
    stateBatal.append("status_pesanan", state);
    if (state === "Selesai") {
      stateBatal.append("status_pembayaran", pembayaran);
    }
    const request = await axios
      .put(
        "http://localhost:4000/api/pesanan/batalselesai/" +
          props.data.dataPesanan.id_pesanan,
        stateBatal,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        }
      )
      .then((res) => {
        alert(res.data.result);
        setRefresh(new Date());
      })
      .catch((er) => console.log("Error: ", er));
    return request;
  }

  React.useEffect(() => {
    setStateUbah(props.data.dataPesanan.status_pesanan);
    if (
      props.data.dataPesanan.status_pesanan !== "Menunggu" &&
      props.data.dataPesanan.status_pesanan !== undefined
    ) {
      setData({
        ["id_pegawai"]:
          props.data.dataNakes === undefined
            ? "-"
            : props.data.dataNakes.id_pegawai,
        ["jam"]: props.data.dataPesanan.jam,
      });
    }
  }, [props.data.dataPesanan.status_pesanan]);

  return (
    <div className="flex flex-col w-screen h-screen pt-5 px-5 pb-20">
      <div className="flex flex-row justify-between">
        <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
        <button
          className={`${
            stateUbah === "Selesai" ? "bg-THEME_COLOR" : "bg-gray-500"
          } h-full text-GROUND_COLOR px-3 rounded-md`}
          disabled={stateUbah === "Selesai" ? false : true}
          onClick={() => {
            setPage("Masukkan Rekam Medis");
            navigate("/masukanrekammedis");
          }}
        >
          Masukan Rekam Medis
        </button>
      </div>
      <div className="flex flex-col flex-wrap border border-THEME_COLOR mt-5 w-full h-full text-lg justify-between">
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Tanggal Pesan</span>
          <span className="font-semibold text-2xl">{now}</span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Nomor RM</span>
          <span className="font-semibold text-2xl">
            {props.data.dataPasien.no_rm}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Nama Pasien</span>
          <span className="font-semibold text-2xl">
            {props.data.dataPasien.nama}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Jenis Kelamin</span>
          <span className="font-semibold text-2xl">
            {props.data.dataPasien.jenis_kelamin ? "Pria" : "Wanita"}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Golongan Darah</span>
          <span className="font-semibold text-2xl">
            {props.data.dataPasien.golongan_darah}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Alamat</span>
          <span className="font-semibold text-2xl">
            {props.data.dataPasien.alamat}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Jenis Luka</span>
          <span className="font-semibold text-2xl">
            {props.data.dataPesanan.jenis_luka}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Status Pesanan</span>
          <span className="font-semibold text-2xl">
            {props.data.dataPesanan.status_pesanan === "Batal"
              ? props.data.dataPesanan.note_batal === "" ||
                props.data.dataPesanan.note_batal === null ||
                props.data.dataPesanan.note_batal === undefined
                ? props.data.dataPesanan.status_pesanan
                : props.data.dataPesanan.status_pesanan +
                  " Karena " +
                  (props.data.dataPesanan.note_batal.length > 30
                    ? props.data.dataPesanan.note_batal.slice(0, 30) + "..."
                    : props.data.dataPesanan.note_batal)
              : props.data.dataPesanan.status_pesanan}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1.5 px-3 w-1/2">
          <span className="font-medium text-base">Nakes Yang Menangani</span>
          {stateUbah === "Menunggu" &&
          props.dataPegawai.dataAllPegawai !== undefined ? (
            <select
              className="font-light text-lg rounded-lg bg-THEME_COLOR text-GROUND_COLOR py-2"
              onChange={(e) => onChange("id_pegawai", e.target.value)}
              value={data.id_pegawai === "" ? "none" : data.id_pegawai}
            >
              <option value="none" disabled hidden>
                Pilih Nakes
              </option>
              {props.dataPegawai.dataAllPegawai.map((data, index) => (
                <option key={index} value={data.id_pegawai}>
                  {data.nama_pegawai}
                </option>
              ))}
            </select>
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataNakes === undefined
                ? "-"
                : props.data.dataNakes.nama}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1.5 px-3 w-1/2">
          <span className="font-medium text-base">Alokasi Jam</span>
          {stateUbah === "Menunggu" ? (
            <select
              className="font-light text-lg rounded-lg bg-THEME_COLOR text-GROUND_COLOR py-2"
              onChange={(e) => onChange("jam", e.target.value)}
              value={data.jam === "" ? "none" : data.jam}
            >
              <option value="none" disabled hidden>
                Pilih Jam Tindakan
              </option>
              {jam.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataNakes === undefined
                ? "-"
                : props.data.dataPesanan.jam}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Status Pembayaran</span>
          {stateUbah === "Terjadwalkan" ? (
            <select
              className="font-light text-lg rounded-lg bg-THEME_COLOR text-GROUND_COLOR py-2"
              onChange={(e) => setPembayaran(e.target.value)}
              value={pembayaran === "-" ? "none" : pembayaran}
            >
              <option value="none" disabled hidden>
                Pilih Pembayaran
              </option>
              <option value={"BPJS"}>BPJS</option>
              <option value={"Lunas"}>Lunas</option>
            </select>
          ) : (
            <span className="font-medium text-2xl">
              {props.data.dataPesanan.status_pembayaran === null
                ? "-"
                : props.data.dataPesanan.status_pembayaran}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Nomor Hp</span>
          <div className="flex justify-between">
            <span className="font-semibold text-2xl">
              {props.data.dataPasien.nomor_tlp}
            </span>
            <button
              onClick={() => {
                window.open(
                  "https://wa.me/" + props.data.dataPasien.nomor_tlp,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <WhatsappFillIcon />
            </button>
          </div>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Lokasi Pasien</span>
          <button
            onClick={() => {
              var latlong = "";
              props.data.dataPesanan.lokasi !== undefined
                ? (latlong = props.data.dataPesanan.lokasi.split(","))
                : (latlong = "-6.694278,110.762211");
              window.open(
                "https://www.google.com/maps/search/?api=1&query=" +
                  latlong[0] +
                  "," +
                  latlong[1],
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="font-light text-xl rounded-lg bg-THEME_COLOR text-GROUND_COLOR py-1"
          >
            Buka Lokasi Pasien
          </button>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Catatan</span>
          <textarea
            className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR p-2 rounded-lg"
            rows="6"
            cols="50"
            readOnly={true}
            value={
              props.data.dataPesanan.note === null
                ? "-"
                : props.data.dataPesanan.note
            }
          />
        </div>
        <div className="flex flex-row text-THEME_COLOR my-2 px-3 w-1/2 justify-between">
          <button
            disabled={
              props.data.dataPesanan.status_pesanan === "Terjadwalkan" ||
              props.data.dataPesanan.status_pesanan === "Menunggu"
                ? false
                : true
            }
            onClick={() => {
              pembatalanSelesai("Batal");
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              props.data.dataPesanan.status_pesanan === "Terjadwalkan" ||
              props.data.dataPesanan.status_pesanan === "Menunggu"
                ? "bg-rose-500"
                : "bg-gray-500"
            }`}
          >
            Batalkan
          </button>
          <button
            disabled={stateUbah === "Terjadwalkan" ? false : true}
            onClick={() => {
              setStateUbah("Menunggu");
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              stateUbah === "Terjadwalkan" ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            Ubah
          </button>
          <button
            disabled={stateUbah === "Menunggu" ? false : true}
            onClick={() => {
              penjadwalan();
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              stateUbah === "Menunggu" ? "bg-THEME_COLOR" : "bg-gray-500"
            }`}
          >
            Jadwalkan
          </button>
          <button
            disabled={stateUbah === "Terjadwalkan" ? false : true}
            onClick={() => {
              pembatalanSelesai("Selesai");
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              stateUbah === "Terjadwalkan" ? "bg-THEME_COLOR" : "bg-gray-500"
            }`}
          >
            Selesaikan
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPesananTemplate;
