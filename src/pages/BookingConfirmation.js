import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookingConfirmation = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Mock booking data - in a real app, this would come from the booking flow
  const bookingData = {
    event: {
      title: "Live Music Extravaganza",
      date: "2024-03-15",
      time: "8:00 PM",
      venue: "Madison Square Garden"
    },
    seats: [
      { id: 'A1', section: 'VIP', price: 120 },
      { id: 'A2', section: 'VIP', price: 120 }
    ],
    total: 240
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <main className="flex flex-1 justify-center p-5 sm:p-10">
        <div className="w-full max-w-2xl">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">check</span>
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Booking Confirmed!</h1>
              <p className="text-zinc-600 dark:text-zinc-300">Your tickets have been successfully booked.</p>
            </div>
            
            <div className="bg-white/10 dark:bg-black/10 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Booking Details</h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">Event:</span>
                  <span className="text-zinc-900 dark:text-zinc-50 font-medium">{bookingData.event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">Date & Time:</span>
                  <span className="text-zinc-900 dark:text-zinc-50">{new Date(bookingData.event.date).toLocaleDateString()} at {bookingData.event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">Venue:</span>
                  <span className="text-zinc-900 dark:text-zinc-50">{bookingData.event.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">Seats:</span>
                  <span className="text-zinc-900 dark:text-zinc-50">{bookingData.seats.map(s => s.id).join(', ')}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-300 dark:border-zinc-600 pt-3">
                  <span className="text-zinc-900 dark:text-zinc-50 font-bold">Total Paid:</span>
                  <span className="text-primary font-bold">${bookingData.total}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                A confirmation email has been sent to {formData.email}
              </p>
              <Link 
                to="/"
                className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse More Events
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 justify-center p-5 sm:p-10">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Link to={`/event/${id}/seats`} className="text-blue-400 hover:text-blue-300 transition-colors duration-300">← Back to Seat Selection</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-6 text-shadow-sm">Complete Your Booking</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Payment Information</h2>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Billing Address</label>
                  <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing Payment...' : 'Complete Booking'}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white/10 dark:bg-black/10 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{bookingData.event.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {new Date(bookingData.event.date).toLocaleDateString()} at {bookingData.event.time}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{bookingData.event.venue}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">Selected Seats:</h4>
                  <div className="space-y-1">
                    {bookingData.seats.map((seat) => (
                      <div key={seat.id} className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-300">{seat.id} ({seat.section})</span>
                        <span className="text-zinc-900 dark:text-zinc-50">${seat.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-zinc-300 dark:border-zinc-600 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-zinc-900 dark:text-zinc-50">Total:</span>
                    <span className="text-primary">${bookingData.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingConfirmation;
