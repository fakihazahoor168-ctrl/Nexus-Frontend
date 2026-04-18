import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff, MonitorUp, Settings, MessageSquare, Users, MoveHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export const VideoCallPage: React.FC = () => {
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenShareOn, setScreenShareOn] = useState(false);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-2xl relative animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 text-white z-10 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">Deal Negotiation - TechWave AI</h2>
          <p className="text-xs text-gray-400">Quarterly Investment Review</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge text={inCall ? "04:23" : "Not Started"} active={inCall} />
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Users size={18} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <MessageSquare size={18} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Settings size={18} />
          </Button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 p-4 flex items-center justify-center relative bg-black/50">
        {!inCall ? (
          <div className="text-center">
            <Avatar 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
              alt="Ready" 
              size="xl" 
              className="mx-auto h-32 w-32 border-4 border-gray-700 mb-6"
            />
            <h3 className="text-2xl font-semibold text-white mb-2">Ready to join?</h3>
            <p className="text-gray-400 mb-8">No one else is here yet.</p>
            <Button 
              size="lg" 
              className="px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all hover:scale-105"
              onClick={() => setInCall(true)}
              leftIcon={<Video size={20} />}
            >
              Start Call
            </Button>
          </div>
        ) : (
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Video */}
            <div className={`relative rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center border-2 transition-all ${videoOn ? 'border-primary-500/30' : 'border-gray-700'} shadow-lg group`}>
              {videoOn ? (
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" 
                  alt="You" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Avatar src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" alt="You" size="lg" className="h-24 w-24 mb-4" />
                  <span className="text-white text-lg">You</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg text-white text-sm backdrop-blur-md flex items-center gap-2">
                You {!micOn && <MicOff size={14} className="text-error-500" />}
              </div>
            </div>

            {/* Other Participant */}
            <div className="relative rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-lg group">
              {screenShareOn ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-blue-900/20 text-blue-400 border border-blue-500/30">
                   <MonitorUp size={48} className="mb-4" />
                   <p className="text-lg font-medium">Viewing TechWave's Screen</p>
                </div>
              ) : (
                <img 
                  src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg" 
                  alt="Sarah Investor" 
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg text-white text-sm backdrop-blur-md flex items-center gap-2">
                Sarah (TechWave AI)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-4 px-6 z-10 shadow-[0_-4px_25px_rgba(0,0,0,0.5)]">
        <ControlButton 
          active={micOn} 
          icon={micOn ? <Mic size={22} /> : <MicOff size={22} />} 
          onClick={() => setMicOn(!micOn)} 
          activeClass="bg-gray-700 hover:bg-gray-600 text-white"
          inactiveClass="bg-error-500 hover:bg-error-600 text-white"
        />
        <ControlButton 
          active={videoOn} 
          icon={videoOn ? <Video size={22} /> : <VideoOff size={22} />} 
          onClick={() => setVideoOn(!videoOn)} 
          activeClass="bg-gray-700 hover:bg-gray-600 text-white"
          inactiveClass="bg-error-500 hover:bg-error-600 text-white"
        />
        
        <div className="w-px h-8 bg-gray-700 mx-2"></div>
        
        <ControlButton 
          active={!screenShareOn} 
          icon={<MonitorUp size={22} />} 
          onClick={() => inCall && setScreenShareOn(!screenShareOn)} 
          activeClass="bg-gray-700 hover:bg-gray-600 text-white"
          inactiveClass="bg-primary-600 hover:bg-primary-700 text-white"
          disabled={!inCall}
        />
        <ControlButton 
          active={true} 
          icon={<MoveHorizontal size={22} />} 
          onClick={() => {}} 
          activeClass="bg-gray-700 hover:bg-gray-600 text-white z-0"
          inactiveClass=""
        />

        <div className="w-px h-8 bg-gray-700 mx-2"></div>

        {inCall ? (
          <button 
            className="h-12 px-6 rounded-full bg-error-500 hover:bg-error-600 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-error-500/20 hover:scale-105"
            onClick={() => {
              setInCall(false);
              setScreenShareOn(false);
            }}
          >
            <PhoneOff size={22} />
            <span className="font-medium">End Call</span>
          </button>
        ) : (
          <button 
            className="h-12 w-12 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center cursor-not-allowed"
            disabled
          >
            <Phone size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

const ControlButton = ({ active, icon, onClick, activeClass, inactiveClass, disabled = false }: any) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`h-12 w-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
      disabled ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-500' : 
      active ? activeClass : inactiveClass
    }`}
  >
    {icon}
  </button>
);

const Badge = ({ text, active }: { text: string, active: boolean }) => (
  <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
    {active && <span className="w-2 h-2 rounded-full bg-error-500 animate-pulse" />}
    <span className="text-xs font-medium text-gray-300">{text}</span>
  </div>
);
