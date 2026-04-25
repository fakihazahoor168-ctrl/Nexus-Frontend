import React, { useState } from 'react';
import { Joyride, CallBackProps, STATUS, Step } from 'react-joyride';

export const Walkthrough: React.FC = () => {
  const [run, setRun] = useState(true);

  const steps: Step[] = [
    {
      target: 'body',
      content: 'Welcome to Business Nexus! Let us show you around our new features.',
      placement: 'center',
    },
    {
      target: '.walkthrough-dashboard',
      content: 'This is your dashboard where you can see an overview of your activity.',
    },
    {
      target: '.walkthrough-payments',
      content: 'Manage your deposits, transfers, and wallet balance securely in our new Payments module.',
    },
    {
      target: '.walkthrough-documents',
      content: 'The Document Chamber provides secure file upload, e-signatures, and contract tracking.',
    },
    {
      target: '.walkthrough-meetings',
      content: 'Launch instant WebRTC video calls directly from your browser to connect with partners.',
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#0284c7', // Matches primary-600 logic
        },
      }}
    />
  );
};
