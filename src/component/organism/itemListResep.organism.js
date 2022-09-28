import React from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { refresh, urlBase } from "../../store";

function ItemListResep(props) {
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);

  async function hapusObat() {
    const request = await axios
      .delete(getUrlBase + "resep/" + props.data.id_resep, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          session: localStorage.getItem("session"),
        },
      })
      .then((res) => {
        alert(res.data.result);
        setRefresh(new Date());
      })
      .catch((er) => console.log("Error: ", er));
    return request;
  }

  return (
    <div
      className={`flex flex-row ${props.index % 2 === 1 ? "bg-sky-100" : ""}`}
    >
      <div className="flex flex-col text-THEME_COLOR font-semibold text-base w-1/5 items-center">
        <span>{props.data.nama}</span>
      </div>
      <div className="flex flex-col text-THEME_COLOR font-semibold text-base w-1/5 items-center">
        <span>{props.data.sediaan_obat}</span>
      </div>
      <div className="flex flex-col text-THEME_COLOR font-semibold text-base w-1/5 items-center">
        <span>{props.data.jumlah_obat}</span>
      </div>
      <div className="flex flex-col text-THEME_COLOR font-semibold text-base w-1/5 items-center">
        <span>{props.data.cara_penggunaan}</span>
      </div>
      <div className="flex flex-col text-GROUND_COLOR text-sm text-base w-1/5 items-center justify-center">
        <button
          className={`${
            props.page === "Detail Resep" ? "bg-gray-500" : "bg-THEME_COLOR"
          } w-11/12 rounded-sm`}
          onClick={() => {
            hapusObat();
          }}
          disabled={props.page === "Detail Resep" ? true : false}
        >
          hapus
        </button>
      </div>
    </div>
  );
}

export default ItemListResep;
