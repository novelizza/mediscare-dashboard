import React from "react";
import { useNavigate } from "react-router-dom";
import { activePage, idPasien } from "../../store";
import { useRecoilState } from "recoil";

function ItemListPasienOrganism(props) {
  const navigate = useNavigate();

  const [page, setPage] = useRecoilState(activePage);
  const [getIdPasien, setIdPasien] = useRecoilState(idPasien);

  return (
    <button
      className={"flex flex-row items-center"}
      onClick={() => {
        page === "Pasien"
          ? setPage("Detail Pasien")
          : setPage("Rekam Medis Pasien");
        setIdPasien(props.dataPasien.id_pasien);
        page === "Pasien"
          ? navigate("/detailpasien")
          : navigate("/rekammedispasien");
      }}
    >
      <div className="flex w-10 pl-1">
        <span>{props.index + 1}</span>
      </div>
      <div className="flex w-1/4 text-left">
        <span>{props.dataPasien.nama}</span>
      </div>
      <div className="flex w-1/12">
        <span>{props.dataPasien.no_rm}</span>
      </div>
      <div className="flex w-1/12">
        <span>{props.dataPasien.jenis_kelamin ? "Pria" : "Wanita"}</span>
      </div>
      <div className="flex w-1/3 text-left">
        <span>
          {props.dataPasien.alamat.length > 40
            ? props.dataPasien.alamat.slice(0, 40) + "..."
            : props.dataPasien.alamat}
        </span>
      </div>
      <div className="flex w-1/6 text-left">
        <span>{props.dataPasien.nomor_tlp}</span>
      </div>
    </button>
  );
}

export default ItemListPasienOrganism;
