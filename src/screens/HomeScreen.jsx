import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'


const HomeScreen = () => {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const navigate = useNavigate()
 return (
    <h2>teste</h2>
  )
}

export default HomeScreen