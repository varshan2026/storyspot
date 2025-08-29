import { useState, useEffect } from "react";
import { SquarePen, Trash2, Search, CirclePlus, CircleX  } from "lucide-react";
import axios from "axios";

function Admin() {
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null)

  const [formData, setFormData] = useState({
    title:'',
    author:'',
    category:'',
    imageUrl:'',
    script:''
  })

  const handleChange = (e) => {
    const{name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if(editId){
        const modify = await axios.put(`http://127.0.0.1:3000/story/${editId}`, formData);
        setAdminData(prev =>
        prev.map(item =>
          item._id === editId ? { ...item, ...formData } : item
        ));
        setEditId(null)
        setFormData({
          title:'',
          author:'',
          category:'',
          imageUrl:'',
          script:''
        });
        setOpenForm(!openForm)
      }else{
        const response = await axios.post(`http://127.0.0.1:3000/story`,formData)
        setFormData({
          title:'',
          author:'',
          category:'',
          imageUrl:'',
          script:''
        });
        setAdminData((prev) => ([...prev, response.data]))
        setOpenForm(!openForm)
      }}catch(e){
      console.log(e.message)
    }
  }

  const handleDelete = async(Id) => {
    await axios.delete(`http://127.0.0.1:3000/story/${Id}`)
    setAdminData(prev => prev.filter(item => item._id !== Id))
  }

  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:3000/story/");
    setAdminData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = adminData.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.author.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="px-4 relative">
      <div className="hidden lg:block">
        <div className="border border-gray-300 flex items-center gap-x-2 rounded-3xl px-4 max-w-4xl mx-auto my-8">
          <label>
            <Search />
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="The Brave..."
            className="w-full focus:outline-0 py-2"
          />
        </div>

        <div className="flex gap-6 items-start max-w-7xl mx-auto">
          <div className="overflow-y-auto max-h-[435px] border border-gray-300 rounded flex-4">
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="py-3">S.No</th>
                  <th className="py-3">Title</th>
                  <th className="py-3">Author</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">ImageUrl</th>
                  <th className="py-3">Edit</th>
                  <th className="py-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  filterData.length === 0?(
                    <tr>
                      <td colSpan="7" className="py-6 text-2xl text-gray-500 text-center">
                        No Story uploaded
                      </td>
                    </tr>
                  ):
                  (
                    filterData.map((item, index) => (
                      <tr key={index} className="even:bg-gray-100">
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">{item.title}</td>
                        <td className="py-3">{item.author}</td>
                        <td className="py-3">{item.category}</td>
                        <td className="py-3">{item.image?.slice(0, 22)}.....</td>
                        <td className="py-3 align-middle cursor-pointer">
                          <div className="flex justify-center items-center">
                            <SquarePen size={22} color={"#eb7100"} 
                              onClick={() => {
                                setEditId(item._id);
                                setFormData({
                                  title:item.title,
                                  author:item.author,
                                  category: item.category,
                                  imageUrl: item.image,
                                  script: item.script
                                });
                                setOpenForm(!openForm)
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-3 align-middle cursor-pointer">
                          <div className="flex justify-center items-center">
                            <Trash2 size={22} color={"#df0101"} onClick={() => handleDelete(item._id)}/>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                }
              
              </tbody>
            </table>
          </div>

          <div className="w-64 bg-gray-100 p-6 flex-1 flex flex-col gap-6 rounded-md">
            <div 
              onClick={() => setOpenForm(!openForm)}
              className="border-2 border-dashed border-gray-800 rounded-md p-6 flex justify-center cursor-pointer"
            >
              <button 
                className="flex items-center gap-2 text-black cursor-pointer"
              >
                <CirclePlus size={28} />
                Add Story
              </button>
            </div>

            <div className="p-6 bg-gray-50 flex flex-col justify-center items-center rounded-md">
              <p className="text-gray-800 text-lg">Total Story</p>
              <h1 className="text-5xl text-black font-semibold">{adminData.length}</h1>
            </div>

            <div className="p-6 bg-gray-50 flex flex-col justify-center items-center rounded-md">
              <p className="text-gray-800 text-lg">Total Likes</p>
              <h1 className="text-5xl text-black font-semibold">225</h1>
            </div>
          </div>
        </div>

        {openForm && <div className="fixed inset-0 bg-black opacity-75 transition-all duration-300 ease-in-out"></div>}

        <div className={`fixed top-0 h-screen w-full max-w-md transition-all duration-300 ease-in-out ${openForm?'-right-0':'-right-800'}`}>
          <div className="absolute right-10 top-5">
            <CircleX 
              size={29} 
              onClick={() => setOpenForm(!openForm)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-8 bg-white border border-gray-300 py-15 px-15 max-w-md h-full rounded-tl-[10%] rounded-bl-[10%]">
            <h1 className="text-blue-600 text-4xl font-bold text-center">
              Story<span className="text-black">Spot</span>
            </h1>
            <div className="border border-gray-300 bg-gray-50 rounded-sm">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="focus:outline-0 w-full p-1.5  placeholder:text-sm"
              />
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-sm">
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="focus:outline-0 w-full p-1.5 placeholder:text-sm"
              />
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-sm">
              <select
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="focus:outline-0 w-full p-1.5 placeholder:text-sm"
              >
                <option value="" disabled selected >Select Option</option>
                <option value="friendship">Friendship</option>
                <option value="adventure">Adventure</option>
                <option value="hope">Hope</option>
                <option value="trust">Trust</option>
                <option value="confidence">Confidence</option>
              </select>
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-sm">
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="focus:outline-0 w-full p-1.5 placeholder:text-sm"
              />
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-sm">
              <textarea
                rows={5}
                name="script"
                value={formData.script}
                onChange={handleChange}
                placeholder="Story Script"
                className="focus:outline-0 w-full p-1.5 placeholder:text-sm"
              ></textarea>
            </div>
            <div>
              <button 
                onClick={handleSubmit}
                className="bg-blue-800 text-white w-full p-2 text-xl font-semibold rounded-sm cursor-pointer"
              >
                {editId?"Update Story":"Save Story"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <h1>Admin - Not Availabe in mobile, only desktop</h1>
      </div>
    </section>
  );
}

export default Admin;
