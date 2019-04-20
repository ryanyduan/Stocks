import React, { Component } from "react";
import { Table, Button, Modal, Input, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Table.scss";

class StocksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputStock: "",
            error: false,
            showAddModal: false
        };
    }

    componentDidMount() {
        this.props.fetchStocks();
    }

    handleChange = (e) => this.setState({ inputStock: e.target.value });

    handleSubmit = (e) => {
        const { inputStock } = this.state;
        e.preventDefault();
        this.props
            .reqAddStock({ newStock: inputStock })
            .then((response) => (response.status === 200 ? this.closeAddModal() : this.handleError(response.data)));
    };

    handleError = (error) => {
        if (error.errorType === "exists")
            this.setState({ error: true, msg: `You already have ${error.stock} in your portfolio` });
        else if (error.errorType === "DNE")
            this.setState({ error: true, msg: `You do not have ${error.stock} in your portfolio` });
    };

    handleClose = () => this.setState({ error: false });

    handleRemove = (id, e) => {
        e.preventDefault();
        this.props
            .reqDeleteStock({ delStock: this.props.stocks[id].name })
            .then((response) => (response.status === 200 ? null : this.handleError(response.data)));
    };

    openShowModal = () => this.setState({ showAddModal: true });
    closeAddModal = () => this.setState({ showAddModal: false });

    renderTableData = () => (
        <Table.Body>
            {this.props.stocks.map((stock, id) => (
                <Table.Row key={id} textAlign='center'>
                    <Table.Cell>{stock.name}</Table.Cell>
                    <Table.Cell>${stock.price}</Table.Cell>
                    <Table.Cell>
                        <Button
                            icon='trash alternate outline'
                            color='red'
                            size='tiny'
                            onClick={(e) => this.handleRemove(id, e)}
                        />
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    );

    render() {
        const { error, msg, showAddModal } = this.state;
        return (
            <div className='center'>
                <Table celled>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell>Symbol</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    {this.renderTableData()}
                </Table>
                <Modal
                    open={showAddModal}
                    onClose={this.closeAddModal}
                    className='center'
                    size='small'
                    trigger={<Button primary circular icon='plus circle' onClick={this.openShowModal} />}
                >
                    <Modal.Header>Add a stock</Modal.Header>
                    <Modal.Content>
                        <Input className='input' placeholder='Add a stock' onChange={this.handleChange} />
                    </Modal.Content>
                    <div className='button-group'>
                        <Button className='modal-btn' onClick={this.closeAddModal}>
                            Cancel
                        </Button>
                        <Button className='modal-btn' onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </div>
                </Modal>
                {error && (
                    <Modal open={error} onClose={this.handleClose} size='small' basic>
                        <Modal.Content>
                            <h3>Error</h3>
                            <h5>{msg}</h5>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={this.handleClose} inverted>
                                <Icon name='checkmark' />
                                Got it
                            </Button>
                        </Modal.Actions>
                    </Modal>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    stocks: state.stocks
});

export default connect(
    mapStateToProps,
    actions
)(StocksTable);
