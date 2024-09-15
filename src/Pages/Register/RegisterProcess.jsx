import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/http.js";
import UserTypeForm from "./userTypeForm";
import QuestionnaireForm from "./questionnaireForm";
import RoommateProfileForm from "./roommateProfileForm";
import ApartmentProfileForm from "./apartmentProfileForm";

function CompleteRegistration() {
  const [formData, setFormData] = useState({
    userType: "",
    questionnaire: {},
    profile: {},
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const navigate = useNavigate();

  const completeRegistrationMutation = useMutation({
    mutationFn: (data) =>
      formData.userType === "roommate"
        ? auth.completeRoommateRegistration(data)
        : auth.completeApartmentRegistration(data),
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration completion error:", error);
      // Handle error (e.g., show error message to user)
    },
  });

  useEffect(() => {
    if (isReadyToSubmit) {
      const finalFormData = new FormData();
      finalFormData.append("questionnaireAnswers", JSON.stringify(formData.questionnaire));

      if (formData.userType === "roommate") {
        finalFormData.append("personalInfo", JSON.stringify(formData.profile.personalInfo));
        finalFormData.append("interests", JSON.stringify(formData.profile.interests));
        finalFormData.append("social", JSON.stringify(formData.profile.social));

        if (formData.profile.social?.profileImage) {
          
            finalFormData.append(`images`, formData.profile.social.profileImage);

        }
      } else if (formData.userType === "apartment") {
        finalFormData.append("info", JSON.stringify(formData.profile.info));
        finalFormData.append("amenities", JSON.stringify(formData.profile.amenities));
        finalFormData.append("details", JSON.stringify(formData.profile.details));

        if (formData.profile.info?.images && formData.profile.info.images.length > 0) {
          formData.profile.info.images.forEach((file) => {
            finalFormData.append("images", file);
          });
        }
      }

      completeRegistrationMutation.mutate(finalFormData);
    }
  }, [isReadyToSubmit, formData]);

  const steps = [
    {
      id: 1,
      component: UserTypeForm,
      onSubmit: (type) => {
        setFormData((prev) => ({ ...prev, userType: type }));
        setCurrentStep(2);
      },
    },
    {
      id: 2,
      component: QuestionnaireForm,
      onSubmit: (answers) => {
        setFormData((prev) => ({ ...prev, questionnaire: answers }));
        setCurrentStep(3);
      },
    },
    {
      id: 3,
      component: (props) =>
        formData.userType === "roommate" ? (
          <RoommateProfileForm {...props} />
        ) : (
          <ApartmentProfileForm {...props} />
        ),
      onSubmit: (profileData) => {
        setFormData((prev) => ({ ...prev, profile: profileData }));
        setIsReadyToSubmit(true);
      },
    },
  ];

  const handleStepComplete = (stepData) => {
    const currentStepObj = steps.find((step) => step.id === currentStep);
    currentStepObj.onSubmit(stepData);
  };

  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component;

  return (
    <div>
      {currentStep <= 3 && CurrentStepComponent && (
        <CurrentStepComponent onSubmit={handleStepComplete} />
      )}

      {completeRegistrationMutation.isLoading && <div>Submitting...</div>}
      {completeRegistrationMutation.isError && (
        <div>Error submitting registration. Please try again.</div>
      )}
    </div>
  );
}

export default CompleteRegistration;