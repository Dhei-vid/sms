"use client";

/**
 * Form Field Components
 *
 * All components support an optional Icon prop of type LucideIcon.
 * The icon will be displayed next to the label with a size of 15px.
 *
 * Usage:
 * <InputField Icon={User} label="Username" />
 * <SelectField Icon={Mail} label="Email" />
 * <TextareaField Icon={MessageSquare} label="Bio" />
 */

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LucideIcon } from "lucide-react";

// Base FormField wrapper for consistent spacing
interface FormFieldProps {
  label?: string;
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
  Icon?: LucideIcon;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  children,
  htmlFor,
  Icon,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className={"flex flex-row gap-1 dark:text-main-900/80"}>
        {Icon && <Icon size={15} />}
        {label && (
          <Label htmlFor={htmlFor} className="px-1 dark:text-main-900">
            {label}
            {label && required && " *"}
          </Label>
        )}
      </div>
      {children}
    </div>
  );
};

// InputField - Label + Input combination
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  Icon?: LucideIcon;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  Icon,
  ...inputProps
}) => {
  return (
    <FormField
      Icon={Icon}
      label={label}
      required={required}
      htmlFor={inputProps.id}
    >
      <Input {...inputProps} />
    </FormField>
  );
};

// SelectField - Label + Select combination
interface SelectFieldProps {
  label?: string;
  required?: boolean;
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children: React.ReactNode;
  Icon?: LucideIcon;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  required,
  value,
  onValueChange,
  placeholder,
  disabled,
  children,
  Icon,
}) => {
  return (
    <FormField label={label} required={required} Icon={Icon}>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="w-full dark:text-main-900/50" disabled={disabled}>
          <SelectValue className="text-main-100/50" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormField>
  );
};

// TextareaField - Label + Textarea combination
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  Icon?: LucideIcon;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  required,
  Icon,
  ...textareaProps
}) => {
  return (
    <FormField
      label={label}
      required={required}
      htmlFor={textareaProps.id}
      Icon={Icon}
    >
      <Textarea {...textareaProps} />
    </FormField>
  );
};
