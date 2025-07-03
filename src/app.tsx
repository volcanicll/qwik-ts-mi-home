import { component$, useSignal, useStore } from "@builder.io/qwik";
import {
  HomeIcon,
  DevicesIcon,
  ScenesIcon,
  ServicesIcon,
  ProfileIcon,
  MessageIcon,
  HelpIcon,
  StarIcon,
} from "./components/icons";
import { DeviceCard } from "./components/DeviceCard";
import { useFilteredDevices } from "./hooks/useFilteredDevices";
import type { DeviceData } from "./hooks/useFilteredDevices";
import "./app.css";

export const App = component$(() => {
  const activeTab = useSignal("全屋");

  const appData = useStore({
    rooms: ["全屋", "厨房", "宿舍", "客厅", "卧室", "未分配房间", "附近设备"],

    devices: [
      {
        title: "设备已离线",
        location: "客厅",
        icon: "offline",
        status: "offline",
      },
      {
        title: "智能黑板2 蓝牙网关版",
        location: "客厅",
        subLocation: "无需配线",
        icon: "blackboard",
      },
      {
        title: "智能多功能生活",
        location: "客厅",
        subLocation: "装在卧室",
        icon: "multifunctional",
      },
      {
        title: "Desk lamp",
        location: "客厅",
        icon: "lamp",
      },
      {
        title: "智能空气净化器 3.5L",
        location: "高级 29 元",
        icon: "purifier",
      },
      {
        title: "小饭碗",
        location: "厨房",
        subLocation: "长期有效",
        icon: "bowl",
      },
      {
        title: "真手智慧纸巾盒 X3",
        location: "厨房",
        icon: "tissuebox",
      },
      {
        title: "Tintin A",
        location: "客厅",
        icon: "tintin",
      },
      {
        title: "智能插线板",
        location: "客厅",
        subLocation: "设备离线",
        icon: "powerstrip",
      },
      {
        title: "声波电动牙刷",
        location: "宿舍",
        icon: "toothbrush",
      },
      {
        title: "fries",
        location: "客厅",
        icon: "fries",
      },
    ] as DeviceData[],

    footerItems: [
      { icon: <HomeIcon />, label: "主页" },
      { icon: <DevicesIcon />, label: "设备" },
      { icon: <ScenesIcon />, label: "场景" },
      { icon: <ServicesIcon />, label: "服务" },
      { icon: <ProfileIcon />, label: "我的" },
    ],
  });

  const filteredDevices = useFilteredDevices(appData.devices, activeTab);

  return (
    <div class="app-container">
      <header class="app-header">
        <div class="header-left">
          <h1>非请勿动的家庭</h1>
        </div>
        <div class="header-right">
          <button class="icon-button">
            <MessageIcon />
          </button>
          <button class="icon-button">
            <HelpIcon />
          </button>
        </div>
      </header>

      <nav class="room-tabs">
        <ul>
          {appData.rooms.map((room) => (
            <li key={room} class={activeTab.value === room ? "active" : ""}>
              <button onClick$={() => (activeTab.value = room)}>{room}</button>
            </li>
          ))}
        </ul>
      </nav>

      <section class="favorites-section">
        <div class="section-header">
          <span class="section-icon">
            <StarIcon />
          </span>
          <h2>收藏品</h2>
        </div>
      </section>

      <div class="app-content">
        <section class="devices-grid">
          {filteredDevices.value.map((device, index) => (
            <DeviceCard
              key={index}
              title={device.title}
              location={device.location}
              subLocation={device.subLocation}
              icon={device.icon}
              status={device.status}
            />
          ))}
        </section>

        <div class="edit-button-container">
          <button class="edit-button">编辑</button>
        </div>
      </div>

      <footer class="app-footer">
        {appData.footerItems.map((item, index) => (
          <button key={index} class="footer-button">
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </footer>
    </div>
  );
});
