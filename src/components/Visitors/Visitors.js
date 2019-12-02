import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'react-bootstrap';


function Visitors(props) {
    const VISITOR_QUERY = gql`
    query VisitorsQuery {
        visitors(filter: "${props.filter}", limit: "${props.limit}", skip: "${props.skip}") {
            ipv4
            _id
            device
            dateTime
        }
    }`
    return (
        <div className="main">
            <Query query={VISITOR_QUERY}>
            {
                ({loading, error, data}) => {
                    if(error) return console.log(error)
                    if(data && data.visitors) {
                    return <Table striped bordered hover size="sm" style={{ fontSize: '0.8em'}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date/Time</th>
                            <th>Device Used</th>
                            <th>IPv4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.visitors.map((item, index) => {
                            return (
                                <tr key={item._id} style={{cursor: 'pointer'}}>
                                    <td>{ index + 1 }</td>
                                    <td>{ item.dateTime }</td>
                                    <td>{ item.device }</td>
                                    <td>{ item.ipv4 }</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                    </Table> 
                    } else {
                        return <div></div>
                    }
                }
            }
            </Query>
        </div>
    );
}

export default Visitors;