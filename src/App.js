import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInput: "",
            list: [],
            showModal: false,
            editIndex: -1
        };
    }

    updateInput(value) {
        this.setState({
            userInput: value
        });
    }

    addItem() {
        if (this.state.userInput.trim() !== "") {
            const userInput = {
                id: Math.random(),
                value: this.state.userInput
            };
            const list = [...this.state.list];
            list.push(userInput);
            this.setState({
                list,
                userInput: ""
            });
            toast.success(`Added task: ${userInput.value}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            toast.error("Please enter a task before adding.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    deleteItem(key) {
        const list = [...this.state.list];
        const deletedItem = list.find((item) => item.id === key);
        const updateList = list.filter((item) => item.id !== key);
        this.setState({
            list: updateList
        });
        toast.success(`Deleted task: ${deletedItem.value}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }



    handleShowModal = (index) => {
        this.setState({
            showModal: true,
            editIndex: index,
            userInput: this.state.list[index].value
        });
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false,
            editIndex: -1,
            userInput: ""
        });
    };

    handleEditItem = () => {
        const { editIndex, userInput, list } = this.state;
        if (userInput.trim() !== "") {
            const updatedList = [...list];
            const editedTask = updatedList[editIndex].value; // Get the task name before updating it
            updatedList[editIndex].value = userInput;
            this.setState({
                list: updatedList,
                userInput: "",
                showModal: false,
                editIndex: -1
            });
            toast.success(`Edited task: ${editedTask} successfully`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    render() {
        return (
            <Container>
                <ToastContainer />
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "3rem",
                        fontWeight: "bolder"
                    }}
                >
                    TODO LIST
                </Row>
                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Add item . . . "
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup>
                                <Button
                                    variant="dark"
                                    className="mt-2"
                                    onClick={() => this.addItem()}
                                >
                                    ADD
                                </Button>
                            </InputGroup>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <ListGroup>
                            {this.state.list.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ListGroup.Item
                                            variant="dark"
                                            action
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            {item.value}
                                            <span>
                                                <Button
                                                    style={{ marginRight: "10px" }}
                                                    variant="light"
                                                    onClick={() =>
                                                        this.deleteItem(item.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    onClick={() =>
                                                        this.handleShowModal(index)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </span>
                                        </ListGroup.Item>
                                    </div>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Edit item..."
                            value={this.state.userInput}
                            onChange={(e) => this.updateInput(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleEditItem}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }

}

export default App;
