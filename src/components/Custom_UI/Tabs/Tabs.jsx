"use client";

import { ClickableLink } from "@/components/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TabsWrapper({
  items = [],
  selectedTabKey,
  onTabChange,
  content,
  className = "",
  listClassName = "",
  baseRoute,
  defaultTabKey,
}) {
  const visibleItems = items.filter((item) => !item.hidden);

  const buildRoute = (key) => {
    if (!baseRoute) return "/";
    const isDefault = key === defaultTabKey;
    return isDefault ? baseRoute : `${baseRoute}/${key}`;
  };

  return (
    <div className="w-full">
      <Tabs
        value={selectedTabKey}
        onValueChange={onTabChange}
        className={className || "w-full"}
      >
        <TabsList
          className={
            listClassName || "flex h-14 w-full overflow-x-auto bg-white"
          }
        >
          {visibleItems.map(({ key, label, disabled = false }) => {
            const route = buildRoute(key);
            return (
              <ClickableLink key={key} route={route} variant="none">
                <TabsTrigger
                  disabled={disabled}
                  value={key}
                  className="px-4 py-2.5"
                >
                  {label}
                </TabsTrigger>
              </ClickableLink>
            );
          })}
        </TabsList>
        <div className="h-px w-full bg-gray-200" />
        <TabsContent value={selectedTabKey}>{content}</TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsWrapper;
