import EventCard from "@/components/common/home/EventCard";
import HomeSlider from "@/components/common/home/HomeSlider"
import MostSalledEvents from "@/components/common/home/MostSellEvents";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <section className="py-3">
        <div className="py-3 max-w-7xl w-full mx-auto">
          <div className="py-2">
            <div className="py-3">
              <h3 className="text-4xl font-medium text-center pb-3">
                Top Booked Events
              </h3>
            </div>
            <MostSalledEvents
              events={Array.from({ length: 6 }).map((_, idx) => (
                <EventCard key={idx} />
              ))}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;