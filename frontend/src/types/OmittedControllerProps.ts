import { Control, ControllerProps } from "react-hook-form";

export type OmittedControllerProps = {
  control: Control<any>;
} & Omit<ControllerProps, "control" | "render">
