import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

class StocksTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchStocks();
        console.log(this.props.stocks);
    }

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Stock name</Table.HeaderCell>
                        <Table.HeaderCell>Stock name</Table.HeaderCell>
                        <Table.HeaderCell>Stock name</Table.HeaderCell>
                        <Table.HeaderCell>Stock name</Table.HeaderCell>
                        <Table.HeaderCell>Stock name</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
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
