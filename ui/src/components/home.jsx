import banner from '../assets/banner.svg';
import {Link} from 'react-router-dom'

function StoryHome() {
  return (
    <section className="px-4 py-10 lg:px-15">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-5 lg:gap-2 h-full lg:h-[80vh]">
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-black leading-tight mb-4">
            Ignite Your Words<br />
            <span className="text-blue-600">Dream. Wonder. Rest.</span>
          </h1>
          <p className="text-gray-900 text-md text-justify mb-6 px-1.5 lg:px-3">
            Bedtime stories spark imagination, nurture kindness, and guide little
            hearts — all in one gentle moment before sleep. Whether it’s playful
            adventures, magical journeys, or quiet lessons of love, each story is
            kept safe and ready to carry children into sweet dreams.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition">
              <Link to={'/scripts'}>Get Started</Link>
            </button>
            <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="w-full">
          <img
            src={banner}
            alt="Banner"
          />
        </div>
      </div>
    </section>
  );
}

export default StoryHome;
