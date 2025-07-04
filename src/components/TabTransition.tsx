import { component$, useSignal, useVisibleTask$, Slot } from "@builder.io/qwik";

interface TabTransitionProps {
  isActive: boolean;
  direction?: "left" | "right";
}

export const TabTransition = component$((props: TabTransitionProps) => {
  const isVisible = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => props.isActive);

    if (props.isActive) {
      // Small delay to ensure the animation is visible
      setTimeout(() => {
        isVisible.value = true;
      }, 50);
    } else {
      isVisible.value = false;
    }
  });

  const direction = props.direction || "right";
  const initialTransform =
    direction === "right" ? "translateX(20px)" : "translateX(-20px)";

  return (
    <div
      style={{
        opacity: isVisible.value ? "1" : "0",
        transform: isVisible.value ? "translateX(0)" : initialTransform,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        display: props.isActive ? "block" : "none",
        height: "100%",
      }}
    >
      <Slot />
    </div>
  );
});
