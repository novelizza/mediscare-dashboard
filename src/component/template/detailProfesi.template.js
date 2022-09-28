import React from "react";
import { useRecoilState } from "recoil";
import { activePage, refresh, idProfesi, urlBase } from "../../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DetailProfesiTemplate(props) {
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    nama: "",
    ruang: "",
  });
  const [stateUbah, setStateUbah] = React.useState(false);
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [id_profesi, setId_profesi] = useRecoilState(idProfesi);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);

  const onChange = (type, value) => {
    setData({
      ...data,
      [type]: value,
    });
  };

  async function ubahProfesi(url, where) {
    const newData = new URLSearchParams();
    newData.append("nama", data.nama);
    newData.append("ruang", data.ruang);

    async function fetchDataTambah() {
      const requestTambah = await axios
        .post(getUrlBase + "kerjaan", newData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          alert(res.data.result);
          setRefresh(new Date());
          navigate("/profesi");
        })
        .catch((er) => {
          alert(er.response.data.result);
          console.log("Error: ", er);
        });
      return requestTambah;
    }

    async function fetchDataUbah() {
      const requestTambah = await axios
        .put(getUrlBase + "kerjaan/" + id_profesi, newData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          alert(res.data.result);
          setRefresh(new Date());
        })
        .catch((er) => {
          alert(er.response.data.result);
          console.log("Error: ", er);
        });
      return requestTambah;
    }

    return page === "Tambah Profesi" ? fetchDataTambah() : fetchDataUbah();
  }

  React.useEffect(() => {
    if (page === "Tambah Profesi") {
      setStateUbah(false);
    } else if (props.data.nama !== "" && props.data.ruang !== "") {
      setStateUbah(!stateUbah);
      setData({
        nama: props.data.nama,
        ruang: props.data.ruang,
      });
    }
  }, [props.data]);

  return (
    <div className="flex flex-col w-screen h-screen pt-5 px-5 pb-20">
      <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
      <div className="flex flex-col flex-wrap border border-THEME_COLOR mt-5 w-full h-full text-lg justify-between">
        <div className="flex flex-col h-screen w-1/2">
          <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-full">
            <span className="font-medium text-base">Nama</span>
            {!stateUbah ? (
              <input
                type="text"
                name="Nama"
                value={data.nama}
                onChange={(e) => onChange("nama", e.target.value)}
                className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
                placeholder="Contoh: Dokter Umum"
              />
            ) : (
              <span className="font-semibold text-2xl">
                {props.data.nama === undefined ? "-" : props.data.nama}
              </span>
            )}
          </div>
          <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-full">
            <span className="font-medium text-base">Ruang</span>
            {!stateUbah ? (
              <input
                type="text"
                name="Ruang"
                value={data.ruang}
                onChange={(e) => onChange("ruang", e.target.value)}
                className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
                placeholder="Contoh: Poli Umum"
              />
            ) : (
              <span className="font-semibold text-2xl">
                {props.data.ruang === undefined ? "-" : props.data.ruang}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row h-screen w-1/2 items-end">
          <div className="flex flex-row text-THEME_COLOR my-2.5 px-3 w-full h-9 justify-between">
            <button
              disabled={stateUbah ? false : true}
              onClick={() => {
                setStateUbah(!stateUbah);
              }}
              className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
                stateUbah ? "bg-THEME_COLOR" : "bg-gray-500"
              }`}
            >
              Ubah
            </button>
            <button
              disabled={!stateUbah ? false : true}
              onClick={() => {
                ubahProfesi();
              }}
              className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
                !stateUbah ? "bg-THEME_COLOR" : "bg-gray-500"
              }`}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProfesiTemplate;
