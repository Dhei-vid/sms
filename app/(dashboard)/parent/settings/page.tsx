"use client";

import SystemVerificationModal from "@/components/dashboard-pages/student/settings/modals/SystemVerificationModal";
import FinancialWalletSecurity from "@/components/dashboard-pages/student/settings/views/FinancialWalletSecurity";
import NotificationPreferences from "@/components/dashboard-pages/student/settings/views/NotificationPreferences";
import PersonalProfileViews from "@/components/dashboard-pages/student/settings/views/PersonalProfileViews";
import { Card, CardContent } from "@/components/ui/card";
import { Step, StepNavigation } from "@/components/ui/step-navigation";
import {
  Profile02Icon,
  Notification01FreeIcons,
  SecurityLockFreeIcons,
} from "@hugeicons/core-free-icons";
import { useState, ChangeEvent, FormEvent } from "react";

type StepId =
  | "personal-profile"
  | "financial-wallet-security"
  | "notification-preferences";

export type ModalStepId = "verify-password" | "change-password";

export type PasswordHandler = {
  oldPass: string;
  newPass: string;
  confirmPass: string;
};

const steps: Step[] = [
  {
    id: "personal-profile",
    label: "Personal Profile",
    icon: Profile02Icon,
  },
  {
    id: "financial-wallet-security",
    label: "Financial & Wallet Security",
    icon: SecurityLockFreeIcons,
  },
  {
    id: "notification-preferences",
    label: "Notification Preferences",
    icon: Notification01FreeIcons,
  },
];

export default function ParentSettingsPage() {
  //view state handler
  const [currentStep, setCurrentStep] = useState<StepId>("personal-profile");
  const [modalStepsId, setModalStepsId] =
    useState<ModalStepId>("verify-password");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [passwordHandler, setPasswordHandler] = useState<PasswordHandler>({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  //view change handler
  const handleStepChange = (stepId: string) => {
    setCurrentStep(stepId as StepId);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordHandler((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePasswordVerification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(passwordHandler.oldPass);
    //validate
    //call-endpoint
    setModalStepsId("change-password");
  };

  const handlePasswordUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(passwordHandler.newPass);
    console.log(passwordHandler.confirmPass);
    //validate
    //call endpoint
    //notify
    setOpenModal(false);
  };

  const renderContent = () => {
    switch (currentStep) {
      case "personal-profile":
        return <PersonalProfileViews />;
      case "financial-wallet-security":
        return <FinancialWalletSecurity setOpenModal={setOpenModal} />;
      case "notification-preferences":
        return <NotificationPreferences />;
      default:
        return <PersonalProfileViews />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="px-6 py-3">
          <h1 className="text-2xl font-semibold text-[#1B1B1B] mb-2 lg:text-3xl">
            System Settings
          </h1>
          <p className="text-sm text-gray-600">
            This screen manages the parents digital identity.
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="px-2 xl:sticky">
              <StepNavigation
                steps={steps}
                activeStep={currentStep}
                onStepChange={handleStepChange}
                orientation="vertical"
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="px-6">{renderContent()}</CardContent>
          </Card>
        </div>
      </div>
      {/* modal */}
      <SystemVerificationModal
        modalStepsId={modalStepsId}
        handlePasswordUpdate={handlePasswordUpdate}
        handlePasswordVerification={handlePasswordVerification}
        passwordHandler={passwordHandler}
        handleChange={handleChange}
        open={openModal}
        onOpenChange={setOpenModal}
      />
    </div>
  );
}
