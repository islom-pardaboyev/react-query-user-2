import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddAndUpdate, AllUser } from '../pages'

function CustomRoutes() {
  return (
    <Routes>
        <Route path="/" element={<AllUser />} />
        <Route path="/add" element={<AddAndUpdate />} />
        <Route path="/update/:id" element={<AddAndUpdate />} />
    </Routes>
  )
}

export default CustomRoutes