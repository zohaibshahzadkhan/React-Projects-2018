import React, { Component } from 'react';
import ListTask from "../ListTasks/ListTasks";
require('./main.css');
import {Grid,Row,Col,Button,Form, FormGroup,FormControl} from "react-bootstrap";
import config from "../config";
import firebase, { database } from "firebase/app";
import "firebase/database";

class Main extends Component {

    constructor(props){
        super(props);
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
            allTasks:[],
            task:''
        }
        this.app = firebase.initializeApp(config);
        this.db = this.app.database().ref("Todos").child('tasks');
        this.Addtask = this.Addtask.bind(this);
        this.RemoveTask=this.RemoveTask.bind(this);
    }

    Addtask(event){
    //    event.preventDefault();
        this.db.push().set({task :this.task.value});
        this.task.value= "";

    }

    RemoveTask(taskId){
        this.db.child(taskId).remove();
    }

    componentWillMount() {
        console.log("componentWillMount: Main");
        const previousTasks =this.state.allTasks;
        this.db.on('child_added',snap=>{
            previousTasks.push({
                id:snap.key,
                task:snap.val().task
            })
            this.setState({
                allTasks:previousTasks
            })
        })
        this.db.on("child_removed",snap=>{
            for (var i =0;i<previousTasks.length;i++){
                if(previousTasks[i].id===snap.key){
                    previousTasks.splice(i,1);
                }
            }
            
            this.setState({
                allTasks:previousTasks
            })
        })
      }
      
    render() {
        return (
        <Grid >
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
                    {
                        this.state.allTasks.map((tasks,key)=>{
                                return (
                                    <ListTask task= {tasks.task} taskId={tasks.id} key={key} RemoveTask={this.RemoveTask}/>                                        
                                )
                        })
                    }
                </Row>
        </Grid>
        );
    }
}

export default Main;
