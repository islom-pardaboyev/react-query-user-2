import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCart from "../components/UserCart";

function AllUser() {
  const navigate = useNavigate();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/users");
      return response.data;
    },
    staleTime: Infinity,
  });

  const {mutate: deleteUser} = useMutation({
    mutationFn: (userId) => axios.delete(`http://localhost:3000/users/${userId}`),
    onSuccess: () => refetch()
  })

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
        {users?.length ? (
          users.map((user) => <UserCart deleteUser={deleteUser} user={user} key={user.id} />)
        ) : (
          <p className="capitalize font-medium text-3xl text-neutral-500 italic flex items-center justify-center">
            don't available
          </p>
        )}
      </div>

      <button className="button-add" onClick={() => navigate("/add")}>
        Add User
      </button>
    </section>
  );
}

export default AllUser;
