import React from "react";
import FileList2FillIcon from "remixicon-react/FileList2FillIcon";
import NurseFillIcon from "remixicon-react/NurseFillIcon";
import UserHeartFillIcon from "remixicon-react/UserHeartFillIcon";
import FirstAidKitFillIcon from "remixicon-react/FirstAidKitFillIcon";
import ShareCircleFillIcon from "remixicon-react/ShareCircleFillIcon";
import HealthBookFillIcon from "remixicon-react/HealthBookFillIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { activePage } from "../../store";

function NavBarTemplate(props) {
  const navigate = useNavigate();

  const [page, setPage] = useRecoilState(activePage);
  const dataPegawai = JSON.parse(localStorage.getItem("dataPegawai"));

  async function logout() {
    const request = await axios
      .delete("http://localhost:4000/api/auth", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          session: localStorage.getItem("session"),
        },
      })
      .then((res) => {
        localStorage.removeItem("session");
        alert("Berhasil Logout!");
        navigate("/login");
      })
      .catch((er) => {
        console.log("Error: ", er.response.data);
        if (er.response.data.response === 401) {
          alert(er.response.data.result);
        } else if (er.response.data.response === 404) {
          alert(er.response.data.result);
        } else {
          alert("Error!");
        }
      });
    return request;
  }
  return (
    <div className="w-1/5 flex flex-col items-center bg-THEME_COLOR">
      <img
        src={
          dataPegawai.avatar === undefined
            ? "http://localhost:4000/api/avatar/unknownPict.png"
            : dataPegawai.avatar === null
            ? "http://localhost:4000/api/avatar/unknownPict.png"
            : "http://localhost:4000/api/" + dataPegawai.avatar
        }
        alt="Avatar"
        className="w-28 h-28 mt-7 mb-1 rounded-full"
      />
      <span className="text-GROUND_COLOR text-center">{dataPegawai.nama}</span>
      <div className=" bg-GROUND_COLOR w-full">
        <div className={props.styles.dasarAtas} />
      </div>
      <div className="w-full flex flex-col items-end">
        <div className="bg-GROUND_COLOR w-11/12 rounded-l-full">
          <button
            onClick={() => {
              setPage("Pesanan");
              navigate("/");
            }}
            className={props.styles.dasarPesanan}
          >
            <FileList2FillIcon className="mr-2" />
            <span>Pesanan</span>
          </button>
        </div>
        <div className="bg-GROUND_COLOR w-11/12 rounded-l-full">
          <button
            onClick={() => {
              setPage("Rekam Medis");
              navigate("/rekammedis");
            }}
            className={props.styles.dasarRekamMedis}
          >
            <HealthBookFillIcon className="mr-2" />
            <span>Rekam Medis</span>
          </button>
        </div>
        <div className="bg-GROUND_COLOR w-11/12 rounded-l-full">
          <button
            onClick={() => {
              setPage("Pegawai");
              navigate("/pegawai");
            }}
            className={props.styles.dasarPegawai}
          >
            <NurseFillIcon className="mr-2" />
            <span>Pegawai</span>
          </button>
        </div>
        <div className="bg-GROUND_COLOR w-11/12 rounded-l-full">
          <button
            onClick={() => {
              setPage("Pasien");
              navigate("/pasien");
            }}
            className={props.styles.dasarPasien}
          >
            <UserHeartFillIcon className="mr-2" />
            <span>Pasien</span>
          </button>
        </div>
        <div className="bg-GROUND_COLOR w-11/12 rounded-l-full">
          <button
            onClick={() => {
              setPage("Profesi");
              navigate("/profesi");
            }}
            className={props.styles.dasarPekerjaan}
          >
            <FirstAidKitFillIcon className="mr-2" />
            <span>Profesi</span>
          </button>
        </div>
        <div className="bg-GROUND_COLOR w-11/12 rounded-l-full">
          <button
            onClick={() => {
              logout();
            }}
            className={props.styles.dasarBawah}
          >
            <ShareCircleFillIcon className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBarTemplate;
