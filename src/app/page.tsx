import EventSearchInput from "@/components/common/EventSearchInput";
import SeeMoreBtn from "@/components/common/SeeMoreBtn";
import { ArrowRightIcon, StarFilledIcon, TicketIcon } from "@/components/icons/Icon";
import { apiCall } from "./apiCall";
import { HomeDataInterface } from "@/lib/interfaces/HomeData.interface";
import Image from "next/image";
import { Helper } from "@/utils/helper/helper";

const Home = async () => {
  const Base_Url = `${process.env.NEXT_PUBLIC_BASE_URL}`
  const res: HomeDataInterface = await apiCall(`${process.env.NEXT_PUBLIC_FETCH_HOME_DATA}`)
  const categories = [
    "entertainment",
    "educational & business",
    "cultural & arts",
    "sports & fitness",
    "technology & innovation",
    "travel & adventure"
  ]

  const options = [
    "all", "today", "tomorrow", "this weekend", "free"
  ]

  const popularEvents = [
    {
      name: 'Lakeside Camping at Pawna',
      description: 'Adventure Geek - Explore the Unexplored, Mumbai',
      time: '8:30 AM - 7:30 PM',
      date: { month: 'Nov', day: '25 - 26' },
      ticket: "1,400",
      category: "Travel & Adventure",
      intrested: 14
    },
    {
      name: 'Lakeside Camping at Pawna',
      description: 'Adventure Geek - Explore the Unexplored, Mumbai',
      time: '8:30 AM - 7:30 PM',
      date: { month: 'Nov', day: '25 - 26' },
      ticket: "1,400",
      category: "Travel & Adventure",
      intrested: 14
    },
    {
      name: 'Lakeside Camping at Pawna',
      description: 'Adventure Geek - Explore the Unexplored, Mumbai',
      time: '8:30 AM - 7:30 PM',
      date: { month: 'Nov', day: '25 - 26' },
      ticket: "1,400",
      category: "Travel & Adventure",
      intrested: 14
    },
    {
      name: 'Lakeside Camping at Pawna',
      description: 'Adventure Geek - Explore the Unexplored, Mumbai',
      time: '8:30 AM - 7:30 PM',
      date: { month: 'Nov', day: '25 - 26' },
      ticket: "1,400",
      category: "Travel & Adventure",
      intrested: 14
    },
    {
      name: 'Lakeside Camping at Pawna',
      description: 'Adventure Geek - Explore the Unexplored, Mumbai',
      time: '8:30 AM - 7:30 PM',
      date: { month: 'Nov', day: '25 - 26' },
      ticket: "1,400",
      category: "Travel & Adventure",
      intrested: 14
    },
    {
      name: 'Lakeside Camping at Pawna',
      description: 'Adventure Geek - Explore the Unexplored, Mumbai',
      time: '8:30 AM - 7:30 PM',
      date: { month: 'Nov', day: '25 - 26' },
      ticket: "1,400",
      category: "Travel & Adventure",
      intrested: 14
    },
  ]

  return (
    <>
      <section className="w-full h-[500px] HeroBg">
        <div className="max-w-7xl w-full h-full mx-auto flex flex-col items-center justify-center  gap-3">
          <div className="h-[50%] flex justify-end items-center">
            <h1 className="text-[2.6rem] text-background font-semibold leading-13 tracking-wide">
              Don’t miss out! <br />
              Explore the <span className="text-yellow">vibrant events</span> happening locally and globally.
            </h1>
          </div>
          <EventSearchInput />
        </div>
      </section>
      <section className="py-4">
        <div className="wraperDiv text-dark-blue-gray py-2">
          <div>
            <h3 className="text-4xl font-semibold">
              Explore Categories
            </h3>
          </div>
          <div>
            <ul className="flex mt-5 py-3 items-center justify-between">
              {
                res.categories.map((item, idx) => {
                  return (
                    <li
                      className="flex flex-col items-center justify-center gap-2"
                      key={idx}
                    >
                      <div className="w-22 h-22 rounded-full bg-dark-gray">
                        <Image
                          src={`${Base_Url}/${item.image}`}
                          alt={item.name}
                          width={1000}
                          height={1000}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <span className="font-medium capitalize">{item.name}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="wraperDiv py-2">
          <div>
            <h3 className="text-4xl font-semibold">
              Popular Events in Mumbai
            </h3>
          </div>
          <div>
            <ul className="flex mt-5 items-center  gap-4">
              {
                options.map((item, idx) => {
                  return (
                    <li
                      className="flex flex-col cursor-pointer items-center justify-center gap-2 border border-light-gray text-light-gray px-5 rounded-full"
                      key={idx}
                    >
                      <span className="capitalize">{item}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div>
            <ul className="grid grid-cols-3 gap-10 mt-5 py-3">
              {
                res.locationEvents.map((item, idx) => {
                  const date = Helper.getMonthAndDates(item.startDate, item.endDate)
                  return (
                    <li
                      className="flex flex-col items-center justify-center gap-2"
                      key={idx}
                    >
                      <div className="w-full h-64 bg-dark-gray relative rounded-t-lg">
                        <div className="absolute capitalize bg-yellow px-3 py-1 text-dark-blue-gray font-semibold bottom-0 rounded-tr-md">
                          {item.category.name}
                        </div>
                      </div>
                      <div className="flex justify-between w-full gap-3">
                        <div>
                          <h5 className="text-[#4539B4] text-3xl font-medium">
                            {date.month}
                          </h5>
                          <h5 className="font-bold">
                            {date.date}
                          </h5>
                        </div>
                        <div className="w-full space-y-0.5 ">
                          <h3 className="font-medium text-lg line-clamp-1">{item.title}</h3>
                          <p className="line-clamp-1">{item.description}</p>
                          <span>
                            {item.startTime}
                          </span>
                          <div className="flex items-center gap-3">
                            {/* <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <TicketIcon /> {item.ticket}</h6> */}
                            {/* <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <StarFilledIcon /> {item.ticket}</h6> */}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <SeeMoreBtn />
        </div>
      </section>
      <section className="py-4">
        <div className="wraperDiv py-2">
          <div>
            <h3 className="text-4xl font-semibold">
              Discover Best of Online Events
            </h3>
          </div>
          <div>
            <ul className="grid grid-cols-3 gap-10 mt-5 py-3">
              {
                popularEvents.map((item, idx) => {
                  return (
                    <li
                      className="flex flex-col items-center justify-center gap-2"
                      key={idx}
                    >
                      <div className="w-full h-64 bg-dark-gray relative rounded-t-lg">
                        <div className="absolute bg-yellow px-3 py-1 text-dark-blue-gray font-semibold bottom-0 rounded-tr-md">
                          {item.category}
                        </div>
                      </div>
                      <div className="flex justify-between w-full gap-3">
                        <div>
                          <h5 className="text-[#4539B4] text-3xl font-medium">
                            {item.date.month}
                          </h5>
                          <h5 className="font-bold">
                            {item.date.day}
                          </h5>
                        </div>
                        <div className="w-full space-y-0.5">
                          <h3 className="font-medium text-lg line-clamp-2">{item.name}</h3>
                          <span>Online</span>
                          <br />
                          <span>
                            {item.time}
                          </span>
                          <div className="flex items-center gap-3">
                            <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <TicketIcon /> {item.ticket}</h6>
                            <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <StarFilledIcon /> {item.intrested} intrested</h6>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <SeeMoreBtn />
        </div>
      </section>
      <section className="max-w-6xl PersonalizerRecomBg h-64 mx-auto my-8">
        <div className="flex flex-col w-3xl mx-auto justify-center h-full text-dark-blue-gray space-y-3">
          <h5 className="text-3xl font-semibold">Events specially curated for you!</h5>
          <p className="text-lg">
            Get event suggestions tailored to your interests! Don't let your favorite events slip away.
          </p>
          <div className="w-full flex justify-center py-2">
            <button className="text-yellow flex items-center group justify-center gap-4 text-xl font-semibold bg-dark-blue-gray py-4 w-3xs rounded-md">
              Get Started
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRightIcon />
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="wraperDiv py-2">
          <div>
            <h3 className="text-4xl font-semibold">
              Trending Events around the World
            </h3>
          </div>
          <div>
            <ul className="grid grid-cols-3 gap-10 mt-5 py-3">
              {
                popularEvents.map((item, idx) => {
                  return (
                    <li
                      className="flex flex-col items-center justify-center gap-2"
                      key={idx}
                    >
                      <div className="w-full h-64 bg-dark-gray relative rounded-t-lg">
                        <div className="absolute bg-yellow px-3 py-1 text-dark-blue-gray font-semibold bottom-0 rounded-tr-md">
                          {item.category}
                        </div>
                      </div>
                      <div className="flex justify-between w-full gap-3">
                        <div>
                          <h5 className="text-[#4539B4] text-3xl font-medium">
                            {item.date.month}
                          </h5>
                          <h5 className="font-bold">
                            {item.date.day}
                          </h5>
                        </div>
                        <div className="w-full space-y-0.5">
                          <h3 className="font-medium text-lg line-clamp-2">{item.name}</h3>
                          <span>Online</span>
                          <br />
                          <span>
                            {item.time}
                          </span>
                          <div className="flex items-center gap-3">
                            <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <TicketIcon /> {item.ticket}</h6>
                            <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <StarFilledIcon /> {item.intrested} intrested</h6>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <SeeMoreBtn />
        </div>
      </section>
      <section className="Create_Event_CTA h-64 mx-auto my-8">
        <div className="flex flex-col w-3xl mx-auto justify-center h-full text-yellow space-y-3">
          <h5 className="text-3xl font-semibold">Create an event with Eventify</h5>
          <p className="text-lg">
            Got a show, event, activity or a great experience? Partner with us & get listed on Eventify
          </p>
          <div className="w-full flex justify-center py-2">
            <button className="flex text-dark-blue-gray items-center group justify-center gap-4 text-xl font-semibold bg-yellow py-4 w-3xs rounded-md">
              Get Started
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRightIcon />
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="bg-yellow h-64 mx-auto mt-8">
        <div className="flex items-center max-w-6xl mx-auto justify-center h-full text-dark-blue-gray space-y-3">
          <div className="w-full">
            <h5 className="text-3xl font-semibold">Subscribe to our Newsletter</h5>
            <p className="text-lg">
              Receive our weekly newsletter & updates with new events from your favourite organizers & venues.
            </p>
          </div>
          <div className="w-full flex justify-center px-2 ">
            <input
              type="text"
              placeholder="Enter your e-mail address"
              className="bg-white w-full rounded-l-md outline-none px-2"
            />
            <button className="flex bg-dark-blue-gray items-center group justify-center gap-4 text-xl font-semibold text-yellow py-3 w-[150px] rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;