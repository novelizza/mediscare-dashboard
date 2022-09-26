import React from "react";
import { useRecoilState } from "recoil";
import { activePage } from "../../store";
import { ItemListProfesiOrganism } from "../organism";
import { useNavigate } from "react-router-dom";

function ProfesiTemplate(props) {
  const navigate = useNavigate();
  const [page, setPage] = useRecoilState(activePage);

  return (
    <div className="flex flex-col w-full p-5 bg-GROUND_COLOR">
      <div className="flex flex-row justify-between">
        <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
        <button
          className="bg-THEME_COLOR text-GROUND_COLOR px-3 rounded-md"
          onClick={() => {
            setPage("Tambah Profesi");
            navigate("/tambahprofesi");
          }}
        >
          Tambah Profesi
        </button>
      </div>
      <div className="flex flex-col border border-THEME_COLOR w-full h-full mt-2 text-lg">
        <div className="flex border-b border-THEME_COLOR py-1 h-10 items-center">
          <div className="w-10 pl-1">
            <span>No.</span>
          </div>
          <div className="w-1/6">
            <span>Nama</span>
          </div>
          <div className="w-1/6">
            <span>Ruang</span>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <ul className="flex flex-col w-full h-10">
            {props.data.map((dataProfesi, index) => {
              return (
                <li
                  className={`flex flex-col w-full h-10 py-1 ${
                    index % 2 === 1 ? "bg-sky-100" : null
                  }`}
                  key={index}
                >
                  <ItemListProfesiOrganism
                    index={index}
                    dataProfesi={dataProfesi}
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

export default ProfesiTemplate;
