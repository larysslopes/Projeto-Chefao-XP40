import { Link } from 'react-router-dom';
import React from 'react';
// import bannerProduto from '../../../public/images/produtos.png'

import { Titulo, NavProdutos, NavLink, Wrapper, Container, Titulo2, Imagem, NatugamaBox} from './style.js'
import BallComponent from "../../components/BallComponent";

const teste = true;

function Produtos (){
    const [products, setProdutos ] = React.useState(null);

    const buscarProdutos = (categoria) => {
        
        if (categoria && categoria != 0) {
            teste = false;
            fetch("/produtos/categoria/" + categoria, {
              'method': 'GET'  
            })
            .then((res) => res.json())
            .then((data) => setProdutos(data));
            }
            else {
                fetch("/produtos")
                .then((res) => res.json())
                .then((data) => setProdutos(data));
                    
              
            }

    };
    const [categories, setCategorias ] = React.useState(null);
    // buscarProdutos();

    React.useEffect(() => {
        fetch("/categorias")
            .then((res) => res.json())
            .then((data) => setCategorias(data));

    }, []);


    return(
        <main> 
            {/* <Imagem src={bannerProduto} /> */}

            <Titulo> Produtos </Titulo>

            <NavProdutos>
                <Link to="" onClick={(e) => buscarProdutos(0)} ><NavLink>todos</NavLink></Link>
                {!categories? "Carregando produtos..." : categories.map((categorie, index) => 
                    <Link to="" onClick={(e) => buscarProdutos(categorie.id)} ><NavLink>{categorie.nome}</NavLink></Link>
                )}
                
        
            </NavProdutos>

            <Wrapper>
                {!products ? "Carregando produtos..." : products.map((product, index) => 
                    <BallComponent image={product.link_imagem} label={product.nome} size="medium" key={product.id}/>
                )}
            </Wrapper>

            <Link to="/Box"><NatugamaBox src="\images\natugama-box.jpg"></NatugamaBox></Link>
            <Container>
                    <Titulo2> Veja o que nosso clientes estão dizendo: </Titulo2>


            </Container>
        </main>
    )
}

export default Produtos