import { getSession, setSession } from "@/utils/session"
import Navbar from "./Navbar";
import Time from "./Time";
import { getCurrentWorkers, getDepartmentMembersByDepartments } from "@/utils/db";
import { getManageableDepartments } from "@/utils/utils";
import ClockInOut from "./ClockInOut";

export default async function Timecard() {
  const { payload: session } = await getSession();
  const manageableDepartments = getManageableDepartments(session.departments);
  const departmentMembers = await getDepartmentMembersByDepartments(manageableDepartments);
  const currentWorkers = await getCurrentWorkers(manageableDepartments);

  return (
    <div className="timecard">
      <Navbar />
      <div className="container">
        <div className="container__timer">
          <Time />
        </div>
        <div className="container__clock-in-out">
          <ClockInOut manageableDepartments={manageableDepartments} departmentMembers={departmentMembers} currentWorkers={currentWorkers} />
        </div>
      </div>
    </div>
  )
}