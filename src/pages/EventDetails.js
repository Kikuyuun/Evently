import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();

  // MVP mock data (replace with API data later)
  const event = {
    id: id || '1',
    title: 'Tech Conference 2024',
    subtitle: 'Join us for a day of innovation and networking with industry leaders.',
    dateTime: 'October 26, 2024, 9:00 AM - 5:00 PM',
    venue: 'Grand Convention Center, City Center',
    about:
      `The Tech Conference 2024 is a premier event for technology professionals, entrepreneurs, and enthusiasts. This year's conference will feature keynote speeches from renowned tech innovators, interactive workshops, and networking opportunities. Explore the latest trends in AI, cybersecurity, and cloud computing. Engage with thought leaders and peers to exchange ideas and forge new collaborations. Don't miss this chance to be part of the future of technology.`,
    seatingChart:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQhp_6X98-jEuraODPNvelkE3IAv9vBJhtjrbebYVZ42zinZmEppgtWQTuQRs3roWIEIxPs0pd9tMkc2_5d2k4Vr0tmENgF3p0M7K0tQCdpM72G_XoeII1eptxBTEBOC1EZQH06WzvMlnai8Lt_F7Ha7uXy7qqTLZVpJfU6DbZNdqyrEtY3E6sQwEQtnVMui5va62jNVw5x8eWqcBpl0MFsVf3tBebk2LanzkqvCo5ab9xDbmXZD_sEIK_DckdWZdGyb2TOjUPylu_'
  };

  return (
    <main className="flex flex-1 justify-center p-5 sm:p-10">
      <div className="w-full max-w-5xl">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <p className="text-sm text-white/70">
            <Link className="hover:text-blue-400 transition-colors duration-300" to="/">Events</Link>
            <span className="mx-2">/</span>
            <span>{event.title}</span>
          </p>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2 text-shadow-sm">{event.title}</h1>
          <p className="text-lg text-white/80">{event.subtitle}</p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="md:col-span-2">
            {/* Event Details */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl mb-8 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-white text-shadow-sm">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Date & Time</p>
                    <p className="text-sm text-white/70">{event.dateTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Venue</p>
                    <p className="text-sm text-white/70">{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl mb-8 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-white text-shadow-sm">About the Event</h2>
              <p className="text-white/80 leading-relaxed">{event.about}</p>
            </div>

            {/* Seating Chart */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-white text-shadow-sm">Seating Chart</h2>
              <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div
                  className="aspect-video bg-cover bg-center rounded"
                  style={{ backgroundImage: `url(${event.seatingChart})` }}
                />
                <div className="mt-4 text-center text-sm text-white/60">Stage</div>
              </div>
            </div>
          </div>

          {/* Right: Reserve CTA */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-4 text-white text-shadow-sm">Reserve Your Seat</h3>
              <p className="text-sm text-white/70 mb-6">Select your preferred seat from the chart and proceed to checkout.</p>
              <Link
                to={`/event/${event.id}/seats`}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Reserve Seats
              </Link>
              <div className="mt-4 text-xs text-center text-white/60">
                <p>Secure online payment.</p>
                <p>Tickets are non-refundable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
