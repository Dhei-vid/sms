"use client";

import { useState, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputField, TextareaField } from "@/components/ui/input-field";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import DatePickerIcon from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (eventData: EventFormData) => void;
}

export interface EventFormData {
  title: string;
  description: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  location: string;
  audienceVisibility: {
    general: boolean;
    private: boolean;
  };
  sendNotification: boolean;
}

export function CreateEventModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateEventModalProps) {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: undefined,
    startTime: "",
    endTime: "",
    location: "",
    audienceVisibility: {
      general: false,
      private: false,
    },
    sendNotification: false,
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form
    setFormData({
      title: "",
      description: "",
      date: undefined,
      startTime: "",
      endTime: "",
      location: "",
      audienceVisibility: {
        general: false,
        private: false,
      },
      sendNotification: false,
    });
    setOpenDatePicker(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      date: undefined,
      startTime: "",
      endTime: "",
      location: "",
      audienceVisibility: {
        general: false,
        private: false,
      },
      sendNotification: false,
    });
    setOpenDatePicker(false);
    onOpenChange(false);
  };

  const handleAudienceChange = (key: "general" | "private") => {
    setFormData((prev) => ({
      ...prev,
      audienceVisibility: {
        ...prev.audienceVisibility,
        [key]: !prev.audienceVisibility[key],
      },
    }));
  };

  // handling date
  const handleDateChange: Dispatch<SetStateAction<Date | undefined>> = (
    date
  ) => {
    setFormData((prev) => ({
      ...prev,
      date: typeof date === "function" ? date(prev.date) : date,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create New School Event
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Event Title */}
          <InputField
            id="event-title"
            label="Event Title"
            placeholder="E.g., Q4 Budget Review Meeting, Annual Science Fair"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* Description */}
          <TextareaField
            id="description"
            label="Description"
            placeholder="Briefly describe the event purpose and key agenda points."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
          />

          {/* Date, Start Time and End Time */}
          <div className="grid grid-cols-3 gap-2">
            {/* Date */}
            <DatePickerIcon
              label="Date"
              open={openDatePicker}
              setOpen={setOpenDatePicker}
              date={formData.date}
              setDate={handleDateChange}
            />

            {/* Start Time */}
            <TimePicker
              label="Start Time"
              time={formData.startTime}
              setTime={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  startTime:
                    typeof value === "function" ? value(prev.startTime) : value,
                }))
              }
              id="start-time"
            />

            {/* End Time */}
            <TimePicker
              label="End Time"
              time={formData.endTime}
              setTime={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  endTime:
                    typeof value === "function" ? value(prev.endTime) : value,
                }))
              }
              id="end-time"
            />
          </div>

          {/* Location */}
          <InputField
            id="location"
            label="Location"
            placeholder="E.g., Main Assembly Hall, Board Room (or Text Input: External Venue Address)"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          {/* Audience Visibility */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Audience Visibility
            </Label>
            <div className="flex flex-row gap-6">
              <CheckboxField
                id="general-announcement"
                label="General announcement"
                checked={formData.audienceVisibility.general}
                onCheckedChange={() => handleAudienceChange("general")}
              />
              <CheckboxField
                id="private"
                label="Private"
                checked={formData.audienceVisibility.private}
                onCheckedChange={() => handleAudienceChange("private")}
              />
            </div>
          </div>

          {/* Send Notification */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Send Notification
            </Label>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-600 flex-1">
                Send notification (Email/SMS) 24 hours prior
              </p>
              <Checkbox
                id="send-notification"
                checked={formData.sendNotification}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    sendNotification: checked as boolean,
                  })
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="">
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
