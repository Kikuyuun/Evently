import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPeso } from '../lib/setupExampleData';
import { supabase } from '../lib/supabaseClient';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Error fetching events:', error);
        setEvents([]); // Show empty state instead of fallback
      } else {
        setEvents(data || []); // Show empty array if no data
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]); // Show empty state instead of fallback
    } finally {
      setLoading(false);
    }
  };

  const getStaticEvents = () => [
    {
      id: 1,
      title: "Live Music Extravaganza",
      description: "Experience the energy of live music with top artists.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf6PDzACB6AblgLy5UJM5L36jgaFPv31BRMOgSroMkoekzzMLeQt-rKrVCejgDbTt8ICpsoqngGEM3_KnuBMeWqsI8_ryv5UPmJSKh6EEt6KZdDGG7Z5-jcwascPQLjryyXa3cIa-kLjMwk4IdUWpBVsUZrZ2wWuh1lqDmN-QTIfOyQ4iaUH77TvjTdf_gfagvuYTa4CrqhAqjYdy75xcsoPhuWz_gvDsEtjOplW0pEl05_H67PqPrymc3h9t6HZyGTXZk11JV3Oq-",
      date: "2024-03-15",
      venue: "Madison Square Garden",
      price: 2250.00
    },
    {
      id: 2,
      title: "Summer Music Festival",
      description: "Join us for a weekend of music, fun, and community.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaDVOhA6-YP9IS6zKf7RUesYJVLibr6RvrxMDeaJi-MwTI4DuX-ZZhRI_Ire1ucNrpc_4rh6JCzUjU5lpYvCLEewBJwrKNzQsgMOfflPb9dxva0awHRGq-0aAeVQaCKtmEXmWL8jNxLYG90pDLi_cwWL_11wcIHP1GLNFqwrAcy_rMTywYxi5h6J_RFfiOlUs2KBtAKlGpHwk92XgKjvc5rrJYCNatcgA5qCeVM3L_LCA6GzSXuyiaBL8dpd39Wkd8K1pdrttvFxMs",
      date: "2024-07-20",
      venue: "Central Park",
      price: 3750.00
    },
    {
      id: 3,
      title: "Nightlife Experience",
      description: "Dance the night away at the hottest clubs in town.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbawe3uZdvxKPKMcuKCS-xBn-xiQfEkffz_5vjxX8SqQcFE_WZGScdY1PdhYEIkoIS_LVxPrbrat0I96OVmeNJ90vE7ffLQVTcdZW-KfZx0qzb3kD514ZtM0nInMCOnP7cggLrVcQbVaClnKdSDoMBWJHrFYIimDncUGoem40LiKpcg1kC3IkJwNbAXrKwGcPZQKZWknafUGHMSQXfkBit0OUVOpCFWX3OOuZWPZz3NQEOfsI2lBkYRUvOtYcNXVcjFNNKcGA9pdDq",
      date: "2024-04-10",
      venue: "Club XYZ",
      price: 1500.00
    },
    {
      id: 4,
      title: "Art & Culture Showcase",
      description: "Explore a diverse collection of contemporary art.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuJOvg7cM9V-2jGpwdZlwWSC_GNJ-mhvEBPpcl0oxvlDXkRFY6YbWaKxKOHBXdm3VYb6LLHncK6vG18ltYS14cPo_vUD00yGZmWb2wrzUt0WG8ToFBN-tr0Xjxbwd2Ekv-aqDlIcc_DiKJi2O7rzyF8708lfe9EoVX3wSVsafHPHxukGZJ3Fy5gp_Ct1-NPERzcm2AdIz22FB0V4mrAZpeGM7xf2hOzfn-uaTM5pzYjbA3NGR83iBkEAvKFP7Yfyt794bECs8T50-j",
      date: "2024-05-18",
      venue: "Metropolitan Museum",
      price: 1250.00
    }
  ];

  if (loading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-2xl font-bold text-white text-shadow-sm">Featured Events</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  // Show empty state if no events
  if (events.length === 0) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-2xl font-bold text-white text-shadow-sm">Featured Events</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-white/50 text-lg mb-4">No events available</div>
          <p className="text-white/40 text-sm">Check back later for exciting events!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-bold text-white text-shadow-sm">Featured Events</h2>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-2 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-2 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="flex snap-x snap-mandatory overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-6">
            {events.map((event) => (
              <div key={event.id} className="w-72 shrink-0 snap-center">
                <Link to={`/event/${event.id}`}>
                  <div className="group overflow-hidden rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-40 w-full overflow-hidden">
                      <img 
                        alt={event.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        src={event.image_url || event.image} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white">{event.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{event.description}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span className="font-semibold text-blue-400">{formatPeso(event.price)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
