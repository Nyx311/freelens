import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { t } from "@freelensapp/i18n";
import React from "react";
import OrderableItem from "./orderable-item";
import styles from "./orderable-list.module.css";
import useOrderableListHook from "./orderable-list-hook";

interface OrderableListDependencies {
  children: React.ReactElement[];
  className: string;
  onReorder: (dragIndex: number, releaseIndex: number) => void;
}

const OrderableList = ({ children, onReorder, className }: OrderableListDependencies) => {
  const orderableHook = useOrderableListHook({ children, onReorder });

  return (
    <div className={`${styles.container} ${className}`}>
      <DndContext
        accessibility={{
          screenReaderInstructions: {
            draggable: t(
              "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  ",
            ),
          },
          announcements: {
            onDragStart: ({ active }) => t("Picked up draggable item {{id}}.", { id: active.id }),
            onDragOver: ({ active, over }) =>
              over
                ? t("Draggable item {{activeId}} was moved over droppable area {{overId}}.", {
                    activeId: active.id,
                    overId: over.id,
                  })
                : t("Draggable item {{id}} is no longer over a droppable area.", { id: active.id }),
            onDragEnd: ({ active, over }) =>
              over
                ? t("Draggable item {{activeId}} was dropped over droppable area {{overId}}", {
                    activeId: active.id,
                    overId: over.id,
                  })
                : t("Draggable item {{id}} was dropped.", { id: active.id }),
            onDragCancel: ({ active }) =>
              t("Dragging was cancelled. Draggable item {{id}} was dropped.", { id: active.id }),
          },
        }}
        sensors={orderableHook.sensors}
        collisionDetection={closestCenter}
        onDragStart={orderableHook.onDragStart}
        onDragEnd={orderableHook.handleDragEnd}
      >
        <SortableContext items={orderableHook.itemIds} strategy={verticalListSortingStrategy}>
          {orderableHook.items.map((element, index) => (
            <OrderableItem key={element.key} item={element} id={orderableHook.itemIds[index]} />
          ))}
          <DragOverlay>
            {undefined != orderableHook.activeId && orderableHook.items[orderableHook.activeId]}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default OrderableList;
