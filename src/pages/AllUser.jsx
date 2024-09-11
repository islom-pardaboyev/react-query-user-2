import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function AllUser() {
  const navigate = useNavigate();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/users");
      return response.data;
    },
    staleTime: Infinity,
  });
  console.log(users);

  return (
    <section className="">
      <h1 className="text-3xl text-center font-bold capitalize">users list</h1>

      <div className="flex items-center my-10 min-w-[80vw] justify-between bg-white px-7 py-2 rounded-md box-shadow">
        <p className="heading-text">Name</p>
        <p className="heading-text">Age</p>
        <p className="heading-text">Country</p>
        <p className="heading-text">Email</p>
        <p className="heading-text">Status</p>
        <p className="heading-text">Actions</p>
      </div>
      <div className="flex flex-col gap-5 max-h-[50vh] p-5 min-h-[50vh] overflow-y-auto">
        {users?.map((user) => (
          <div key={user.id} className="w-full px-7 py-4 box-shadow bg-white rounded-md min-w-[60vw] flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="capitalize font-medium text-base">
                {user.name}
              </h1>
            </div>
            <h1 className="capitalize font-medium text-base">{user.age}</h1>
            <h1 className="capitalize font-medium text-base">{user.country}</h1>
            <h1 className="capitalize font-medium text-base">
              {user.email}
            </h1>
            <h1 className="capitalize font-medium text-base">{user.status}</h1>
            <div>
              <Button className="!bg-red-500 !text-white">
                <FaTrashAlt />
              </Button>
              <Button className="!bg-green-500 !text-white">
                <FaEdit />
              </Button>
              <Button className="!bg-sky-500 !text-white">
                <IoIosMore />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="button-add"
        onClick={() => {
          navigate("/add");
        }}
      >
        Add User
      </button>
    </section>
  );
}

export default AllUser;
