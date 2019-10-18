import React, { Component } from 'react';
import firebase from './../../firebase';
import { withRouter } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { ContainerLogin, Form, Button, StyledLink, ErrorLogin } from './../css/style';


class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
            msg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        firebase.isInitialized().then(user=>{
            if(user){
                let user = localStorage.getItem('userToken');
                if(user){
                   return this.props.history.replace(`/registro/${user}`);
                }
            }
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (this.state.email !== '' && this.state.pwd !== '') {
                await firebase.registerUser(this.state.email, this.state.pwd).then(results => {
                    localStorage.setItem('userToken', results.user.uid);

                    firebase.bd.ref('register').child(results.user.uid).child(0).set({
                    });

                    this.props.history.push(`/registro/${results.user.uid}`);                  


                }).catch(error => {
                    if (error.code === "auth/email-already-in-use") {

                        throw new Error('Este e-mail ja foi cadastrado')

                    } else if (error.code === 'auth/invalid-email') {

                        throw new Error('E-mail  inválido')

                    } else if (error.code === 'auth/weak-password') {

                        throw new Error('A senha deve conter no minio 6 caracteres');
                        
                    } else {
                        throw new Error('Falha ao fazer o login, tenta mais tarde')
                    }
                })
            } else {

                throw new Error('Campos vazios não sáo permetidos')

            }

        } catch (err) {
            console.log(err.message)
            this.setState({ msg: err.message });
        }

    }

    render() {
        return (
            <ContainerLogin >
                <Form onSubmit={this.handleSubmit}>
                    
                    <p>Cadastrar <FiEdit size={20} color="black" vertOriginY="middle" /></p>
                    <label>E-mail:</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />

                    <label>Senha:</label>
                    <input type="password" name="password" autoComplete="off" value={this.state.pwd} onChange={e => this.setState({ pwd: e.target.value })} />
                    
                    <Button btnColor="#fff" bgColor="#34a853" type="submit">Cadastrar</Button>
                    <StyledLink to='/'>Clique aqui se já possui o cadastro</StyledLink>

                    {this.state.msg && <ErrorLogin>{this.state.msg}</ErrorLogin>}
                </Form>
            </ContainerLogin>
        )
    }
}

export default withRouter(NewUser);
