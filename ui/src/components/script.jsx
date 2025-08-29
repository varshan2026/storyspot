import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Storyscript() {
  const [selectedCategory, setSelectedCategory] = useState(""); // "" = show all
  const [storyScript, setStoryScript] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 6;

  const uniqueCategory = [...new Set(storyScript.map(item => item.category))];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/story/");
      setStoryScript(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStories = selectedCategory
    ? storyScript.filter(item => item.category === selectedCategory)
    : storyScript;

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <section>
      <div className="container mx-auto px-4 mt-3">
        <div className="mx-6 my-5">
          <ul className="flex gap-x-8 cursor-pointer overflow-x-auto">
            <li
              className={`px-4 py-1.5 rounded-md border ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-black border-blue-500"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All
            </li>

            {uniqueCategory.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-1.5 rounded-md border ${
                  selectedCategory === item
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-black border-blue-500"
                }`}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-2">
          <div className="p-2 lg:p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentStories.map((data, index) => (
              <div
                key={index}
                className="mb-2 lg:mb-6 border-b border-gray-300 p-3 lg:p-4 lg:flex gap-x-6"
              >
                <img
                  src={data.image}
                  alt="story image"
                  className="w-full lg:w-42 h-32 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex flex-col">
                  <h5 className="text-lg font-semibold">{data.title}</h5>
                  <p className="text-gray-500 mb-2">
                    {data.script.split(" ").slice(0, 10).join(" ")}....
                  </p>
                  <Link to={`/scripts/${data._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 w-fit cursor-pointer">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Storyscript;
