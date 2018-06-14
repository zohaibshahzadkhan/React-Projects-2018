import React, { Component } from 'react';
import ListTask from "../ListTasks/ListTasks";
require('./main.css');
import {Grid,Row,Col,Button,Form, FormGroup,FormControl} from "react-bootstrap";
class Main extends Component {

    componentWillMount(){
        localStorage.getItem("listOfTask")&& this.setState({
            allTasks:JSON.parse((localStorage.getItem("listOfTask")))
        })
    }

    constructor(){
        super();
        let today = new Date;
        let date = today.getDate();
        let day =today.getDay();
        let month = today.getMonth()+1;
        let year= today.getFullYear();
        const days = ["Monday","Tuesday","Wednessday","Thurday","Friday","Seturday","Sunday"];

        if(date<10){
            date='0'+date;
        }
        if(month<10){
            month='0'+month;
        }
        today= days[day-1]+" "+date+'/'+ month +'/'+year;
        this.state = {
            today,
            allTasks:[]
            
        }

        this.Addtask = this.Addtask.bind(this);
    }

    Addtask(event){
        event.preventDefault();
        this.setState({
            tasks:this.state.allTasks.push(this.task.value.toUpperCase())
        });
        this.task.value= "";
        console.log(this.state.allTasks);

        localStorage.setItem('listOfTask',JSON.stringify(this.state.allTasks));
    }
    render() {
        return (
        <Grid>
                <Row className="header">
                    <Col md={12}>
                        <h1 className="title">My Day</h1>
                        <h4>{this.state.today}</h4>
                    </Col>
                </Row>

                <Row>
                    <Col md={7}>
                        <Form>
                            <FormGroup>
                                <FormControl 
                                 type="text"
                                 placeholder="Tasks"
                                 bsSize="lg"
                                 ref="task"
                                 inputRef= {ref=>{this.task =ref;}}
                                />
                            </FormGroup>                            
                        </Form>
                    </Col>
                    <Col md={2}>
                        <Button bsClass="add_button" onClick = {this.Addtask}>Add</Button>                        
                    </Col>
                    
                </Row>
                <Row>
                <ListTask taskArray= {this.state.allTasks}/>
                </Row>
        </Grid>
        );
    }
}

export default Main;
