import React from "react";
import { useRecoilState } from "recoil";
import { activePage, refresh, urlBase } from "../../store";
import moment from "moment";
import EyeFillIcon from "remixicon-react/EyeFillIcon";
import EyeOffFillIcon from "remixicon-react/EyeOffFillIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DetailPegawaiTemplate(props) {
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    nama: "",
    username: "",
    password: "",
    sip: "",
    profesi: "",
    ruang: { ruang: "" },
    golongan_darah: "",
    status: false,
    alamat: "",
    jenis_kelamin: true,
    tanggal_lahir: "",
    tlp: "",
  });
  const [stateUbah, setStateUbah] = React.useState({
    ubahData: false,
    lihatPassword: false,
  });
  const hiddenFileInput = React.useRef(null);
  const [page, setPage] = useRecoilState(activePage);
  const [getRefresh, setRefresh] = useRecoilState(refresh);
  const [getUrlBase, setUrlBase] = useRecoilState(urlBase);
  const [tambahPegawai, setTambahPegawai] = React.useState(
    page === "Tambah Pegawai" ? true : false
  );

  const onChange = (type, value) => {
    setData({
      ...data,
      [type]: value,
    });
  };

  const onChangeUbah = (type, value) => {
    setStateUbah({
      ...stateUbah,
      [type]: value,
    });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  async function ubahBuatData(url, where) {
    const newData = new URLSearchParams();
    newData.append("nama", data.nama);
    newData.append("username", data.username);
    newData.append("password", data.password);
    newData.append("sip", data.sip);
    newData.append("golongan_darah", data.golongan_darah);
    newData.append("status", data.status);
    newData.append("alamat", data.alamat);
    newData.append("id_kerjaan", data.ruang.id_kerjaan);
    newData.append("jenis_kelamin", data.jenis_kelamin);
    newData.append(
      "tgl_lahir",
      moment.utc(data.tanggal_lahir, "DD/MM/YYYY").format("YYYY-MM-DD")
    );
    newData.append("nomor_tlp", data.tlp);

    async function fReqTambah(dataUrl, dataMasuk) {
      const requestTambah = await axios
        .post(dataUrl, dataMasuk, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          alert(res.data.result);
          setRefresh(new Date());
          onChangeUbah("ubahData", false);
          // navigate("/pegawai");
        })
        .catch((er) => {
          alert(er.response.data.result);
          console.log("Error: ", er);
        });
      return requestTambah;
    }

    async function fReqUbah(dataUrl, dataMasuk) {
      const requestUbah = await axios
        .put(dataUrl, dataMasuk, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            session: localStorage.getItem("session"),
          },
        })
        .then((res) => {
          alert(res.data.result);
          setRefresh(new Date());
          onChangeUbah("ubahData", false);
          // navigate("/pegawai");
        })
        .catch((er) => {
          alert(er.response.data.result);
          console.log("Error: ", er);
        });

      return requestUbah;
    }

    return where ? fReqTambah(url, newData) : fReqUbah(url, newData);
  }

  async function ubahAvatar(ava) {
    const newData = new FormData();
    newData.append("avatar", ava);

    const request = await axios
      .put(getUrlBase + "pegawai/avatar", newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          session: localStorage.getItem("session"),
        },
      })
      .then((res) => {
        alert(res.data.result.message);
        const dataPegawai = JSON.parse(localStorage.getItem("dataPegawai"));
        dataPegawai.avatar = res.data.result.path;
        localStorage.setItem("dataPegawai", JSON.stringify(dataPegawai));
        setRefresh(new Date());
      })
      .catch((er) => {
        alert(er.response.data.result);
        console.log("Error: ", er);
      });
    return request;
  }

  React.useEffect(() => {
    if (props.data.isSelf !== undefined) {
      props.data.isSelf || props.data.isAdmin
        ? setData({
            nama: props.data.dataPegawai.nama,
            username: props.data.dataPegawai.username,
            password: props.data.dataPegawai.password,
            sip: props.data.dataPegawai.sip,
            profesi: props.data.dataKerjaan.nama,
            ruang: props.data.dataKerjaan,
            golongan_darah: props.data.dataPegawai.golongan_darah,
            status: props.data.dataPegawai.status,
            alamat: props.data.dataPegawai.alamat,
            jenis_kelamin: props.data.dataPegawai.jenis_kelamin,
            tanggal_lahir: moment
              .utc(props.data.dataPegawai.tgl_lahir, "YYYY-MM-DD")
              .format("DD/MM/YYYY")
              .toString(),
            tlp: props.data.dataPegawai.nomor_tlp,
          })
        : onChange("ruang", props.data.dataKerjaan);
    }
  }, [props.data]);

  return (
    <div className="flex flex-col w-screen h-screen pt-5 px-5 pb-20">
      <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
      <div className="flex flex-col flex-wrap border border-THEME_COLOR mt-5 w-full h-full text-lg justify-between">
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <div className="flex flex-col w-fit items-center">
            <img
              src={
                props.data.dataPegawai === undefined
                  ? getUrlBase + "avatar/unknownPict.png"
                  : props.data.dataPegawai.avatar === null
                  ? getUrlBase + "avatar/unknownPict.png"
                  : getUrlBase + "" + props.data.dataPegawai.avatar
              }
              alt="Avatar"
              className="w-40 h-40 mb-1 rounded-full"
            />
            {props.data.isSelf ? (
              <div>
                <button onClick={handleClick}>Ganti Photo Profile</button>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={(e) => {
                    ubahAvatar(e.target.files[0]);
                  }}
                  accept=".jpg, .png"
                  style={{ display: "none" }}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Nama</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <input
              type="text"
              name="Nama"
              value={data.nama}
              onChange={(e) => onChange("nama", e.target.value)}
              className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
              placeholder="Contoh: Amaliah Safitri"
            />
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.nama}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Username</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <input
              type="text"
              name="Username"
              value={data.username}
              onChange={(e) => onChange("username", e.target.value)}
              className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
              placeholder="Contoh: amaliahsafitri"
            />
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.username}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Password</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <div className="flex flex-row items-center justify-between">
              <input
                type={
                  (stateUbah.lihatPassword && props.data.isSelf) ||
                  (stateUbah.lihatPassword && page === "Tambah Pegawai")
                    ? "text"
                    : "password"
                }
                name="Password"
                value={data.password}
                onChange={(e) => onChange("password", e.target.value)}
                className="w-full bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
                placeholder="Contoh: bA8xU32ib"
              />
              {(stateUbah.lihatPassword && props.data.isSelf) ||
              (stateUbah.lihatPassword && page === "Tambah Pegawai") ? (
                <button
                  onClick={() =>
                    onChangeUbah("lihatPassword", !stateUbah.lihatPassword)
                  }
                  className="mx-2"
                >
                  <EyeOffFillIcon />
                </button>
              ) : (
                <button
                  onClick={() =>
                    onChangeUbah("lihatPassword", !stateUbah.lihatPassword)
                  }
                  className="mx-2"
                >
                  <EyeFillIcon />
                </button>
              )}
            </div>
          ) : props.data.isSelf ? (
            <div className="flex flex-row items-center justify-between">
              <span className="font-semibold text-2xl">
                {stateUbah.lihatPassword && props.data.isSelf
                  ? props.data.dataPegawai === undefined
                    ? "-"
                    : props.data.dataPegawai.password
                  : "**********"}
              </span>
              {stateUbah.lihatPassword && props.data.isSelf ? (
                <button
                  onClick={() =>
                    onChangeUbah("lihatPassword", !stateUbah.lihatPassword)
                  }
                  className="mx-2"
                >
                  <EyeOffFillIcon />
                </button>
              ) : (
                <button
                  onClick={() =>
                    onChangeUbah("lihatPassword", !stateUbah.lihatPassword)
                  }
                  className="mx-2"
                >
                  <EyeFillIcon />
                </button>
              )}
            </div>
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.password}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Profesi</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <select
              className="font-light text-lg rounded-lg bg-THEME_COLOR text-GROUND_COLOR py-2"
              onChange={(e) => {
                const ruangan = props.data.listKerjaan.find(
                  (data) => data.nama === e.target.value
                );

                setData({
                  ...data,
                  profesi: e.target.value,
                  ruang: ruangan,
                });
              }}
              value={data.profesi === "" ? "none" : data.profesi}
            >
              <option value="none" disabled hidden>
                Pilih Profesi
              </option>
              {props.data.listKerjaan.map((data, index) => (
                <option key={index} value={data.nama}>
                  {data.nama}
                </option>
              ))}
            </select>
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataKerjaan === undefined
                ? "-"
                : props.data.dataKerjaan.nama}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Ruang</span>
          <span className="font-semibold text-2xl">
            {data.ruang.ruang === "" ? "-" : data.ruang.ruang}
          </span>
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Jenis Kelamin</span>
          {tambahPegawai ? (
            <div className="flex flex-row justify-between w-full">
              <div>
                <input
                  type="radio"
                  value={true}
                  name="Jenis Kelamin"
                  checked={data.jenis_kelamin}
                  onChange={(e) => {
                    onChange("jenis_kelamin", true);
                  }}
                />
                <span className="mx-1">Laki-Laki</span>
              </div>
              <div>
                <input
                  type="radio"
                  value={false}
                  name="Jenis Kelamin"
                  checked={!data.jenis_kelamin}
                  onChange={(e) => {
                    onChange("jenis_kelamin", false);
                  }}
                />
                <span className="mx-1">Perempuan</span>
              </div>
            </div>
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.jenis_kelamin
                ? "Pria"
                : "Wanita"}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Tanggal Lahir</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <input
              type="text"
              name="Tanggal Lahir"
              value={data.tanggal_lahir}
              onChange={(e) => {
                onChange("tanggal_lahir", e.target.value);
              }}
              className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
              placeholder="Contoh: 20/12/1999"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                e.target.type = "text";
                if (e.target.value.length !== 0) {
                  onChange(
                    "tanggal_lahir",
                    moment
                      .utc(e.target.value, "YYYY-MM-DD")
                      .format("DD/MM/YYYY")
                      .toString()
                  );
                }
              }}
            />
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : moment
                    .utc(
                      props.data.dataPegawai.tgl_lahir,
                      "YYYY-MM-DDTHH:mm:ssZ"
                    )
                    .format("DD/MM/YYYY")}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Golongan Darah</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <select
              className="font-light text-lg rounded-lg bg-THEME_COLOR text-GROUND_COLOR py-2"
              onChange={(e) => {
                onChange("golongan_darah", e.target.value);
              }}
              value={data.golongan_darah === "" ? "none" : data.golongan_darah}
            >
              <option value="none" disabled hidden>
                Pilih Golongan Darah
              </option>
              <option value={"A"}>A</option>
              <option value={"B"}>B</option>
              <option value={"AB"}>AB</option>
              <option value={"O"}>O</option>
            </select>
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.golongan_darah}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Status</span>
          {props.data.isAdmin || tambahPegawai ? (
            stateUbah.ubahData ? (
              <div className="flex flex-row justify-between w-full">
                <div>
                  <input
                    type="radio"
                    value={true}
                    name="status"
                    checked={data.status}
                    onChange={(e) => {
                      onChange("status", true);
                    }}
                  />
                  <span className="mx-1">Pegawai Aktif</span>
                </div>
                <div>
                  <input
                    type="radio"
                    value={false}
                    name="status"
                    checked={!data.status}
                    onChange={(e) => {
                      onChange("status", false);
                    }}
                  />
                  <span className="mx-1">Pegawai Tidak Aktif</span>
                </div>
              </div>
            ) : (
              <span className="font-semibold text-2xl">
                {props.data.dataPegawai === undefined
                  ? "-"
                  : props.data.dataPegawai.status
                  ? "Pegawai Aktif"
                  : "Pegawai Tidak Aktif"}
              </span>
            )
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.status
                ? "Pegawai Aktif"
                : "Pegawai Tidak Aktif"}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">SIP</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <input
              type="text"
              name="SIP"
              value={data.sip}
              onChange={(e) => onChange("sip", e.target.value)}
              className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
              placeholder="Contoh: 440/1719.2/SIP/429.114/X/2017"
            />
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.sip}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2">
          <span className="font-medium text-base">Nomor Telfon</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <input
              type="text"
              name="Nomor Telfon"
              value={data.tlp}
              onChange={(e) => {
                if (e.target.value.slice(0, 1) === "0") {
                  let convert = 62 + e.target.value.slice(1);
                  onChange("tlp", convert);
                } else {
                  onChange("tlp", e.target.value);
                }
              }}
              className="bg-THEME_COLOR rounded-md h-9 text-GROUND_COLOR placeholder:text-neutral-300 px-2"
              placeholder="Contoh: 62822354521766"
            />
          ) : (
            <span className="font-semibold text-2xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.nomor_tlp}
            </span>
          )}
        </div>
        <div className="flex flex-col text-THEME_COLOR my-2.5 px-3 w-1/2 h-1/4">
          <span className="font-medium text-base">Alamat</span>
          {stateUbah.ubahData || tambahPegawai ? (
            <textarea
              rows="3"
              cols="45"
              value={data.alamat}
              onChange={(e) => onChange("alamat", e.target.value)}
              className="bg-THEME_COLOR rounded-md h-full text-GROUND_COLOR font-normal text-xl placeholder:text-neutral-300 px-2"
              placeholder="Contoh: JL. Mayong Pancur Km 6 Desa Pancur Rt 02 Rw 01 Mayong Jepara"
            />
          ) : (
            <span className="font-medium text-xl">
              {props.data.dataPegawai === undefined
                ? "-"
                : props.data.dataPegawai.alamat}
            </span>
          )}
        </div>
        <div className="flex flex-row text-THEME_COLOR my-2.5 px-3 w-1/2 justify-between">
          <button
            disabled={
              props.data.isSelf || props.data.isAdmin
                ? stateUbah.ubahData
                  ? true
                  : false
                : true
            }
            onClick={() => {
              onChangeUbah("ubahData", true);
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              props.data.isSelf || props.data.isAdmin
                ? stateUbah.ubahData
                  ? "bg-gray-500"
                  : "bg-THEME_COLOR"
                : "bg-gray-500"
            }`}
          >
            Ubah
          </button>
          <button
            disabled={
              props.data.isSelf || props.data.isAdmin
                ? !stateUbah.ubahData
                  ? true
                  : false
                : tambahPegawai
                ? false
                : true
            }
            onClick={() => {
              tambahPegawai
                ? ubahBuatData(getUrlBase + "pegawai", tambahPegawai)
                : ubahBuatData(
                    getUrlBase + "pegawai/" + props.data.dataPegawai.id_pegawai,
                    tambahPegawai
                  );
            }}
            className={`font-light text-base rounded-lg text-GROUND_COLOR py-1 mx-1 w-full ${
              props.data.isSelf || props.data.isAdmin
                ? !stateUbah.ubahData
                  ? "bg-gray-500"
                  : "bg-THEME_COLOR"
                : tambahPegawai
                ? "bg-THEME_COLOR"
                : "bg-gray-500"
            }`}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPegawaiTemplate;
