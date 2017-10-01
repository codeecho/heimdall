import React from 'react';

const DatabaseViewer = ({database, filters}) => {
    return (
        <table class="table">
            <thead>
                <tr>
                    {database.columns.map((column) => <th key={column}>{column}</th>)}
                </tr>
            </thead>
            <tbody>
                {database.getFilteredChildren(filters).map(record => <DatabaseRecord key={record.name} record={record} columns={database.columns}/>)}
            </tbody>
        </table>
    );
}

const DatabaseRecord = ({record, columns}) => {
    return (
        <tr>
            {columns.map(column => <DatabaseValue value={record[column]} />)}
        </tr>
    )
}

const DatabaseValue = ({value}) => {
    if(value instanceof Date){
        value = value.toLocaleString();    
    }
    return <td>{value}</td>;
}

export default DatabaseViewer;