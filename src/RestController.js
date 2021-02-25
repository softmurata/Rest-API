import React from "react";

class RestController extends React.Component {
    constructor(props){
        super(props);
    }

    onChange = e => {
        const file = e.target.files[0];
        var r = new FileReader();
        r.readAsBinaryString(file);
        var data;
        r.onload = () => {
            data = r.result;
            console.log(data);
    
            const formData = new FormData();


            formData.append("image-file", data);

            fetch("http://3.236.97.79:8080/predictions/densenet161", {
                method: "POST",
                mode: "no-cors",
                headers: {"Content-Type":"application/octet-stream"},
                body: formData
            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
            })
        }

    }

    render(){
        return(
            <div>
                <input type="file" id="single" onChange={this.onChange}/>
            </div>
        )
    }
}

export default RestController


/*
import React from 'react';

class RestController extends React.Component {
    constructor(props){
        super(props);
        this.state = {user:[]};
    }

    componentDidMount()
    {
        fetch("https://jsonplaceholder.typicode.com/posts",{
            method: 'POST',
            body: JSON.stringify({
                title: 'New title added',
                body: 'New body added. Hello body',
                userId: 2
            }),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            this.setState({
                user:json
            })
        })
    }
    render(){
        return(
            <div>
                <p><b>Mew Resource created in the server as shown below</b></p>
                <p>Id: {this.state.user.id}</p>
                <p>Title: {this.state.user.title}</p>
                <p>Body: {this.state.user.body}</p>
                <p>UserId: {this.state.user.userId}</p>
            </div>
        )
    }
}

export default RestController

*/
