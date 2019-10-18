import React, { Component } from 'react';
import firebase from './../../firebase';
import { withRouter } from 'react-router-dom';
import Loading from './../Loading';
import { FiLogIn } from "react-icons/fi";
import { ContainerLogin, Form, Button, StyledLink, ErrorLogin } from './../css/style';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
            msg: null,
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        
        let user = localStorage.getItem('userToken');
        if (user) {
            return this.props.history.replace(`/registro/${user}`);
        } 
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {            
            
            if (this.state.email !== '' && this.state.pwd !== '') {
                this.setState({loading:true});
                await firebase.login(this.state.email, this.state.pwd).then(results => {
                    localStorage.setItem('userToken', results.user.uid);
                    this.props.history.replace(`/registro/${results.user.uid}`);
                    this.setState({loading:false});

                }).catch(error => {
                    if (error.code === "auth/user-not-found") {

                        throw new Error(`Este usuário não existe! clique em cadastrar`)

                    } else if (error.code === 'auth/wrong-password') {

                        throw new Error('Senha inválida')

                    } else if (error.code === 'auth/invalid-email') {
                        throw new Error('E-mail não é válido')
                    } else {
                        throw new Error('Falha ao fazer o login, tenta mais tarde')
                    }
                })
            } else {
                throw new Error('Campos vazios não sáo permetidos');
            }

        } catch (err) {
            this.setState({loading:false});
            this.setState({ msg: err.message });
        }

    }

    componentWillUnmount(){
       this.setState({loading:false});
       this.setState({msg:null})
    }

    render() {
        return (

            <ContainerLogin >
                <Form onSubmit={ this.handleSubmit}>
                    
                    <p>Entrar <FiLogIn size={20} color="black" vertOriginY="middle" /></p>
                    <label>E-mail:</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />

                    <label>Senha:</label>
                    <input type="password" name="password" autoComplete="off" value={this.state.pwd} onChange={e => this.setState({ pwd: e.target.value })} />
                    
                    <Button btnColor="#fff" bgColor="#34a853" type="submit">Entrar</Button>
                    <StyledLink to='/novo-usuario'>Cadastrar novo usuário</StyledLink>

                    {this.state.msg && <ErrorLogin>{this.state.msg}</ErrorLogin>}
                </Form>
                {this.state.loading &&  <Loading />}
            </ContainerLogin>
        )
    }
}

export default withRouter(Login);
