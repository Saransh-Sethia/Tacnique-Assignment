import React from 'react';
import "./Pagination.css";
import { Box } from '@mui/material';

const Pagination = ({previousPage,nextPage,currentPage,usersPerPage,totalUsers}) => {
    const pageNumbers = Math.ceil(totalUsers/usersPerPage);
  return (
    <Box className="btn" sx={{display:"flex", gap:"10px"}} xs={12} sm={12} md={12} lg={1}>
      <button disabled={currentPage === 1 ? true : false} onClick={()=>previousPage()}>Previous</button>
      <button className='page-btn'>{currentPage}</button>
      <button disabled={currentPage === pageNumbers ? true : false} onClick={()=>nextPage(pageNumbers)}>Next</button>
    </Box>
  )
}

export default Pagination
