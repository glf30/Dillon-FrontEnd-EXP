import { Component } from 'react';
import { ListGroup, Button, Container, Alert, Accordion } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            selectedCustomerId: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
        .then(response => {
            this.setState({ product: response.data });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            this.setState({ error: 'Error fetching products. Please try again later.' });
        });
    };

    deleteProduct = (productId) => {
        axios.delete(`http://127.0.0.1:5000/products/${productId}`)
            .then(() => {
                this.fetchProducts();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                this.setState({ error: 'Error deleting product. Please try again.' });
            });
    };

    addToOrder = () => {

    }

    render() {

        const { error, product } = this.state;

        return (
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className='text-center my-4'>Most Popular Products</h2>
                <ListGroup>
                    {product.map(product => (
                        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Accordion flush>
                                <Accordion.Item eventKey="0">
                                <Accordion.Header>{product.product_name}</Accordion.Header>
                                <Accordion.Body>
                                <h5>Price</h5>
                                <p>{product.price}</p>
                                <h5>Short Description</h5>
                                <p>{product.product_description}</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>
                            <Button variant="outline-danger" size="md"
                                onClick={() => this.deleteProduct(product.id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup><br/>
                <h6>Feel like we are missing out on a top seller?</h6><br/>
                <Link to={'/addproduct'}>
                    <Button variant='danger'>Add a product</Button>
                </Link>
            </Container>
        );
    }

}

export default ProductsList