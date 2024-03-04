import React, { useState, MouseEventHandler } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

interface ModalProps {
  toggle: () => void,
  activeItem: TodoItem,
  onSave: (item: TodoItem) => void
};

const CustomModal = (props: ModalProps) => {
  const { toggle, activeItem, onSave } = props;
  const [modalItem, setModalItem] = useState<TodoItem>(activeItem)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (e.target.type === "checkbox") {
      setModalItem({ ...modalItem, [name]: e.target.checked});
    } else {
      setModalItem({ ...modalItem, [name]: e.target.value})
    }
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="todo-title">Title</Label>
            <Input
              type="text"
              id="todo-title"
              name="title"
              value={modalItem.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Description</Label>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={modalItem.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={modalItem.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => onSave(modalItem)}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
