import React, { type ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import useIsBrowser from "@docusaurus/useIsBrowser";
import type { ColorMode } from "@docusaurus/theme-common";
import type { Props } from "@theme/ColorModeToggle";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";
import IconSystemColorMode from "@theme/Icon/SystemColorMode";

import styles from "./styles.module.css";

function getColorModeLabel(colorMode: ColorMode | null): string {
  switch (colorMode) {
    case null:
      return translate({
        message: "system mode",
        id: "theme.colorToggle.ariaLabel.mode.system",
        description: "The name for the system color mode",
      });
    case "light":
      return translate({
        message: "light mode",
        id: "theme.colorToggle.ariaLabel.mode.light",
        description: "The name for the light color mode",
      });
    case "dark":
      return translate({
        message: "dark mode",
        id: "theme.colorToggle.ariaLabel.mode.dark",
        description: "The name for the dark color mode",
      });
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeAriaLabel(colorMode: ColorMode | null) {
  return translate(
    {
      message: "Switch between dark and light mode (currently {mode})",
      id: "theme.colorToggle.ariaLabel",
      description: "The ARIA label for the color mode toggle",
    },
    {
      mode: getColorModeLabel(colorMode),
    },
  );
}

function getResolvedMode(colorMode: ColorMode | null, fallbackMode: "light" | "dark") {
  if (colorMode === "light" || colorMode === "dark") {
    return colorMode;
  }

  return fallbackMode;
}

function ColorModeToggle({
  className,
  buttonClassName,
  value,
  onChange,
}: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const [fallbackMode, setFallbackMode] = useState<"light" | "dark">("light");
  const resolvedMode = getResolvedMode(value, fallbackMode);
  const isChecked = resolvedMode === "dark";

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const root = document.documentElement;
    const syncMode = () => {
      const theme = root.getAttribute("data-theme");
      setFallbackMode(theme === "dark" ? "dark" : "light");
    };

    syncMode();

    const observer = new MutationObserver(syncMode);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [isBrowser]);

  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          "clean-btn",
          styles.toggleButton,
          isChecked && styles.toggleButtonChecked,
          !isBrowser && styles.toggleButtonDisabled,
          buttonClassName,
        )}
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={() => onChange(isChecked ? "light" : "dark")}
        disabled={!isBrowser}
        title={getColorModeLabel(resolvedMode)}
        aria-label={getColorModeAriaLabel(resolvedMode)}
      >
        <span className={styles.trackIconLight}>
          <IconLightMode aria-hidden className={styles.trackIcon} />
        </span>
        <span className={styles.trackIconDark}>
          <IconDarkMode aria-hidden className={styles.trackIcon} />
        </span>
        {value === null ? (
          <span className={styles.systemBadge} title={getColorModeLabel(null)}>
            <IconSystemColorMode aria-hidden className={styles.systemIcon} />
          </span>
        ) : null}
        <span className={styles.toggleThumb}>
          {isChecked ? (
            <IconDarkMode aria-hidden className={styles.toggleIcon} />
          ) : (
            <IconLightMode aria-hidden className={styles.toggleIcon} />
          )}
        </span>
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
