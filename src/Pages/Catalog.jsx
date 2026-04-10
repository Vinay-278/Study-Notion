import React from 'react'

const Catalog = () => {
    const handleBuyCourse = () =>{
        if(token){
            buyCourse();
            return;
        }
    }

  return (
    <div>
      <button className="bg-yellow-500 p-6 mt-10 text-black font-semibold rounded" onClick={()=>handleBuyCourse()}>
        
        Buy Now
      </button>
    </div>
  );
}

export default Catalog;
