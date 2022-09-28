import React from "react";
import { useRecoilState } from "recoil";
import {
  activePage,
  dataRekamMedisPesanan,
  refresh,
  dataRekamMedis,
  urlBase,
} from "../../store";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import CetakRMTemplate from "./cetakRM.template";

function MasukanRekamMedisTemplate(props) {
  const componentRef = React.useRef();
  const navigate = useNavigate();

  const [stateUbah, setStateUbah] = React.useState(false);
  const [tgl, setTgl] = React.useState({
    tgl_lahir: "21-09-2001",
    tgl_pesan: "01-01-2001",
  });
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);
  const [getDataRekamMedisPesanan, setDataRekamMedisPesanan] = useRecoilState(
    dataRekamMedisPesanan
  );
  const [getDataRekamMedis, setDataRekamMedis] = useRecoilState(dataRekamMedis);
  const [dataPemeriksaan, setDataPemeriksaan] = React.useState({
    ds: "",
    do: "",
    tekananDarah: "",
    nadi: "",
    suhu: "",
    rr: "",
    saturasi: "",
    berat: "",
    tinggi: "",
    alergi: "",
    pemeriksaanFisik: "",
    pemeriksaanPenunjang: "",
    diagnosis: "",
    rencanaTindakan: "",
    obat: false,
    rujuk: false,
  });

  const onChanged = (type, value) => {
    setDataPemeriksaan({
      ...dataPemeriksaan,
      [type]: value,
    });
  };

  React.useEffect(() => {
    const tgl_lahir = moment
      .utc(getDataRekamMedisPesanan.dataPasien.tgl_lahir, "YYYY-MM-DD")
      .format("DD-MM-YYYY");
    const tgl_pesan = moment
      .utc(
        getDataRekamMedisPesanan.dataPesanan.createdAt,
        "YYYY-MM-DDTHH:mm:ssZ"
      )
      .format("DD-MM-YYYY");
    setTgl({
      ...tgl,
      ["tgl_lahir"]: tgl_lahir,
      ["tgl_pesan"]: tgl_pesan,
    });

    if (
      props.dataPemeriksaan.data_objektif !== undefined &&
      props.dataPemeriksaan.data_objektif !== null &&
      props.dataPemeriksaan.data_subjektif !== undefined &&
      props.dataPemeriksaan.data_subjektif !== null &&
      props.dataPemeriksaan.diagnosis !== undefined &&
      props.dataPemeriksaan.diagnosis !== null &&
      props.dataPemeriksaan.nadi !== undefined &&
      props.dataPemeriksaan.nadi !== null &&
      props.dataPemeriksaan.obat !== undefined &&
      props.dataPemeriksaan.obat !== null &&
      props.dataPemeriksaan.rujuk !== undefined &&
      props.dataPemeriksaan.rujuk !== null &&
      props.dataPemeriksaan.pemeriksaan_fisik !== undefined &&
      props.dataPemeriksaan.pemeriksaan_fisik !== null &&
      props.dataPemeriksaan.pemeriksaan_penunjang !== undefined &&
      props.dataPemeriksaan.pemeriksaan_penunjang !== null &&
      props.dataPemeriksaan.rencana_tindakan !== undefined &&
      props.dataPemeriksaan.rencana_tindakan !== null &&
      props.dataPemeriksaan.respirasi_rate !== undefined &&
      props.dataPemeriksaan.respirasi_rate !== null &&
      props.dataPemeriksaan.saturasi !== undefined &&
      props.dataPemeriksaan.saturasi !== null &&
      props.dataPemeriksaan.suhu !== undefined &&
      props.dataPemeriksaan.suhu !== null &&
      props.dataPemeriksaan.tekanan_darah !== undefined &&
      props.dataPemeriksaan.tekanan_darah !== null &&
      props.dataPemeriksaan.berat !== undefined &&
      props.dataPemeriksaan.berat !== null &&
      props.dataPemeriksaan.alergi !== undefined &&
      props.dataPemeriksaan.alergi !== null &&
      props.dataPemeriksaan.tinggi !== undefined &&
      props.dataPemeriksaan.tinggi !== null
    ) {
      setDataPemeriksaan({
        ds: props.dataPemeriksaan.data_subjektif,
        do: props.dataPemeriksaan.data_objektif,
        tekananDarah: props.dataPemeriksaan.tekanan_darah,
        nadi: props.dataPemeriksaan.nadi,
        suhu: props.dataPemeriksaan.suhu,
        rr: props.dataPemeriksaan.respirasi_rate,
        saturasi: props.dataPemeriksaan.saturasi,
        berat: props.dataPemeriksaan.berat,
        tinggi: props.dataPemeriksaan.tinggi,
        alergi: props.dataPemeriksaan.alergi,
        pemeriksaanFisik: props.dataPemeriksaan.pemeriksaan_fisik,
        pemeriksaanPenunjang: props.dataPemeriksaan.pemeriksaan_penunjang,
        diagnosis: props.dataPemeriksaan.diagnosis,
        rencanaTindakan: props.dataPemeriksaan.rencana_tindakan,
        obat: props.dataPemeriksaan.obat,
        rujuk: props.dataPemeriksaan.rujuk,
      });
      setStateUbah(true);
    } else if (page === "Detail Rekam Medis") {
      setStateUbah(true);
    }
  }, [getDataRekamMedisPesanan, props.dataPemeriksaan]);

  async function tambahRekamMedis() {
    const newData = new URLSearchParams();
    newData.append("data_objektif", dataPemeriksaan.do);
    newData.append("data_subjektif", dataPemeriksaan.ds);
    newData.append("diagnosis", dataPemeriksaan.diagnosis);
    newData.append("nadi", dataPemeriksaan.nadi);
    newData.append("obat", dataPemeriksaan.obat);
    newData.append("rujuk", dataPemeriksaan.rujuk);
    newData.append("pemeriksaan_fisik", dataPemeriksaan.pemeriksaanFisik);
    newData.append(
      "pemeriksaan_penunjang",
      dataPemeriksaan.pemeriksaanPenunjang
    );
    newData.append("rencana_tindakan", dataPemeriksaan.rencanaTindakan);
    newData.append("respirasi_rate", dataPemeriksaan.rr);
    newData.append("saturasi", dataPemeriksaan.saturasi);
    newData.append("suhu", dataPemeriksaan.suhu);
    newData.append("tekanan_darah", dataPemeriksaan.tekananDarah);
    newData.append("tinggi", dataPemeriksaan.tinggi);
    newData.append("berat", dataPemeriksaan.berat);
    newData.append("alergi", dataPemeriksaan.alergi);

    const request = await axios
      .put(getUrlBase + "pemeriksaan/" + props.id_pesanan, newData, {
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

  //anamnese nama, tgl lahir, suku, alamat, pendidikan, pekerjaan, tgl_pemesanan, nama penanggung jawab
  //pengkajian terdiri dari data subjektif dan data objektif, data subjektif disingkat ds (keluhan yg dirasakan pasien(pasien mengakatan nyeri di perut)) data objektif / do (skala nyeri berapa/apa yang di lihat perawat)
  //ttv terdiri dari tekanan darah, nadi, rr, suhu, spo2/saturasi, bb, tb
  //riwayat kesehatan
  //pemeriksaan fisik, pemeriksaan headtotoe, pemeriksaan penunjang
  //analisa data diambil dari data fokus/ data subjektif
  //diagnosa
  //interfensi / tindakan yang harus dilakukan apa
  //implementasi seperti edukasi keluarga / mencatat tiap melakukan tindakan
  //evaluasi setiap selesai melakukan implementasi

  return (
    <div className="flex flex-col w-screen h-screen pt-5 px-5 pb-20">
      <div className="flex flex-row justify-between">
        <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
        <div className="flex flex-row w-1/2 justify-between">
          <ReactToPrint
            trigger={() => (
              <button
                className={`${
                  !stateUbah ? "bg-gray-500" : "bg-THEME_COLOR"
                } h-full w-1/2 ml-3 text-GROUND_COLOR rounded`}
                disabled={stateUbah ? false : true}
              >
                Cetak Rekam Medis
              </button>
            )}
            content={() => componentRef.current}
          />
          <button
            className={`${
              stateUbah && dataPemeriksaan.obat
                ? "bg-THEME_COLOR"
                : "bg-gray-500"
            } h-full w-1/2 ml-3 text-GROUND_COLOR rounded`}
            disabled={stateUbah && dataPemeriksaan.obat ? false : true}
            onClick={() => {
              setDataRekamMedis(props.dataPemeriksaan);
              setPage(
                page === "Detail Rekam Medis" ? "Detail Resep" : "Tambah Resep"
              );
              navigate("/resep");
            }}
          >
            {page === "Detail Rekam Medis" ? "Lihat Resep" : "Tambah Resep"}
          </button>
          <button
            className={`${
              stateUbah && dataPemeriksaan.rujuk
                ? "bg-THEME_COLOR"
                : "bg-gray-500"
            } h-full w-1/2 ml-3 text-GROUND_COLOR rounded`}
            disabled={stateUbah && dataPemeriksaan.rujuk ? false : true}
            onClick={() => {
              setDataRekamMedis(props.dataPemeriksaan);
              setPage(
                page === "Detail Rekam Medis"
                  ? "Detail Rujukan"
                  : "Tambah Rujukan"
              );
              navigate("/rujukan");
            }}
          >
            {page === "Detail Rekam Medis" ? "Lihat Rujukan" : "Tambah Rujukan"}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-wrap border border-THEME_COLOR mt-5 w-full h-full text-lg justify-between">
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Anamnesis</span>
          <span className="font-semibold text-2xl">
            {tgl.tgl_pesan}, {getDataRekamMedisPesanan.dataPesanan.jenis_luka},{" "}
            {getDataRekamMedisPesanan.dataPasien.nama}, {tgl.tgl_lahir},{" "}
            {getDataRekamMedisPesanan.dataPasien.jenis_kelamin
              ? "Pria"
              : "Wanita"}
            , {getDataRekamMedisPesanan.dataPasien.alamat},{" "}
            {getDataRekamMedisPesanan.dataPasien.pekerjaan}
          </span>
        </div>
        <div className="flex flex-row text-THEME_COLOR my-2 px-3 w-1/2 justify-between">
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Data Subjektif</span>
            <textarea
              className="font-normal text-xl w-11/12 resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
              rows="3"
              cols="25"
              value={dataPemeriksaan.ds}
              onChange={(e) => onChanged("ds", e.target.value)}
              placeholder="Contoh: Nyeri dibagian genetalia"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Data Objektif</span>
            <textarea
              className="font-normal text-xl w-11/12 resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
              rows="3"
              cols="25"
              value={dataPemeriksaan.do}
              onChange={(e) => onChanged("do", e.target.value)}
              placeholder="Contoh: Skala Nyeri 7"
              readOnly={stateUbah}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap text-THEME_COLOR my-2 px-3 w-1/2 items-center">
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Tekanan Darah</span>
            <input
              type="text"
              name="TekananDarah"
              value={dataPemeriksaan.tekananDarah}
              onChange={(e) => onChanged("tekananDarah", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: 80/100"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Nadi</span>
            <input
              type="text"
              name="Nadi"
              value={dataPemeriksaan.nadi}
              onChange={(e) => onChanged("nadi", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: 70"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Suhu</span>
            <input
              type="text"
              name="Suhu"
              value={dataPemeriksaan.suhu}
              onChange={(e) => onChanged("suhu", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: 36.6"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Respirasi Rate</span>
            <input
              type="text"
              name="RespirasiRate"
              value={dataPemeriksaan.rr}
              onChange={(e) => onChanged("rr", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: 20"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Saturasi</span>
            <input
              type="text"
              name="Saturasi"
              value={dataPemeriksaan.saturasi}
              onChange={(e) => onChanged("saturasi", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: 95"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Berat</span>
            <input
              type="text"
              name="Berat"
              value={dataPemeriksaan.berat}
              onChange={(e) => onChanged("berat", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: 60"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Tinggi</span>
            <input
              type="text"
              name="Tinggi"
              value={dataPemeriksaan.tinggi}
              onChange={(e) => onChanged("tinggi", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: 170"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <span className="font-medium text-base">Alergi</span>
            <input
              type="text"
              name="Alergi"
              value={dataPemeriksaan.alergi}
              onChange={(e) => onChanged("alergi", e.target.value)}
              className="bg-THEME_COLOR rounded-md w-11/12 h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-1"
              placeholder="Contoh: Antibiotik"
              readOnly={stateUbah}
            />
          </div>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Pemeriksaan Fisik</span>
          <textarea
            className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
            rows="3"
            cols="45"
            value={dataPemeriksaan.pemeriksaanFisik}
            onChange={(e) => onChanged("pemeriksaanFisik", e.target.value)}
            placeholder="Contoh: Bernanah pada Sekitar Luka"
            readOnly={stateUbah}
          />
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Pemeriksaan Penunjang</span>
          <textarea
            className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
            rows="3"
            cols="45"
            value={dataPemeriksaan.pemeriksaanPenunjang}
            onChange={(e) => onChanged("pemeriksaanPenunjang", e.target.value)}
            placeholder="Contoh: Kolesterol 180, Gula 220"
            readOnly={stateUbah}
          />
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Diagnosis</span>
          <textarea
            className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
            rows="3"
            cols="45"
            value={dataPemeriksaan.diagnosis}
            onChange={(e) => onChanged("diagnosis", e.target.value)}
            placeholder="Contoh: Indikasi Diabetes Melitus"
            readOnly={stateUbah}
          />
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2 px-3 w-1/2">
          <span className="font-medium text-base">Rencana Tindakan</span>
          <textarea
            className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
            rows="3"
            cols="45"
            value={dataPemeriksaan.rencanaTindakan}
            onChange={(e) => onChanged("rencanaTindakan", e.target.value)}
            placeholder="Contoh: Diberikan Insulin 5 Unit"
            readOnly={stateUbah}
          />
        </div>
        <div className="flex flex-row flex-wrap text-THEME_COLOR my-2 px-3 w-1/2 justify-around">
          <div className="flex flex-col bg-THEME_COLOR text-GROUND_COLOR rounded-md my-2 px-3 w-1/3 items-center">
            <span className="font-medium text-base">Obat</span>
            <div className="flex flex-row justify-between w-full">
              <div>
                <input
                  type="radio"
                  value={true}
                  name="obat"
                  checked={dataPemeriksaan.obat}
                  onChange={(e) => {
                    if (!stateUbah) {
                      onChanged("obat", true);
                    }
                  }}
                />
                <span className="mx-1">Ya</span>
              </div>
              <div>
                <input
                  type="radio"
                  value={false}
                  name="obat"
                  checked={!dataPemeriksaan.obat}
                  onChange={(e) => {
                    if (!stateUbah) {
                      onChanged("obat", false);
                    }
                  }}
                />
                <span className="mx-1">Tidak</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-THEME_COLOR text-GROUND_COLOR rounded-md my-2 px-3 w-1/3 items-center">
            <span className="font-medium text-base">Rujuk</span>
            <div className="flex flex-row justify-between w-full">
              <div>
                <input
                  type="radio"
                  value={true}
                  name="rujuk"
                  checked={dataPemeriksaan.rujuk}
                  onChange={(e) => {
                    if (!stateUbah) {
                      onChanged("rujuk", true);
                    }
                  }}
                />
                <span className="mx-1">Ya</span>
              </div>
              <div>
                <input
                  type="radio"
                  value={false}
                  name="rujuk"
                  checked={!dataPemeriksaan.rujuk}
                  onChange={(e) => {
                    if (!stateUbah) {
                      onChanged("rujuk", false);
                    }
                  }}
                />
                <span className="mx-1">Tidak</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row text-THEME_COLOR my-2 px-3 w-1/2 justify-between">
          <button
            disabled={
              !stateUbah || page === "Detail Rekam Medis" ? true : false
            }
            onClick={() => {
              setStateUbah(false);
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              !stateUbah || page === "Detail Rekam Medis"
                ? "bg-gray-500"
                : "bg-THEME_COLOR"
            }`}
          >
            Ubah
          </button>
          <button
            disabled={stateUbah || page === "Detail Rekam Medis" ? true : false}
            onClick={() => {
              tambahRekamMedis();
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              stateUbah || page === "Detail Rekam Medis"
                ? "bg-gray-500"
                : "bg-THEME_COLOR"
            }`}
          >
            Simpan
          </button>
        </div>
      </div>
      <div className="hidden">
        <CetakRMTemplate
          ref={componentRef}
          dataRM={dataPemeriksaan}
          data={getDataRekamMedisPesanan}
          tanggal={tgl}
          id={props.dataPemeriksaan}
        />
      </div>
    </div>
  );
}

export default MasukanRekamMedisTemplate;
