import React from "react";
import { logo2 } from "../../asset/image";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { urlBase } from "../../store";

function LoginTemplate(props) {
  const navigate = useNavigate();

  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);
  const [auth, setAuth] = React.useState({
    username: "",
    password: "",
  });

  async function fetchDataAccount() {
    const request = await axios
      .get(getUrlBase + "pegawai", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          session: localStorage.getItem("session"),
        },
      })
      .then((res) => {
        const dataPegawai = {
          id_user: res.data.id_user,
          nama: res.data.result.nama,
          avatar: res.data.result.avatar,
        };
        localStorage.setItem("dataPegawai", JSON.stringify(dataPegawai));
        alert("Berhasil Login!");
        navigate("/");
      })
      .catch((er) => console.log("Error: ", er));
    return request;
  }

  async function authUser() {
    if (auth.username && auth.password !== "") {
      const newData = new URLSearchParams();
      newData.append("username", auth.username);
      newData.append("password", auth.password);
      const request = await axios
        .post(getUrlBase + "auth", newData, {
          params: {
            who: "pegawai",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          localStorage.setItem("session", res.data.result.session);
          fetchDataAccount();
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
    } else {
      alert("Username / Password belum terisi lengkap!");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-THEME_COLOR">
      <div className="bg-GROUND_COLOR w-screen flex justify-center rounded-b-loginBg pb-40">
        <img src={logo2} alt="Logo Mitra" className="h-80 w-80" />
      </div>
      <div className="w-1/3 h-auto border border-GROUND_COLOR bg-THEME_COLOR flex flex-col pl-10 pr-10 pb-5 rounded-2xl -mt-40">
        <span className="self-center mt-5 mb-5 text-2xl text-GROUND_COLOR text-center">
          Selamat Datang Admin!
        </span>
        {props.kolom.map((data, index) => (
          <label className="block pb-4" key={index}>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-GROUND_COLOR text-left">
              {data.title}
            </span>
            <input
              type={data.type}
              name={data.name}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              placeholder={data.placeholder}
              onChange={(e) => {
                setAuth({
                  ...auth,
                  [data.type]: e.target.value,
                });
              }}
            />
          </label>
        ))}
        <button
          className="mt-4 relative rounded-full px-3 md:py-1.5 py-[3px] overflow-hidden group bg-GROUND_COLOR text-white hover:ring-2 hover:ring-offset-2 hover:ring-THEME2_COLOR transition-all ease-out duration-300"
          onClick={() => {
            authUser();
          }}
        >
          <span className="relative md:text-[18px] text-md text-THEME_COLOR">
            LOGIN
          </span>
        </button>
      </div>
    </div>
  );
}

export default LoginTemplate;
