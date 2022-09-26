import React from "react";
import { useNavigate } from "react-router-dom";
import { activePage, idProfesi } from "../../store";
import { useRecoilState } from "recoil";

function ItemListProfesiOrganism(props) {
  const navigate = useNavigate();

  const [page, setPage] = useRecoilState(activePage);
  const [id_profesi, setId_profesi] = useRecoilState(idProfesi);

  return (
    <button
      className={"flex flex-row items-center"}
      onClick={() => {
        navigate("/detailprofesi");
        setPage("Detail Profesi");
        setId_profesi(props.dataProfesi.id_kerjaan);
      }}
    >
      <div className="flex w-10 pl-1">
        <span>{props.index + 1}</span>
      </div>
      <div className="flex w-1/6 text-left">
        <span>{props.dataProfesi.nama}</span>
      </div>
      <div className="flex w-1/6  text-left">
        <span>{props.dataProfesi.ruang}</span>
      </div>
    </button>
  );
}

export default ItemListProfesiOrganism;
