import { Cancel, Send } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import AddDetails from './addDetails/AddDetails';
import AddImages from './addImages/AddImages';  
import AddLocation from './addLocation/AddLocation';
import { clearPin, createPin, updatePin } from '../../actions/pin';
import { useNavigate } from 'react-router-dom';

const AddPin = () => {
  const {
    state: { images, details, location, currentUser, updatedPin ,  deletedImages,
      addedImages},
    dispatch,
  } = useValue();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false },
  ]);
  const [showSubmit, setShowSubmit] = useState(false);


  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      const stepIndex = findUnfinished();
      if (stepIndex !== -1) setActiveStep(stepIndex);
    }
  };

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    return index === -1;
  };

  const findUnfinished = () => steps.findIndex((step) => !step.completed);

  const setComplete = (index, status) => {
    setSteps((steps) => {
      const newSteps = [...steps];
      newSteps[index].completed = status;
      return newSteps;
    });
  };

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true);
    } else {
      if (steps[2].completed) setComplete(2, false);
    }
  }, [images]);

  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);

  useEffect(() => {
    if (location.lng || location.lat) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [location]);

  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps]);

  const handleSubmit = () => {
    const pin = {
      lng: location.lng,
      lat: location.lat,
      price: details.price,
      title: details.title,
      description: details.description,
      images,
    };
    if (updatedPin)
      return updatePin(
        pin,
        currentUser,
        dispatch,
        updatedPin,
        deletedImages,
        addedImages,

      );
    createPin(pin, currentUser, dispatch);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    if (updatedPin) {
      navigate('/dashboard/pins');
      clearPin(dispatch, currentUser, addedImages, updatedPin);
    } else {
      dispatch({ type: 'UPDATE_SECTION', payload: 0 });
      clearPin(dispatch, currentUser, images);
    }
  };

  return (
    <Container sx={{ my: 4 }}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ pb: 7 }}>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }

        <Stack direction="row" sx={{ pt: 2, justifyContent: 'space-around' }}>
          <Button
            color="inherit"
            disabled={!activeStep}
            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          >
            Back
          </Button>
          {currentUser && (
            <Button disabled={checkDisabled()} onClick={handleNext}>
              Next
            </Button>
          )}
        </Stack>
        <Stack
          sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}
          direction="row"
        >
          {showSubmit && (
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              {updatedPin ? 'Update' : 'Submit'}
            </Button>
          )}
          <Button
            variant="outlined"
            endIcon={<Cancel />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddPin;
