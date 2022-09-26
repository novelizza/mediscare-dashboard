import React from "react";
import { useRecoilState } from "recoil";
import { activePage } from "../../store";
import { ItemListPesananOrganism } from "../organism";

function HomeTemplate(props) {
  const [page, setPage] = useRecoilState(activePage);

  return (
    <div className="flex flex-col w-full p-5 bg-GROUND_COLOR">
      <span className="font-semibold text-4xl text-THEME_COLOR">{page}</span>
      <div className="flex flex-col border border-THEME_COLOR w-full h-full mt-2 text-lg">
        <div className="flex border-b border-THEME_COLOR py-1 h-10 items-center">
          <div className="w-10 pl-1">
            <span>No.</span>
          </div>
          <div className="w-1/6">
            <span>Jenis Luka</span>
          </div>
          <div className="w-1/6">
            <span>Status Pesanan</span>
          </div>
          <div className="w-1/6">
            <span>Tanggal</span>
          </div>
          <div className="w-1/12">
            <span>Jam</span>
          </div>
          <div className="w-5/12">
            <span>Catatan</span>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <ul className="flex flex-col w-full h-10">
            {props.data
              .slice(0)
              .reverse()
              .map((dataPesanan, index) => {
                return (
                  <li
                    className={`flex flex-col w-full h-10 py-1 ${
                      index % 2 === 1 ? "bg-sky-100" : null
                    }`}
                    key={index}
                  >
                    <ItemListPesananOrganism
                      index={index}
                      dataPesanan={dataPesanan}
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

export default HomeTemplate;
