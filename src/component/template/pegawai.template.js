import React from "react";
import { useRecoilState } from "recoil";
import { activePage } from "../../store";
import axios from "axios";
import { ItemListPegawaiOrganism } from "../organism";
import { useNavigate } from "react-router-dom";

function PegawaiTemplate(props) {
  const navigate = useNavigate();

  const [page, setPage] = useRecoilState(activePage);
  const [dataCari, setDataCari] = React.useState("");
  const [hasilData, setHasilData] = React.useState([]);
  const [isSearch, setIsSearch] = React.useState(false);

  React.useEffect(() => {
    const delayRequest = setTimeout(() => {
      async function fetchDataPegawai() {
        const request = await axios
          .get("http://localhost:4000/api/pegawai/search/" + dataCari, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              session: localStorage.getItem("session"),
            },
          })
          .then((res) => {
            setHasilData(res.data.result);
          })
          .catch((er) => console.log("Error: ", er));
        return request;
      }
      if (dataCari !== "") {
        fetchDataPegawai();
        setIsSearch(true);
      } else {
        setDataCari("");
        setHasilData([]);
        setIsSearch(false);
      }
    }, 500);

    return () => clearTimeout(delayRequest);
  }, [dataCari]);

  return (
    <div className="flex flex-col w-full p-5 bg-GROUND_COLOR">
      <div className="flex flex-row justify-between">
        <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
        <div className="flex flex-row h-full w-fit">
          <button
            className={`${
              props.profesi === "Admin" ? "bg-THEME_COLOR" : "bg-gray-500"
            } text-GROUND_COLOR px-3 rounded-md mx-3`}
            disabled={props.profesi === "Admin" ? false : true}
            onClick={() => {
              setPage("Tambah Pegawai");
              navigate("/tambahpegawai");
            }}
          >
            Tambah Pegawai
          </button>
          <input
            type="text"
            name="Cari"
            className="w-80 px-2 bg-white border-slate-300 outline-THEME_COLOR border rounded shadow-sm"
            placeholder="Cari Pegawai disini"
            onChange={(e) => {
              setDataCari(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col border border-THEME_COLOR w-full h-full mt-2 text-lg">
        <div className="flex border-b border-THEME_COLOR py-1 h-10 items-center">
          <div className="w-10 pl-1">
            <span>No.</span>
          </div>
          <div className="w-1/4">
            <span>Nama</span>
          </div>
          <div className="w-1/4">
            <span>Alamat</span>
          </div>
          <div className="w-1/12">
            <span>Gender</span>
          </div>
          <div className="w-1/6">
            <span>Pekerjaan</span>
          </div>
          <div className="w-1/6">
            <span>Ruang</span>
          </div>
          <div className="w-1/6">
            <span>Nomor Telpon</span>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <ul className="flex flex-col w-full h-10">
            {!isSearch
              ? props.data.map((dataPegawai, index) => {
                  return (
                    <li
                      className={`flex flex-col w-full h-10 py-1 ${
                        index % 2 === 1 ? "bg-sky-100" : null
                      }`}
                      key={index}
                    >
                      <ItemListPegawaiOrganism
                        index={index}
                        dataPegawai={dataPegawai}
                      />
                    </li>
                  );
                })
              : hasilData.map((dataPegawai, index) => {
                  return (
                    <li
                      className={`flex flex-col w-full h-10 py-1 ${
                        index % 2 === 1 ? "bg-sky-100" : null
                      }`}
                    >
                      <ItemListPegawaiOrganism
                        key={index}
                        index={index}
                        dataPegawai={dataPegawai}
                      />
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PegawaiTemplate;
