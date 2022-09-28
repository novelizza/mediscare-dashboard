import React from "react";
import moment from "moment";
import {
  activePage,
  idPesanan,
  dataRekamMedisPesanan,
  urlBase,
} from "../../store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ItemListPesananOrganism(props) {
  const navigate = useNavigate();

  const [id_pesanan, setId_pesanan] = useRecoilState(idPesanan);
  const [page, setPage] = useRecoilState(activePage);
  const [getDataRekamMedisPesanan, setDataRekamMedisPesanan] = useRecoilState(
    dataRekamMedisPesanan
  );
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);
  const [where, setWhere] = React.useState(false);

  const date = props.dataPesanan.createdAt;
  var now = moment.utc(date, "YYYY-MM-DDTHH:mm:ssZ").format("DD-MM-YYYY");

  async function fetchDataPesanan(id) {
    const request = await axios
      .get(getUrlBase + "pesanan/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          session: localStorage.getItem("session"),
        },
      })
      .then((res) => {
        setDataRekamMedisPesanan({
          dataPasien: res.data.result.dataPasien,
          dataPesanan: res.data.result.dataPesanan,
        });
        navigate("/detailrekammedis");
      })
      .catch((er) => console.log("Error: ", er));
    return request;
  }

  React.useEffect(() => {
    if (page === "Pesanan") {
      setWhere(false);
    } else {
      setWhere(true);
    }
  }, [page]);

  return (
    <button
      className={"flex flex-row"}
      onClick={() => {
        setId_pesanan(props.dataPesanan.id_pesanan);
        if (page === "Pesanan") {
          setPage("Detail Pesanan");
          navigate("/detailpesanan");
        } else {
          setPage("Detail Rekam Medis");
          fetchDataPesanan(props.dataPesanan.id_pesanan);
        }
      }}
      disabled={
        (props.dataPesanan.status_pesanan === "Menunggu" ||
          props.dataPesanan.status_pesanan === "Batal") &&
        where
          ? true
          : false
      }
    >
      <div className="flex w-10 pl-1">
        <span>{props.index + 1}</span>
      </div>
      <div className="flex w-1/6">
        <span>{props.dataPesanan.jenis_luka}</span>
      </div>
      <div className="flex w-1/6">
        <span>{props.dataPesanan.status_pesanan}</span>
      </div>
      <div className="flex w-1/6">
        <span>{now}</span>
      </div>
      <div className="flex w-1/12">
        <span>{props.dataPesanan.jam}</span>
      </div>
      <div className="flex w-5/12 text-left">
        <span>
          {props.dataPesanan.note.length > 50
            ? props.dataPesanan.note.slice(0, 50) + "..."
            : props.dataPesanan.note}
        </span>
      </div>
    </button>
  );
}

export default ItemListPesananOrganism;
