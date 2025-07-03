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

  useTask$(({ track }) => {
    const activeTab = track(() => activeTabSignal.value);

    if (activeTab === "全屋") {
      filteredDevices.value = [...devices];
    } else {
      filteredDevices.value = devices.filter(
        (device) => device.location === activeTab
      );
    }
  });

  return filteredDevices;
}
