import * as yup from 'yup'

const passwordMatches = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const addUserSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required").matches(passwordMatches, "Please Enter A Valid Email"),
    country: yup.string().required("Required"),
    age: yup.string().required("Required"),
    status: yup.string().required("Required"),
    description: yup.string().required("Required").min(10, "Must be 10 characters or more"),
    statusId: yup.number().required("Required")
})