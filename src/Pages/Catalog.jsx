import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {buyCourse} from '../Service/operations/studentsFeaturesAPI'

const Catalog = () => {
        const { user } = useSelector((state) => state.profile);
        const { token } = useSelector((state) => state.auth);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {courseId} = useParams();
        const handleBuyCourse = () =>{
        console.log("clicked")
        //console.log(token)
        if(token){
            {console.log(token)}
            buyCourse(token, [courseId], user, navigate, dispatch);
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
