import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React from "react";
import { addUserSchema } from "../schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ref } from "yup";

export const countriesArray = [
  { value: "uz", label: "Uzbekistan" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "ru", label: "Russia" },
];

const ageArray = [
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
];

const statusArray = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

function AddAndUpdate() {
  const navigate = useNavigate();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/users");
      return response.data;
    },
  })
  const { mutate: addUser } = useMutation({
    mutationFn: (body) => axios.post("http://localhost:3000/users", body),
    onSuccess: () => {
      refetch()
    }
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      age: "",
      email: "",
      status: "",
      description: "",
    },
    validationSchema: addUserSchema,
    onSubmit: (values, actions) => {
      const data = {
        name: values.name,
        email: values.email,
        country: values.country,
        age: values.age,
        status: values.status,
        description: values.description,
      };
      addUser(data);
      actions.resetForm();
      navigate("/");
    },
  });

  return (
    <section className="">
      <h1 className="text-3xl top-10 left-1/2 -translate-x-1/2 font-medium absolute mt-10">
        Add User
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="min-w-[80vw] grid grid-cols-12 gap-6"
      >
        <div className="col-span-6 flex flex-col gap-5">
          <label className="flex flex-col">
            <span>Name</span>
            <Input
              className={`${
                formik.errors.name &&
                formik.touched.name &&
                "border-red-500 placeholder:text-red-500"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              size="large"
              placeholder="Name"
              name="name"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </label>

          <label className="flex flex-col">
            <span>Country</span>
            <Select
              showSearch
              onBlur={formik.handleBlur}
              onChange={(value, option) => formik.setFieldValue("country", option.label)}
              size="large"
              className={`${
                formik.errors.country &&
                formik.touched.country &&
                "!outline-red-500 !placeholder:text-red-500"
              }`}
              placeholder="Select a country"
              options={countriesArray}
            />
            {formik.errors.country && formik.touched.country && (
              <p className="text-red-500">{formik.errors.country}</p>
            )}
          </label>

          <label className="flex flex-col">
            <span>Age</span>
            <Select
              showSearch
              onBlur={formik.handleBlur}
              onChange={(value, option) => formik.setFieldValue("age", option.label)}
              size="large"
              className="w-full"
              placeholder="Select age"
              options={ageArray}
            />
            {formik.errors.age && formik.touched.age && (
              <p className="text-red-500">{formik.errors.age}</p>
            )}
          </label>

          <label className="flex flex-col">
            <span>Email</span>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              size="large"
              placeholder="Email"
              name="email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </label>

          <label className="flex flex-col">
            <span>Status</span>
            <Select
              showSearch
              onBlur={formik.handleBlur}
              onChange={(value, option) => formik.setFieldValue("status", option.label)}
              size="large"
              className="w-full"
              placeholder="Select status"
              options={statusArray}
            />
            {formik.errors.status && formik.touched.status && (
              <p className="text-red-500">{formik.errors.status}</p>
            )}
          </label>
        </div>

        <div className="col-span-6">
          <label>
            <span>Description</span>
            <TextArea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              size="large"
              placeholder="Description"
              rows={15}
              name="description"
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </label>
        </div>

        <div className="col-span-12 flex justify-end">
          <Button
            size="large"
            className="!bg-sky-500"
            type="primary"
            htmlType="submit"
          >
            Add User
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AddAndUpdate;
