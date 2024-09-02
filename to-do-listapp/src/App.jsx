import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleTaskDescriptionChange = (e) => setTaskDescription(e.target.value);
  const handleTaskDateChange = (e) => setTaskDate(e.target.value);
  const handleTaskTimeChange = (e) => setTaskTime(e.target.value);

  const handleAddTask = () => {
    if (taskName.trim() && taskDescription.trim() && taskDate.trim() && taskTime.trim()) {
      const newTask = { name: taskName, description: taskDescription, date: taskDate, time: taskTime };
      if (editingTaskIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editingTaskIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setEditingTaskIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      resetForm();
      setShowForm(false);
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    setTaskDescription(taskToEdit.description);
    setTaskDate(taskToEdit.date);
    setTaskTime(taskToEdit.time);
    setEditingTaskIndex(index);
    setShowForm(true);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
    setTaskTime('');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="text-center mb-4">To-Do List</h1>
          <Card className="p-4 shadow-sm">
            {!showForm ? (
              <Button
                variant="primary"
                className="w-100 shadow-sm mb-4"
                onClick={handleShowForm}
              >
                Create Task
              </Button>
            ) : (
              <Form>
                <Form.Group controlId="formTaskName" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={handleTaskNameChange}
                    className="shadow-sm custom-input"
                  />
                </Form.Group>
                <Form.Group controlId="formTaskDescription" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    className="shadow-sm custom-input"
                  />
                </Form.Group>
                <Form.Group controlId="formTaskDate" className="mb-3">
                  <Form.Control
                    type="date"
                    value={taskDate}
                    onChange={handleTaskDateChange}
                    className="shadow-sm custom-input"
                  />
                </Form.Group>
                <Form.Group controlId="formTaskTime" className="mb-3">
                  <Form.Control
                    type="time"
                    value={taskTime}
                    onChange={handleTaskTimeChange}
                    className="shadow-sm custom-input"
                  />
                </Form.Group>
                <Button
                  variant="success"
                  className="w-100 shadow-sm mb-2"
                  onClick={handleAddTask}
                >
                  {editingTaskIndex !== null ? 'Save Task' : 'Add Task'}
                </Button>
                <Button
                  variant="danger"
                  className="w-100 shadow-sm"
                  onClick={handleHideForm}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Card>
          <ListGroup className="mt-4 shadow-sm">
            {tasks.map((task, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="task-item">
                  <strong>{task.name}</strong>
                  <span>{task.description}</span>
                  <span>{task.date}</span>
                  <span>{task.time}</span>
                </div>
                <div className="d-flex">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditTask(index)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;



