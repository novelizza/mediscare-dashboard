import React from "react";
import { useRecoilState } from "recoil";
import { activePage, refresh } from "../../store";
import { idPasien } from "../../store";
import moment from "moment";
import axios from "axios";

function DetailPasienTemplate(props) {
  const [page, setPage] = useRecoilState(activePage);
  const [id_pasien, setId_pasien] = useRecoilState(idPasien);
  const [getRefresh, setRefresh] = useRecoilState(refresh);

  const [state, setState] = React.useState(false);
  const [noRM, setNoRm] = React.useState("");

  async function tambahNoRekamMedis() {
    const dataNoRM = new URLSearchParams();
    dataNoRM.append("no_rm", noRM);

    const request = await axios
      .put("http://localhost:4000/api/pasien/" + id_pasien, dataNoRM, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          session: localStorage.getItem("session"),
        },
      })
      .then((res) => {
        alert(res.data.result);
        setState(false);
        setRefresh(new Date());
      })
      .catch((er) => console.log("Error: ", er));
    return request;
  }

  React.useEffect(() => {
    setNoRm(props.data.no_rm);
  }, [props.data.no_rm]);

  return (
    <div className="flex flex-col w-screen h-screen pt-5 px-5 pb-20">
      <div className="flex flex-row justify-between">
        <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
        <div className="flex flex-row h-full w-fit">
          <button
            className={"bg-THEME_COLOR text-GROUND_COLOR px-3 rounded-md"}
            onClick={() => {
              if (state) {
                tambahNoRekamMedis();
              } else {
                setState(true);
              }
            }}
          >
            {state ? "Simpan" : "Tambah No. RM"}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-wrap border border-THEME_COLOR mt-5 w-full h-full text-lg justify-between">
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <div className="flex flex-col w-fit items-center">
            <img
              src={
                props.data === undefined
                  ? "http://localhost:4000/api/avatar/unknownPict.png"
                  : props.data.avatar === null ||
                    props.data.avatar === undefined
                  ? "http://localhost:4000/api/avatar/unknownPict.png"
                  : "http://localhost:4000/api/" + props.data.avatar
              }
              alt="Avatar"
              className="w-36 h-36 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">No. Rekam Medis</span>
          {state ? (
            <input
              type="text"
              name="Nama"
              value={noRM}
              onChange={(e) => setNoRm(e.target.value)}
              className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
              placeholder="Contoh: 12345"
            />
          ) : (
            <span className="font-bold text-xl">
              {props.data.no_rm === undefined || props.data.no_rm === null
                ? "-"
                : props.data.no_rm}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Username</span>
          <span className="font-bold text-xl">
            {props.data.username === undefined ? "-" : props.data.username}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">NIK</span>
          <span className="font-bold text-xl">
            {props.data.nik === undefined || props.data.nik === null
              ? "-"
              : props.data.nik}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Nama</span>
          <span className="font-bold text-xl">
            {props.data.nama === undefined ? "-" : props.data.nama}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Golongan Darah</span>
          <span className="font-bold text-xl">
            {props.data.golongan_darah === undefined
              ? "-"
              : props.data.golongan_darah}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Tanggal Lahir</span>
          <span className="font-bold text-xl">
            {props.data.tgl_lahir === undefined
              ? "-"
              : moment
                  .utc(props.data.tgl_lahir, "YYYY-MM-DDTHH:mm:ssZ")
                  .format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Agama</span>
          <span className="font-bold text-xl">
            {props.data.agama === "" ? "-" : props.data.agama}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Suku Bangsa</span>
          <span className="font-bold text-xl">
            {props.data.sukubangsa === "" ? "-" : props.data.sukubangsa}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Golongan Darah</span>
          <span className="font-bold text-xl">
            {props.data.golongan_darah === undefined
              ? "-"
              : props.data.golongan_darah}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Pekerjaan</span>
          <span className="font-bold text-xl">
            {props.data.pekerjaan === undefined ? "-" : props.data.pekerjaan}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Pendidikan</span>
          <span className="font-bold text-xl">
            {props.data.pendidikan === undefined ? "-" : props.data.pendidikan}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Nomor Telfon</span>
          <span className="font-bold text-xl">
            {props.data.nomor_tlp === undefined ? "-" : props.data.nomor_tlp}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2 h-1/5">
          <span className="font-medium text-base">Alamat</span>
          <span className="font-bold text-xl">
            {props.data === undefined ? "-" : props.data.alamat}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Ibu Kandung</span>
          <span className="font-bold text-xl">
            {props.data.ibu_kandung === undefined
              ? "-"
              : props.data.ibu_kandung}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Nama Penanggung Jawab</span>
          <span className="font-bold text-xl">
            {props.data.nama_penanggungjawab === undefined
              ? "-"
              : props.data.nama_penanggungjawab}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Umur Penanggung Jawab</span>
          <span className="font-bold text-xl">
            {props.data.umur_penanggungjawab === undefined
              ? "-"
              : props.data.umur_penanggungjawab}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">
            Hubungan Penanggung Jawab
          </span>
          <span className="font-bold text-xl">
            {props.data.hubungan_penanggungjawab === undefined
              ? "-"
              : props.data.hubungan_penanggungjawab}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-1 px-3 w-1/2">
          <span className="font-medium text-base">Alamat Penanggung Jawab</span>
          <span className="font-bold text-xl">
            {props.data.alamat_penanggungjawab === undefined
              ? "-"
              : props.data.alamat_penanggungjawab}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DetailPasienTemplate;
