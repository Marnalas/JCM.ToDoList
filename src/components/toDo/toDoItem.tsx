import React, { useState, useRef } from "react";
import { Col, Card, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import ToDo from "../../models/toDo";

/**
 * The props of the ToDoItem component.
 */
export interface ToDoItemProps {
  toDo: Partial<ToDo>;
  updateToDo: (id: string, title: string, description: string) => void;
  completeToDo: (id: string) => void;
}

/**
 * A component to render a ToDo item.
 * @param props
 */
const ToDoItem: React.FC<ToDoItemProps> = (props: ToDoItemProps) => {
  const [state, setState] = useState({
    isEditing: false
  });

  // const titleInput = React.createRef<HTMLInputElement>();
  // const descriptionInput = React.createRef<HTMLInputElement>();
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);

  /**
   * Sets the state to editing.
   */
  const setToEditing = () => {
    setState({
      isEditing: true
    });
  };

  /**
   * Sets the state to not editing and saves the modifications.
   * @param e The event that triggered the call to this method.
   */
  const stopEditing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({
      isEditing: false
    });
    props.updateToDo(
      props.toDo.id,
      (titleInput.current || { value: "" }).value,
      (descriptionInput.current || { value: "" }).value
    );
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
      {state.isEditing ? (
        <Card className="border-success">
          <form onSubmit={stopEditing}>
            <Card.Header className="d-flex align-items-baseline border-success">
              <input
                type="text"
                className="mr-auto form-control"
                defaultValue={props.toDo.title}
                ref={titleInput}
              />
              <Button type="submit" variant="outline-success" className="ml-2">
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={props.toDo.description}
                  ref={descriptionInput}
                />
              </Card.Text>
            </Card.Body>
          </form>
        </Card>
      ) : (
        <Card className="border-success">
          <Card.Header className="d-flex align-items-baseline border-success">
            <h5 className="text-success text-break">{props.toDo.title}</h5>
            <ButtonGroup aria-label="Operations on to do" className="ml-auto">
              <Button variant="outline-success" onClick={setToEditing}>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Button
                variant="outline-success"
                onClick={() => props.completeToDo(props.toDo.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </ButtonGroup>
          </Card.Header>
          <Card.Body>
            <Card.Text>{props.toDo.description}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};
export default ToDoItem;
