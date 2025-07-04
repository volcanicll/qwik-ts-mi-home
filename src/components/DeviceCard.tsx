import { component$, useSignal } from "@builder.io/qwik";
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
  const isPressed = useSignal(false);

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
    <div
      class={`device-card ${props.status || ""} ${
        isPressed.value ? "pressed" : ""
      }`}
      onMouseDown$={() => (isPressed.value = true)}
      onMouseUp$={() => (isPressed.value = false)}
      onMouseLeave$={() => (isPressed.value = false)}
      onClick$={() => {
        // Add a ripple effect
        const card = document.createElement("span");
        card.classList.add("ripple");
        const rect = (
          document.activeElement as HTMLElement
        ).getBoundingClientRect();
        card.style.width = card.style.height =
          Math.max(rect.width, rect.height) + "px";
        (document.activeElement as HTMLElement).appendChild(card);
        setTimeout(() => card.remove(), 600);
      }}
    >
      <div class="device-icon">{getIcon()}</div>
      <div class="device-info">
        <h3>{props.title}</h3>
        <p>
          {props.location}{" "}
          {props.subLocation && (
            <span class="sub-location">{props.subLocation}</span>
          )}
        </p>
      </div>
    </div>
  );
});
