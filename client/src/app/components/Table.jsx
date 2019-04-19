import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class Table extends Component {
    constructor(props) {
        super(props);
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

export default Table;
