import React, { useEffect, useState } from 'react'
import getHospitalId from '../../../utils/getHospitalId'
import axiosInstance from '../../../config/axios';
const Dashboard = () => {
  /* const instanceCreated = async () => {
    const hospitalId = getHospitalId();
    try {
      await axiosInstance.post(`beds/init/${hospitalId}`);
    } catch (err) {
      console.error("Error fetching layout", err);
    } 
  };
  useEffect(() => {
      instanceCreated();
    }, []); */
  //const hospitalId = getHospitalId();
//        await axiosInstance.post(`beds/init/${hospitalId}`);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard