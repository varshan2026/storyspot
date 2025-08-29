import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import { CircleX  } from "lucide-react";

function Detailscript() {
  const {id} = useParams()
  const [detailScript, setDetailScript] = useState([]);

  const fetchScript = async() => {
    try{
      const response = await axios.get(`http://127.0.0.1:3000/story/${id}`)
      setDetailScript(response.data)
    }catch(e){
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchScript()
  },[]);

  return (
    <section className='px-2 lg:px-20'>
      <div className='flex justify-end mt-5'>
        <Link to={"/scripts"}>
          <CircleX />
        </Link>
      </div>
      <div className="flex justify-center p-4">
        <div className="py-4 lg:px-16 w-full max-w-3xl min-w-0">
          {/* Image */}
          <div className="mb-8">
            <img
              src={detailScript.image}
              alt="Story Banner"
              className="w-full h-auto max-h-60 object-cover rounded-md"
            />
          </div>

          {/* Author info */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-3xl flex items-center justify-center font-bold">
              {detailScript.author?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h5 className="text-sm text-gray-600">Author</h5>
              <p className="text-base font-medium text-gray-800">
                {detailScript.author}
              </p>
            </div>
          </div>

          {/* Title and Script */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {detailScript.title}
            </h1>
            <p className="text-lg text-justify text-gray-700">
              {detailScript.script}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detailscript;
