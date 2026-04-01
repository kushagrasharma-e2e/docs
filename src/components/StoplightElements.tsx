import { useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

type StoplightElementsProps = {
  specPath: string;
  theme?: "github";
};

const STOPLIGHT_STYLE_ID = "stoplight-elements-styles";
const STOPLIGHT_SCRIPT_ID = "stoplight-elements-script";
const STOPLIGHT_STYLE_HREF = "https://unpkg.com/@stoplight/elements@9.0.16/styles.min.css";
const STOPLIGHT_SCRIPT_SRC = "https://unpkg.com/@stoplight/elements@9.0.16/web-components.min.js";

declare global {
  interface Window {
    __stoplightElementsLoading__?: Promise<void>;
  }
}

function ensureStoplightAssets(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.customElements?.get("elements-api")) {
    return Promise.resolve();
  }

  const existingStyle = document.getElementById(STOPLIGHT_STYLE_ID);

  if (!existingStyle) {
    const link = document.createElement("link");
    link.id = STOPLIGHT_STYLE_ID;
    link.rel = "stylesheet";
    link.href = STOPLIGHT_STYLE_HREF;
    document.head.appendChild(link);
  }

  if (!window.__stoplightElementsLoading__) {
    window.__stoplightElementsLoading__ = new Promise<void>((resolve, reject) => {
      const existingScript = document.getElementById(STOPLIGHT_SCRIPT_ID) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Failed to load Stoplight Elements")),
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.id = STOPLIGHT_SCRIPT_ID;
      script.src = STOPLIGHT_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Stoplight Elements"));
      document.head.appendChild(script);
    });
  }

  return window.__stoplightElementsLoading__;
}

export default function StoplightElements({ specPath, theme = "github" }: StoplightElementsProps) {
  const apiDescriptionUrl = useBaseUrl(specPath);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function mountViewer() {
      try {
        await ensureStoplightAssets();

        if (cancelled || !containerRef.current) {
          return;
        }

        const viewer = document.createElement("elements-api") as HTMLElement & {
          apiDescriptionUrl?: string;
          router?: string;
          layout?: string;
          hideSchemas?: boolean;
          hideInternal?: boolean;
        };

        viewer.apiDescriptionUrl = apiDescriptionUrl;
        viewer.router = "hash";
        viewer.layout = "sidebar";
        viewer.hideSchemas = true;
        viewer.hideInternal = true;

        containerRef.current.replaceChildren(viewer);
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    setStatus("loading");
    mountViewer();

    return () => {
      cancelled = true;
    };
  }, [apiDescriptionUrl]);

  return (
    <div className={`api-docs-viewer api-docs-viewer--${theme}`}>
      {status !== "ready" ? (
        <div className="api-docs-fallback">
          <p>{status === "loading" ? "Loading API reference..." : "Unable to load the API viewer."}</p>
          <p>
            <a href={apiDescriptionUrl}>Open the bundled OpenAPI spec</a>
          </p>
        </div>
      ) : null}
      <div
        ref={containerRef}
        style={{ display: status === "ready" ? "block" : "none" }}
      />
    </div>
  );
}
