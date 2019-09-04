import React, { useState } from "react";
import {
  Col,
  Card,
  Button,
  ButtonGroup,
  Form,
  FormControl
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import ToDo from "../../models/toDo";
import { ToDoActionTypes } from "../../stateManagement/definitions/toDoDefinitions";
import { useToDoDispatch } from "../../stateManagement/contexts/toDoContext";
import { handleToDoAction } from "../../stateManagement/middlewares/toDoFirebaseMiddleware";

const ListItem: React.FC<ToDo> = props => {
  const dispatch = useToDoDispatch();
  const [state, setState] = useState({
    isEditing: false
  });

  const titleInput = React.createRef<HTMLInputElement>();
  const descriptionInput = React.createRef<HTMLInputElement>();

  const setToEditing = () => {
    setState({
      isEditing: true
    });
  };
  const stopEditing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({
      isEditing: false
    });
    handleToDoAction(dispatch)({
      type: ToDoActionTypes.UPDATE_ACTION,
      payload: [
        {
          id: props.id,
          order: props.order,
          title: (titleInput.current || { value: "" }).value,
          description: (descriptionInput.current || { value: "" }).value,
          isDone: props.isDone
        }
      ]
    });
  };
  const completeToDo = () => {
    handleToDoAction(dispatch)({
      type: ToDoActionTypes.COMPLETE_ACTION,
      payload: [
        {
          id: props.id,
          order: props.order,
          title: props.title,
          description: props.description,
          isDone: true
        }
      ]
    });
  };
  return (
    <Col xs={6} md={4} lg={3} xl={2} className="mb-3">
      {state.isEditing ? (
        <Card>
          <form onSubmit={stopEditing}>
            <Card.Header className="d-flex align-items-baseline">
              <input
                type="text"
                className="mr-auto form-control"
                defaultValue={props.title}
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
                  defaultValue={props.description}
                  ref={descriptionInput}
                />
              </Card.Text>
            </Card.Body>
          </form>
        </Card>
      ) : (
        <Card>
          <Card.Header className="d-flex align-items-baseline">
            <h5 className="mr-auto">{props.title}</h5>
            <ButtonGroup aria-label="Operations on to do">
              <Button variant="outline-success" onClick={setToEditing}>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Button variant="outline-success" onClick={completeToDo}>
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </ButtonGroup>
          </Card.Header>
          <Card.Body>
            <Card.Text>{props.description}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};
export default ListItem;
