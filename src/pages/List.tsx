"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import Card from "@/components/CardElement";

const initialItems = [
  {
    id: "1",
    title: "Scotland Island",
    location: "Sydney, Australia",
    imageName: "image1.png",
  },
  {
    id: "2",
    title: "The Charles Grand",
    location: "Sydney, Australia",
    imageName: "image2.png",
  },
  {
    id: "3",
    title: "Scotland Island",
    location: "Sydney, Australia",
    imageName: "image3.png",
  },
  {
    id: "4",
    title: "Clam Bar",
    location: "Etcetera veni, Vidi vici",
    imageName: "image4.png",
  },
  {
    id: "5",
    title: "Vivid Festival",
    location: "Sydney, Australia",
    imageName: "image5.png",
  },
];

const ItemList = () => {
  const [items, setItems] = useState(initialItems);
  const [isDropDisbaled, setIsDropDisabled] = useState(true);

  const onDragEnd = (result: DropResult) => {
    setIsDropDisabled(false);
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" isDropDisabled={isDropDisbaled}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Card
                        title={item.title}
                        location={item.location}
                        imageName={item.imageName}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                    {snapshot.isDragging && (
                      <div className="clone">
                        <Card
                          title={item.title}
                          location={item.location}
                          imageName={item.imageName}
                        />
                      </div>
                    )}
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ItemList;
