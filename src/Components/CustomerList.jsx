import { Component } from 'react';
import { ListGroup, Button, Container, Alert, Accordion } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        axios.get('https://dillon-be-exp.onrender.com/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: 'Error fetching customers. Please try again later.' });
            });
    };

    deleteCustomer = (id) => {
        axios.delete(`https://dillon-be-exp.onrender.com/customers/${id}`)
            .then(() => {
                this.fetchCustomers(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
                this.setState({ error: 'Error deleting customer. Please try again.' });
            });
    };

    fetchCustomer = (id) => {
        axios.get(`https://dillon-be-exp.onrender.com/customers${id}`)
        .then(response => {
            this.setState({customer: response.data})
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            this.setState({ error: 'Error fetching customers. Please try again later.' });
        });
    }

    render() {

        const { error, customers } = this.state;

        return (
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className='text-center my-4'>Most Reliable Customers</h2>
                <ListGroup>
                    {customers.map(customer => (
                        <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Accordion flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{customer.name}</Accordion.Header>
                                <Accordion.Body>
                                <h5>Email</h5>
                                <p>{customer.email}</p>
                                <h5>Phone</h5>
                                <p>{customer.phone}</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>
                            <Button variant="outline-danger" size="md"
                                onClick={() => this.deleteCustomer(customer.id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup><br/>
                <h6>Feel Like you should be on this list?</h6><br/>
                <Link to={'/addcustomers'}>
                 <Button variant='danger'>Join the party</Button>
                </Link>
            </Container>
        );
    }
}

export default CustomerList;