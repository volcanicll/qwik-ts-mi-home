import { useSignal, useTask$ } from "@builder.io/qwik";

export interface DeviceData {
  title: string;
  location: string;
  subLocation?: string;
  icon: string;
  status?: string;
}

export function useFilteredDevices(
  devices: DeviceData[],
  activeTabSignal: { value: string }
) {
  const filteredDevices = useSignal<DeviceData[]>([...devices]);
  const isTransitioning = useSignal(false);

  useTask$(({ track }) => {
    const activeTab = track(() => activeTabSignal.value);

    // Set transitioning state
    isTransitioning.value = true;

    // Apply filtering with a slight delay for animation
    setTimeout(() => {
      if (activeTab === "全屋") {
        filteredDevices.value = [...devices];
      } else {
        filteredDevices.value = devices.filter(
          (device) => device.location === activeTab
        );
      }

      // Reset transitioning state
      isTransitioning.value = false;

      // Apply entrance animation to the cards
      setTimeout(() => {
        const cards = document.querySelectorAll(".device-card");
        cards.forEach((card, index) => {
          const htmlCard = card as HTMLElement;
          htmlCard.style.opacity = "0";
          htmlCard.style.animation = `fadeIn 0.3s ease forwards ${
            index * 0.05
          }s`;
        });
      }, 50);
    }, 100);
  });

  return {
    value: filteredDevices.value,
    isTransitioning: isTransitioning.value,
  };
}
