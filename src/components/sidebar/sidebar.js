import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Saslogo from "../sidebar/logos/sasLogo2.png"
import LoggedInUser from "../sidebar/logos/userSvgLogo"
import LogoutUser from "../sidebar/logos/logout"
import authContext from "../../context/auth/authContext"

export default function Sidebar() {
  const { UserName } = useContext(authContext)
  if(localStorage.getItem("name")===null)
  localStorage.setItem('name',UserName)
  const nameFromStorage = localStorage.getItem("name");
  
 
  const authToken = localStorage.getItem("authToken")
  const [openTab, setOpenTab] = useState(null)

  if (authToken === null) return null

  const data = [
    {
      name: "Inventory",
      path: "/inventory",
      key: 1,
      subTabs: [
        {
          name: "View Products",
          path: "/viewProduct",
          key: 2,
        },
        {
          name: "Add Product",
          path: "/addProduct",
          key: 5,
        },
      ],
    },
    {
      name: "Customers",
      path: "/customers",
      key: 3,
      subTabs: [
        {
          name: "View Customers",
          path: "/viewCustomers",
          key: 4,
        },
        {
          name: "View Sales",
          path: "/viewCustomerSale",
          key: 11,
        },
        {
          name: "Add Customer",
          path: "/addCustomers",
          key: 6,
        },
        {
          name: "Add Sale",
          path: "/AddCustomersSale",
          key: 10,
        },
      ],
    },
    {
      name: "Employees",
      path: "/employees",
      key: 7,
      subTabs: [
        {
          name: "Add Employees",
          path: "/addEmployee",
          key: 9,
        },
        {
          name: "Add Attendance",
          path: "/addAttendanceDate",
          key: 13,
        },
        {
          name: "View Employees",
          path: "/viewEmployee",
          key: 8,
        },
        {
          name: "View Attendance",
          path: "/attendanceDate",
          key: 12,
        },
      ],
    },
  ]

  const toggleTab = (tabKey) => {
    setOpenTab(openTab === tabKey ? null : tabKey)
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("name")
    return (window.location.href = "/signIn")
  }

  return (
    <div className="w-60 fixed ">
      <div className="flex">
        <div className=" flex flex-col h-screen p-3 bg-slate-100  text-gray shadow-2xl z-[999] w-60 ">
          <div className="space-y-3">
            <div className="flex items-center">
              <img className="ml-10 w-36 py-10" src={Saslogo} alt="Logo" />
            </div>
            <div className="flex-1 ">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <Link to={"/dashboard"}>
                  <div className="rounded-sm shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer h-10 bg-slate-50">
                    <span to={"/dashboard"} className="pl-5 ">
                      Dashboard
                    </span>
                  </div>
                </Link>

                {data.map((tab) => (
                  <li key={tab.key} onClick={() => toggleTab(tab.key)}>
                    <div className="rounded-sm shadow-lg pt-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 cursor-pointer h-10 bg-slate-50">
                      <span className="pl-5 ">{tab.name}</span>
                    </div>
                    {tab.subTabs && openTab === tab.key && (
                      <ul className="pl-6 space-y-2 shadow bg-slate-50 ">
                        {/* <span className='divide-y-[1px] divide-gray-500 divide-opacity-40'></span> */}
                        {tab.subTabs.map((subTab) => (
                          <li key={subTab.key}>
                            <Link to={subTab.path} className="flex items-center p-2 space-x-3 rounded-md">
                              <span className="pl-9 text-xs font-bold">{subTab.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          

          <div className="space-x-3  mt-auto">
            <div className="pl-4">
  <LoggedInUser />

            </div>
  <div className="flex items-center">
    <div className="font-semibold text-sm text-gray-600 pl-1">{nameFromStorage.toUpperCase()}</div>
    <div onClick={logout} className="pl-24 pb-4 cursor-pointer"><LogoutUser/></div>
  </div>
  </div>
  </div>
  </div>
  </div>


          
       
       
     
   
  )
}
