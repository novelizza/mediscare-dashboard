import React from "react";
import { logoMitra } from "../../asset/image";
import axios from "axios";

const CetakRMTemplate = React.forwardRef((props, ref) => {
  const [dataResep, setDataResep] = React.useState([]);

  React.useEffect(() => {
    async function fetchDataPesanan() {
      const request = await axios
        .get("http://localhost:4000/api/resep/all/" + props.id.id_pemeriksaan, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          setDataResep(res.data.result);
          console.log(res.data.result);
        })
        .catch((er) => console.log("Error: ", er));
      return request;
    }
    fetchDataPesanan();
  }, [props.id.id_pemeriksaan]);

  return (
    <div ref={ref} className="flex flex-col w-screen h-screen p-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-4xl font-bold">Klinik Pratama Atallah</span>
          <span className="text-xl w-3/5">
            JL. Mayong Pancur Km 6 Desa Pancur Rt 02 Rw 01 Mayong Jepara
          </span>
        </div>
        <img src={logoMitra} alt="Logo" className="h-24 w-24" />
      </div>
      <div className="w-full h-px bg-black my-7" />
      <span className="text-4xl font-bold self-center mb-7">REKAM MEDIS</span>
      <table className="w-full h-fit mb-5">
        <tbody>
          <tr className="w-full">
            <td className="w-1/6 text-xl">Nama</td>
            <td className="w-1/4 text-xl">{props.data.dataPasien.nama}</td>
            <td className="w-1/4 text-xl">No. Rekam Medis</td>
            <td className="w-2/6 text-xl">{props.data.dataPasien.no_rm}</td>
          </tr>
          <tr className="w-full">
            <td className="w-1/6 text-xl">Jenis Kelamin</td>
            <td className="w-1/4 text-xl">
              {props.data.dataPasien.jenis_kelamin ? "Pria" : "Wanita"}
            </td>
            <td className="w-1/4 text-xl">Tanggal Pemeriksaan</td>
            <td className="w-2/6 text-xl">{props.tanggal.tgl_pesan}</td>
          </tr>
          <tr className="w-full">
            <td className="w-1/6 text-xl">Tanggal Lahir</td>
            <td className="w-1/4 text-xl">{props.tanggal.tgl_lahir}</td>
            <td className="w-1/4 text-xl">Nakes</td>
            <td className="w-2/6 text-xl">{props.data.dataNakes.nama}</td>
          </tr>
          <tr className="w-full">
            <td className="w-1/6 text-xl">Jenis Luka</td>
            <td className="w-1/4 text-xl">
              {props.data.dataPesanan.jenis_luka}
            </td>
            <td className="w-1/4 text-xl">Alamat</td>
            <td className="w-2/6 text-xl">{props.data.dataPasien.alamat}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full h-fit mb-5 table-fixed">
        <tbody>
          <tr className="w-full" style={{ border: "1px solid #000000" }}>
            <td className="p-1">Data Subjektif</td>
            <td className="p-1">{props.dataRM.ds}</td>
            <td className="p-1">Data Objektif</td>
            <td className="p-1">{props.dataRM.do}</td>
          </tr>
          <tr className="w-full" style={{ border: "1px solid #000000" }}>
            <td className="p-1">Tekanan Darah</td>
            <td className="p-1">{props.dataRM.tekananDarah}</td>
            <td className="p-1">Nadi</td>
            <td className="p-1">{props.dataRM.nadi}</td>
          </tr>
          <tr className="w-full" style={{ border: "1px solid #000000" }}>
            <td className="p-1">Suhu</td>
            <td className="p-1">{props.dataRM.suhu}</td>
            <td className="p-1">Respirasi Rate</td>
            <td className="p-1">{props.dataRM.rr}</td>
          </tr>
          <tr className="w-full" style={{ border: "1px solid #000000" }}>
            <td className="p-1">Saturasi</td>
            <td className="p-1">{props.dataRM.saturasi}</td>
            <td className="p-1">Berat</td>
            <td className="p-1">{props.dataRM.berat}</td>
          </tr>
          <tr className="w-full" style={{ border: "1px solid #000000" }}>
            <td className="p-1">Tinggi</td>
            <td className="p-1">{props.dataRM.tinggi}</td>
            <td className="p-1">Alergi</td>
            <td className="p-1">{props.dataRM.alergi}</td>
          </tr>
          <tr className="w-full" style={{ border: "1px solid #000000" }}>
            <td className="p-1">Pemeriksaan Fisik</td>
            <td className="p-1">{props.dataRM.pemeriksaanFisik}</td>
            <td className="p-1">Pemeriksaan Penunjang</td>
            <td className="p-1">{props.dataRM.pemeriksaanPenunjang}</td>
          </tr>
          <tr className="w-full" style={{ border: "1px solid #000000" }}>
            <td className="p-1">Diagnosis</td>
            <td className="p-1">{props.dataRM.diagnosis}</td>
            <td className="p-1">Rencana Tindakan</td>
            <td className="p-1">{props.dataRM.rencanaTindakan}</td>
          </tr>
        </tbody>
      </table>
      <span className="text-xl">Obat yang diberikan kepada pasien :</span>
      <div className="flex flex-col w-full my-3 mr-3 border-2 border-black h-full">
        <div className="flex flex-row">
          <div className="flex flex-col text-base border-b border-r border-black w-1/4 items-center">
            <span>Nama</span>
          </div>
          <div className="flex flex-col text-base border-b border-r border-black w-1/4 items-center">
            <span>Sediaan</span>
          </div>
          <div className="flex flex-col text-base border-b border-r border-black w-1/4 items-center">
            <span>Jumlah</span>
          </div>
          <div className="flex flex-col text-base border-b border-r border-black w-1/4 items-center">
            <span>Penggunaan</span>
          </div>
        </div>
        {dataResep.map((data, index) => (
          <div
            className={`flex flex-row ${index % 2 === 1 ? "bg-sky-50" : ""}`}
            key={index}
          >
            <div className="flex flex-col text-base w-1/4 items-center">
              <span>{data.nama}</span>
            </div>
            <div className="flex flex-col text-base w-1/4 items-center">
              <span>{data.sediaan_obat}</span>
            </div>
            <div className="flex flex-col text-base w-1/4 items-center">
              <span>{data.jumlah_obat}</span>
            </div>
            <div className="flex flex-col text-base w-1/4 items-center">
              <span>{data.cara_penggunaan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CetakRMTemplate;
