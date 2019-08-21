import React, { Component} from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Mensagem, Conteiner } from './styles'

import io from 'socket.io-client';

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            chatMessage: "",
            chatMessages: []
        }
    }

    componentDidMount(){
       this.socket = io("http://192.168.0.102:3000");
       this.socket.on("chat message", msg => {
            this.setState({chatMessages: [...this.state.chatMessages, msg]});
       })
    }

    submitChatMessage(){ 
        this.socket.emit("chat message", this.state.chatMessage);
        this.setState({chatMessage: ""})
    }

    render(){
        const chatMessages = this.state.chatMessages.map(chatMessage => (
            <Conteiner>
                <Mensagem key={chatMessage}>
                    {chatMessage}
                </Mensagem>
            </Conteiner>
        ));
    
    return (
        <View style={{flex: 1, backgroundColor:'gray'}}>
            {chatMessages}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                    autoCorrect={false}
                    onSubmitEditing={() => this.submitChatMessage()}
                    value={this.state.chatMessage}
                    onChangeText={chatMessage => {
                        this.setState({chatMessage})
                    }}
                    placeholderTextColor={'gray'}
                    placeholder={'Digite sua mensagem...'}
                    style={{
                        marginTop: '95%', 
                        backgroundColor: '#fff', 
                        borderRadius: 15, 
                        //height: 10,
                        width: 350,  
                        fontSize: 26,
                        marginRight: 5,
                        color: '#808'
                    }}/>
                    <TouchableOpacity style={{ borderRadius: 12, marginTop: '95%', height: 50, width: 80, backgroundColor: '#808'}} >
                        <Text style={{justifyContent: 'center', textAlign: 'center', paddingTop: 10, color: '#fff', fontWeight: 'bold', fontSize: 20}}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}}

