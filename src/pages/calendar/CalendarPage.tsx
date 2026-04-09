import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Clock, Users, Calendar as CalendarIcon, CheckCircle2, XCircle, ChevronRight, Plus, MapPin } from 'lucide-react';

type MeetingStatus = 'confirmed' | 'pending' | 'cancelled';

interface Meeting {
  id: string;
  title: string;
  with: string;
  date: Date;
  time: string;
  status: MeetingStatus;
  type: 'received' | 'sent' | 'confirmed';
}

export const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState('09:00');

  // MOCK DATA
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Initial Seed Pitch',
      with: 'Acme Ventures',
      date: new Date(),
      time: '10:00 AM - 11:00 AM',
      status: 'confirmed',
      type: 'confirmed'
    },
    {
      id: '2',
      title: 'Product Review Sync',
      with: 'Sarah Jenkins',
      date: new Date(),
      time: '02:00 PM - 02:45 PM',
      status: 'pending',
      type: 'received'
    },
    {
      id: '3',
      title: 'Follow-up on Series A',
      with: 'TechGrowth Partners',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: '11:00 AM - 12:00 PM',
      status: 'pending',
      type: 'sent'
    }
  ]);

  const [availabilitySlots, setAvailabilitySlots] = useState<string[]>([
    '09:00 AM - 10:00 AM',
    '01:00 PM - 02:00 PM',
    '04:00 PM - 05:00 PM'
  ]);

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  const handleAcceptMeeting = (id: string) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: 'confirmed', type: 'confirmed' } : m));
  };

  const handleDeclineMeeting = (id: string) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: 'cancelled' } : m));
  };

  const handleAddSlot = () => {
    if (selectedTime) {
      setAvailabilitySlots([...availabilitySlots, `${selectedTime} - ${selectedTime.replace(/(\d+):/, (m, p1) => String(parseInt(p1) + 1).padStart(2, '0') + ':')}`]);
      setShowAddSlot(false);
    }
  };

  const getFilteredMeetings = () => meetings.filter(m => 
    m.date.getDate() === date.getDate() &&
    m.date.getMonth() === date.getMonth() &&
    m.date.getFullYear() === date.getFullYear()
  );

  return (
    <div className="space-y-6 slide-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-primary-600" />
            Scheduling & Calendar
          </h1>
          <p className="text-gray-500 mt-1">Manage your availability and upcoming meetings</p>
        </div>
        <button 
          onClick={() => setShowAddSlot(!showAddSlot)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
        >
          <Plus size={18} />
          Add Availability
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Calendar & Availability */}
        <div className="lg:col-span-4 space-y-6">
          {/* Custom styled Calendar Container */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Calendar 
              onChange={handleDateChange} 
              value={date}
              className="premium-calendar w-full border-0 !bg-transparent"
              tileClassName={({ date: d }) => {
                const hasMeeting = meetings.some(m => 
                  m.date.getDate() === d.getDate() && 
                  m.date.getMonth() === d.getMonth()
                );
                return hasMeeting ? 'has-meeting' : '';
              }}
            />
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock size={18} className="text-primary-500" />
                Availability for {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </h3>
            </div>
            
            {showAddSlot && (
              <div className="mb-4 animate-fade-in bg-gray-50/80 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                <input 
                  type="time" 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="bg-white border text-sm border-gray-200 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                />
                <button 
                  onClick={handleAddSlot}
                  className="bg-primary-600 text-white p-2.5 rounded-lg hover:bg-primary-700 transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            )}

            <div className="space-y-3">
              {availabilitySlots.map((slot, idx) => (
                <div key={idx} className="group flex justify-between items-center p-3 rounded-xl hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-all">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{slot}</span>
                  <button className="text-gray-400 group-hover:text-error-500 transition opacity-0 group-hover:opacity-100">
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
              {availabilitySlots.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No availability set</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Meetings & Requests */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Users size={48} />
                </div>
                <h4 className="text-primary-100 font-medium text-sm mb-1">Confirmed</h4>
                <p className="text-3xl font-bold">{meetings.filter(m => m.status === 'confirmed').length}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                <h4 className="text-gray-500 font-medium text-sm mb-1">Pending Requests</h4>
                <p className="text-3xl font-bold text-gray-900">{meetings.filter(m => m.status === 'pending').length}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                <h4 className="text-gray-500 font-medium text-sm mb-1">Next Meeting In</h4>
                <p className="text-3xl font-bold text-gray-900 text-primary-600">2h 15m</p>
              </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
              <span>Schedule for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <span className="bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full font-medium">
                {getFilteredMeetings().length} Meetings
              </span>
            </h2>

            <div className="space-y-4">
              {getFilteredMeetings().length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No meetings scheduled for this day</p>
                  <p className="text-gray-400 text-sm mt-1">Enjoy your free time!</p>
                </div>
              ) : (
                getFilteredMeetings().map(meeting => (
                  <div key={meeting.id} className={`p-5 rounded-2xl border transition-all duration-300 ${meeting.status === 'confirmed' ? 'bg-white border-gray-100 shadow-sm hover:shadow-md' : 'bg-orange-50/50 border-orange-100'}`}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      
                      <div className="flex items-start gap-4">
                        <div className={`w-2 h-12 rounded-full ${meeting.status === 'confirmed' ? 'bg-primary-500' : 'bg-orange-400'}`}></div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">{meeting.time}</span>
                            {meeting.status === 'confirmed' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                                <CheckCircle2 size={10} /> Confirmed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                                Pending {meeting.type === 'sent' ? '(Sent)' : '(Action Req)'}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{meeting.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5 font-medium"><Users size={14} className="text-gray-400"/> {meeting.with}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400"/> Google Meet</span>
                          </div>
                        </div>
                      </div>

                      {meeting.type === 'received' && meeting.status === 'pending' && (
                        <div className="flex gap-2 sm:mt-0 mt-3 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                          <button 
                            onClick={() => handleDeclineMeeting(meeting.id)}
                            className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                          >
                            Decline
                          </button>
                          <button 
                            onClick={() => handleAcceptMeeting(meeting.id)}
                            className="flex-1 sm:flex-none px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 shadow-sm transition"
                          >
                            Accept
                          </button>
                        </div>
                      )}
                      
                      {meeting.status === 'confirmed' && (
                        <button className="hidden sm:flex text-primary-600 hover:bg-primary-50 p-2 rounded-full transition">
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
