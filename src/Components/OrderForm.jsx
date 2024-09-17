import { Component } from 'react';
import { Button, Container, Alert, } from 'react-bootstrap';
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios';

class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date_ordered: '',
            customer_id: '',
            product_id: '',
            errors: {},
            isLoading: false,
            error: null,
            showSuccessModal: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {

            this.setState({ isLoading: true, error: null })


            const orderData = {
                order_date: this.state.date_ordered.trim(),
                customer_id: this.state.customer_id.trim(),
                product_id: this.state.product_id.trim(),
            };
            console.log(orderData);

            axios.post('http://127.0.0.1:5000/orders', orderData)
                .then(() => {
                    this.setState({showSuccessModal: true,
                    isLoading: false    
                })
                    

                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    this.setState({ error: error.toString(), isLoading: false });
                });
        } else {
            this.setState({ errors });
        }
    };

    validateForm = () => {
        const { orderDate, customerId, productId } = this.state;
        const errors = {};
        if (!customerId) errors.customer_id = 'Customer ID is required';
        if (!productId) errors.product_id = 'Product ID is required';
        if (!orderDate) errors.date_ordered = 'Please enter today\'s date';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            date_ordered: '',
            customer_id: '',
            product_id: '',
            errors: {},
        });
    };


    render() {

        const { date_ordered, customer_id, product_id, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Order Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Order: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <h2 className='m-3'>Place a New Order Here</h2>
                    <Form.Group controlId="formGroupCustomerId">
                        <Form.Label>Enter Your Customer ID</Form.Label>
                        <Form.Control type="text" name="customerId" value={customer_id} onChange={this.handleChange} />
                        {errors.customer_id && <div style={{ color: 'red'}}>{errors.customer_id}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupProductId">
                        <Form.Label>
                            Enter The ID of the Product You Would Like to Purchase*
                        </Form.Label>
                        <Form.Control type="text" name="productId" value={product_id} onChange={this.handleChange} />
                        {errors.product_id && <div style={{ color: 'red'}}>{errors.product_id}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupOrderDate">
                        <Form.Label>
                            Enter Today&lsquo;s Date
                        </Form.Label>
                        <Form.Control type="date" name="orderDate" value={date_ordered} onChange={this.handleChange} />
                        {errors.date_ordered && <div style={{ color: 'red'}}>{errors.date_ordered}</div>}
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Order Has Been Placed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You Will Be Receiving it in a Jiffy!
                    </Modal.Body>
                    <Modal.Body>
                        Thank You for Your Business!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <p className='mt-4'>*Product ID&lsquo;s are used to distinguish 
                similar products from one another. We request that you enter the
                ID to simply make it easier to guarantee order accuracy. Each 
                product&lsquo;s ID is indicated on the <b>View Our Products </b>  
                page.</p>
            </Container>
        );
    }
};


export default CreateOrder