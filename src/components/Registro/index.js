import React, { Component, Fragment } from 'react';
import { FiLogOut, FiUser} from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import firebase from './../../firebase';
import './style.css';


class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            date: new Date().toLocaleDateString('pt-BR'),
            entrada: '',
            saidaAlmoco: '',
            retornoAlmoco: '',
            saida: '',
            list: [],
            totalRegister: '',

        }

        this.registerUser = this.registerUser.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.logout = this.logout.bind(this);
        this.filterDate = this.filterDate.bind(this)
        
       if(localStorage.getItem('userToken') === null){
        this.props.history.replace('/');
       }
    }

    componentDidMount() {
        firebase.checkUser().then(user => {
            this.setState({ nome: user.email.split('@')[0] });
            this.registerUser();
        });
          
    }

    async registerUser() {
        let user = localStorage.getItem('userToken');
        await firebase.bd.ref('register').child(user).on('value', snapshot => {
            const state = this.state;
            state.list = [];
            snapshot.forEach(item => {
                state.list.push(item.val())
            });
            this.setState(state);

            firebase.numRegister(localStorage.getItem('userToken')).then(qte=>{
                this.setState({totalRegister:qte});
            });
        });
    }


    async filterDate(){
            return new Promise((resolve, reject)=>{
                let user = localStorage.getItem('userToken');
                let dateFilter =  [];
               
                 firebase.bd.ref('register').child(user).on('value', snap=>{
                    
                     snap.forEach(item => {
                        dateFilter.push(item.val());
                    });
                    
                   const result =  dateFilter.filter(item=> {
                        return (item.data === this.state.date)
                      });
                      
                   if(result.length >= 1) {
                        reject(false)
                       
                   }else{
                     resolve(true)
                   }
                });
            });

    }

    handleRegister(e) {
        e.preventDefault();
        this.filterDate().then(results => {
            let chave = this.state.totalRegister + 1;
            let user = localStorage.getItem('userToken');
            firebase.bd.ref('register').child(user).child(chave).set({
                data: this.state.date,
                entrada: this.state.entrada,
                saidaAlmoco: this.state.saidaAlmoco,
                retornoAlmoco: this.state.retornoAlmoco,
                saida: this.state.saida,
            });

        }).catch(e => {
           let confirm = window.confirm(`Já possui um registro nesta  ${this.state.date} \n deseja atualizá-lo?` )
           if(confirm){
            let chave = this.state.totalRegister;
            let user = localStorage.getItem('userToken');
            firebase.bd.ref('register').child(user).child(chave).set({
                data: this.state.date,
                entrada: this.state.entrada,
                saidaAlmoco: this.state.saidaAlmoco,
                retornoAlmoco: this.state.retornoAlmoco,
                saida: this.state.saida,
            });
           }
        });
    }

    async logout() {
        await firebase.logout()
            .catch(err => console.log(err));
        localStorage.removeItem('userToken');
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment>
                <header>
                    <h1><FiUser /> {this.state.nome && `Olá ${this.state.nome.charAt(0).toUpperCase()}${this.state.nome.slice(1)}`} </h1>
                    <button onClick={() => this.logout()}>Sair <FiLogOut color="#fff" size={17} vertOriginY="bottom" /></button>
                </header>
                <div className="container">
                    <form onSubmit={this.handleRegister} id="form" className='box-wrapper'>
                        <h2>Registrar Horário</h2>
                        <div className='form-flex'>
                            <div className='data'>
                                <label>Data:</label>
                                <input type='text' name="date" defaultValue={this.state.date} disabled={true} />

                            </div>
                            <div className='custumer-register'>
                                <label>Entrada:</label>
                                <input type='time' value={this.state.entrada}
                                    onChange={e => this.setState({ entrada: e.target.value })}
                                />
                            </div>

                            <div className='custumer-register'>
                                <label>Saída Almoço:</label>
                                <input type='time' value={this.state.saidaAlmoco}
                                    onChange={e => this.setState({ saidaAlmoco: e.target.value })}
                                />
                            </div>
                            <div className='custumer-register'>
                                <label>Retorno Almoço:</label>
                                <input type='time' value={this.state.retornoAlmoco}
                                    onChange={e => this.setState({ retornoAlmoco: e.target.value })}
                                />
                            </div>
                            <div className='custumer-register'>
                                <label>Saída:</label>
                                <input type='time' value={this.state.saida}
                                    onChange={e => this.setState({ saida: e.target.value })}
                                />
                            </div>
                        </div>
                        <button type='submit'>Registrar</button>
                        <span id="msg-alert"></span>
                    </form>
                    <h2><FaRegClock />Histórico de Registros</h2>
                    {this.state.list.map(info => (
                        
                        <ul key={JSON.stringify(info.data)}>
                            <li><label>Data:</label>{info.data}</li>
                            <li><label>Entrada:</label>{info.entrada}</li>
                            <li><label>Saída Almoço:</label>{info.saidaAlmoco}</li>
                            <li><label>Retorno Almoço:</label>{info.retornoAlmoco}</li>
                            <li><label>Saida:</label>{info.saida}</li>
                        </ul>
                        
                    )
                    )}
                </div>
            </Fragment>
        )
    }
}

export default Registro;