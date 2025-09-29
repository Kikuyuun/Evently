import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPeso } from '../lib/setupExampleData';

const SeatSelection = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrices] = useState({
    'VIP': 6000,
    'Premium': 4000,
    'Standard': 2250,
    'Economy': 1250
  });

  // Mock seat data - in a real app, this would come from an API
  const seatMap = {
    'VIP': [
      { id: 'A1', row: 'A', number: 1, available: true, price: 6000 },
      { id: 'A2', row: 'A', number: 2, available: true, price: 6000 },
      { id: 'A3', row: 'A', number: 3, available: false, price: 6000 },
      { id: 'A4', row: 'A', number: 4, available: true, price: 6000 },
      { id: 'A5', row: 'A', number: 5, available: true, price: 6000 },
    ],
    'Premium': [
      { id: 'B1', row: 'B', number: 1, available: true, price: 4000 },
      { id: 'B2', row: 'B', number: 2, available: true, price: 4000 },
      { id: 'B3', row: 'B', number: 3, available: true, price: 4000 },
      { id: 'B4', row: 'B', number: 4, available: false, price: 4000 },
      { id: 'B5', row: 'B', number: 5, available: true, price: 4000 },
      { id: 'B6', row: 'B', number: 6, available: true, price: 4000 },
    ],
    'Standard': [
      { id: 'C1', row: 'C', number: 1, available: true, price: 2250 },
      { id: 'C2', row: 'C', number: 2, available: true, price: 2250 },
      { id: 'C3', row: 'C', number: 3, available: true, price: 2250 },
      { id: 'C4', row: 'C', number: 4, available: true, price: 2250 },
      { id: 'C5', row: 'C', number: 5, available: false, price: 2250 },
      { id: 'C6', row: 'C', number: 6, available: true, price: 2250 },
      { id: 'C7', row: 'C', number: 7, available: true, price: 2250 },
      { id: 'C8', row: 'C', number: 8, available: true, price: 2250 },
    ],
    'Economy': [
      { id: 'D1', row: 'D', number: 1, available: true, price: 25 },
      { id: 'D2', row: 'D', number: 2, available: true, price: 25 },
      { id: 'D3', row: 'D', number: 3, available: true, price: 25 },
      { id: 'D4', row: 'D', number: 4, available: true, price: 25 },
      { id: 'D5', row: 'D', number: 5, available: true, price: 25 },
      { id: 'D6', row: 'D', number: 6, available: true, price: 25 },
      { id: 'D7', row: 'D', number: 7, available: true, price: 25 },
      { id: 'D8', row: 'D', number: 8, available: true, price: 25 },
      { id: 'D9', row: 'D', number: 9, available: true, price: 25 },
      { id: 'D10', row: 'D', number: 10, available: true, price: 25 },
    ]
  };

  const handleSeatClick = (seat) => {
    if (!seat.available) return;
    
    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const getSeatStatus = (seat) => {
    if (!seat.available) return 'occupied';
    if (selectedSeats.find(s => s.id === seat.id)) return 'selected';
    return 'available';
  };

  const SeatButton = ({ seat, section }) => (
    <button
      onClick={() => handleSeatClick(seat)}
      disabled={!seat.available}
      className={`
        w-8 h-8 text-xs font-medium rounded transition-all duration-200
        ${getSeatStatus(seat) === 'occupied' 
          ? 'bg-white/20 text-white/50 cursor-not-allowed border border-white/20' 
          : getSeatStatus(seat) === 'selected'
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-blue-400'
          : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:border-blue-400 hover:bg-blue-500/20'
        }
      `}
    >
      {seat.number}
    </button>
  );

  return (
    <main className="flex flex-1 justify-center p-5 sm:p-10">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <Link to={`/event/${id}`} className="text-blue-400 hover:text-blue-300 transition-colors duration-300">← Back to Event Details</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-white mb-6 text-shadow-sm">Select Your Seats</h1>
            
            {/* Stage */}
            <div className="text-center mb-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg py-4 px-8 inline-block">
                <span className="text-white font-medium">STAGE</span>
              </div>
            </div>

            {/* Seat Map */}
            <div className="space-y-6">
              {Object.entries(seatMap).map(([section, seats]) => (
                <div key={section} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{section} Section</h3>
                    <span className="text-sm text-white/70">{formatPeso(seatPrices[section])} each</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {seats.map((seat) => (
                      <SeatButton key={seat.id} seat={seat} section={section} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded"></div>
                <span className="text-white/70">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                <span className="text-white/70">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white/20 border border-white/20 rounded"></div>
                <span className="text-white/70">Occupied</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 sticky top-4 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 text-shadow-sm">Booking Summary</h2>
              
              {selectedSeats.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Selected Seats:</h3>
                    <div className="space-y-1">
                      {selectedSeats.map((seat) => (
                        <div key={seat.id} className="flex justify-between text-sm">
                          <span className="text-white/70">{seat.id}</span>
                          <span className="text-white">{formatPeso(seat.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-white">Total:</span>
                      <span className="text-blue-400">{formatPeso(getTotalPrice())}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/booking/${id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center block"
                  >
                    Continue to Payment
                  </Link>
                </div>
              ) : (
                <div className="text-center text-white/70">
                  <svg className="w-12 h-12 mx-auto mb-2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <p>Select seats to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeatSelection;
