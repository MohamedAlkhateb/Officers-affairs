import { useState, useEffect } from "react";
import Overlay from "../../../components/Overlay/Overlay";
import ErrandApprovalOverlayContent from "./ErrandApprovalOverlayContent";

interface IErrandData {
  id: any;
  destination: any;
  sequenceNumber: any;
  officerRank: any;
  officerName: any;
  errandType: any;
  fromDate: any;
  toDate: any;
  reason: any;
  branchChiefApproved: any;
  OfficersAffairsApproved: any;
  viceManagerApproved: any;
}
interface IProps {
  errandsData: IErrandData[];
}
function ErrandsApprovalTable(props: IProps) {
  const [isOverLayOpen, setIsOverLayOpen] = useState<boolean>(false);
  const [errandIdToOpen, setErrandIdToOpen] = useState<string>("");

  return (
    <>
      {isOverLayOpen && (
        <Overlay isOpen={isOverLayOpen} setIsOverlayOpen={setIsOverLayOpen}>
          <ErrandApprovalOverlayContent errandId={errandIdToOpen} />
        </Overlay>
      )}
      <div className="d-flex justify-content-around ">
        <div className="d-flex my-2">
          <label className="fs-4">تم التصديق</label>

          <div
            className="bg-success mx-2"
            style={{ width: "20px", borderRadius: "5px" }}
          >
            .
          </div>
        </div>
        <div className="d-flex my-2">
          <label className="fs-4">جاري التصديق</label>

          <div
            className="bg-warning mx-2"
            style={{ width: "20px", borderRadius: "5px" }}
          >
            .
          </div>
        </div>
        <div className="d-flex my-2">
          <label className="fs-4">تم الرفض </label>

          <div
            className="bg-danger mx-2"
            style={{ width: "20px", borderRadius: "5px" }}
          >
            .
          </div>
        </div>
      </div>
      <hr />
      <table
        className="table table-hover fs-4 fw-bold"
        key={JSON.stringify(props.errandsData)}
      >
        <thead className={""}>
          <tr>
            <th scope="col" style={{ width: "10%" }}>
              رقم المأمورية
            </th>
            <th scope="col" style={{ width: "10%" }}>
              رتبة
            </th>
            <th scope="col" style={{ width: "15%" }}>
              اسم
            </th>
            <th scope="col" style={{ width: "17%" }}>
              نوع المأمورية
            </th>
            <th scope="col" style={{ width: "17%" }}>
              جهة المأمورية
            </th>
            <th scope="col" style={{ width: "15%" }}>
              من
            </th>
            <th scope="col" style={{ width: "15%" }}>
              الى
            </th>
          </tr>
        </thead>
        <tbody>
          {props.errandsData.map((errandData: IErrandData) => {
            const isRejected =
              // vacationData.ManagerApproved == null &&
              errandData.OfficersAffairsApproved === false ||
              errandData.branchChiefApproved === false ||
              errandData.viceManagerApproved === false;
            const isAccepted =
              // vacationData.ManagerApproved === true &&
              // errandData.officersAffairsApproved === true &&
              // errandData.branchChiefApproved === true &&
              errandData.viceManagerApproved === true;
            let className = "";
            if (isAccepted) {
              className = "text-success";
            } else if (isRejected) {
              className = "text-danger";
            } else {
              className = "text-warning";
            }

            return (
              <tr
                className={className}
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setIsOverLayOpen(true);
                  setErrandIdToOpen(errandData.id);
                }}
                key={errandData.id}
              >
                <td>{errandData.sequenceNumber}</td>
                <td>{errandData.officerRank}</td>
                <td>{errandData.officerName}</td>
                <td>{errandData.errandType}</td>
                <td>{errandData.destination}</td>
                <td>{errandData.fromDate}</td>
                <td>{errandData.toDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ErrandsApprovalTable;
