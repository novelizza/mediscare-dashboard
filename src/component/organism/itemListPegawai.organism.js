import React from "react";
import { useNavigate } from "react-router-dom";
import { activePage, idPegawai } from "../../store";
import { useRecoilState } from "recoil";

function ItemListPegawaiOrganism(props) {
  const navigate = useNavigate();

  const [page, setPage] = useRecoilState(activePage);
  const [id_pegawai, setId_pegawai] = useRecoilState(idPegawai);

  return (
    <button
      className={"flex flex-row items-center"}
      onClick={() => {
        setPage("Detail Pegawai");
        setId_pegawai(props.dataPegawai.id_pegawai);
        navigate("/detailpegawai");
      }}
    >
      <div className="flex w-10 pl-1">
        <span>{props.index + 1}</span>
      </div>
      <div className="flex w-1/4 text-start">
        <span>
          {props.dataPegawai.nama_pegawai.length > 25
            ? props.dataPegawai.nama_pegawai.slice(0, 25) + "..."
            : props.dataPegawai.nama_pegawai}
        </span>
      </div>
      <div className="flex w-1/4 text-start">
        <span>
          {props.dataPegawai.alamat.length > 22
            ? props.dataPegawai.alamat.slice(0, 22) + "..."
            : props.dataPegawai.alamat}
        </span>
      </div>
      <div className="flex w-1/12">
        <span>{props.dataPegawai.jenis_kelamin ? "Pria" : "Wanita"}</span>
      </div>
      <div className="flex w-1/6">
        <span>{props.dataPegawai.nama_kerjaan}</span>
      </div>
      <div className="flex w-1/6">
        <span>{props.dataPegawai.ruang}</span>
      </div>
      <div className="flex w-1/6">
        <span>{props.dataPegawai.nomor_tlp}</span>
      </div>
    </button>
  );
}

export default ItemListPegawaiOrganism;
