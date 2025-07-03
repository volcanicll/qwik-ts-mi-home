import { component$ } from "@builder.io/qwik";
import {
  LampIcon,
  PurifierIcon,
  BlackboardIcon,
  PowerStripIcon,
  ToothbrushIcon,
} from "./icons";

export interface DeviceCardProps {
  title: string;
  location: string;
  subLocation?: string;
  icon: string;
  status?: string;
}

export const DeviceCard = component$((props: DeviceCardProps) => {
  const getIcon = () => {
    switch (props.icon) {
      case "lamp":
        return <LampIcon />;
      case "purifier":
        return <PurifierIcon />;
      case "blackboard":
        return <BlackboardIcon />;
      case "powerstrip":
        return <PowerStripIcon />;
      case "toothbrush":
        return <ToothbrushIcon />;
      default:
        return <div class={`icon-placeholder ${props.icon}`}></div>;
    }
  };

  return (
    <div class={`device-card ${props.status || ""}`}>
      <div class="device-icon">{getIcon()}</div>
      <div class="device-info">
        <h3>{props.title}</h3>
        <p>
          {props.location}{" "}
          {props.subLocation && <span>{props.subLocation}</span>}
        </p>
      </div>
    </div>
  );
});
