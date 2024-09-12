import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, message } from "antd";
import axios from "axios";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function UserCart({ user, deleteUser,  }) {
  const navigate = useNavigate()
  const statusColor = {
    1: "bg-green-500 text-xs font-medium text-white rounded-full p-1", // active
    2: "bg-red-500 text-xs font-medium text-white rounded-full p-1",   // inactive
  };

  function handleEdit(id) {
    console.log(id);
    navigate(`/update/${id}`)
  }

  const { age, email, name, id, country, status, statusId } = user;

  return (
    <div className="w-full px-7 py-4 box-shadow bg-white rounded-md min-w-[60vw] flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="capitalize font-medium text-base">{name}</h1>
      </div>
      <h1 className="capitalize font-medium text-base">{age}</h1>
      <h1 className="capitalize font-medium text-base">{country}</h1>
      <h1 className="font-medium text-base">{email}</h1>
      <h1 className={`${statusColor[statusId]} capitalize font-medium text-base`}>
        {status}
      </h1>
      <div className="flex gap-2">
        <Button className="!bg-red-500 !text-white" onClick={() => deleteUser(id)}>
          <FaTrashAlt />
        </Button>
        <Button className="!bg-green-500 !text-white" onClick={() => handleEdit(id)}>
          <FaEdit />
        </Button>
        <Button className="!bg-sky-500 !text-white">
          <IoIosMore />
        </Button>
      </div>
    </div>
  );
}

export default UserCart;