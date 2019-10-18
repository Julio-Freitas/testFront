import styled  from 'styled-components';
import {Link} from 'react-router-dom'



export const ContainerLogin = styled.div`
    max-width:100%;
    padding: 0 60px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);

    @media (max-width: 400px) {
      padding: 20px ;
    }

`

export const Form = styled.form`
    max-width:500px;
    min-width: 290px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 40px;
    border-radius: 5px;
    margin: 0 auto;
    
    p{   
        font-weight: bold;
        font-size: 30px;
        margin: 0 0 10px;
    }

    input, label{align-self: end; margin-top: 6px;}

    input {
            
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        width: 100%;
        border: 1px solid #f5f5f4;
        border-radius: 3px;
    }

`;

export const Button = styled.button`

    color:  ${props => props.btnColor || "#000"};
    font-weight: bold;
    cursor: pointer;
    background-color:${props => props.bgColor || "#34a853"};
    padding: 8px 30px;
    border: 0;
    margin-top: 6px;
    opacity: 0.75;
    transition: all 0.5s;
    border-radius: 4px;


    &:hover{
        opacity: 1;
    }

    @media (max-width: 400px) {
      width: auto;
    }

`

export const StyledLink = styled(Link)`
  color: #000;
  display: block;
  margin: 0.5em 0;
  text-decoration: none;
  margin-top:6px;

  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: red;
  }
`;

export const ErrorLogin = styled.div`
        color: #f00555;
        font-weight: bold;
        margin:6px  0;

`