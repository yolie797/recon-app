import React from "react";
import { UsersIcon, CheckCircleIcon } from '@heroicons/react/outline'; // Import icons from Heroicons
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const userActivityData = [
    { username: 'User1', activity: 'Started absa recon' },
    { username: 'User2', activity: 'Downloaded absa recon report' },
    { username: 'User3', activity: 'Uploaded Nedbank payment file' },
    // Add more mock data as needed
  ];

  // Mock data for total users and active users
  const totalUsers = 1000;
  const activeUsers = 750;

  return (
    <div className="flex h-screen text-gray-700">
      <Sidebar />
      <div className="flex flex-col flex-1 m-5 p-2 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8 mb-8">

          <div className="w-1/3 bg-white rounded-lg border border-deepMidnight relative">
            <h2 className="text-lg p-2 font-semibold mb-2">Manage Profile</h2>
            <div className="p-4 relative">
              <img src="https://cube.hassemprag.com/assets/images/profile-image.png" width="150" height="150" className="p-4 px-200" />
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <label htmlFor="title" className="w-1/3 text-sm">Title</label>
                  <select id="title" className="rounded border border-deepMidnight flex-grow mr-2">
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Dr.</option>
                    <option>Ms.</option>
                  </select>

                  <label htmlFor="initials" className="mb-1 ml-4 mr-2">Initials</label>
                  <input type="text" id="initials" className="rounded border border-deepMidnight flex-grow" />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <label htmlFor="name" className="mb-1">Name</label>
                  <input type="text" id="name" className="rounded border border-deepMidnight mb-1" />

                  <label htmlFor="surname" className="mb-1">Surname</label>
                  <input type="text" id="surname" className="rounded border border-deepMidnight mb-1" />

                  <label htmlFor="employeeNo" className="mb-1">Employee No</label>
                  <input type="text" id="employeeNo" className="rounded border border-deepMidnight mb-1" />

                  <label htmlFor="username" className="mb-1">Username</label>
                  <input type="text" id="username" className="rounded border border-deepMidnight mb-1" />

                  <label htmlFor="designation" className="mb-1">Designation</label>
                  <input type="text" id="designation" className="rounded border border-deepMidnight mb-1" />

                  <label htmlFor="email" className="mb-1">Email</label>
                  <input type="email" id="email" className="rounded border border-deepMidnight mb-1" />

                  <label htmlFor="phone" className="mb-1">Phone</label>
                  <input type="tel" id="phone" className="rounded border border-deepMidnight mb-1" />

                  <label htmlFor="role" className="mb-4">Role</label>
                  <input type="text" id="role" className="rounded border border-deepMidnight mb-4" />
                </div>
              </div>
              <br />
              <br />
              <div className="absolute bottom-0 right-0 p-4 mt-5">
                <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-semibold py-2 px-4 rounded">EDIT</button>
              </div>
            </div>
          </div>

          <div className="w-1/3 bg-white rounded-lg border border-deepMidnight relative">
  <h2 className="text-lg p-2 font-semibold mb-4">Add User</h2>
  <div className="p-2 grid grid-cols-2 gap-1">
    <label htmlFor="name">Name</label>
    <input type="text" id="name" className="rounded border border-deepMidnight" />

    <label htmlFor="surname">Surname</label>
    <input type="text" id="surname" className="rounded border border-deepMidnight" />

    <label htmlFor="designation">Designation</label>
    <input type="text" id="designation" className="rounded border border-deepMidnight" />

    <label htmlFor="email">Email</label>
    <input type="email" id="email" className="rounded border border-deepMidnight" />

    <label htmlFor="phone">Phone</label>
    <input type="tel" id="phone" className="rounded border border-deepMidnight" />

    <label htmlFor="role">Role</label>
    <input type="text" id="role" className="rounded border border-deepMidnight" />
  </div>
  <div className="absolute bottom-0 right-0 p-2">
    <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-semibold py-2 px-4 rounded">SAVE USER</button>
  </div>
</div>


<div className="w-1/3 bg-white rounded-lg border border-deepMidnight relative">
  <h2 className="text-lg p-2 font-semibold mb-4">User Activity</h2>
  <div className="p-2 grid grid-cols-2 gap-1">
    {userActivityData.map((activity, index) => (
      <div key={index} className="bg-gray-100 p-2 rounded-lg m-2">
        <span className="font-semibold">{activity.username}: </span>
        <span className="text-deepMidnight ml-1">{activity.activity}</span>
      </div>
    ))}
  </div>
  <div className="absolute bottom-0 right-0 p-2">
    <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-semibold py-2 px-4 rounded">VIEW ALL USER ACTIVITY</button>
  </div>
  <div className="p-2">
    <p><UsersIcon className="h-5 w-5 inline-block mr-1 text-gray-700" /> Total Users: {totalUsers}</p>
    <p><CheckCircleIcon className="h-5 w-5 inline-block mr-1 text-green-500" /> Active Users: {activeUsers}</p>
  </div>
</div>

        </div>

        <div className="bg-white p-6 rounded-lg border border-deepMidnight mb-8">
          <h2 className="text-md text-deepMidnight font-semibold mb-4">Search Users</h2>
          <div className="mb-4">
            <input type="text" id="searchInput" className="border border-clearSkiesAhead rounded px-4 py-2 w-full" placeholder="Search..." />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-clearSkiesAhead px-4 py-2">Name</th>
                  <th className="border border-clearSkiesAhead px-4 py-2">Surname</th>
                  <th className="border border-clearSkiesAhead px-4 py-2">Email</th>
                  <th className="border border-clearSkiesAhead px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-clearSkiesAhead px-4 py-2">John</td>
                  <td className="border border-clearSkiesAhead px-4 py-2">Doe</td>
                  <td className="border border-clearSkiesAhead px-4 py-2">john@example.com</td>
                  <td className="border border-clearSkiesAhead px-4 py-2">Admin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
