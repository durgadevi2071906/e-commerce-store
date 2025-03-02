import React from 'react'


function Paginationation({ TotalPage,setCurrenpage,currenpage }) {
  
  const PaginationTarget = (cpage)=>{
    setCurrenpage(cpage);
  }
  const LeftPaginate =()=>{
    setCurrenpage(prev => prev - 1);
  }
  const RightPaginate =()=>{
    setCurrenpage(prev => prev + 1);
  }
  return (
    <><div className="pagination" style={{
      width:'100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      gap: '1px',
      flexWrap:'wrap',
      marginTop: "30px"
    }}>
      <span className='pagibtn'><button disabled={currenpage === 0} onClick={LeftPaginate} ><i className="fa-solid fa-angle-left"></i></button></span>
      {[...Array(TotalPage).keys()].map(p => (
        <span className={currenpage === p ? "pa pagibtn" : 'pagibtn'} onClick={() => PaginationTarget(p)} key={p}>{p + 1}</span>
      ))}
      <span className='pagibtn'><button disabled={currenpage === TotalPage - 1} onClick={RightPaginate} ><i className="fa-solid fa-angle-right"></i></button></span>
    </div></>
  )
}

export default Paginationation
