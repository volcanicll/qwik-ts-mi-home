import {
  component$,
  useSignal,
  useStore,
  $,
  useVisibleTask$,
} from "@builder.io/qwik";
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
import { TabTransition } from "./components/TabTransition";
import { useFilteredDevices } from "./hooks/useFilteredDevices";
import type { DeviceData } from "./hooks/useFilteredDevices";
import "./app.css";

export const App = component$(() => {
  const activeTab = useSignal("全屋");
  const activeFooterTab = useSignal("主页");
  const isInitialRender = useSignal(true);
  const previousTab = useSignal(activeFooterTab.value);

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
      { icon: <ScenesIcon />, label: "产品" },
      { icon: <ServicesIcon />, label: "智能" },
      { icon: <ProfileIcon />, label: "我的" },
    ],

    products: [
      { name: "智能家居套装", price: "¥999", image: "smart-home-kit" },
      { name: "智能门锁", price: "¥599", image: "smart-lock" },
      { name: "智能灯泡", price: "¥79", image: "smart-bulb" },
      { name: "智能音箱", price: "¥299", image: "smart-speaker" },
      { name: "智能摄像头", price: "¥199", image: "smart-camera" },
      { name: "智能插座", price: "¥89", image: "smart-plug" },
    ],

    smartExplore: [
      {
        title: "智能助手",
        description: "语音控制你的智能家居",
        icon: "assistant",
      },
      {
        title: "场景自动化",
        description: "创建自定义场景",
        icon: "automation",
      },
      { title: "能源管理", description: "监控和优化能源使用", icon: "energy" },
      { title: "安全监控", description: "保护你的家庭安全", icon: "security" },
    ],

    profileItems: [
      { title: "个人信息", icon: "user-info" },
      { title: "我的订单", icon: "orders" },
      { title: "我的设备", icon: "my-devices" },
      { title: "我的服务", icon: "services" },
      { title: "帮助中心", icon: "help" },
      { title: "设置", icon: "settings" },
    ],
  });

  const filteredDevicesResult = useFilteredDevices(appData.devices, activeTab);

  // Add animation to device cards when they appear
  useVisibleTask$(({ track }) => {
    track(() => filteredDevicesResult.value);

    if (isInitialRender.value) {
      isInitialRender.value = false;
      return;
    }
  });

  const handleTabChange = $((room: string) => {
    activeTab.value = room;
  });

  const handleFooterTabChange = $((label: string) => {
    previousTab.value = activeFooterTab.value;
    activeFooterTab.value = label;

    // Add ripple effect to the footer button
    const footerButtons = document.querySelectorAll(".footer-button");
    footerButtons.forEach((button) => {
      if ((button as HTMLElement).innerText.includes(label)) {
        const ripple = document.createElement("span");
        ripple.classList.add("footer-ripple");
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    });
  });

  // Get direction for tab transition animation
  const getDirection = (currentTab: string) => {
    const tabOrder = ["主页", "设备", "产品", "智能", "我的"];
    const currentIndex = tabOrder.indexOf(currentTab);
    const previousIndex = tabOrder.indexOf(previousTab.value);

    return currentIndex > previousIndex ? "right" : "left";
  };

  // Render different content based on active footer tab
  const renderContent = () => {
    const direction = getDirection(activeFooterTab.value);

    return (
      <>
        <TabTransition
          isActive={activeFooterTab.value === "主页"}
          direction={direction}
        >
          <>
            <nav class="room-tabs">
              <ul>
                {appData.rooms.map((room) => (
                  <li
                    key={room}
                    class={activeTab.value === room ? "active" : ""}
                  >
                    <button onClick$={() => handleTabChange(room)}>
                      {room}
                    </button>
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
              <section
                class={`devices-grid ${
                  filteredDevicesResult.isTransitioning ? "transitioning" : ""
                }`}
              >
                {filteredDevicesResult.value.map((device, index) => (
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
          </>
        </TabTransition>

        <TabTransition
          isActive={activeFooterTab.value === "设备"}
          direction={direction}
        >
          <>
            <nav class="room-tabs">
              <ul>
                {appData.rooms.map((room) => (
                  <li
                    key={room}
                    class={activeTab.value === room ? "active" : ""}
                  >
                    <button onClick$={() => handleTabChange(room)}>
                      {room}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div class="app-content">
              <section
                class={`devices-grid ${
                  filteredDevicesResult.isTransitioning ? "transitioning" : ""
                }`}
              >
                {filteredDevicesResult.value.map((device, index) => (
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
            </div>
          </>
        </TabTransition>

        <TabTransition
          isActive={activeFooterTab.value === "产品"}
          direction={direction}
        >
          <div class="app-content product-tab">
            <div class="search-bar">
              <input type="text" placeholder="搜索产品" />
            </div>

            <div class="banner-section">
              <div class="banner">
                <h3>新品推荐</h3>
                <p>智能家居新品上市</p>
              </div>
            </div>

            <section class="products-grid">
              {appData.products.map((product, index) => (
                <div key={index} class="product-card">
                  <div class="product-image">
                    <div class={`placeholder-image ${product.image}`}></div>
                  </div>
                  <div class="product-info">
                    <h3>{product.name}</h3>
                    <p class="price">{product.price}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </TabTransition>

        <TabTransition
          isActive={activeFooterTab.value === "智能"}
          direction={direction}
        >
          <div class="app-content smart-tab">
            <div class="smart-header">
              <h2>智能助手</h2>
              <p>让生活更智能</p>
            </div>

            <div class="smart-banner">
              <h3>探索智能家居的无限可能</h3>
            </div>

            <section class="explore-section">
              <h3>我的探索</h3>
              <div class="explore-grid">
                {appData.smartExplore.map((item, index) => (
                  <div key={index} class="explore-card">
                    <div class={`explore-icon ${item.icon}`}></div>
                    <div class="explore-info">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section class="recommendation-section">
              <h3>推荐场景</h3>
              <div class="scene-cards">
                <div class="scene-card">
                  <h4>回家模式</h4>
                  <p>灯光、空调自动开启</p>
                </div>
                <div class="scene-card">
                  <h4>睡眠模式</h4>
                  <p>灯光调暗，设备静音</p>
                </div>
              </div>
            </section>
          </div>
        </TabTransition>

        <TabTransition
          isActive={activeFooterTab.value === "我的"}
          direction={direction}
        >
          <div class="app-content profile-tab">
            <div class="profile-header">
              <div class="profile-avatar"></div>
              <div class="profile-info">
                <h2>用户名</h2>
                <p>普通会员</p>
              </div>
            </div>

            <section class="membership-card">
              <div class="membership-info">
                <h3>会员中心</h3>
                <p>查看会员特权</p>
              </div>
              <button class="membership-button">立即查看</button>
            </section>

            <section class="profile-menu">
              {appData.profileItems.map((item, index) => (
                <div key={index} class="menu-item">
                  <div class={`menu-icon ${item.icon}`}></div>
                  <span>{item.title}</span>
                  <div class="arrow-icon"></div>
                </div>
              ))}
            </section>
          </div>
        </TabTransition>
      </>
    );
  };

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

      {renderContent()}

      <footer class="app-footer">
        {appData.footerItems.map((item, index) => (
          <button
            key={index}
            class={`footer-button ${
              activeFooterTab.value === item.label ? "active" : ""
            }`}
            onClick$={() => handleFooterTabChange(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </footer>
    </div>
  );
});
