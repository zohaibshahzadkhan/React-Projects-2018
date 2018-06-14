import React, { Component } from 'react';
import {Grid,Row,Col,ListGroup,ListGroupItem,Button} from "react-bootstrap";
require("./listTasks.css");

class ListTasks extends Component {

    constructor(props){
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.state={
            // tasks: JSON.parse(localStorage.getItem("listOfTask"))
            tasks:props.taskArray
        }

    }
    deleteHandler(event){
        // event.preventDefault();
        var delTask = event.target.id;
        this.state.tasks.splice(delTask,1);
        // console.log(this.state.tasks);
            this.setState({
                tasks:this.state.tasks
            })
        localStorage.setItem('listOfTask',JSON.stringify(this.state.tasks));
        
        console.log(delTask);

        // console.log(this.state.tasks);

    }
      
    render(){
            return (
                <Grid>
                    <Row>
                        <Col md={8}>
                            <ListGroup >
                                {  
                                    (this.state.tasks)? 

                                    this.state.tasks.map((task,key)=>{
                                    return (
                                        
                                        <ListGroupItem key={key}>
                                         <Row>
                                            <Col md={10}>{task}</Col>
                                            <Col md={2}><Button bsClass="delete_button" bsStyle id={key} onClick={this.deleteHandler}>X</Button></Col>
                                        </Row>
                                        </ListGroupItem>)
                                    }) : null
                                
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Grid>
            );
    }
}
export default ListTasks;