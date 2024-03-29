"use client"

import { useState } from "react";
import ClockInButton from "./ClockInButton";
import ClockOutButton from "./ClockOutButton";

export default function ClockInOut({ manageableDepartments, departmentMembers, currentWorkers: current }) {
  const [selectedDepartment, setSelectedDepartment] = useState(manageableDepartments[0]);
  const [worker, setWorker] = useState(null);
  const [currentWorker, setCurrentWorker] = useState(null);
  const [currentWorkers, setCurrentWorkers] = useState(current);
  const currentWorkersSet = initCurrentWorkersSet(current);

  function handleSelectedDepartment(event) {
    setSelectedDepartment(manageableDepartments[event.target.value]);
    setWorker(null);
    setCurrentWorker(null);
  }

  function handleWorker(user) {
    setWorker(user);
    setCurrentWorker(null);
  }

  function handleCurrentWorker(user) {
    setCurrentWorker(user);
    setWorker(null);
  }

  function handleClockIn(workTime) {
    setCurrentWorkers(prev => [...prev, workTime]);
    setWorker(null);
  }

  function handleClockOut(workTime) {
    setCurrentWorkers(prev => prev.filter(current => current.id !== workTime.id));
    setCurrentWorker(null);

  }

  function handleCancel() {
    setCurrentWorker(null);
    setWorker(null);
  }

  return (
    <div className="clock-in-out">
      <div className="clock-in-out__select">
        <label className="">department: </label>
        <select className="clock-in-out__select__btn" onChange={handleSelectedDepartment}>
          {
            manageableDepartments.map((department, index) => {
              return (
                <option key={index} value={index}>{department.name}</option>
              )
            })
          }
        </select>
      </div>
      <div className="clock-in-out__container">
        <div className="clock-in-out__frame">
          <div className="clock-in-out__list-name">
            <span className="clock-in-out__list-name--text">OUT</span>
          </div>
          <ul className="list">
            {
              departmentMembers.map((departmentMember, index) => {
                const { departmentId, member } = departmentMember;
                if (selectedDepartment.id === departmentId && !currentWorkersSet.has(member.id)) {
                  const fullName = `${member.firstName} ${member.lastName}`
                  return (
                    <li key={index} className={member.id === worker?.id ? "list__item list__item--selected" : "list__item"}>
                      <button className="list__item__btn" type="button" onClick={() => handleWorker(member)}>{fullName}</button>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
        <div className="clock-in-out__frame">
          <div className="clock-in-out__list-name">
            <span className="clock-in-out__list-name--text">IN</span>
          </div>
          <ul className="list">
            {
              currentWorkers.map((workTime, index) => {
                const { workedUser, workerDepartment } = workTime;
                if (selectedDepartment.id === workerDepartment.id && currentWorkersSet.has(workedUser.id)) {
                  const fullName = `${workedUser.firstName} ${workedUser.lastName}`
                  return (
                    <li key={index} className={workTime.id === currentWorker?.id ? "list__item list__item--selected" : "list__item"}>
                      <button className="list__item__btn" type="button" onClick={() => handleCurrentWorker(workTime)}>
                        {fullName}
                      </button>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
      </div>
      <div className="clock-in-out__btns">
        <ClockInButton selectedDepartment={selectedDepartment} worker={worker} handleClockIn={handleClockIn} />
        <button className={worker || currentWorker ? "btn" : "btn btn--unclickable"} onClick={handleCancel}>CANCEL</button>
        <ClockOutButton currentWorker={currentWorker} handleCheckOut={handleClockOut} />
        {/* <button className={currentWorker ? "btn" : "btn btn--unclickable"}>CLOCK OUT</button> */}
      </div>
    </div>
  )
}

function initCurrentWorkersSet(current) {
  const set = new Set();
  for (const worker of current) {
    set.add(worker.userId);
  }
  return set;
}