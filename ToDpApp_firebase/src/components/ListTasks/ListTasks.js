import React, { Component } from 'react';
import {Grid,Row,Col,ListGroup,ListGroupItem,Button} from "react-bootstrap";
import PropTypes from "prop-types"
require("./listTasks.css");
import config from "../config";
import firebase, { database } from "firebase/app";
import "firebase/database";

class ListTasks extends Component {
    
    constructor(props){
        super(props);
        this.task =props.task;
        this.taskId=props.taskId;
        this.deleteHandler = this.deleteHandler.bind(this);
        
    }
    deleteHandler(id){
        this.props.RemoveTask(id);
    }
    
    
    render(props){
            return (
                <Grid>
                    <Row>
                        <Col md={8}>
                            <ListGroup >
                                {  
                                                        
                                        <ListGroupItem >
                                        <Row>
                                            <Col md={10}>{this.task}</Col>
                                            <Col md={2}><Button bsClass="delete_button"  onClick={()=>this.deleteHandler(this.taskId)}>X</Button></Col>
                                        </Row>
                                        </ListGroupItem>                           
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Grid>
            );
    }
  
}

// ListTasks.propTypes ={
//     task:PropTypes.string
// }

export default ListTasks;