import React from "react";
import { useRecoilState } from "recoil";
import { activePage, refresh, urlBase } from "../../store";
import axios from "axios";
import { ItemListResepOrganism } from "../organism";

function ObatTemplate(props) {
  const [stateUbah, setStateUbah] = React.useState(false);
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);

  const [dataResep, setDataResep] = React.useState({
    nama: "",
    sediaan_obat: "",
    jumlah_obat: "",
    cara_penggunaan: "",
  });

  const onChanged = (type, value) => {
    setDataResep({
      ...dataResep,
      [type]: value,
    });
  };

  async function tambahObat() {
    const newData = new URLSearchParams();
    newData.append("id_pemeriksaan", props.id_pemeriksaan);
    newData.append("nama", dataResep.nama);
    newData.append("sediaan_obat", dataResep.sediaan_obat);
    newData.append("jumlah_obat", dataResep.jumlah_obat);
    newData.append("cara_penggunaan", dataResep.cara_penggunaan);

    const request = await axios
      .post(getUrlBase + "resep/", newData, {
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
    <div className="flex flex-col w-screen h-screen pt-5 px-5 pb-20">
      <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
      <div className="flex flex-col flex-wrap border text-THEME_COLOR border-THEME_COLOR mt-5 w-full h-full text-lg justify-between pr-2">
        <div className="flex flex-col w-1/2 h-full">
          <div className="flex flex-col w-full mb-3 px-3">
            <span className="font-medium text-base">Nama Obat</span>
            <textarea
              className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
              rows="4"
              cols="45"
              value={dataResep.nama}
              onChange={(e) => onChanged("nama", e.target.value)}
              placeholder="Contoh: Paracetamol"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-full mb-3 px-3">
            <span className="font-medium text-base">Sediaan Obat</span>
            <textarea
              className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
              rows="4"
              cols="45"
              value={dataResep.sediaan_obat}
              onChange={(e) => onChanged("sediaan_obat", e.target.value)}
              placeholder="Contoh: 500mg tab"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-full mb-3 px-3">
            <span className="font-medium text-base">Jumlah Obat</span>
            <textarea
              className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
              rows="4"
              cols="45"
              value={dataResep.jumlah_obat}
              onChange={(e) => onChanged("jumlah_obat", e.target.value)}
              placeholder="Contoh: IX"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-full mb-3 px-3">
            <span className="font-medium text-base">Cara Penggunaan</span>
            <textarea
              className="font-normal text-xl resize-none bg-THEME_COLOR text-GROUND_COLOR placeholder:text-neutral-300 p-2 rounded-lg"
              rows="4"
              cols="45"
              value={dataResep.cara_penggunaan}
              onChange={(e) => onChanged("cara_penggunaan", e.target.value)}
              placeholder="Contoh: 3 dd tab 1"
              readOnly={stateUbah}
            />
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <div className="flex flex-col px-4 w-1/2 self-end">
              <button
                disabled={page === "Detail Resep" ? true : false}
                onClick={() => {
                  tambahObat();
                }}
                className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
                  stateUbah || page === "Detail Resep"
                    ? "bg-gray-500"
                    : "bg-THEME_COLOR"
                }`}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 my-3 mr-3 border-2 border-THEME_COLOR h-full">
          <div className="flex flex-row">
            <div className="flex flex-col text-THEME_COLOR font-semibold text-base border-b border-r border-THEME_COLOR w-1/5 items-center">
              <span>Nama</span>
            </div>
            <div className="flex flex-col text-THEME_COLOR font-semibold text-base border-b border-r border-THEME_COLOR w-1/5 items-center">
              <span>Sediaan</span>
            </div>
            <div className="flex flex-col text-THEME_COLOR font-semibold text-base border-b border-r border-THEME_COLOR w-1/5 items-center">
              <span>Jumlah</span>
            </div>
            <div className="flex flex-col text-THEME_COLOR font-semibold text-base border-b border-r border-THEME_COLOR w-1/5 items-center">
              <span>Penggunaan</span>
            </div>
            <div className="flex flex-col text-THEME_COLOR font-semibold text-base border-b border-THEME_COLOR w-1/5 items-center">
              <span>Aksi</span>
            </div>
          </div>
          {props.dataResep.map((data, index) => (
            <ItemListResepOrganism
              data={data}
              key={index}
              index={index}
              page={page}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ObatTemplate;
