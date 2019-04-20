import React, { Component } from "react";
import { Table, Button, Modal, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Table.scss";

class StocksTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputStock: ""
        };
    }

    componentDidMount() {
        this.props.fetchStocks();
    }

    handleChange = (e) => this.setState({ inputStock: e.target.value });

    handleSubmit = (e) => {
        const { inputStock } = this.state;
        e.preventDefault();
        this.props.reqAddStock({ newStock: inputStock });
        console.log(this.props.stocks);
        this.setState({ inputStock: "" });
    };

    render() {
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
                </Table>
                <Modal className='center' size='small' trigger={<Button primary circular icon='plus circle' />}>
                    <Modal.Header>Add a stock</Modal.Header>
                    <Modal.Content>
                        <Input className='input' placeholder='Add a stock' onChange={this.handleChange} />
                    </Modal.Content>
                    <div className='button-group'>
                        <Button className='modal-btn'>Cancel</Button>
                        <Button className='modal-btn' onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </div>
                </Modal>
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
