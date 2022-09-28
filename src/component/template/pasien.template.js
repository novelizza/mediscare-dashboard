import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { activePage, urlBase } from "../../store";
import { ItemListPasienOrganism } from "../organism";

function PasienTemplate(props) {
  const [dataCari, setDataCari] = React.useState("");
  const [hasilData, setHasilData] = React.useState([]);
  const [page, setPage] = useRecoilState(activePage);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);
  const [isSearch, setIsSearch] = React.useState(false);

  React.useEffect(() => {
    const delayRequest = setTimeout(() => {
      const newData = new URLSearchParams();
      newData.append("nama", dataCari);
      async function fetchDataPasien() {
        const request = await axios
          .post(getUrlBase + "pasien/search", newData, {
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
        fetchDataPasien();
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
        <input
          type="text"
          name="Cari"
          className="w-1/3 px-2 bg-white border-slate-300 outline-THEME_COLOR border rounded shadow-sm"
          placeholder="Cari Pasien disini"
          onChange={(e) => {
            setDataCari(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col border border-THEME_COLOR w-full h-full mt-2 text-lg">
        <div className="flex border-b border-THEME_COLOR py-1 h-10 items-center">
          <div className="w-10 pl-1">
            <span>No.</span>
          </div>
          <div className="w-1/4">
            <span>Nama</span>
          </div>
          <div className="w-1/12">
            <span>No. RM</span>
          </div>
          <div className="w-1/12">
            <span>Gender</span>
          </div>
          <div className="w-1/3">
            <span>Alamat</span>
          </div>
          <div className="w-1/6">
            <span>Nomor Telpon</span>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <ul className="flex flex-col w-full h-10">
            {!isSearch
              ? props.data.map((dataPasien, index) => {
                  return (
                    <li
                      className={`flex flex-col w-full h-10 py-1 ${
                        index % 2 === 1 ? "bg-sky-100" : null
                      }`}
                      key={index}
                    >
                      <ItemListPasienOrganism
                        index={index}
                        dataPasien={dataPasien}
                      />
                    </li>
                  );
                })
              : hasilData.map((dataPasien, index) => {
                  return (
                    <li
                      className={`flex flex-col w-full h-10 py-1 ${
                        index % 2 === 1 ? "bg-sky-100" : null
                      }`}
                      key={index}
                    >
                      <ItemListPasienOrganism
                        index={index}
                        dataPasien={dataPasien}
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

export default PasienTemplate;
