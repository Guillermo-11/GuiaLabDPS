import React, { useState } from 'react';
import StepScreen from './StepScreen';

const StepsScreen = ({ steps, navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  return (
    <StepScreen
      step={steps[currentStep].step}
      description={steps[currentStep].description}
      image={steps[currentStep].image}
      onNextStep={handleNextStep}
    />
  );
};

export default StepsScreen;
