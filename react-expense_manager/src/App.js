import React from 'react';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://fathomless-sierra-68956.herokuapp.com";
}

console.log('current base URL:', baseURL)

class expenseManager extends React.Component {
    render() {
        return(
            <div className="container main-page">
                <h1>Expense Manager</h1>
                <div className="main-List">
                    <table>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Item
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Cost
                            </th>
                            <th>
                                Initial Amount
                            </th>
                            <th>
                                Balance
                            </th>
                        </tr>
                        <tr>
                            <button class="btn btn-danger">Delete</button>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default expenseManager;
