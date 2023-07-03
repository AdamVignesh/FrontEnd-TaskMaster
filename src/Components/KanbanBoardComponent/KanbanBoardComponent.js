import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../MyContext";

// const itemsFromBackend = [
//     { id: uuidv4(), content: "First task" },
//     { id: uuidv4(), content: "Second task" },
//     { id: uuidv4(), content: "Third task" },
//     { id: uuidv4(), content: "Fourth task" },
//     { id: uuidv4(), content: "Fifth task" }
//   ];
  
 
  
  
function KanbanBoardComponent(props) {
    
    const {invokeGetTasks,getTasks} = useContext(AuthContext);
    const[updatedTemp,setUpdatedTemp] = useState([]);
    const [assigned,setAssigned] = useState([]);
    const [todo,setTodo] = useState([]);
    const [inProgress,setInProgress] = useState([]);
    const [done,setDone] = useState([]);

    const [columnsFromBackend,setColumnsFromBackend] = useState({
        "one": {
          name: "Assigned",
          items: []
        },
        "two": {
            name: "To do",
            items: []
        },
        "three": {
            name: "In Progress",
            items: []
        },
        
        "four": {
          name: "Done",
          items: []
        }
    });
    
    const [columns, setColumns] = useState(columnsFromBackend);

    const onDragEnd = async (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
      
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          });
          
          //axios call to update the values.
          const statusUpdateURL = process.env.REACT_APP_UPDATE_TASK_STATUS;
          const queryParam = {
            updatedStatus: destColumn.name
          } 
          const response = await axios.put(`${statusUpdateURL}${removed.task_id}`, null,{
            params: queryParam,
          })
          .then(res=>{
            invokeGetTasks(true);
            // getTasksOfThisProject();
          })
          .catch(error => {
                console.log(error +" In task status")
            });
            console.log('Dragged card value:', removed.task_id , destColumn.name);

        }
        //This else is for changing the order of values in the same column
        //  else {
        //   const column = columns[source.droppableId];
        //   const copiedItems = [...column.items];
        //   const [removed] = copiedItems.splice(source.index, 1);
        //   copiedItems.splice(destination.index, 0, removed);
        //   setColumns({
        //     ...columns,
        //     [source.droppableId]: {
        //       ...column,
        //       items: copiedItems
        //     }
        //   });
        // }
      };
      const calculateProgress= async()=>{
        console.log("in calc");
    
        let totalTasks = updatedTemp.length;
        let todoTasks = todo.length;
        let inProgressTasks = inProgress.length;
        let doneTasks = done.length;
        
        let doneTasksPercent = (doneTasks/totalTasks)*100;
        let inProgressTasksPercent = (inProgressTasks/totalTasks)*50;
        let todoTasksPercent = (todoTasks/totalTasks)*10;

        doneTasksPercent = isNaN(doneTasksPercent) || typeof doneTasksPercent === 'undefined' ? 0 : doneTasksPercent;
        inProgressTasksPercent = isNaN(inProgressTasksPercent) || typeof inProgressTasksPercent === 'undefined' ? 0 : inProgressTasksPercent;
        todoTasksPercent = isNaN(todoTasksPercent) || typeof todoTasksPercent === 'undefined' ? 0 : todoTasksPercent;

          
          //progress = parseFloat(progress.toFixed(2));
          let progress = (doneTasksPercent+inProgressTasksPercent+todoTasksPercent);
          console.log(progress +"% done");

          const queryParam = {
            progress: progress
          };
          const UpdateProjectProgressURL = process.env.REACT_APP_UPDATE_PROJECT_PROGRESS ;
          const response = await axios.put(`${UpdateProjectProgressURL}${props.id}`, null,{
            params: queryParam,
          })
          .catch(error => {
                console.log(error +" In project progress");
            });
        }

    const getTasksOfThisProject=async()=>{
        console.log("get tasks");
        const TasksOfThisProjectURL = process.env.REACT_APP_GET_TASKS_OF_PROJECT;
        try {
            const response = await axios.get(`${TasksOfThisProjectURL}${props.id}`)
            // projects = response.data;
            const temp = await response.data;
            console.log(temp);
           
            const updatedTempArray = temp?.map((item) => ({
              ...item,
              draggableId: uuidv4()
            }));
            
              setUpdatedTemp(updatedTempArray);
              setAssigned(updatedTempArray.filter(item => item.status === 'Assigned'));
              setTodo(updatedTempArray.filter(item => item.status === 'To do'));
              setInProgress(updatedTempArray.filter(item => item.status === 'In Progress'));
              setDone(updatedTempArray.filter(item => item.status === 'Done'));
            

            const updatedColumns = { ...columnsFromBackend };
            updatedColumns.one.items = assigned;
            updatedColumns.two.items = todo;
            updatedColumns.three.items = inProgress;
            updatedColumns.four.items = done;
            
            setColumnsFromBackend(updatedColumns);

            invokeGetTasks(false);
            calculateProgress();
          } 
          catch (error) {
            console.log("error in kanban board"+error);
            return null;
          }
    }

    useEffect(() => {
        getTasksOfThisProject();
      },[getTasks]);

      console.log(columnsFromBackend);
    
      return (
          <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item?.draggableId}
                                draggableId={item?.draggableId}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item?.task_title}
                                      {item?.draggableId}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    );
  }


export default KanbanBoardComponent